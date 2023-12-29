<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dataP = [
            ['name' => 'upload_song', 'guard_name' => 'web'],
            ['name' => 'delete_song', 'guard_name' => 'web'],
            ['name' => 'update_song', 'guard_name' => 'web']
        ];
        Permission::insert($dataP);
        $dataR = [
            ['name' => 'admin', 'guard_name' => 'web'],
            ['name' => 'user', 'guard_name' => 'web'],
            ['name' => 'author', 'guard_name' => 'web']
        ];

        Role::insert($dataR);
        $R = Role::all();
        $P = Permission::all();
        foreach ($R as $r) {
            foreach ($P as $p) {
                $r->givePermissionTo($p);
            }
        }
    }
}
