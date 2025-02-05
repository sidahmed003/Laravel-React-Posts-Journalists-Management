<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;



Route::apiResource('users', UserController::class);

Route::apiResource('posts', PostController::class);