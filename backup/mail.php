<?php
  header('Access-Control-Allow-Origin: *', false);

  $debug = false;
  $host = "rafigeorge.com";
  $recipient = "hello@" . $host;
  $email_title = "Hello";

  $referrer = "";
  if ($debug) {
    $referrer = "notempty";
  } else {
    preg_match('/(https?:\/\/)?(www\.)?' . $host . '/', $_SERVER["HTTP_REFERER"], $referrer);
  }

  $data = file_get_contents('php://input');
  $data = json_decode($data);

  if($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($referrer)) {
    header('Location: ' . getFullURLFromHost($host));
  } else if (isset($data->name) && isset($data->email)) {
    $response = "";

    $data->name = check_input($data->name);
    $data->email = check_input($data->email);
    $email_to = $recipient;
    $email_subject = "Hello - " . $data->name;
    $data->message = check_input($data->message);

    // Data Validation
    if(!preg_match('/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/', $data->email)) {
      $response = 'The Email Address you entered does not appear to be valid.';
    } else if(strlen(name) < 1) {
      $response = 'The name you entered does not appear to be valid.';
    } else if(strlen($data->message) < 1) {
      $response = 'The message you entered do not appear to be valid.';
    }

    if(strlen($response) == 0) {
      $headers = 'From: '. $data->name .' <'.$data->email.">\r\n".
      'Reply-to: '. $data->name .' <' . $data->email . ">\r\n".
      "MIME-Version: 1.0\r\n".
      "Content-Type: text/html; charset=ISO-8859-1\r\n".
      "X-Mailer: PHP/" . phpversion();
      $email_message = create_email($data, $email_title);

      if (mail($email_to, $email_subject, $email_message, $headers)) {
        $response = "success";
      } else {
        $response = "error";
      }
    }
  } else {
    $response = "error";
  }

  if (strlen($response) > 0) {
    // important to return data as a string/object
    header('Content-Type: application/json');
    echo json_encode($response);
  }

  function check_input($string) {
    if (!isset($string)) {
      $string = "";
    }
    // $bad = array("content-type","bcc:","to:","cc:","href");
    // $string str_replace($bad, "", $string);
    $string = trim($string);
    $string = stripslashes($string);
    $string = htmlspecialchars($string);
    return $string;
  }

  function getFullURLFromHost($host) {
    $h = $host;
    if (!preg_match('/https?:\/\//', $host)) {
      $h = "http://www." . $host;
    }
    return $h;
  }

  function create_email($data, $email_title) {
    return '<html><head>'
          . '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">'
          . '</head><body><center>'
          . '<div style="display: none; max-height: 0px; overflow: hidden;">'
            . $data->message
          . '</div>'
          . '<div style="display: none; max-height: 0px; overflow: hidden;">'
            . '&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;'
          . '</div>'
          . '<table cellpadding="0" cellspacing="0" width="550px" style="min-height: 550px; background-color: #1d242a; color: #fff; font-size: 16px; font-family: \'Trebuchet MS\', Helvetica, sans-serif; text-align: justify; text-justify: inter-word; padding: 50px;">'
          . '<tr style="width: 450px; height: 30px;">'
            . '<td style="padding-bottom: 10px; border-bottom: 1px solid #FFF; color: #ed4933; display: inline-block; font-weight: bold; font-size: 20px;">'
              . $email_title
            . '</td>'
          . '</tr>'
          . '<tr style="width: 450px;">'
            . '<td style="padding: 0;">'
              . '<h4 style="margin: 0; color:#ed4933 !important;">Name</h4>'
              . '<p style="line-height: 1.5; margin-bottom: 0; margin-top: 10px;">' . $data->name . '</p>'
              . '<br/>'
              . '<h4 style="margin: 0; color:#ed4933 !important;">E-mail</h4>'
              . '<p style="line-height: 1.5;">'
                . '<a style="color:#FFF; text-decoration: none;" href="mailto:' . $data->email . '">' . $data->email . '</a>'
              . '</p>'
              . '<br/>'
              . '<h4 style="margin: 0; color:#ed4933 !important;">Message</h4>'
              . '<p style="line-height: 1.5;">' . $data->message . '</p>'
              . '<br/>'
             . '</td>'
          . '</tr>'
         . '</table>'
       . '</center></body></html>';
  }
?>
