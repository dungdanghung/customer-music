<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AutherController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('/auth')->controller(AutherController::class)->group(function () {
	Route::post('/login', 'login');
	Route::post('/register', 'register');
	Route::post('/logout', 'logout')->middleware('auth:sanctum');
	Route::post('change-password', 'changePassword')->middleware('auth:sanctum');
});

Route::prefix('/user')->controller(UserController::class)->group(function () {
	Route::get('/getuser', 'getuser')->middleware('auth:sanctum');
	Route::post('/upload-avatar', 'uploadAvatar')->middleware('auth:sanctum');
	Route::post('/upload-background', 'uploadBacgroundImg')->middleware('auth:sanctum');
});

Route::prefix('/music')->controller(MusicController::class)->group(function () {
	Route::get('/getsonghot', 'getSongHot');
	Route::get('/getsonghistory', 'getSongHistory')->middleware('auth:sanctum');
	Route::get('/getsonginteract', 'getSongInteract')->middleware('auth:sanctum');
	Route::post('/upload', 'store')->middleware('auth:sanctum');
});
