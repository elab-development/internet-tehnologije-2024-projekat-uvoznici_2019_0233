<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'import' => new ImportResource($this->import),
            'document_name' => $this->document_name,
            'document_type' => $this->document_type,
            'file_path' => $this->file_path
        ];
    }
}
