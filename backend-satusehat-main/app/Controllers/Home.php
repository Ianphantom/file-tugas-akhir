<?php

namespace App\Controllers;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
class Home extends BaseController
{
    public function index()
    {
        $to = "ian25yola@gmail.com";
        $namaLengkap = "Sabrina Lydia Simanjuntak";
        $link = "https://ianfelix.my.id";
        $command = 'php emailVerification.php "'.$to.'" "'.$namaLengkap.'" "'.$link.'" '; // Replace with your desired terminal command

        // echo $command;
        // Execute the terminal command
        $output = system($command);

        // Display the output
        echo "<pre>$output</pre>";
    }
}
