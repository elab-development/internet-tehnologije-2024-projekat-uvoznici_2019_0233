<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $table = 'suppliers';

    protected $fillable = [
        'name',
        'address',
        'contact_person',
        'phone',
        'email'
    ];

    public function imports()
    {
        return $this->hasMany(Import::class);
    }
}
