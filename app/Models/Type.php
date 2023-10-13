<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Type
 * 
 * @property int $id
 * @property string $type_name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Song[] $songs
 *
 * @package App\Models
 */
class Type extends Model
{
	protected $table = 'types';

	protected $fillable = [
		'type_name'
	];

	public function songs()
	{
		return $this->hasMany(Song::class);
	}
}
