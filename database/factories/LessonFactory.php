<?php

namespace Database\Factories;

use App\Models\Module;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(5);
        $type = $this->faker->randomElement(['video', 'text', 'assignment']);
        
        return [
            'module_id' => Module::factory(),
            'title' => $title,
            'slug' => Str::slug($title),
            'type' => $type,
            'content' => $type === 'text' ? $this->faker->paragraphs(5, true) : null,
            'video_url' => $type === 'video' ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : null, // Rick Roll default
            'duration_seconds' => $type === 'video' ? $this->faker->numberBetween(60, 3600) : 0,
            'is_free_preview' => $this->faker->boolean(20),
            'order' => $this->faker->numberBetween(1, 20),
        ];
    }
}
