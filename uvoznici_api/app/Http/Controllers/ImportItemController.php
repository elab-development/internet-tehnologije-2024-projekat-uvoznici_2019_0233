<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImportItemResource;
use App\Models\ImportItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ImportItemController extends ResponseController
{
    public function index(Request $request)
    {
        $importItems = ImportItem::all();
        return $this->successResponse(ImportItemResource::collection($importItems), 'Import items fetched successfully');
    }

    public function show(Request $request, $id)
    {
        $importItem = ImportItem::find($id);
        if (!$importItem) {
            return $this->errorResponse('Import item not found', [], 404);
        }
        return $this->successResponse(new ImportItemResource($importItem), 'Import item fetched successfully');
    }

    public function findByImport(Request $request, $import_id)
    {
        $importItems = ImportItem::where('import_id', $import_id)->get();
        return $this->successResponse(ImportItemResource::collection($importItems), 'Import items fetched successfully');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'import_id' => 'required|exists:imports,id|numeric',
            'product_id' => 'required|exists:products,id|numeric',
            'quantity' => 'required|numeric',
            'price' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse(
                'Validation failed',
                $validator->errors(),
                422
            );
        }


        $importItem = ImportItem::create([
            'import_id' => $request->import_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'price' => $request->price
        ]);

        return $this->successResponse(new ImportItemResource($importItem), 'Import item created successfully');
    }

    public function paginateImportItems(Request $request)
    {
        $perPage = $request->per_page ?? 10;

        $importItems = DB::table('import_items')
            ->join('imports', 'import_items.import_id', '=', 'imports.id')
            ->join('products', 'import_items.product_id', '=', 'products.id')
            ->select('import_items.*', 'imports.import_date', 'products.name as product_name')
            ->orderBy('import_items.id', 'asc')
            ->paginate($perPage);

        return $this->successResponse($importItems, 'Import items fetched successfully');
    }

    public function groupBySupplier(Request $request)
    {
        $importItems = DB::table('import_items')
            ->join('imports', 'import_items.import_id', '=', 'imports.id')
            ->join('products', 'import_items.product_id', '=', 'products.id')
            ->join('suppliers', 'imports.supplier_id', '=', 'suppliers.id')
            ->select('suppliers.name as supplier_name', DB::raw('SUM(import_items.quantity) as total_quantity'))
            ->groupBy('suppliers.name')
            ->get();

        return $this->successResponse($importItems, 'Import items fetched successfully');
    }

    public function destroy(Request $request, $id)
    {
        $importItem = ImportItem::find($id);
        if (!$importItem) {
            return $this->errorResponse('Import item not found', [], 404);
        }

        $importItem->delete();

        return $this->successResponse(new ImportItemResource($importItem), 'Import item deleted successfully');
    }

    public function groupByProduct(Request $request)
    {
        $importItems = DB::table('import_items')
            ->join('imports', 'import_items.import_id', '=', 'imports.id')
            ->join('products', 'import_items.product_id', '=', 'products.id')
            ->select('products.name as product_name', DB::raw('SUM(import_items.quantity) as total_quantity'))
            ->groupBy('products.name')
            ->get();

        return $this->successResponse($importItems, 'Import items fetched successfully');
    }
}
