<?php

$allowedOrigins = [
    "https://dustin-condello.de",
    "https://www.dustin-condello.de",
];
$origin = $_SERVER["HTTP_ORIGIN"] ?? "";

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
}

header("Vary: Origin");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

$siteEmail = "info@dustin-condello.de";        // Sender
$recipient = "dustincondello@googlemail.com";  // Recipient


const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

switch ($_SERVER['REQUEST_METHOD']) {

    case 'OPTIONS':
        // Preflight request
        http_response_code(200);
        exit;

    case 'POST':
        // Read raw JSON payload
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        // Clean JSON error checking
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
            exit;
        }

        $email = $params->email ?? '';
        $name = $params->name ?? '';
        $userMessage = $params->message ?? '';
        $honeypot = $params->website ?? '';

        
        if (trim($honeypot) !== '') {
            echo json_encode(['success' => true]);
            exit;
        }

        // Basic validation
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || empty(trim($name)) || empty(trim($userMessage))) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid input data']);
            exit;
        }

        // Reject oversized payloads.
        if (mb_strlen($name) > MAX_NAME_LENGTH
            || mb_strlen($email) > MAX_EMAIL_LENGTH
            || mb_strlen($userMessage) > MAX_MESSAGE_LENGTH) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Input too long']);
            exit;
        }

        // Sanitize content
        $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
        $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
        $safeMessage = nl2br(htmlspecialchars($userMessage, ENT_QUOTES, 'UTF-8'));

        $subject = 'Website Contact Form';

        $mailBody = "
            <strong>Name:</strong> {$safeName}<br>
            <strong>Email:</strong> {$safeEmail}<br><br>
            <strong>Message:</strong><br>
            {$safeMessage}
        ";

        // Mail headers
        $headers = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: Website Kontakt <' . $siteEmail . '>'; 
        $headers[] = 'Reply-To: ' . $email;
        $headers[] = 'Return-Path: ' . $siteEmail; 

        // Send mail
        $success = mail(
            $recipient,
            $subject,
            $mailBody,
            implode("\r\n", $headers),
            '-f ' . $siteEmail 
        );

        if ($success) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Mail delivery failed']);
        }

        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit;
}