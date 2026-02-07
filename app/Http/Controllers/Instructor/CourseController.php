<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Course;
use App\Services\CourseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
    public function index(Request $request)
    {
        $courses = $this->courseService->getInstructorCourses($request->user());

        return Inertia::render('Instructor/Courses/Index', [
            'courses' => $courses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Instructor/Courses/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $data = $request->validated();
        
        $data['instructor_id'] = $request->user()->id;
        $data['slug'] = Str::slug($data['title']) . '-' . Str::random(6);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $data['thumbnail'] = Storage::url($path);
        }

        Course::create($data);

        return redirect()->route('instructor.courses.index')->with('success', 'Course created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        $this->authorize('update', $course);

        $course->load([
            'modules' => function ($query) {
                $query->orderBy('order');
            },
            'modules.lessons' => function ($query) {
                $query->orderBy('order');
            },
            'modules.lessons.assignment',
            'modules.lessons.attachments' // Load attachments if needed for the UI (we show if exists)
        ]);

        return Inertia::render('Instructor/Courses/Edit', [
            'course' => $course
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $data['thumbnail'] = Storage::url($path);
        }

        $course->update($data);

        return redirect()->route('instructor.courses.index')->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $this->authorize('delete', $course);

        $course->delete();

        return redirect()->back()->with('success', 'Course deleted.');
    }

    public function grades(Course $course)
    {
        $this->authorize('update', $course);

        // Get all students enrolled
        $students = $course->enrollments()->with('user')->get()->pluck('user');

        // Get all assignments for the course, ordered by module and lesson position
        $assignments = \App\Models\Assignment::join('lessons', 'assignments.lesson_id', '=', 'lessons.id')
            ->join('modules', 'lessons.module_id', '=', 'modules.id')
            ->where('modules.course_id', $course->id)
            ->orderBy('modules.order')
            ->orderBy('lessons.order')
            ->select('assignments.*')
            ->with('lesson')
            ->get();

        // Get all submissions for these assignments by these users
        $submissions = \App\Models\AssignmentSubmission::whereIn('assignment_id', $assignments->pluck('id'))
            ->whereIn('user_id', $students->pluck('id'))
            ->get();

        // Structure data for the view: [ userId => [ assignmentId => grade ] ]
        $gradebook = [];
        foreach ($students as $student) {
            $studentGrades = [];
            foreach ($assignments as $assignment) {
                $submission = $submissions->where('user_id', $student->id)->where('assignment_id', $assignment->id)->first();
                $studentGrades[$assignment->id] = $submission ? [
                    'grade' => $submission->grade,
                    'is_graded' => !!$submission->graded_at,
                    'submitted_at' => $submission->submitted_at,
                ] : null;
            }
            $gradebook[] = [
                'user' => $student,
                'grades' => $studentGrades,
            ];
        }

        return Inertia::render('Instructor/Courses/Grades', [
            'course' => $course,
            'assignments' => $assignments,
            'students' => $gradebook,
        ]);
    }
}
