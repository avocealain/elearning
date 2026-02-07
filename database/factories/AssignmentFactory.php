<?php

namespace Database\Factories;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Assignment>
 */
class AssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lesson_id' => Lesson::factory()->state(['type' => 'assignment']), // Ensure linked lesson is assignment type
            'instructions' => $this->faker->paragraphs(2, true),
            'total_points' => $this->faker->randomElement([10, 20, 50, 100]),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 month'),
        ];
    }
}

