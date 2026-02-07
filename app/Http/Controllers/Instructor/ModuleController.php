<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function store(Request $request, Course $course)
    {
        if ($course->instructor_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
        ]);

        $lastOrder = $course->modules()->max('order') ?? 0;

        $course->modules()->create([
            'title' => $validated['title'],
            'order' => $lastOrder + 1,
        ]);

        return back()->with('success', 'Module created successfully.');
    }

    public function update(Request $request, Course $course, Module $module)
    {
        if ($course->instructor_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
        ]);

        $module->update($validated);

        return back()->with('success', 'Module updated successfully.');
    }

    public function destroy(Course $course, Module $module)
    {
         if ($course->instructor_id !== auth()->id()) {
            abort(403);
        }
        
        $module->delete();

        return back()->with('success', 'Module deleted successfully.');
    }
}
