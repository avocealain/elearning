<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonProgressController extends Controller
{
    public function update(Request $request, Lesson $lesson)
    {
        $user = $request->user();
        
        // Ensure user is enrolled in the course that this lesson belongs to
        // We can create a scope or helper for this, but for now simple check:
        // $lesson->module->course->isEnrolled($user)
        
        $user->lessonProgress()->updateOrCreate(
            ['lesson_id' => $lesson->id],
            ['is_completed' => $request->boolean('is_completed')]
        );

        return back();
    }
}
