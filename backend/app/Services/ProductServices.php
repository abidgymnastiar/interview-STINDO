<?php
namespace App\Services;

use App\Repositories\ProductRepositories;

class ProductServices{

    private $productRepositories;
    public function __construct(ProductRepositories $productRepositories)
    {
        $this->productRepositories = $productRepositories;
    }

    public function getAll(array $fields)
    {
        return $this->productRepositories->getAllProducts($fields);
    }

    public function getById(int $id, array $fields)
    {
        return $this->productRepositories->getProductById($id, $fields);
    }
    public function create(array $data)
    {
        return $this->productRepositories->createProduct($data);
    }

    public function update(int $id, array $data)
    {
        return $this->productRepositories->updateProduct($id, $data);
    }

    public function delete(int $id)
    {
        return $this->productRepositories->deleteProduct($id);
    }

    public function search(string $query, array $fields)
    {
        return $this->productRepositories->searchProducts($query, $fields);
    }
}
