<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\AssignmentSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmissionController extends Controller
{
    /**
     * Display a listing of submissions for the instructor's courses.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $submissions = AssignmentSubmission::with(['assignment.lesson.module.course', 'user'])
            ->whereHas('assignment.lesson.module.course', function ($q) use ($userId) {
                $q->where('instructor_id', $userId);
            })
            ->when($request->filter === 'graded', function ($q) {
                return $q->whereNotNull('graded_at');
            }, function ($q) {
                return $q->whereNull('graded_at'); // Default to pending
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Instructor/Submissions/Index', [
            'submissions' => $submissions,
            'filters' => $request->only(['filter'])
        ]);
    }

    /**
     * Update/Grade the specified submission.
     */
    public function update(Request $request, AssignmentSubmission $submission)
    {
        // Check ownership
        if ($submission->assignment->lesson->module->course->instructor_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'grade' => 'required|integer|min:0|max:' . $submission->assignment->total_points,
            'feedback' => 'nullable|string',
        ]);

        $submission->update([
            'grade' => $request->grade,
            'feedback' => $request->feedback,
            'graded_at' => now(),
        ]);

        return back()->with('success', 'Submission graded successfully.');
    }
}
