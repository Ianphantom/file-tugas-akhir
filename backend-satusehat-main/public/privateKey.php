<?php 

$to = 'ian25yola@gmail.com';
$subject = 'Email Private Key with Attachment';
$message = 'Please save your private Key';
$from = 'sender@example.com';



// Generate a unique temporary file name
$tempFile = tempnam(sys_get_temp_dir(), 'privateKey_');

// Create and write the user input to the temporary file
$fileHandle = fopen($tempFile, 'w');
fwrite($fileHandle, "MIIEowIBAAKCAQEAjfYwWk15uCdvvt7XfNk1TXPQKAXR+JwaeR/HhGaEe3b6/FsVuxU3gD0b/onYNI2mqWkMhraFHFiJNkGB6Gl41ozofRhry32FkgBwaDfuCOvxkL1matFkCnygqR+5Y9XRd8vrCIzR//5WXD+BGgUQB2EGWGVdjonDB/UsBC50nzrSxfzEyFnmDkaGZy7sO8r7sclM7d7S7RBqfBNzIPntKOCV49+Dh31WCx2BpD9eOFnWd2t1VtyI1lOtXYfiK27YdEo9IJ+K4fgNBF8Mqw3hk5r3RL5+NtYz40vwzAKlZaBbT/T6MnJQVdy/x9HfkpAOW6CWQOOXMR5iVpsepeRd+QIDAQABAoIBAGmRiqOcuceYjCEE1nqhjGHsnf8lVN/sNkOcvmJXWm32LO89TQuy23Mh/o9rMrziGe4hkI8dbB+IN4GBdXm/9XyXjMx6PK82yP2qFe1qqjk4PIvGTUNiM2MZCuC6FsOHXh4YJtBU6FXWbaJsFzWiTikuneleeBRnngFs8S6q3U8K84DXZE3ys/gmryJ+RaSUzl7cTTIEBkRBGMfNFKteCMZ8vgtEyzXgC+nY6sEV7ThYvymgU4VMGhABPx0DxHHhXTVvzrg+yzu8YcxQu90CMTh3gF53Awuzg7QgEzN6C2e49gnp84yd/w844hpsfM0BDZcSCs1v2xA9lrFRKsxrdYECgYEAyTEdptxa4w0sg11UG1Rlb0YvvX0kIcksTfodQUKP/PiJBW0WSxRNDtpbldpggcoJcZG+rGDIxG/m/hgjPbNcBsfm8gU7MdO0h20e7Tw0mvdwU+wv6PXPrI1k45uKQlkGyn41tOxSPppYsuh+D5X1OS3JkXc6TapxLLONUtwJJGMCgYEAtKJt9zu3u1dcCF6AV1w/dfYMo14mJDzlzs29OydELjCmNNAx0nKgDE6m6yXP03J8JFaiNdqDNrilFU92ns7x9l18UR2sm6XXHgCLjUqNOYbxBWUKdPdztK32JB1oFo8urDPpTmZ5bnLGhcuVlNp+dDugCy2IzSO16esfd0CUHPMCgYEAjLonRHzjseeYGDbiys8IuIG+iOuMp3lA3TYy2mAFuWva5Am+yzti/x2rbDE4yfAZFPBeD9MO+6BOUbNuiwz3NOME3orcMekkYInqVQSEw1SKpJkTlf7Cia7JQA+e8PO2tVL8nBWlHZb2rgXDj4FT6u/lCzP7ezHaQetB0hCI8IMCgYATYFEXcip1SBuxMiHmPRj5mFkmtRS2Umn8Uwl3bPDdW46Yn7SYdH9CkrVJCBdRATjb1Qc1a6kjl47tyEZbJqvB16lcMiiv0YxPxZMypsqbXyQ/heUnQtwAh6CdoyHlOZqyEid2p3tjI6Cz/XCgNQfXhAXY7Rt9ldUPsI8BhcXdjQKBgHj4bMREd4wMqVoYqczPoYoL+LOYWaircHRi8gc+RS6YXVz8AYGraWc8z7OpBcRAa/GFiaTmKVAkg9WRGU/cdZqQT+07VOELmTc5n9iMkJl5QEbiH/y3kubsWWxJrPigqapVKIJR7cVkyZE8EecJmO1WBomAIZ9mO77lCxtCy75B");
fclose($fileHandle);

// Perform operations on the temporary file (e.g., read, process, etc.)
// ...



// File path and name
$filePath = $tempFile;

// Read the file content
$fileContent = file_get_contents($filePath);

// Encode the file content using base64
$encodedFileContent = base64_encode($fileContent);

// Create the email headers
$headers = "From: $from\r\n";
$headers .= "Reply-To: $from\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"boundary\"\r\n";

// Create the email body
$body = "--boundary\r\n";
$body .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= "$message\r\n\r\n";
$body .= "--boundary\r\n";
$body .= "Content-Type: application/pdf; name=\"file.pdf\"\r\n";
$body .= "Content-Disposition: attachment; filename=\"file.pdf\"\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n\r\n";
$body .= $encodedFileContent."\r\n\r\n";
$body .= "--boundary--";

// Send the email
$result = mail($to, $subject, $body, $headers);
// Delete the temporary file
unlink($tempFile);
if ($result) {
    echo "Email sent successfully.";
} else {
    echo "Failed to send email.";
}
?>