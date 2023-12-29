<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Song
 * 
 * @property int $id
 * @property string $song_name
 * @property string $song_file
 * @property Carbon $date
 * @property string $thumbnail
 * @property int $type_id
 * @property string $image
 * @property int $user_id
 * @property int $heart
 * @property string $singer
 * @property string $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Type $type
 * @property User $user
 * @property Collection|Comment[] $comments
 * @property Collection|Interact[] $interacts
 * @property Collection|Listeninghistory[] $listeninghistories
 * @property Collection|TblHotSong[] $tbl_hot_songs
 *
 * @package App\Models
 */
class Song extends Model
{
	protected $table = 'songs';

	protected $casts = [
		'date' => 'datetime',
		'type_id' => 'int',
		'user_id' => 'int',
		'heart' => 'int'
	];

	protected $fillable = [
		'song_name',
		'song_file',
		'date',
		'thumbnail',
		'type_id',
		'image',
		'user_id',
		'heart',
		'singer',
		'description'
	];

	public function type()
	{
		return $this->belongsTo(Type::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function comments()
	{
		return $this->hasMany(Comment::class);
	}

	public function interacts()
	{
		return $this->hasMany(Interact::class);
	}

	public function listeninghistories()
	{
		return $this->hasMany(Listeninghistory::class);
	}

	public function tbl_hot_songs()
	{
		return $this->hasMany(TblHotSong::class);
	}
}
