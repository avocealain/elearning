<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubmissionRequest;
use App\Models\Assignment;
use App\Models\AssignmentSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AssignmentSubmissionController extends Controller
{
    public function store(StoreSubmissionRequest $request, Assignment $assignment)
    {
        // Validation handled by FormRequest
        $validated = $request->validated();

        $filePath = null;
        if ($request->hasFile('file')) {
            // Store in default (usually private 'local' or 's3') disk, NOT 'public' disk
            $path = $request->file('file')->store('submissions');
            $filePath = $path; // Store the relative path, not the URL
        }

        $submissionData = [
            'content' => $validated['content'] ?? null,
            'submitted_at' => now(),
        ];
        
        if ($filePath) {
            $submissionData['file_path'] = $filePath;
        }

        $assignment->submissions()->updateOrCreate(
            ['user_id' => $request->user()->id],
            $submissionData
        );

        return back()->with('success', __('Assignment submitted successfully!'));
    }

    public function download(AssignmentSubmission $submission)
    {
        // Authorization: User owns submission OR User is Instructor of the course
        // Use Policy ideally. For now, inline check.
        $user = auth()->user();
        
        $course = $submission->assignment->lesson->module->course;
        
        if ($user->id !== $submission->user_id && $user->id !== $course->instructor_id && !$user->isAdmin()) {
            abort(403);
        }

        if (!$submission->file_path || !Storage::exists($submission->file_path)) {
            abort(404, 'File not found');
        }

        return Storage::download($submission->file_path);
    }
}

