<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Designation;
use DB;
class DesignationController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        $data =DB::table('designations')->orderBy('designations.created_at','DESC')
            ->select('designations.id','designations.name')->paginate(10);
        return $data ;
    }


    public function store(Request $request)
    {

        request()->validate([
            'name' => 'required|min:3|string|max:255',
        ]);
        $data = designation::create($request->all());

    
        return response()->json(['success'=>'designation added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $designation = designation::findOrFail($id);
        request()->validate([
            'name' => 'required|min:3|string|max:255',
        ]);

        $designation->update($request->all());
        //
        // return $id;
        return ['message' =>'designation updated'];
    }

   
    public function destroy($id)
    {
        $designation = designation::findOrFail($id);
        $designation->delete();
        return ['message' =>'designation deleted'];
    }
}
