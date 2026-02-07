<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Services\CourseService;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    protected CourseService $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $courses = $this->courseService->getPublishedCourses();

        return Inertia::render('Courses/Index', [
            'courses' => $courses
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug): Response
    {
        // Use Service for retrieval
        $course = $this->courseService->getCourseBySlug($slug);

        // Usage of Policy
        if (!Gate::allows('view', $course)) {
            abort(403);
        }

        return Inertia::render('Courses/Show', [
            'course' => $course,
            'isEnrolled' => $this->courseService->isEnrolled(Auth::user(), $course),
        ]);
    }
}
