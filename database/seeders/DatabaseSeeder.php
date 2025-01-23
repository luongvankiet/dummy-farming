<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->withPersonalTeam()->create();

        $user = User::where('email', 'admin@example.com')->first();

        if (!$user) {
            $user = User::factory()->withPersonalTeam()->create([
                'name' => 'admin',
                'email' => 'admin@example.com',
            ]);
        }

        $this->call(RoleSeeder::class);

        $user->assignRole('Admin');
    }
}
