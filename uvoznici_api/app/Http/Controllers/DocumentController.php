<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DocumentController extends ResponseController
{
    public function findByImport(Request $request, $id)
    {
        $documents = \App\Models\Document::where('import_id', $id)->with('import')->get();
        return $this->successResponse($documents, 'Documents fetched successfully');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'import_id' => 'required|exists:imports,id|numeric',
            'document_name' => 'required|string|max:255',
            'document_type' => 'required|string|max:100',
            'file' => 'required|file'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse(
                'Validation failed',
                $validator->errors(),
                422
            );
        }

        // Handle file upload
        if ($request->hasFile('file')) {

            $file = $request->file('file');
            $filePath = $file->store('documents', 'public');
            //url
            $filePath = url('storage/' . $filePath);

            $document = \App\Models\Document::create([
                'import_id' => $request->import_id,
                'document_name' => $request->document_name,
                'document_type' => $request->document_type,
                'file_path' => $filePath
            ]);

            return $this->successResponse($document, 'Document uploaded successfully');
        } else {
            return $this->errorResponse('File upload failed', [], 400);
        }
    }
}
