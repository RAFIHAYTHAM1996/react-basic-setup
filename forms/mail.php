<?php
  $DEBUG = false;

  header('Access-Control-Allow-Origin: *', true);
  header('Content-Type: application/json');

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require './PHPMailer/Exception.php';
  require './PHPMailer/PHPMailer.php';
  require './PHPMailer/SMTP.php';

  $protocol = "https";
  $host = "gmail.com";
  $recipient = "rafihgeorge@" . $host;

  $SMTP_USERNAME = "rafi@addmeup.co.cc";
  $SMTP_PASSWORD = "CARS1996";

  $SMTP_HOST = 'free.mboxhosting.com';
  $SMTP_PORT = 587;
  
  if ($_SERVER['REQUEST_METHOD'] !== 'POST' && !$DEBUG) {
    header('Location: ' . getFullURLFromHost($host));
  } else {
    $data = file_get_contents('php://input');
    $data = json_decode($data);
    
    $data->name = check_input($data->name);
    $data->email = urldecode(check_input($data->email));
    $data->phone = check_input($data->phone);
    $data->message = check_input($data->message);
    $email_to = $recipient;
    $email_subject = "Contact Form";

    $email_title = "Hello, I'm " . $data->name . ".";

    // Data Validation
    if(!preg_match('/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/', $data->email)) {
      respond('The Email Address you entered does not appear to be valid.', 400);
    } else if(strlen($data->name) < 1) {
      respond('The name you entered is invalid.', 400);
    } else if(strlen($data->message) < 1) {
      respond('The message you entered is invalid.', 400);
    }

    try {
      // Instantiation and passing `true` enables exceptions
      $mail = new PHPMailer(true);
      //Server settings
      if ($DEBUG) {
        $mail->SMTPDebug = 2;                                     // Enable verbose debug output
      }
      $mail->Host       = $SMTP_HOST;                             // Specify main and backup SMTP servers
      $mail->Port       = $SMTP_PORT;                             // TCP port to connect to
      // $mail->isSMTP();                                         // Set mailer to use SMTP
      $mail->SMTPAuth   = true;                                // Enable SMTP authentication
      $mail->Username   = $SMTP_USERNAME;                      // SMTP username
      $mail->Password   = $SMTP_PASSWORD;                      // SMTP password
      $mail->SMTPSecure = 'none';                                 // Enable TLS encryption, `ssl` also accepted
      $mail->SMTPAuth   = false;

      //Recipients
      $mail->setFrom('forms@' . $host, $data->name);
      $mail->addAddress($recipient, $data->name);                 // Add a recipient
      $mail->addReplyTo($data->email, $data->name);

      // Content
      $mail->isHTML(true);                                        // Set email format to HTML
      $mail->Subject = $email_subject;
      $mail->Body    = create_email($data, $email_title);
      $mail->AltBody = 'Please view this email in a browser/client that supports HTML emails';
      $mail->send();
      // respond(create_email($data, $email_title));

      respond('Message has been sent');
    } catch (Exception $e) {
      respond("Message could not be sent. Please try again later.", 400);
      if ($DEBUG) echo "Mailer Error: {$mail->ErrorInfo}"; // For debugging
    }
  }

  function respond($msg, $status = 200) {
    http_response_code($status);
    echo json_encode($msg);
    exit();
  }

  function check_input($string) {
    if (!isset($string)) {
      $string = "";
    }
    $string = trim($string);
    $string = stripslashes($string);
    $string = htmlspecialchars($string);
    return $string;
  }

  function getFullURLFromHost($host) {
    $h = $host;
    if (!preg_match('/https?:\/\//', $host)) {
      $h = $protocol . "://www." . $host;
    }
    return $h;
  }

  function create_email($data, $email_title) {
    $html =
      '<html><head>'
        . '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">'
        . '</head><body><center>'
        . '<div style="display: none; max-height: 0px; overflow: hidden;">'
          . $data->message
        . '</div>'
        . '<style>'
          . 'h4 { font-weight: normal; margin: 0; color: #FFFFFF !important; }'
          . 'tr { width: 450px; }'
          . 'td { padding: 0; }'
          . 'p { line-height: 1.5; }'
        . '</style>'
        . '<div style="display: none; max-height: 0px; overflow: hidden;">'
          . '&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;'
        . '</div>'
        . '<table cellpadding="0" cellspacing="0" width="auto" style="width: 100%; max-width: 550px; min-width: 400px; min-height: 550px; background-color: #536EC4; color: #FFFFFF; font-size: 13px; font-family: \'Trebuchet MS\', Helvetica, sans-serif; padding: 50px;">'
        . '<tr>'
          . '<td colspan="2" style="padding-bottom: 10px; border-bottom: 1px solid #DDD; color: #FFFFFF; display: table-cell; font-size: 20px; height: 25px;">'
            . $email_title
          . '</td>'
        . '</tr>'
        // Email
        . '<tr>'
          . '<td>'
            . '<h4>E-mail</h4>'
            . '<p>'
              . '<a style="color:#FFFFFF; text-decoration: none;" href="mailto:' . $data->email . '">' . $data->email . '</a>'
            . '</p>'
          . '</td>'
      . '</tr>'
        // Message
        . '<tr>'
          . '<td colspan="2">'
            . '<h4>Message</h4>'
            . '<p>' . $data->message . '</p>'
            . '<br/>'
          . '</td>'
        . '</tr>'
      . '</table>'
    . '</center></body></html>';
          
    return $html;
  }
?>
