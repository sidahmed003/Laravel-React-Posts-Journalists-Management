<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;



Route::apiResource('users', UserController::class);

Route::apiResource('posts', PostController::class);

Route::post('/login', [UserController::class, 'login']);

Route::post('/register', [UserController::class, 'store']);

Route::get('/user/{id}/posts', [PostController::class, 'getUserPosts']);