<?php

// quem receberá/destinatario
$to  = 'contato@magicoton.com' ;

// Assunto
$subject = 'Contato a partir do site';

// message
$message = $_POST['f_mensagem'];
$email = $_POST['f_email'];
// To send HTML mail, the Content-type header must be set


// Additional headers
$headers = 'From: '.$email."\r\n" .
// $headers .= 'Bcc: guibarlatti@hotmail.com' . "\r\n";
$headers .= 'Bcc: magicoton@gmail.com' . "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

// Mail it
if(mail($to, $subject, $message, $headers)){
	echo 'sucesso';
}
else{
	echo 'erro';
}

?>