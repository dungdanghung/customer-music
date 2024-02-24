<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Helper\Reply;
use App\Models\Songs;
use App\Models\TokenAbility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use function PHPUnit\Framework\isNan;
use function PHPUnit\Framework\isNull;

class AutherController extends Controller
{

	function __construct()
	{
		// DB::delete('DELETE FROM personal_access_tokens
		//     WHERE last_used_at < DATE_SUB(NOW(), INTERVAL ' . env('TOKEN_LIFETIME') . ' MINUTE);');
	}

	public static function login(Request $request)
	{
		$request->validate([
			'username' => ['required'],
			'password' => ['required', 'min:8'],
		]);

		$user = User::where('userName', $request->username)->first();
		if (!$user) return Reply::error(__('messages.user_not_found'), 404);
		if (!Hash::check($request->password, $user->password)) {
			return Reply::error(__('messages.incorrect_password'), 400);
		}
		$token = $user->createToken('Admin-Token')->plainTextToken;

		return Reply::successWithData(["token" => $token], __('messages.successful'));
	}

	public function register(Request $request)
	{
		$request->validate([
			'firstName' => ['required', 'string'],
			'lastName' => ['required', 'string'],
			'userName' => ['required', 'string', 'unique:users,userName'],
			'emailorphone' => ['required', 'string', 'unique:users,email', 'unique:users,phoneNumber'],
			'gender' => ['required', 'string', 'in:male,female'],
			'birth' => ['required', 'date'],
			'password' => ['required', 'string']
		]);


		$email = (int)$request->emailorphone == 0 ? $request->emailorphone : null;
		$phone = (int)$request->emailorphone == 0 ? null : $request->emailorphone;
		if ($email != null) {
			$request->validate([
				'emailorphone' => ['required', 'email']
			]);
		}
		try {
			DB::beginTransaction();
			$input = $request->only('firstName', 'lastName', 'userName', 'gender', 'birth');
			$input['firstName'] = $request->firstName;
			$input['email'] = $email;
			$input['phoneNumber'] = $phone;
			$input['password'] = Hash::make($request->password);
			$new_user = User::Create($input);
			DB::commit();
			return Reply::success();
		} catch (\Exception $e) {
			DB::rollBack();
			return Reply::error(__('messages.something_went_wrong'));
		}
	}

	public static function logout()
	{
		$user = request()->user();
		try {
			$user->currentAccessToken()->delete();
			return Reply::success();
		} catch (\Throwable $error) {
			return Reply::error(__('messages.something_went_wrong'));
		}
	}
	public static function changePassword()
	{
	}
}
