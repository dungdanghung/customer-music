<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('laseName');
            $table->string('userName');
            $table->date('birth');
            $table->bigInteger('role_id')->unsigned();
            $table->foreign('role_id')->references('id')->on('roles');
            $table->enum('gender', [1, 0])->default(1);
            $table->string('email')->unique();
            $table->string('phoneNumber')->unique();
            $table->string('avartar');
            $table->string('password');
            $table->bigInteger('heart');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
