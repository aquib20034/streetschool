<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'image','img_category_id','sort_order','created_by','updated_by',
    ];
}
