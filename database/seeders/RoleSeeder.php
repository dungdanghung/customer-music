<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['role_name' => 'admin'],
            ['role_name' => 'user'],
            ['role_name' => 'author']
        ];
        Role::insert($data);
    }
}
