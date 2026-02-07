<?php

namespace App\Services;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class CourseService
{
    /**
     * Get all published courses with instructor details.
     */
    public function getPublishedCourses(): Collection
    {
        return Course::with('instructor:id,name')
            ->where('is_published', true)
            ->latest()
            ->get();
    }

    /**
     * Get details of a specific course by slug.
     */
    public function getCourseBySlug(string $slug): Course
    {
        return Course::where('slug', $slug)
            ->with(['modules.lessons' => function ($query) {
                $query->orderBy('order');
            }, 'instructor:id,name'])
            ->firstOrFail();
    }

    /**
     * Check if a user is enrolled in a course.
     */
    public function isEnrolled(?User $user, Course $course): bool
    {
        if (!$user) {
            return false;
        }

        return $user->courses()->where('course_id', $course->id)->exists();
    }

    public function getInstructorCourses(User $user)
    {
        return Course::where('instructor_id', $user->id)
            ->latest()
            ->paginate(10);
    }
}
