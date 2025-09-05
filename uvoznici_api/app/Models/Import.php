<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Import extends Model
{
    protected $table = 'imports';

    protected $fillable = [
        'import_date',
        'supplier_id',
        'user_id',
        'total_value',
        'status'
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(ImportItem::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
