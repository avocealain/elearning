<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class LessonController extends Controller
{
    public function store(Request $request, Course $course, Module $module)
    {
        if ($course->instructor_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:video,text,assignment'],
            'content' => ['nullable', 'string'],
            'video_url' => ['nullable', 'url'],
            'is_free_preview' => ['boolean'],
            'attachment' => ['nullable', 'file', 'max:10240'], // 10MB
            // Assignment specific
            'total_points' => ['nullable', 'integer', 'min:0'],
            'due_date' => ['nullable', 'date'],
            'source_file' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],
        ]);

        $lastOrder = $module->lessons()->max('order') ?? 0;

        $lesson = $module->lessons()->create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . Str::random(6),
            'type' => $validated['type'],
            'content' => $validated['content'],
            'video_url' => $validated['video_url'],
            'is_free_preview' => $request->boolean('is_free_preview'),
            'order' => $lastOrder + 1,
        ]);
        
        if ($validated['type'] === 'assignment') {
            $assignmentData = [
                'total_points' => $validated['total_points'] ?? 100,
                'due_date' => $validated['due_date'] ?? null,
            ];
            
            if ($request->hasFile('source_file')) {
                $assignmentData['source_file_path'] = $request->file('source_file')->store('assignments');
            }

            $lesson->assignment()->create($assignmentData);
        }

        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $path = $file->store('attachments', 'public');
            $lesson->attachments()->create([
                'name' => $file->getClientOriginalName(),
                'path' => Storage::url($path),
            ]);
        }

        return back()->with('success', 'Lesson created successfully.');
    }

    public function update(Request $request, Course $course, Module $module, Lesson $lesson)
    {
         if ($course->instructor_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:video,text,assignment'],
            'content' => ['nullable', 'string'],
            'video_url' => ['nullable', 'url'],
            'is_free_preview' => ['boolean'],
            'attachment' => ['nullable', 'file', 'max:10240'],
            'total_points' => ['nullable', 'integer', 'min:0'],
            'due_date' => ['nullable', 'date'],
            'source_file' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],
        ]);

        $lesson->update([
            'title' => $validated['title'],
            'type' => $validated['type'],
            'content' => $validated['content'],
            'video_url' => $validated['video_url'],
            'is_free_preview' => $request->boolean('is_free_preview'),
        ]);
        
        if ($validated['type'] === 'assignment') {
            $assignmentData = [
                'total_points' => $validated['total_points'] ?? 100,
                'due_date' => $validated['due_date'] ?? null,
            ];

             if ($request->hasFile('source_file')) {
                // Delete old file if exists
                if ($lesson->assignment && $lesson->assignment->source_file_path && Storage::exists($lesson->assignment->source_file_path)) {
                    Storage::delete($lesson->assignment->source_file_path);
                }
                $assignmentData['source_file_path'] = $request->file('source_file')->store('assignments');
            }

            $lesson->assignment()->updateOrCreate(
                ['lesson_id' => $lesson->id],
                $assignmentData
            );
        }

         if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $path = $file->store('attachments', 'public');
            $lesson->attachments()->create([
                'name' => $file->getClientOriginalName(),
                'path' => Storage::url($path),
            ]);
        }

        return back()->with('success', 'Lesson updated successfully.');
    }

    public function destroy(Course $course, Module $module, Lesson $lesson)
    {
         if ($course->instructor_id !== auth()->id()) {
            abort(403);
        }

        $lesson->delete();

        return back()->with('success', 'Lesson deleted successfully.');
    }
}
