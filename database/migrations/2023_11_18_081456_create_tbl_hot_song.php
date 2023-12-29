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
        Schema::create('tbl_hot_song', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("song_id")->unsigned();
            $table->foreign('song_id')->references('id')->on('songs');
            $table->date("old_time_start");
            $table->double("old_count_view");
            $table->date("old_time_end");
            $table->date("time_start");
            $table->double("count_view");
            $table->date("time_end");
            $table->bigInteger("view_in_day");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_hot_song');
    }
};
