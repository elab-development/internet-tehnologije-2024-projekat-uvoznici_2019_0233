<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImportItem extends Model
{
    protected $table = 'import_items';

    protected $fillable = [
        'import_id',
        'product_id',
        'quantity',
        'price'
    ];

    public function import()
    {
        return $this->belongsTo(Import::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
