<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Faq;
use DB;
class FaqController extends Controller
{

    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        // return faq::latest()->paginate(10);
        $data =DB::table('faqs')->orderBy('faqs.created_at','DESC')
        ->select('faqs.id','faqs.question','faqs.answer')->paginate(10);
        return $data ;
    }


    public function store(Request $request)
    {

        request()->validate([
            'question' => 'required|min:3|string|max:255',
            'answer' => 'required|min:3|string',
        ]);
        $data = faq::create($request->all());

    
        return response()->json(['success'=>'Faq added successfully.']);
    }

   
    public function show($id)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $faq = faq::findOrFail($id);
        request()->validate([
            'question' => 'required|min:3|string|max:255',
            'answer' => 'required|min:3|string',
        ]);

        $faq->update($request->all());
        //
        // return $id;
        return ['message' =>'faq updated'];
    }

   
    public function destroy($id)
    {
        $faq = faq::findOrFail($id);
        $faq->delete();
        return ['message' =>'Faq deleted'];
    }
}
