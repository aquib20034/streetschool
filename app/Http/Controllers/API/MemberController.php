<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Member;
use DB;
class MemberController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        // return Member::latest()->paginate(10);
        $data =DB::table('members')->orderBy('members.created_at','DESC')
            ->join('designations', 'designations.id', '=', 'members.designation_id')
            ->select('members.*','designations.name')->paginate(10);
        return $data ;
    }


    public function store(Request $request)
    {
        request()->validate([
            'fullname' => 'required|min:3|string|max:255',
            'email' => 'required|email|unique:members,email',
            'designation_id' => 'required|numeric',
            // 'image'=>'required',
        ]);
        if(($request['image'])){
            // $this->validate($request,['image'=>'required|image|mimes:jpeg,png,jpg,gif|max:2048']);
            $name = time().'.'.explode('/',explode(':',substr($request['image'],0,strpos($request['image'], ';')))[1])[1];
            \Image::make($request['image'])->save(public_path('img/member/').$name);
            $input = $request->all();
            $input['image'] = $name;
            $data = Member::create($input);
        }else{
            $data = Member::create($request->all());
        }

        return response()->json(['success'=>'Member Added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $member = Member::findOrFail($id);
        request()->validate([
            'fullname' => 'required|min:3|string|max:255',
            'email' => 'required|email|unique:members,email,'.$member->id,
            'designation_id' => 'required|numeric',
            // 'image'=>'required',
        ]);
        $currentImage= $member->image;

        if( $currentImage!=($request['image'])){
            // $this->validate($request,['image'=>'required|image|mimes:jpeg,png,jpg,gif|max:2048']);
            $name = time().'.'.explode('/',explode(':',substr($request['image'],0,strpos($request['image'], ';')))[1])[1];
            \Image::make($request['image'])->save(public_path('img/member/').$name);
            $request->merge(['image'=>$name]);

            // to delete the old image froum the directory if old image exist in directory

            $oldImage = public_path('img/member/').$currentImage;
            if(file_exists($oldImage)){
                @unlink($oldImage);
            }
         
        }

        $member->update($request->all());
        //
        // return $id;
        return ['message' =>'member updated'];
    }

   
    public function destroy($id)
    {
        $member = Member::findOrFail($id);
        $member->delete();
        return ['message' =>'member deleted'];
        //
    }
}
