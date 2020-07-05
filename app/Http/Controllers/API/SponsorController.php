<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Sponsor;
use DB;
class SponsorController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        $data =DB::table('sponsors')->orderBy('sponsors.created_at','DESC')
                  ->select('sponsors.*')->paginate(10);
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
            \Image::make($request['image'])->save(public_path('img/sponsor/').$name);
            $input = $request->all();
            $input['image'] = $name;
            $data = Sponsor::create($input);
        }else{
            $data = Sponsor::create($request->all());
        }

        return response()->json(['success'=>'sponsor Added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $sponsor = Sponsor::findOrFail($id);
        request()->validate([
            'name' => 'required|min:3|string|max:255',
            'description' => 'required|min:3|string|max:255',
        ]);
        $currentImage= $sponsor->image;

        if( $currentImage!=($request['image'])){
            $name = time().'.'.explode('/',explode(':',substr($request['image'],0,strpos($request['image'], ';')))[1])[1];
            \Image::make($request['image'])->save(public_path('img/sponsor/').$name);
            $request->merge(['image'=>$name]);

            // to delete the old image froum the directory if old image exist in directory

            $oldImage = public_path('img/sponsor/').$currentImage;
            if(file_exists($oldImage)){
                @unlink($oldImage);
            }
         
        }

        $sponsor->update($request->all());
        return ['message' =>'sponsor updated'];
    }

   
    public function destroy($id)
    {
        $sponsor = Sponsor::findOrFail($id);
        $sponsor->delete();
        return ['message' =>'sponsor deleted'];
    }
}
