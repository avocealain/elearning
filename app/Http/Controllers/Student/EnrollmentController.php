<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    /**
     * Enroll the user in a course.
     */
    public function store(Request $request, Course $course)
    {
        $user = $request->user();

        if ($user->courses()->where('course_id', $course->id)->exists()) {
            return back()->with('info', 'You are already enrolled in this course.');
        }

        // Logic for paid courses would go here (payment gateway integration)
        // For now, we assume free enrollment or payment handled elsewhere
        
        $user->enrollments()->create([
            'course_id' => $course->id,
        ]);

        return redirect()->route('student.courses.learn', $course)
            ->with('success', __('You have successfully enrolled in the course!'));
    }

    /**
     * Unenroll the user from a course.
     */
    public function destroy(Request $request, Course $course)
    {
        $user = $request->user();
        
        $enrollment = $user->enrollments()->where('course_id', $course->id)->first();
        
        if ($enrollment) {
            $enrollment->delete();
            return back()->with('success', __('You have been unenrolled from the course.')); // Or redirect to dashboard
        }

        return back()->with('error', __('Enrollment not found.'));
    }
}
