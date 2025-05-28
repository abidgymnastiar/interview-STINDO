<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductServices;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $productServices;

    public function __construct(ProductServices $productServices)
    {
        $this->productServices = $productServices;
    }

    public function index(Request $request)
    {
        $fields = ['id', 'name', 'price', 'stock', 'description', 'image'];
        $products =$this->productServices->getAll($fields ?: ['*']);
        return response()->json(ProductResource::collection($products));
    }

    public function show($id)
    { try {
        $fields = ['id', 'name', 'price', 'stock', 'description', 'image'];
        $product = $this->productServices->getById($id, $fields);
        return response()->json(new ProductResource($product));
        } catch(\Exception $e){
            return response()->json(['error' => 'Product not found'], 404);
        }
    }
    public function store(Request $request)
    {
        $product = $this->productServices->create($request->validated());
        return response()->json(new ProductResource($product), 201);
    }
    public function update(Request $request, $id)
    { try {
        $product = $this->productServices->update($id, $request->validated());
        return response()->json(new ProductResource($product));
    } catch (ModelNotFoundException $e) {
        return response()->json(['error' => 'Product not found'], 404);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to update product'], 500);
    }

    }
    public function destroy($id)
    {
        $this->productServices->delete($id);
        return response()->json(null, 204);
    }
    public function search(Request $request)
    {
        $query = $request->input('query', '');
        $fields = ['id', 'name', 'price', 'stock', 'description', 'image'];
        $products = $this->productServices->search($query, $fields ?: ['*']);
        return response()->json(ProductResource::collection($products));
    }
}
