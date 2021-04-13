<?php
    header("Access-Control-Allow-Origin: *");

    // If you installed via composer, just use this code to require autoloader on the top of your projects.
    require 'vendor/autoload.php';
    require 'db_connection.php';
    
    ini_set('display_errors', '1');

    // Using Medoo namespace
    use Medoo\Medoo;
    
    $database = connectToDatabase();

    $database->query("DELETE FROM voiture_group WHERE id <> -1");    
    
    // Enjoy
    $database->insert('voiture_group', [
        'name' => 'StreetLegalMob',
        'username' => 'streetlegalmob',
        'description' => 'Meets 🏁
Cruises 🚘
Vlogs & Compilations 📸
Custom builds 🔰
& Much more 
Our passion is what keeps us going, it keeps us together. 
#KeepItStreetLegal 😏',
        'img_profile' => 'https://instagram.fykz1-1.fna.fbcdn.net/vp/c350f854447ba96ff78ae55be6fdebf8/5D181BE6/t51.2885-15/e35/60354194_198949121082971_5089915402907648088_n.jpg?_nc_ht=instagram.fykz1-1.fna.fbcdn.net',
        'loc_city' => 'Vaughan',
        'loc_state' => 'Ontario',
        'loc_country' => 'Canada'
    ]);

    $database->insert('voiture_group', [
        'name' => 'Stradajbr™',
        'username' => 'stradajbr',
        'description' => '🔘Season Opener Wed. May 08 @stradajbr 
🔘Based in the GTA 🔘stradacarclub@gmail.com 
🔘Use our hashtags #stradajbr #lastrada #corsacanada
stradacarshows.com',
        'img_profile' => 'https://instagram.fykz1-1.fna.fbcdn.net/vp/acf06bf994139279ac47f202c46b2ca3/5DA33D57/t51.2885-15/sh0.08/e35/s640x640/64449752_753657761715654_851013635150235418_n.jpg?_nc_ht=instagram.fykz1-1.fna.fbcdn.net',
        'loc_city' => 'Vaughan',
        'loc_state' => 'Ontario',
        'loc_country' => 'Canada'
    ]);

    // $database->delete('voiture_group', [
    //     'AND'=>[
    //         'name' => '-1',
    //     ]
    // ]);

    $data = $database->select('voiture_group', '*');
    
    echo json_encode($data);
?>