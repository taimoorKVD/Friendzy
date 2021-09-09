<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\http\Controllers\Api\UserController;
use App\http\Controllers\Api\FriendController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function(){
    // *** UserController *** //
    Route::get('/users',[UserController::class, 'index']);
    Route::get('/users/{user}',[UserController::class, 'show']);

    // *** FriendController *** //
    Route::get('/friends',[FriendController::class, 'index']);
    Route::post('/friends/{user}',[FriendController::class, 'store']);
    Route::patch('/friends/{user}',[FriendController::class, 'update']);
    Route::get('/friends/{user}',[FriendController::class, 'deny']);
    Route::delete('/friends/{user}',[FriendController::class, 'destroy']);
});