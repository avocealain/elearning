<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CourseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

Route::get('language/{locale}', function ($locale) {
    if (! in_array($locale, ['en', 'fr'])) {
        abort(400);
    }
    Session::put('locale', $locale);
    return redirect()->back();
})->name('language');

Route::get('/', function () {
    $featuredCourses = \App\Models\Course::with('instructor:id,name')
        ->withCount(['modules'])
        ->latest()
        ->take(3)
        ->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'featuredCourses' => $featuredCourses,
    ]);
});

Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{course:slug}', [CourseController::class, 'show'])->name('courses.show');

// Public Static Standard Pages
Route::get('/terms', function () {
    return Inertia::render('TermsOfService');
})->name('terms.show');

Route::get('/policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('policy.show');

Route::get('/help', function () {
    return Inertia::render('Help');
})->name('help.show');

// Design System Route (Temporary)
Route::get('/design-system', function () {
    return Inertia::render('DesignSystem');
})->name('design.system');

Route::middleware(['auth', 'verified'])->group(function () {
    // Student Dashboard (Default)
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'student'])->name('dashboard');

    // Student Learning Routes
    Route::post('/courses/{course}/enroll', [\App\Http\Controllers\Student\EnrollmentController::class, 'store'])->name('courses.enroll');
    Route::delete('/courses/{course}/unenroll', [\App\Http\Controllers\Student\EnrollmentController::class, 'destroy'])->name('courses.unenroll');
    Route::get('/courses/{course:slug}/learn', [\App\Http\Controllers\Student\CourseController::class, 'show'])->name('student.courses.learn');
    Route::post('/lessons/{lesson}/progress', [\App\Http\Controllers\Student\LessonProgressController::class, 'update'])->name('student.lessons.progress');
    Route::post('/assignments/{assignment}/submit', [\App\Http\Controllers\Student\AssignmentSubmissionController::class, 'store'])->name('student.assignments.submit');
    Route::get('/assignments/{assignment}/download', [\App\Http\Controllers\Instructor\AssignmentController::class, 'download'])->name('assignments.download');
    Route::get('/submissions/{submission}/download', [\App\Http\Controllers\Student\AssignmentSubmissionController::class, 'download'])->name('submissions.download');

    // Admin Routes
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'admin'])->name('dashboard');
        
        // User Management
        Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
        Route::patch('/users/{user}/role', [\App\Http\Controllers\Admin\UserController::class, 'updateRole'])->name('users.update-role');
        Route::delete('/users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('users.destroy');
    });

    // Instructor Routes
    Route::middleware(['role:instructor,admin'])->prefix('instructor')->name('instructor.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'instructor'])->name('dashboard');
        
        Route::get('/courses/{course}/grades', [\App\Http\Controllers\Instructor\CourseController::class, 'grades'])->name('courses.grades');
        Route::resource('courses', \App\Http\Controllers\Instructor\CourseController::class);
        
        // Modules
        Route::post('/courses/{course}/modules', [\App\Http\Controllers\Instructor\ModuleController::class, 'store'])->name('courses.modules.store');
        Route::put('/courses/{course}/modules/{module}', [\App\Http\Controllers\Instructor\ModuleController::class, 'update'])->name('courses.modules.update');
        Route::delete('/courses/{course}/modules/{module}', [\App\Http\Controllers\Instructor\ModuleController::class, 'destroy'])->name('courses.modules.destroy');
        
        // Lessons
        Route::post('/courses/{course}/modules/{module}/lessons', [\App\Http\Controllers\Instructor\LessonController::class, 'store'])->name('courses.modules.lessons.store');
        Route::put('/courses/{course}/modules/{module}/lessons/{lesson}', [\App\Http\Controllers\Instructor\LessonController::class, 'update'])->name('courses.modules.lessons.update');
        Route::delete('/courses/{course}/modules/{module}/lessons/{lesson}', [\App\Http\Controllers\Instructor\LessonController::class, 'destroy'])->name('courses.modules.lessons.destroy');
    
        // Assignments (Manage)
        Route::post('/lessons/{lesson}/assignment', [\App\Http\Controllers\Instructor\AssignmentController::class, 'store'])->name('lessons.assignment.store');
        Route::put('/assignments/{assignment}', [\App\Http\Controllers\Instructor\AssignmentController::class, 'update'])->name('assignments.update');
        Route::delete('/assignments/{assignment}', [\App\Http\Controllers\Instructor\AssignmentController::class, 'destroy'])->name('assignments.destroy');

        // Submissions (Grade)
        Route::get('/submissions', [\App\Http\Controllers\Instructor\SubmissionController::class, 'index'])->name('submissions.index');
        Route::patch('/submissions/{submission}/grade', [\App\Http\Controllers\Instructor\SubmissionController::class, 'update'])->name('submissions.update');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
