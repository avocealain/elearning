<?php

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AssignmentSubmission>
 */
class AssignmentSubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Mostly used for seeding graded assignments
        $isGraded = $this->faker->boolean(70);

        return [
            'assignment_id' => Assignment::factory(),
            'user_id' => User::factory(),
            'content' => $this->faker->paragraph(),
            'file_path' => null, // keeping simple for now
            'submitted_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'grade' => $isGraded ? $this->faker->numberBetween(0, 100) : null,
            'feedback' => $isGraded ? $this->faker->sentence() : null,
            'graded_at' => $isGraded ? $this->faker->dateTimeBetween('now', '+1 week') : null,
        ];
    }
}
