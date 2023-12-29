<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;


class UserController extends Controller
{
    public static function getuser(Request $request)
    {
        return Reply::successWithData($request->user(), __('messages.successful'));
    }
}
