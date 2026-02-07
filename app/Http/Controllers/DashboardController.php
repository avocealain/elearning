<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    protected DashboardService $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function student()
    {
        $data = $this->dashboardService->getStudentStats(Auth::user());

        return Inertia::render('Dashboard', $data);
    }

    public function instructor()
    {
        $data = $this->dashboardService->getInstructorStats(Auth::user());

        return Inertia::render('Instructor/Dashboard', $data);
    }

    public function admin()
    {
        $data = $this->dashboardService->getAdminStats();

        return Inertia::render('Admin/Dashboard', $data);
    }
}

