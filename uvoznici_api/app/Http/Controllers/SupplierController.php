<?php

namespace App\Http\Controllers;

use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends ResponseController
{
    public function index(Request $request)
    {
        $suppliers = Supplier::all();
        return $this->successResponse(SupplierResource::collection($suppliers), 'Suppliers fetched successfully');
    }
}
