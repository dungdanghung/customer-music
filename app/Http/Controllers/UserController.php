<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Helper\Reply;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Http;
use Spatie\Permission\Models\Permission;


class UserController extends Controller
{
	public static function getuser(Request $request)
	{
		return Reply::successWithData($request->user(), __('messages.successful'));
	}

	public function uploadAvatar(Request $request)
	{
		$user = auth()->user();
		$apiUrl = env('NODE_SERVER') . '/api/user/crop-avatar';
		$response =  Http::attach(
			'avatar',
			file_get_contents($request->file('avatar')),
			$request->file('avatar')->getClientOriginalName(),
		)->post($apiUrl, ['x' => $request->x, 'y' => $request->y]);
		if ($response->successful()) {
			$imageContents = $response->body();
			$filename = time() . $request->user()->id . '_' . $request->file('avatar') ? $request->file('avatar')->getClientOriginalName() : $user->avatar_original;
			file_put_contents(public_path('img/avatar/' . $filename), $imageContents);
			if ($request->file('avatar')) {
				File::delete(public_path('img/avatar_original/' . $user->avatar_original));
				$request->file('avatar')->storeas('img/avatar_original', $filename);
			}

			User::where('id', $user->id)->update([
				'avartar' => $filename,
				'avatar_original' => $filename
			]);

			return Reply::success();
		} else {
			return Reply::error(__('messages.something_went_wrong'));
		}
	}

	public function uploadBacgroundImg(Request $request)
	{
		$user = auth()->user();
		$filename = time() . $request->user()->id . '_' . $request->file('avatar') ? $request->file('avatar')->getClientOriginalName() : $user->avatar_original;
		$request->file('avatar')->storeas('img/background', $filename);
		User::where('id', $user->id)->update([
			'background_img' => $filename,
		]);
		return Reply::success();
	}
}
