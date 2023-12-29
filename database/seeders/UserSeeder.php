<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'firstName' => 'dang hung',
                'lastName' => 'dung',
                'userName' => 'admin',
                'birth' => '2003-02-07',
                'email' => 'admin@gmail.com',
                'password' => Hash::make(123456789)
            ],
            [
                'firstName' => 'user test',
                'lastName' => 'test',
                'userName' => 'user',
                'birth' => '2003-02-07',
                'email' => 'user@gmail.com',
                'password' => Hash::make(123456789)
            ]
        ];
        User::insert($data);
        $R = Role::findByName('admin');
        $Rs = $R->permissions;
        $ru = Role::findByName('user');
        $Ru = $ru->permissions;
        $U = User::where('userName', 'admin')->first();
        $u = User::where('userName', 'user')->first();

        $U->assignRole($R);
        $u->assignRole($ru);
        foreach ($Rs as $r) {
            $U->givePermissionTo($r);
        }
        foreach ($Ru as $r) {
            $u->givePermissionTo($r);
        }
    }
}
