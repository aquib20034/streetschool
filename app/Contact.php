<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'firstname','lastname','email','country_id',
        'contact_type_id','phone','msg','education',
    ];
}
