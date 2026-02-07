<?php

namespace App\Services;

use App\Models\User;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\AssignmentSubmission;
use Illuminate\Support\Collection;

class DashboardService
{
    /**
     * Get student progress for enrolled courses.
     */
    public function getStudentStats(User $user): array
    {
        // Encapsulate the complex eager loading and calculation logic
        $enrollments = $user->enrollments()
            ->with([
                'course',
                'course.instructor:id,name',
                'course.modules.lessons'
            ])
            ->latest()
            ->get();

        $completedLessonIds = $user->lessonProgress()
            ->where('is_completed', true)
            ->pluck('lesson_id')
            ->flip();

        $courses = $enrollments->map(function ($enrollment) use ($completedLessonIds) {
            $course = $enrollment->course;
            
            $totalLessons = 0;
            $completedLessons = 0;
            
            foreach ($course->modules as $module) {
                foreach ($module->lessons as $lesson) {
                    $totalLessons++;
                    if ($completedLessonIds->has($lesson->id)) {
                        $completedLessons++;
                    }
                }
            }
            
            $progress = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;
            
            return [
                'id' => $course->id,
                'title' => $course->title,
                'slug' => $course->slug,
                'thumbnail' => $course->thumbnail,
                'progress' => $progress,
                'instructor' => $course->instructor->name ?? 'Unknown',
                'modules_count' => $course->modules->count(),
                'lessons_count' => $totalLessons,
            ];
        });

        // Recent Grades
        $recentGrades = AssignmentSubmission::where('user_id', $user->id)
            ->whereNotNull('graded_at')
            ->with('assignment.lesson.module.course')
            ->latest('graded_at')
            ->take(3)
            ->get()
            ->map(function ($submission) {
                return [
                    'id' => $submission->id,
                    'course_title' => $submission->assignment->lesson->module->course->title,
                    'assignment_title' => $submission->assignment->lesson->title,
                    'grade' => $submission->grade,
                    'total_points' => $submission->assignment->total_points,
                    'graded_at' => $submission->graded_at,
                    'feedback_preview' => \Illuminate\Support\Str::limit($submission->feedback, 50),
                ];
            });

        return [
            'enrolledCourses' => $courses,
            'recentGrades' => $recentGrades,
        ];
    }

    /**
     * Get instructor dashboard statistics.
     */
    public function getInstructorStats(User $user): array
    {
        $userId = $user->id;

        $totalStudents = Enrollment::whereHas('course', fn($q) => $q->where('instructor_id', $userId))->count();
        $totalCourses = Course::where('instructor_id', $userId)->count();
        
        $pendingAssignments = AssignmentSubmission::whereHas('assignment.lesson.module.course', function ($q) use ($userId) {
            $q->where('instructor_id', $userId);
        })->whereNull('grade')->count();
        
        $recentCourses = Course::where('instructor_id', $userId)
            ->withCount('enrollments')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'students_count' => $course->enrollments_count,
                    'status' => $course->is_published ? 'Published' : 'Draft',
                ];
            });

        return [
            'stats' => [
                'total_students' => $totalStudents,
                'total_courses' => $totalCourses,
                'pending_assignments' => $pendingAssignments,
            ],
            'recentCourses' => $recentCourses,
        ];
    }

    /**
     * Get admin dashboard statistics.
     */
    public function getAdminStats(): array
    {
        return [
            'stats' => [
                'total_users' => User::count(),
                'total_instructors' => User::where('role', 'instructor')->count(),
                'total_courses' => Course::count(),
                'total_lessons' => \App\Models\Lesson::count(),
            ],
            'recentUsers' => User::latest()->take(5)->get(['id', 'name', 'email', 'role', 'created_at']),
        ];
    }
}
