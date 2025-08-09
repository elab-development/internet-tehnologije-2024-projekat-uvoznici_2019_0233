<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $table = 'documents';

    protected $fillable = [
        'import_id',
        'document_name',
        'document_type',
        'file_path'
    ];

    public function import()
    {
        return $this->belongsTo(Import::class);
    }
}
