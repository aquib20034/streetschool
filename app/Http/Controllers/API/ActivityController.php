<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Activity;
use DB;
class ActivityController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        $data =DB::table('activities')->orderBy('activities.created_at','DESC')
                  ->select('activities.*')->paginate(10);
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
            \Image::make($request['image'])->save(public_path('img/activity/').$name);
            $input = $request->all();
            $input['image'] = $name;
            $data = Activity::create($input);
        }else{
            $data = Activity::create($request->all());
        }

        return response()->json(['success'=>'activity Added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $activity = activity::findOrFail($id);
        request()->validate([
            'name' => 'required|min:3|string|max:255',
            'description' => 'required|min:3|string|max:255',
        ]);
        $currentImage= $activity->image;

        if( $currentImage!=($request['image'])){
            $name = time().'.'.explode('/',explode(':',substr($request['image'],0,strpos($request['image'], ';')))[1])[1];
            \Image::make($request['image'])->save(public_path('img/activity/').$name);
            $request->merge(['image'=>$name]);

            // to delete the old image froum the directory if old image exist in directory

            $oldImage = public_path('img/activity/').$currentImage;
            if(file_exists($oldImage)){
                @unlink($oldImage);
            }
         
        }

        $activity->update($request->all());
        return ['message' =>'activity updated'];
    }

   
    public function destroy($id)
    {
        $activity = Activity::findOrFail($id);
        $activity->delete();
        return ['message' =>'activity deleted'];
    }
}
