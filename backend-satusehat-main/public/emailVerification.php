<?php
    // data pendukung
    $namaLengkap = $argv[2];
    $linkVerification = $argv[3];
    $emailAddress = "satusehat@ianfelix.my.id"; 
    $subject = 'Email Verification - Complete Your Account Registration';
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: satusehat@ianfelix.my.id' . "\r\n";
    $message = $argv[3];
mail($argv[1], $subject, $message, $headers);
        
    // if () {
    //     echo 'Email sent successfully.';
    // } else {
    //     echo 'Email sending failed.';
    // }
?>