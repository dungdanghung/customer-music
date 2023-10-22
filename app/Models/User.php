<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Notifications\Notifiable;

/**
 * Class User
 * 
 * @property int $id
 * @property string $firstName
 * @property string $laseName
 * @property string $userName
 * @property Carbon $birth
 * @property int $role_id
 * @property string $gender
 * @property string $email
 * @property string $phoneNumber
 * @property string $avartar
 * @property string $password
 * @property int $heart
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Role $role
 * @property Collection|Comment[] $comments
 * @property Collection|Follow[] $follows
 * @property Collection|Interact[] $interacts
 * @property Collection|Listeninghistory[] $listeninghistories
 * @property Collection|Song[] $songs
 *
 * @package App\Models
 */
class User extends Authenticatable
{
	use HasApiTokens, Notifiable, HasFactory;
	protected $table = 'users';

	protected $casts = [
		'birth' => 'datetime',
		'role_id' => 'int',
		'heart' => 'int'
	];

	protected $hidden = [
		'password',
		'remember_token',
		'created_at',
		'updated_at'
	];

	protected $fillable = [
		'firstName',
		'laseName',
		'userName',
		'birth',
		'role_id',
		'gender',
		'email',
		'phoneNumber',
		'avartar',
		'password',
		'heart',
		'remember_token'
	];

	public function role()
	{
		return $this->belongsTo(Role::class);
	}

	public function comments()
	{
		return $this->hasMany(Comment::class);
	}

	public function follows()
	{
		return $this->hasMany(Follow::class, 'follow_userID');
	}

	public function interacts()
	{
		return $this->hasMany(Interact::class);
	}

	public function listeninghistories()
	{
		return $this->hasMany(Listeninghistory::class);
	}

	public function songs()
	{
		return $this->hasMany(Song::class);
	}
}
