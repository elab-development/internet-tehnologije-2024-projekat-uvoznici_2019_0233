<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'name',
        'description',
        'category',
        'price',
        'unit'
    ];

    public function importItems()
    {
        return $this->hasMany(ImportItem::class);
    }
}
