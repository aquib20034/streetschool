<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Gallery;
use DB;
class GalleryController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        $data =DB::table('galleries')->orderBy('galleries.created_at','DESC')
            ->join('img_categories', 'img_categories.id', '=', 'galleries.img_category_id')
            ->select('galleries.*','img_categories.name')->paginate(10);
        return $data ;
    }


    public function store(Request $request)
    {
        request()->validate([
            'sort_order' => 'required|numeric',
            'img_category_id' => 'required|numeric',
            'image'=>'required',
        ]);
        if(($request['image'])){
            $name = time().'.'.explode('/',explode(':',substr($request['image'],0,strpos($request['image'], ';')))[1])[1];
            \Image::make($request['image'])->save(public_path('img/gallery/').$name);
            $input = $request->all();
            $input['image'] = $name;
            $data = Gallery::create($input);
        }else{
            $data = Gallery::create($request->all());
        }

        return response()->json(['success'=>'gallery Added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);
        request()->validate([
            'sort_order' => 'required|numeric',
            'img_category_id' => 'required|numeric',
            'image'=>'required',
        ]);
        $currentImage= $gallery->image;

        if( $currentImage!=($request['image'])){
            // $this->validate($request,['image'=>'required|image|mimes:jpeg,png,jpg,gif|max:2048']);
            $name = time().'.'.explode('/',explode(':',substr($request['image'],0,strpos($request['image'], ';')))[1])[1];
            \Image::make($request['image'])->save(public_path('img/gallery/').$name);
            $request->merge(['image'=>$name]);

            // to delete the old image froum the directory if old image exist in directory

            $oldImage = public_path('img/gallery/').$currentImage;
            if(file_exists($oldImage)){
                @unlink($oldImage);
            }
         
        }

        $gallery->update($request->all());
        return ['message' =>'gallery updated'];
    }

   
    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();
        return ['message' =>'gallery deleted'];
    }
}
