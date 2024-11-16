<?php
// Set content type to JSON
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['answer'])) {
    $answer = $data['answer'];

    // Example email sending setup (configure accordingly)
    $to = "your-email@example.com";
    $subject = "User Response";
    $message = "The user selected: $answer";
    $headers = "From: noreply@example.com";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Email sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to send email."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid input."]);
}
?>
