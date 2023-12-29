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
            $table->string('lastName');
            $table->string('userName');
            $table->date('birth');
            $table->enum('gender', ['male', 'female'])->default('male');
            $table->enum('status', ['active', 'inactive', 'terminated'])->default('active');
            $table->string('email')->unique()->nullable();
            $table->string('phoneNumber')->unique()->nullable();
            $table->string('avartar')->default('user.png');
            $table->string('password');
            $table->bigInteger('heart')->default(0);
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
