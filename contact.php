<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include "../database/db.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once __DIR__ . '/database/db.php';

    $name = htmlspecialchars(trim($_POST["name"] ?? ''));
    $email = htmlspecialchars(trim($_POST["email"] ?? ''));
    $subject = htmlspecialchars(trim($_POST["subject"] ?? ''));
    $message = htmlspecialchars(trim($_POST["message"] ?? ''));

    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        echo "error: " . $conn->error;
        exit;
    }
    $stmt->bind_param("ssss", $name, $email, $subject, $message);

    if ($stmt->execute()) {
        $to = "geraldotieno49@gmail.com";
        $headers = "From: $email\r\nReply-To: $email\r\n";
        $body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage:\n$message";
        if (mail($to, $subject, $body, $headers)) {
            echo "success";
        } else {
            echo "error: mail failed";
        }
    } else {
        echo "error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request.";
}


