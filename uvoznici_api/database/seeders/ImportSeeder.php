<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $suppliers = \App\Models\Supplier::all();
        $users = \App\Models\User::all();

        for ($i = 0; $i < 10; $i++) {
            \App\Models\Import::create([
                'import_date' => $faker->date(),
                'supplier_id' => $faker->randomElement($suppliers)->id,
                'user_id' => $faker->randomElement($users)->id,
                'total_value' => $faker->randomFloat(2, 1000, 100000),
                'status' => $faker->randomElement(['pending', 'completed', 'canceled'])
            ]);
        }
    }
}
