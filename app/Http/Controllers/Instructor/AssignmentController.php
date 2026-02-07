<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class AssignmentController extends Controller
{
    /**
     * Store a newly created assignment in storage.
     */
    public function store(Request $request, Lesson $lesson)
    {
        // Ensure user owns the course this lesson belongs to
        if ($lesson->module->course->instructor_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'due_date' => 'nullable|date',
            'total_points' => 'required|integer|min:1',
            'instructions' => 'required|string',
            'source_file' => 'nullable|file|mimes:pdf|max:10240', // 10MB max
        ]);

        $data = [
            'due_date' => $request->due_date,
            'total_points' => $request->total_points,
            'instructions' => $request->instructions,
        ];

        if ($request->hasFile('source_file')) {
            $data['source_file_path'] = $request->file('source_file')->store('assignments');
        }

        $lesson->assignment()->create($data);

        return back()->with('success', 'Assignment created successfully.');
    }

    /**
     * Update the specified assignment.
     */
    public function update(Request $request, Assignment $assignment)
    {
         if ($assignment->lesson->module->course->instructor_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'due_date' => 'nullable|date',
            'total_points' => 'required|integer|min:1',
            'instructions' => 'required|string',
            'source_file' => 'nullable|file|mimes:pdf|max:10240',
        ]);

        $data = $request->all();

        if ($request->hasFile('source_file')) {
            if ($assignment->source_file_path && Storage::exists($assignment->source_file_path)) {
                Storage::delete($assignment->source_file_path);
            }
            $data['source_file_path'] = $request->file('source_file')->store('assignments');
        }

        $assignment->update($data);

        return back()->with('success', 'Assignment updated successfully.');
    }

    public function download(Assignment $assignment)
    {
        // Check if user is enrolled or is instructor
        $user = auth()->user();
        $course = $assignment->lesson->module->course;
        
        $canAccess = $user->isAdmin() ||
                     $course->instructor_id === $user->id ||
                     $course->enrollments()->where('user_id', $user->id)->exists();

        if (!$canAccess) {
            abort(403);
        }

        if (!$assignment->source_file_path || !Storage::exists($assignment->source_file_path)) {
            abort(404);
        }

        return Storage::download($assignment->source_file_path);
    }

    /**
     * Remove the specified assignment.
     */
    public function destroy(Request $request, Assignment $assignment)
    {
         if ($assignment->lesson->module->course->instructor_id !== $request->user()->id) {
            abort(403);
        }

        $assignment->delete();

        return back()->with('success', 'Assignment deleted.');
    }
}
