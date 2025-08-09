<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImportResource extends JsonResource
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
            'import_date' => $this->import_date,
            'supplier' => new SupplierResource($this->supplier),
            'user' => new UserResource($this->user),
            'total_value' => $this->total_value,
            'status' => $this->status
        ];
    }
}
