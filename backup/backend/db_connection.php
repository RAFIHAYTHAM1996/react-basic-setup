<?php
    // If you installed via composer, just use this code to require autoloader on the top of your projects.
    require 'vendor/autoload.php';
    
    ini_set('display_errors', '1');

    // Using Medoo namespace
    use Medoo\Medoo;

    function connectToDatabase() {
        // Initialize
        // $database = new Medoo([
        //     'database_type' => 'mysql',
        //     'database_name' => 'dbname',
        //     'server' => '127.0.0.1',
        //     'username' => 'user',
        //     'password' => 'pass',
        //     'charset' => 'utf8mb4',
        //     'collation' => 'utf8mb4_bin'
        // ]);

        $database = new Medoo([
            'database_type' => 'mysql',
            'database_name' => '998076_voiture',
            'server' => 'fdb2.awardspace.net',
            'username' => '998076_voiture',
            'password' => 'CARS1996',
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_bin'
        ]);

        // $database = new Medoo([
        //     'database_type' => 'mysql',
        //     'database_name' => 'voiture',
        //     'server' => '127.0.0.1',
        //     // 'server' => '192.168.0.17',
        //     'username' => 'root',
        //     'password' => 'password',
        //     'charset' => 'utf8mb4',
        //     'collation' => 'utf8mb4_bin'
        // ]);

        return $database;
    }
    
?>