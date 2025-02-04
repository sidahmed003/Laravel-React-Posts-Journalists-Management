<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');  // Titre du post
            $table->text('content');  // Contenu du post
            $table->timestamps();  // created_at et updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
