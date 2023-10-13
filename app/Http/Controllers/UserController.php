<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public static function getuser(Request $request)
    {
        // const token = req.headers['authorization'].split(' ')[1]
        // const data = ReadAccessToken(token)
        // if (users.length !== 0) {
        //     let index = 0
        //     for (index; index < users.length; index++) {
        //         if (users[index].userName === data.username) {
        //             index = users[index]
        //             break
        //         }
        //     }
        //     if (index.userID) return res.json(index.ignoreProps('password', 'roleID', 'interact', 'phone', 'listeningHistory'))
        //     else return res.sendStatus(400)
        // } else {
        //     return res.sendStatus(404)
        // }
    }
}
