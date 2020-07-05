<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Faq;
use DB;
use Hash;
use App\User;
use Auth;
class UserController extends Controller
{
    public function __construct(){
        $this->middleware('api');
    }

    public function index()
    {
        $data =DB::table('users')->orderBy('users.created_at','DESC')
        ->select('users.id','users.name','users.email')->paginate(10);
        return $data ;
    }

    public function store(Request $request)
    {
        request()->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|same:confirm_password',
            'confirm_password' => 'required|same:password'
        ]);
        
        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);

        return response()->json(['success'=>'User added successfully.']);
    }
  
    public function show($id)
    {
        
    }
   
   public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $input = $request->all();
        request()->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
        ]);
        if(!empty($input['password'])){ 
            $this->validate($request, [
                'password' => 'required|same:confirm-password',
                'confirm_password' => 'required|same:password'
            ]);
            $input['password'] = Hash::make($input['password']);
        }else{
            $input['password'] = $user['password'];   
        }
           
        $user->update($input);

        return response()->json(['success'=>$request['name']. ' updated successfully']);
      
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return ['message' =>'User deleted successfully'];
    } 
}