<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\User;
use App\Helper\Reply;
use App\Mail\MyMail;
use App\Mail\Upload_song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Permission;

class MusicController extends Controller
{
    public function getSongHot(Request $request)
    {
        $request->validate([
            "songold" => ["required", "array"]
        ]);
        $HotSongs = Song::select("*")
            ->orderBy("heart", 'DESC')->get();
        $lestdata = Role::all();
        return response()->json($lestdata);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->can('upload_song') || auth()->user()->status != 'active') {
            return Reply::error(__('messages.you_do_not_have_permission_to_access'));
        }

        $request->validate([
            "filesong" => ["required", "file", "mimes:mp3"],
            "fileimage" => ["required", "image", "mimes:jpeg,png", "mimetypes:image/jpeg,image/png"],
            "filethumbnail" => ["required", "image", "mimes:jpeg,png", "mimetypes:image/jpeg,image/png"],
            "songname" => ["required", 'string'],
            "imagename" => ["required", 'string'],
            "thumbnailname" => ["required", 'string'],
            "singer" => ["required", 'string'],
        ]);


        try {
            $nameImage = time() . $request->user()->id . '_' . $request->fileimage->getClientOriginalName();
            $namethumbnail = time() . $request->user()->id . '_' . $request->filethumbnail->getClientOriginalName();
            $nameSong = time() . $request->user()->id . '_' . $request->filesong->getClientOriginalName();
            $request->fileimage->storeas('image', $nameImage);
            $request->filethumbnail->storeas('thumbnail', $namethumbnail);
            $request->file('filesong')->storeAs('data/', $nameSong, 'song');

            Song::create([
                'song_name' => $request->songname,
                'song_file' => $nameSong,
                'date' => now(),
                'thumbnail' => $namethumbnail,
                'type_id' => 1,
                'image' => $nameImage,
                'user_id' => auth()->user()->id,
                'singer' => $request->singer
            ]);
            Mail::to('dunggsx@gmail.com')->send(new MyMail('Song upload'));
        } catch (\Throwable $th) {
            Storage::delete('song/data/' . $nameSong);
            Storage::delete('song/image/' . $nameImage);
            Storage::delete('song/thumbnail/' . $namethumbnail);
            return Reply::error(__('messages.something_went_wrong'));
        }
        return Reply::success();
    }
    public function changeStatusSong(Request $request)
    {
        if (!auth()->user()->can('set_status_song') || !auth()->user()->hasRole('admin')) {
            return Reply::error(__('messages.you_do_not_have_permission_to_access'));
        }
        $request->validate([
            'song_id' => ['required', 'number'],
            'type' => ['required', Rule::in(['active', 'pending', 'disable'])]
        ]);
        $song = Song::where('id', $request->song_id)->first();
        if ($song->id) {
            $song->update([
                'status' => $request->type
            ]);
        }
    }
    public function getSongInteract(Request $request)
    {
        return 123;
    }
}
