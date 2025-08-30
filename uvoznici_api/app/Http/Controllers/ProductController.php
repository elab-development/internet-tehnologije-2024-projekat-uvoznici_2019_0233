<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends ResponseController
{
    public function index(Request $request)
    {
        $products = Product::all();
        return $this->successResponse(ProductResource::collection($products), 'Products fetched successfully');
    }

    public function show(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return $this->errorResponse('Product not found', [], 404);
        }
        return $this->successResponse(new ProductResource($product), 'Product fetched successfully');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'unit' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse(
                'Validation failed',
                $validator->errors(),
                422
            );
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'category' => $request->category,
            'price' => $request->price,
            'unit' => $request->unit
        ]);

        return $this->successResponse(new ProductResource($product), 'Product created successfully');
    }

    public function searchByMinAndMaxPrice(Request $request)
    {
        $min_price = $request->min_price ?? 0;
        $max_price = $request->max_price ?? 100000000;

        $products = Product::whereBetween('price', [$min_price, $max_price])->get();
        return $this->successResponse(ProductResource::collection($products), 'Products fetched successfully');
    }

    public function searchByName(Request $request)
    {
        $name = $request->name ?? '';
        $products = Product::where('name', 'like', "%$name%")->get();
        return $this->successResponse(ProductResource::collection($products), 'Products fetched successfully');
    }

    public function productsPerCategoryGrouped(Request $request)
    {
        $products = Product::select('category', \DB::raw('count(*) as total'))
            ->groupBy('category')
            ->get();

        return $this->successResponse($products, 'Products grouped by category fetched successfully');
    }

    public function getCategories(Request $request)
    {
        //get unique categories from products table
        $categories = Product::select('category')->distinct()->get();

        return $this->successResponse($categories, 'Categories fetched successfully');
    }

    public function searchByCategory(Request $request)
    {
        $category = $request->input('category') ?? '';

        $products = Product::where('category', 'like', "%$category%")->get();
        return $this->successResponse(ProductResource::collection($products), 'Products fetched successfully');
    }
}
