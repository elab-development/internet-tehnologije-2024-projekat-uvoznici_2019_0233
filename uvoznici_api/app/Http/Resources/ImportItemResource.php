<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImportItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //'import_id',
        //        'product_id',
        //        'quantity',
        //        'price'

        return [
            'id' => $this->id,
            'import_id' => $this->import_id,
            'product' => new ProductResource($this->product),
            'quantity' => $this->quantity,
            'price' => $this->price
        ];
    }
}
