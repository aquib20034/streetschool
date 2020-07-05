<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact_type extends Model
{
    protected $fillable = [
        'name','created_by','updated_by',
    ];
}
