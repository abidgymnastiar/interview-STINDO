<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepositories
{
    public function getAllProducts(array $fields)
    {
        return Product::select($fields)->latest()->paginate(5);
    }

    public function getProductById(int $id, array $fields)
    {
        return Product::select($fields)->findOrFail($id);
    }
    public function createProduct(array $data)
    {
        return Product::create($data);
    }
    public function updateProduct(int $id, array $data)
    {
        $product = Product::findOrFail($id);
        $product->update($data);
        return $product;
    }
    public function deleteProduct(int $id)
    {
        $product = Product::findOrFail($id);
        return $product->delete();
    }
    public function searchProducts(string $query, array $fields)
    {
        return Product::select($fields)
            ->where('name', 'like', '%' . $query . '%')
            ->orWhere('description', 'like', '%' . $query . '%')
            ->latest()
            ->paginate(5);
    }
}
