<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Work;
use DB;
class WorkController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        $data =DB::table('works')->orderBy('works.created_at','DESC')
                  ->select('works.*')->paginate(10);
        return $data ;
    }


    public function store(Request $request)
    {
        request()->validate([
            'name' => 'required|min:3|string|max:255',
            'description' => 'required|min:3|string|max:255',
        ]);
        if(($request['image'])){
            // $this->validate($request,['image'=>'required|image|mimes:jpeg,png,jpg,gif|max:2048']);
            $name = time().'.'.explode('/',explode(':',substr($request['image'],0,strpos($request['image'], ';')))[1])[1];
            \Image::make($request['image'])->save(public_path('img/work/').$name);
            $input = $request->all();
            $input['image'] = $name;
            $data = Work::create($input);
        }else{
            $data = Work::create($request->all());
        }

        return response()->json(['success'=>'work Added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $work = Work::findOrFail($id);
        request()->validate([
            'name' => 'required|min:3|string|max:255',
            'description' => 'required|min:3|string|max:255',
        ]);
        $currentImage= $work->image;

        if( $currentImage!=($request['image'])){
            $name = time().'.'.explode('/',explode(':',substr($request['image'],0,strpos($request['image'], ';')))[1])[1];
            \Image::make($request['image'])->save(public_path('img/work/').$name);
            $request->merge(['image'=>$name]);

            // to delete the old image froum the directory if old image exist in directory

            $oldImage = public_path('img/work/').$currentImage;
            if(file_exists($oldImage)){
                @unlink($oldImage);
            }
         
        }

        $work->update($request->all());
        return ['message' =>'work updated'];
    }

   
    public function destroy($id)
    {
        $work = Work::findOrFail($id);
        $work->delete();
        return ['message' =>'work deleted'];
    }
}
