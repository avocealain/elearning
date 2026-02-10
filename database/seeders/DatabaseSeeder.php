<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
    
        Schema::disableForeignKeyConstraints();
        User::truncate(); 
        Schema::enableForeignKeyConstraints();

        // 1. Admin User
        User::factory()->create([
            'name' => 'System Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // 2. Instructor User (Demo)
        $mainInstructor = User::factory()->create([
            'name' => 'Dr. Angela Yu',
            'email' => 'instructor@example.com',
            'password' => bcrypt('password'),
            'role' => 'instructor',
        ]);

        // 3. Student User (Demo)
        $mainStudent = User::factory()->create([
            'name' => 'Jane Student',
            'email' => 'student@example.com',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);
        
        // Optionnel : Si vous voulez aussi vider les cours, ajoutez Course::truncate(); en haut
    }
}
