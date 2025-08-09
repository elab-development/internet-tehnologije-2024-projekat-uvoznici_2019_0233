<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userAdmin = User::create([
            'name' => 'Andrej Pavlovic',
            'email' => 'andrej@gmail.com',
            'password' => bcrypt('andrej123'),
            'role' => 'admin'
        ]);

        $userAdmin1 = User::create([
            'name' => 'Irina Bozanic',
            'email' => 'irina@gmail.com',
            'password' => bcrypt('irina123'),
            'role' => 'admin'
        ]);

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->email,
                'password' => bcrypt('password'),
                'role' => 'korisnik'
            ]);
        }
    }
}
