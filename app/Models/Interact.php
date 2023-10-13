<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Interact
 * 
 * @property int $id
 * @property int $user_id
 * @property int $song_id
 * @property Carbon $date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Song $song
 * @property User $user
 *
 * @package App\Models
 */
class Interact extends Model
{
	protected $table = 'interacts';

	protected $casts = [
		'user_id' => 'int',
		'song_id' => 'int',
		'date' => 'datetime'
	];

	protected $fillable = [
		'user_id',
		'song_id',
		'date'
	];

	public function song()
	{
		return $this->belongsTo(Song::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
