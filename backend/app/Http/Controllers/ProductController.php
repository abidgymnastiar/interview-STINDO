<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductServices;
use Illuminate\Container\Attributes\Storage;
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
        $products = $this->productServices->getAll($fields);
        return response()->json(ProductResource::collection($products));
    }

    public function show($id)
    {
        try {
            $fields = ['id', 'name', 'price', 'stock', 'description', 'image'];
            $product = $this->productServices->getById($id, $fields);
            return response()->json(new ProductResource($product));
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    }

    public function store(ProductRequest $request)
    {
        $validatedData = $request->validated();

        // Jika ada file gambar, simpan dan ambil path-nya
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validatedData['image'] = $path;
        }

        $product = Product::create($validatedData);

        return response()->json(new ProductResource($product), 201);
    }

    public function update(ProductRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();

            // Jika ada file gambar baru, simpan ulang
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('products', 'public');
                $validatedData['image'] = $path;
            }

            $product = $this->productServices->update($id, $validatedData);
            return response()->json(new ProductResource($product));
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update product'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $this->productServices->delete($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    }

    public function search(Request $request)
    {
        $query = $request->input('query', '');

        $products = Product::where('name', 'like', "%{$query}%")->get();

        return response()->json(ProductResource::collection($products));
    }

        public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',  // maksimal 2MB
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $url = Storage::url($path);  // dapatkan URL akses file

            return response()->json(['url' => $url], 201);
        }

        return response()->json(['error' => 'No image uploaded'], 400);
    }
}
