<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImportItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $imports = \App\Models\Import::all();
        $products = \App\Models\Product::all();

        for ($i = 0; $i < 100; $i++) {

            $randomQuantity = $faker->randomDigit();
            $product = $faker->randomElement($products);

            $price = $product->price * $randomQuantity;

            \App\Models\ImportItem::create([
                'import_id' => $faker->randomElement($imports)->id,
                'product_id' => $product->id,
                'quantity' => $randomQuantity,
                'price' => $price
            ]);
        }
    }
}
