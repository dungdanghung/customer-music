<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TblHotSong
 * 
 * @property int $id
 * @property int $song_id
 * @property Carbon $old_time_start
 * @property float $old_count_view
 * @property Carbon $old_time_end
 * @property Carbon $time_start
 * @property float $count_view
 * @property Carbon $time_end
 * @property int $view_in_day
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Song $song
 *
 * @package App\Models
 */
class TblHotSong extends Model
{
	protected $table = 'tbl_hot_song';

	protected $casts = [
		'song_id' => 'int',
		'old_time_start' => 'datetime',
		'old_count_view' => 'float',
		'old_time_end' => 'datetime',
		'time_start' => 'datetime',
		'count_view' => 'float',
		'time_end' => 'datetime',
		'view_in_day' => 'int'
	];

	protected $fillable = [
		'song_id',
		'old_time_start',
		'old_count_view',
		'old_time_end',
		'time_start',
		'count_view',
		'time_end',
		'view_in_day'
	];

	public function song()
	{
		return $this->belongsTo(Song::class);
	}
}
