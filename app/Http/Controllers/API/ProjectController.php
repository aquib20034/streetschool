<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Project;
use DB;
class ProjectController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        // return project::latest()->paginate(10);
        $data =DB::table('projects')->orderBy('projects.created_at','DESC')
            // ->join('designations', 'designations.id', '=', 'projects.designation_id')
            ->select('projects.*')->paginate(10);
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
            \Image::make($request['image'])->save(public_path('img/project/').$name);
            $input = $request->all();
            $input['image'] = $name;
            $data = Project::create($input);
        }else{
            $data = Project::create($request->all());
        }

        return response()->json(['success'=>'project Added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        request()->validate([
            'name' => 'required|min:3|string|max:255',
            'description' => 'required|min:3|string|max:255',
        ]);
        $currentImage= $project->image;

        if( $currentImage!=($request['image'])){
            // $this->validate($request,['image'=>'required|image|mimes:jpeg,png,jpg,gif|max:2048']);
            $name = time().'.'.explode('/',explode(':',substr($request['image'],0,strpos($request['image'], ';')))[1])[1];
            \Image::make($request['image'])->save(public_path('img/project/').$name);
            $request->merge(['image'=>$name]);

            // to delete the old image froum the directory if old image exist in directory

            $oldImage = public_path('img/project/').$currentImage;
            if(file_exists($oldImage)){
                @unlink($oldImage);
            }
         
        }

        $project->update($request->all());
        //
        // return $id;
        return ['message' =>'project updated'];
    }

   
    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return ['message' =>'project deleted'];
        //
    }
}
