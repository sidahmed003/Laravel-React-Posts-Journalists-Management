<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::all();
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'user_id' => 'required|exists:users,id'
    ]);

    $post = Post::create($validated);

    return response()->json($post, 201);
}


    public function show($id)
    {
        return Post::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->update($request->all());
        return response()->json($post, 200);
    }

    public function destroy($id)
    {
        Post::destroy($id);
        return response()->json(null, 204);
    }

    public function getUserPosts($id) {
        $posts = Post::where('user_id', $id)->orderBy('created_at', 'desc')->get();
        return response()->json($posts);
    }
    
}
