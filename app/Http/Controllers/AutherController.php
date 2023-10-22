<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Helper\Reply;
use App\Models\Songs;
use App\Models\TokenAbility;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use function PHPUnit\Framework\isNan;

class AutherController extends Controller
{
    public static function login(Request $request)
    {
        $request->validate([
            'username' => ['required'],
            'password' => ['required', 'min:8'],
        ]);
        $user = User::where('userName', $request->username)->first();
        if (!$user) return Reply::error('auth.errors.emailNotFound', 404);
        if (!Hash::check($request->password, $user->password)) {
            return Reply::error('auth.errors.passwordIncorrect');
        }

        $token = $user->createToken('Admin-Token')->plainTextToken;

        return response()->json([
            'token' => $token
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'firstname' => ['required'],
            'lastname' => ['required'],
            'username' => ['required'],
            'emailorphone' => ['required'],
            'gender' => ['required'],
            'birth' => ['required'],
            'password' => ['required']
        ]);
        $newuser = new User;
        $newuser->firstName = $request->firstname;
        $newuser->laseName = $request->lastname;
        $newuser->userName = $request->username;
        $newuser->birth = $request->birth;
        $newuser->role_id = 1;
        $newuser->gender = $request->gender == "male" ? 1 : 0;
        $newuser->phoneNumber = isNan((int)($request->emailorphone)) ? $request->emailorphone : null;
        $newuser->email = isNan((int)($request->emailorphone)) ? null : $request->emailorphone;
        $newuser->password = Hash::make($request->password);
        $newuser->save();
        return Reply::success();
    }

    public static function logout()
    {
    }
    public static function changePassword()
    {
    }
}
