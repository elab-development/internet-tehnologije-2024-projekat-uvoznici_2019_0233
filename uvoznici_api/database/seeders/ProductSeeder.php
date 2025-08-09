<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 100; $i++) {
            \App\Models\Product::create([
                'name' => $faker->word,
                'description' => $faker->sentence,
                'category' => $faker->randomElement(['food', 'drink', 'clothes', 'electronics', 'books']),
                'price' => $faker->randomFloat(2, 100, 100000),
                'unit' => $faker->randomElement(['kg', 'l'])
            ]);
        }
    }
}
