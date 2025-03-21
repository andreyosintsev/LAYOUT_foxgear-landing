<?php

    $site       = 'foxgear.ru';
    $from       = 'request@foxgear.ru';
    $to         = 'kintaro_oe@inbox.ru';

    $name       = $_POST['name'];
    $tel        = $_POST['tel'];
    $email      = $_POST['email'];
    $product    = $_POST['product'];

    $subject = mb_encode_mimeheader('Заявка с сайта FoxGear','UTF-8', 'B');

    $headers = "From: ". $from. "\r\n";
    $headers .= "Reply-To: ". $from. "\r\n";
    $headers .= "Date: ".date('D, d M Y H:i:s O')."\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=utf-8\r\n";

    $message = "<html><div>";
    $message .= 'Внимание!<br /><br />';
    $message .= 'Поступила заявка с сайта <b>'. $site .'</b>.';
    $message .= '<br />';
    $message .= 'Товар: <b>' .$product. '</b><br/>';
    $message .= '<br />';
    $message .= 'Имя: <b>' .$name. '</b><br/>';
    $message .= 'Телефон: <b>' .$tel. '</b><br/>';
    $message .= 'E-mail: <b>' .$email. '</b><br/>';
    $message .= '<br />';
    $message .= '<br />';
    $message .= 'Скорее ответьте на обращение пользователя! Быть может, это готовый покупатель.';
    $message .= "</div></html>\r\n";

    $sent = mail($to, $subject, $message, $headers);

    $result = [
        'status' => $sent ? 'success' : 'failed',
        'message' => $sent ? 'Заявка успешно отправлена' : 'Ошибка! Заявка не отправлена'
    ];

    echo json_encode($result);
