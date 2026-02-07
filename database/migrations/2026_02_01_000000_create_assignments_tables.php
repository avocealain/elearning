<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained('lessons')->cascadeOnDelete();
            $table->dateTime('due_date')->nullable();
            $table->integer('total_points')->default(100);
            $table->text('instructions')->nullable(); // Specific instructions separate from lesson content? Or just use lesson content.
            // Let's use lesson content for description and this table for metadata.
            $table->timestamps();
        });

        Schema::create('assignment_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assignment_id')->constrained('assignments')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->text('content')->nullable(); // Text submission
            $table->string('file_path')->nullable(); // File submission
            $table->timestamp('submitted_at');
            
            // Grading
            $table->decimal('grade', 5, 2)->nullable();
            $table->text('feedback')->nullable();
            $table->timestamp('graded_at')->nullable();
            
            $table->timestamps();
            
            // User can submit once per assignment? Or multiple? Let's say once for simplicity or unique constraint.
            // But they might want to resubmit. Let's not strict unique, but finding latest.
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assignment_submissions');
        Schema::dropIfExists('assignments');
    }
};
