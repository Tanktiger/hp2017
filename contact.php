<?php
require_once "PHPMailer/PHPMailerAutoload.php";

//$myemail  = 'naturheilpraxis-scheduikat@web.de';
$myemail  = 'tom.scheduikat@gmail.com';

/* Check all form inputs using check_input function */
if (!check_input($_POST['name'])
    || !check_input($_POST['email'])
    || !check_input($_POST['phone'])
    || !check_input($_POST['message'])
) {
    echo json_encode(array('success' => 'false', 'msg' => 'Bitte überprüfen Sie Ihre Eingaben!'));
    exit();
}
$name = check_input($_POST['name']);
$email    = check_input($_POST['email']);
$Telefon  = check_input($_POST['phone']);
$Kommentar = check_input($_POST['message']);
$subject = "Kontaktanfrage";

$message = "
Name: $name
E-mail: $email
Telefon: $Telefon

Nachricht:
$Kommentar


-----------------------------------------------------------------------------
Bitte nicht auf diese Mail antworten - sie wurde automatisch generiert!
-----------------------------------------------------------------------------
";
$messageHTML = "
Name: $name<br>
E-mail: $email<br>
Telefon: $Telefon<br>
<br>
Kommentar:<br>
$Kommentar<br>

<br>
-----------------------------------------------------------------------------<br>
Bitte nicht auf diese Mail antworten - sie wurde automatisch generiert!<br>
-----------------------------------------------------------------------------<br>
";
//$headers = 'MIME-Version: 1.0' . "\r\n";
//$headers .= 'Content-type: text/plain; charset=UTF-8' . "\r\n";
//$headers .= 'From: wellnessaufruegen.de Webmailer' . "\r\n";

/* Send the message using mail() function */
//mail($myemail, $subject, $message, $headers);
$mail = new PHPMailer;
//$mail->isSMTP();                                      // Set mailer to use SMTP
//$mail->SMTPDebug = 2;
//$mail->Debugoutput = 'html';
//$mail->Host = 'mail.wellnessaufruegen.de';  // Specify main and backup SMTP servers
//$mail->SMTPAuth = true;                              // Enable SMTP authentication
//$mail->Username = 'info@wellnessaufruegen.de';                 // SMTP username
//$mail->Password = 'AmEsadS173';                           // SMTP password
//$mail->Port = 143;                                    // TCP port to connect to
//$mail->SMTPSecure = 'tls';

$mail->setFrom('info@tomscheduikat.com', 'tomscheduikat.com Mailer');
$mail->addAddress($myemail, 'Tom Scheduikat');     // Add a recipient

$mail->Subject = $subject;
//$mail->Body = $message;
$mail->msgHTML($messageHTML);
$mail->AltBody = $message;

if(!$mail->send()) {
    echo json_encode(array('success' => 'false', 'msg' => 'Fehler beim absenden!'));
    exit();
} else {
    echo json_encode(array('success' => 'true', 'msg' => 'Erfolgreich abgesendet!'));
    exit();
}
/* Functions we used */
function check_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    if (!$data || strlen($data) == 0)
    {
        return false;
    }
    return $data;
}

