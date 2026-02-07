<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(4);
        return [
            'instructor_id' => User::factory(), // Defaults to creating a new user if not overridden
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraphs(3, true),
            'price' => $this->faker->randomFloat(2, 0, 100),
            'is_published' => $this->faker->boolean(80), // 80% chance of being published
            'thumbnail' => 'https://via.placeholder.com/640x360.png?text=' . urlencode($title),
        ];
    }
}
