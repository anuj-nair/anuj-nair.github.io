<?php

$to = "nairanuj29@gmail.com";
$name = $_POST['name'];
$subject = $_POST['subject'];
$bmessage = $_POST['message'];
$fromEmail = $_POST['email'];

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: ' . $fromEmail . '<' . $fromEmail . '>' . "\r\n" . 'Reply-To: ' . $fromEmail . "\r\n" . 'X-Mailer: PHP/' . phpversion();
$message = '<!doctype html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport"
					  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>Document</title>
			</head>
			<body>
			<span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">' . $bmessage . '</span>
      <div class="container">
      It\'s ' . $name . '<br/>
               ' . $bmessage . '<br/>
                  Regards<br/>
                ' . $fromEmail . '
      </div>
			</body>
      </html>';
$result = mail($to, $subject, $message, $headers);
if ($result) {
  echo 'OK';
} else {
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= 'From: usernamepg13@gmail.com<usernamepg13@gmail.com>' . "\r\n" . 'Reply-To: usernamepg13@gmail.com' . "\r\n" . 'X-Mailer: PHP/' . phpversion();
  mail($to, "Error using your website mailing service", $subject . " <br>" . $name . " <br>" . $bmessage, $headers);
  echo 'Sorry! There has been technical difficulty <br> Try again later';
}
?>