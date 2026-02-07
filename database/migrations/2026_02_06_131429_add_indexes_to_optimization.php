<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->index(['instructor_id', 'created_at']); // Common query pattern
            $table->index('is_published'); // Filtering published courses
        });

        Schema::table('lessons', function (Blueprint $table) {
            $table->index(['module_id', 'order']); // Often queried together
        });

        Schema::table('enrollments', function (Blueprint $table) {
            $table->index(['user_id', 'course_id']); // Lookups for access
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropIndex(['instructor_id', 'created_at']);
            $table->dropIndex(['is_published']);
        });

        Schema::table('lessons', function (Blueprint $table) {
            $table->dropIndex(['module_id', 'order']);
        });

        Schema::table('enrollments', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'course_id']);
        });
    }
};
