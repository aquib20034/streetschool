<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Contact_type;
use DB;
class Contact_typeController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        $data =DB::table('contact_types')->orderBy('contact_types.created_at','DESC')
            ->select('contact_types.id','contact_types.name')->paginate(10);
        return $data ;
    }


    public function store(Request $request)
    {

        request()->validate([
            'name' => 'required|min:3|string|max:255',
        ]);
        $data = Contact_type::create($request->all());

    
        return response()->json(['success'=>'contact_type added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $contact_type = Contact_type::findOrFail($id);
        request()->validate([
            'name' => 'required|min:3|string|max:255',
        ]);

        $contact_type->update($request->all());
        //
        // return $id;
        return ['message' =>'contact_type updated'];
    }

   
    public function destroy($id)
    {
        $contact_type = Contact_type::findOrFail($id);
        $contact_type->delete();
        return ['message' =>'contact_type deleted'];
    }
}
