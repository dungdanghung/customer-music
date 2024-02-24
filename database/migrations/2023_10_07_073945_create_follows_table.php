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
		Schema::create('follows', function (Blueprint $table) {
			$table->id();
			$table->bigInteger('user_id');
			$table->foreign('user_id')->references('id')->on('users');
			$table->bigInteger('follow_userID')->unsigned();
			$table->foreign('follow_userID')->references('id')->on('users');
			$table->bigInteger('check_seen');
			$table->bigInteger('song_id');
			$table->foreign('song_id')->references('id')->on('songs');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('follows');
	}
};
