<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $niz = ['Merkator', 'Idea', 'Univerexport', 'Maxi', 'Lidl', 'Roda', 'Tempo', 'Aman', 'Vero', 'Metro', 'Gomex', 'DIS', 'Idea', 'Univerexport', 'Maxi', 'Lidl', 'Roda', 'Tempo', 'Aman', 'Vero', 'Metro', 'Gomex', 'DIS', 'Idea', 'Univerexport', 'Maxi', 'Lidl', 'Roda', 'Tempo', 'Aman', 'Vero', 'Metro', 'Gomex', 'DIS', 'Idea', 'Univerexport', 'Maxi', 'Lidl', 'Roda', 'Tempo', 'Aman', 'Vero', 'Metro', 'Gomex', 'DIS', 'Idea', 'Univerexport', 'Maxi', 'Lidl', 'Roda', 'Tempo', 'Aman', 'Vero', 'Metro', 'Gomex', 'DIS', 'Idea', 'Univerexport', 'Maxi', 'Lidl', 'Roda', 'Tempo', 'Aman', 'Vero', 'Metro', 'Gomex', 'DIS', 'Idea', 'Univerexport', 'Maxi', 'Lidl', 'Roda', 'Tempo', 'Aman', 'Vero', 'Metro', 'Gomex', 'DIS', 'Idea', 'Univerexport', 'Maxi', 'Lidl', 'Roda', 'Tempo', 'Aman', 'Vero', 'Metro', 'Gomex', 'DIS', 'Idea', 'Univerexport', 'Maxi', 'Lidl', 'Roda', 'Tempo', 'Aman', 'Vero', 'Metro', 'Gomex', 'DIS', 'Idea', 'Univerexport', 'Maxi', 'Lidl', 'Roda', 'Tempo', 'Aman', 'Vero', 'Metro', 'Gomex', 'DIS'];

        $faker = \Faker\Factory::create();

        foreach ($niz as $ime) {
            \App\Models\Supplier::create([
                'name' => $ime,
                'address' => $faker->address,
                'contact_person' => $faker->name,
                'phone' => $faker->phoneNumber,
                'email' => $faker->email
            ]);
        }
    }
}
