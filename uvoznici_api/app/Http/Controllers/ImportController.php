<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImportResource;
use App\Models\Import;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImportController extends ResponseController
{
    public function index(Request $request)
    {
        $imports = Import::all();
        return $this->successResponse(ImportResource::collection($imports), 'Imports fetched successfully');
    }

    public function show(Request $request, $id)
    {
        $import = Import::find($id);
        if (!$import) {
            return $this->errorResponse('Import not found', [], 404);
        }
        return $this->successResponse(new ImportResource($import), 'Import fetched successfully');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'import_date' => 'required|date',
            'supplier_id' => 'required|exists:suppliers,id|numeric',
            'user_id' => 'required|exists:users,id|numeric',
            'total_value' => 'required|numeric',
            'status' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse(
                'Validation failed',
                $validator->errors(),
                422
            );
        }


        $import = Import::create([
            'import_date' => $request->import_date,
            'supplier_id' => $request->supplier_id,
            'user_id' => $request->user_id,
            'total_value' => $request->total_value,
            'status' => $request->status
        ]);

        return $this->successResponse(new ImportResource($import), 'Import created successfully');
    }

    public function destroy(Request $request, $id)
    {
        $import = Import::find($id);
        if (!$import) {
            return $this->errorResponse('Import not found', [], 404);
        }

        $import->delete();

        return $this->successResponse(new ImportResource($import), 'Import deleted successfully');
    }

    public function importsPerStatusGrouped(Request $request)
    {
        $imports = Import::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get();

        return $this->successResponse($imports, 'Imports grouped by status fetched successfully');
    }
}
