<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});

Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
Route::get('{path}',"HomeController@index")->where( '/[\w-.]+/', 'path' );
// Route::group(['middleware' => ['auth']], function() {

//     Route::resource('members','MemberController');
//     // Route::delete('communityCatDeleteAll', 'Community_categoryController@deleteAll');
//     // Route::get('communityCatList', 'Community_categoryController@list');
    
//     // Route::delete('wClass/{id}', 'Weight_classController@destroy');
   

// });
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
