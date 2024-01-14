<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index()
    {
        $products = Products::orderBy('updated_at', 'desc')->get();
        return response()->json($products);
    }

    public function store(ProductRequest $request)
    {
        $product = Products::create($request->validated());
        return response()->json($product, 201);
    }

    public function show(Products $product)
    {
        return response()->json($product);
    }

    public function update(ProductRequest $request, Products $product)
    {
        $product->update($request->validated());

        return response()->json($product);
    }

    public function destroy(Products $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully.']);
    }

    public function search(Request $request)
    {
        $query = Products::query();
        $keyword = $request->input('keyword');
        $category = $request->input('category');

        if ($request->has('keyword')) {
            $query->where(function ($subquery) use ($keyword) {
                $subquery->where('name', 'like', '%' . $keyword . '%')
                        ->orWhere('description', 'like', '%' . $keyword . '%');
            });
        }

        if ($request->has('category')) {
            $query->where('category', $category);
        }

        $perPage = $request->has('per_page') ? (int)$request->input('per_page') : 10;
        $products = $query->paginate($perPage);

        return response()->json($products);
    }
}
