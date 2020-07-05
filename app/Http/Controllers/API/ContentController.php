<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Content;
use DB;
class ContentController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        $data =DB::table('contents')->orderBy('contents.created_at','DESC')
                  ->select('contents.*')->paginate(10);
        return $data ;
    }


    public function store(Request $request)
    {
        request()->validate([
            'title' => 'required|min:3|string|max:255',
            'keyword' => 'required|min:3|string',
            'description' => 'required|min:3|string|max:255',
        ]);
       
        $data = Content::create($request->all());

        return response()->json(['success'=>'content Added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $content = Content::findOrFail($id);
        request()->validate([
            'title' => 'required|min:3|string|max:255',
            'keyword' => 'required|min:3|string',
            'description' => 'required|min:3|string|max:255',
        ]);
        
        $content->update($request->all());
        return ['message' =>'content updated'];
    }

   
    public function destroy($id)
    {
        $content = Content::findOrFail($id);
        $content->delete();
        return ['message' =>'content deleted'];
    }
}
