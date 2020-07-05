<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Img_category;
use DB;
class Img_categoryController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        $data =DB::table('img_categories')->orderBy('img_categories.created_at','DESC')
            ->select('img_categories.id','img_categories.name')->paginate(10);
        return $data ;
    }


    public function store(Request $request)
    {

        request()->validate([
            'name' => 'required|min:3|string|max:255||unique:img_categories,name',
        ]);
        $data = Img_category::create($request->all());

    
        return response()->json(['success'=>'img_category added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $img_category = Img_category::findOrFail($id);
        request()->validate([
            'name' => 'required|min:3|string|max:255|unique:img_categories,name,'.$img_category->id,
        ]);

        $img_category->update($request->all());
        //
        // return $id;
        return ['message' =>'img_category updated'];
    }

   
    public function destroy($id)
    {
        $img_category = Img_category::findOrFail($id);
        $img_category->delete();
        return ['message' =>'img_category deleted'];
    }
}
