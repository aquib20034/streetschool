<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Record;
use DB;

class RecordController extends Controller
{
  
    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        $data =DB::table('records')->orderBy('records.created_at','DESC')
            ->select('records.*')->paginate(10);
        return $data ;
    }


    public function store(Request $request)
    {

        request()->validate([
            'title' => 'required|min:3',
        ]);
        $data = Record::create($request->all());

    
        return response()->json(['success'=>'record added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $record = Record::findOrFail($id);
        request()->validate([
            'title' => 'required|min:3|string|max:255',
        ]);

        $record->update($request->all());
        //
        // return $id;
        return ['message' =>'record updated'];
    }

   
    public function destroy($id)
    {
        $record = Record::findOrFail($id);
        $record->delete();
        return ['message' =>'record deleted'];
    }
}
