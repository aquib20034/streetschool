<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Contact;
use DB;
class ContactController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        $data =DB::table('contacts')->orderBy('contacts.created_at','DESC')
            ->join('contact_types', 'contact_types.id', '=', 'contacts.contact_type_id')
            ->select('contacts.*','contact_types.name')->paginate(10);
        return $data ;
    }


    public function store(Request $request)
    {

        // dd($request);
        request()->validate([
            'firstname' => 'required|min:3|string|max:255',
            'lastname' => 'required|min:3|string|max:255',
            'email' => 'required|email|unique:contacts,email',
            'country_id' => 'required|numeric',
            'contact_type_id' => 'required|numeric',
            'phone' => 'required|min:3|unique:contacts,phone',
            'msg' => 'required|min:2|string|max:255',
            'education' => 'required|min:3|string',
        ]);
        $data = Contact::create($request->all());
        return response()->json(['success'=>'contact Added successfully.']);
    }
   
    public function show($id)
    {
        //
    }
   
    public function update(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);
        request()->validate([
            'firstname' => 'required|min:3|string|max:255',
            'lastname' => 'required|min:3|string|max:255',
            'email' => 'required|email|unique:contacts,email,'.$contact->id,
            'country_id' => 'required|numeric',
            'contact_type_id' => 'required|numeric',
            'phone' => 'required|min:3|unique:contacts,phone,'.$contact->id,
            'msg' => 'required|min:3|string|max:255',
            'education' => 'required|min:3|string',
        ]);
        $contact->update($request->all());
        return ['message' =>'contact updated'];
    }

   
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return ['message' =>'contact deleted'];
    }
}
