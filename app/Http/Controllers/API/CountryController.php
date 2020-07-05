<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Country;
use DB;
class CountryController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        $data =DB::table('countries')->orderBy('countries.created_at','DESC')
                  ->select('countries.*')->paginate(25);
        return $data ;
    }


    public function store(Request $request)
    {
        request()->validate([
            'name' => 'required|min:3|string|max:255',
        ]);
        $data = Country::create($request->all());
      

        return response()->json(['success'=>'country Added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $country = Country::findOrFail($id);
        request()->validate([
            'name' => 'required|min:3|string|max:255',
        ]);
      
        $country->update($request->all());
        return ['message' =>'country updated'];
    }

   
    public function destroy($id)
    {
        $country = Country::findOrFail($id);
        $country->delete();
        return ['message' =>'country deleted'];
    }
}
