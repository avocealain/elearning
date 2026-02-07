<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function show(Request $request, Course $course)
    {
        // Ensure user is enrolled or course is public/free? 
        // For now, let's assume if they can hit this route they might need to be enrolled.
        // Or if it's a public preview, we handle it separately.
        // Using a middleware for enrollment check would be good, but I'll add a simple check here.
        
        $user = $request->user();
        $isEnrolled = $course->enrollments()->where('user_id', $user->id)->exists();

        // If not enrolled and not instructor, redirect or 403
        if (!$isEnrolled && $course->instructor_id !== $user->id) {
             // Optional: Allow viewing if it's free or preview? 
             // For this task, let's strictly require enrollment
             return redirect()->route('courses.show', $course)->with('error', __('You must be enrolled to view course content.'));
        }

        $course->load([
            'modules' => function ($query) {
                $query->orderBy('order');
            },
            'modules.lessons' => function ($query) {
                $query->orderBy('order');
            },
            'modules.lessons.progress' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            },
            'modules.lessons.assignment',
            'modules.lessons.assignment.submissions' => function ($query) use ($user) {
                 $query->where('user_id', $user->id);
            },
            'modules.lessons.attachments'
        ]);

        return Inertia::render('Student/Learn', [
            'course' => $course,
        ]);
    }
}
