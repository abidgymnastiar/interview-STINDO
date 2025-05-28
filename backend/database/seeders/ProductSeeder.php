<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Produk A',
            'price' => 10000,
            'stock' => 10,
            'description' => 'Deskripsi produk A',
            'image' => 'produk-a.svg'
        ]);

        Product::create([
            'name' => 'Produk B',
            'price' => 20000,
            'stock' => 5,
            'description' => 'Deskripsi produk B',
            'image' => 'produk-b.svg'
        ]);
    }
}
