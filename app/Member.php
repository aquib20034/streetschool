<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'fullname','email','description','designation_id','image','created_by','updated_by',
    ];
}
