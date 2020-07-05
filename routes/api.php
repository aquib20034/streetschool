<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResources([
    'member'=>'API\MemberController',
    'faq'=>'API\FaqController',
    'user'=>'API\UserController',
    'designation'=>'API\DesignationController',
    'record'=>'API\RecordController',
    'project'=>'API\ProjectController',
    'sponsor'=>'API\SponsorController',
    'work'=>'API\WorkController',
    'country'=>'API\CountryController',
    'activity'=>'API\\ActivityController',
    'contact'=>'API\ContactController',
    'contact_type'=>'API\Contact_typeController',
    'content'=>'API\ContentController',
    'img_category'=>'API\Img_categoryController',
    'gallery'=>'API\GalleryController',
    ]);