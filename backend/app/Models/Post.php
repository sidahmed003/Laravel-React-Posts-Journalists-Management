<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'user_id' // Ajout de user_id aux colonnes remplissables
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

