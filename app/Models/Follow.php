<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Follow
 * 
 * @property int $id
 * @property int $follow_userID
 * @property int $check_seen
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User $user
 *
 * @package App\Models
 */
class Follow extends Model
{
	protected $table = 'follows';

	protected $casts = [
		'follow_userID' => 'int',
		'check_seen' => 'int'
	];

	protected $fillable = [
		'follow_userID',
		'check_seen'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'follow_userID');
	}
}
