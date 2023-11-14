<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "notes";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json");

//Pisanje u bazu

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $title = $data['title'];
    $text = $data['text'];

    $sql = "INSERT INTO note (title, text) VALUES ('$title', '$text')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Note saved successfully"));
    } else {
        echo json_encode(array("message" => "Error saving note: " . $conn->error));
    }
} else {
    echo json_encode(array("message" => "Invalid request method"));
}

$conn->close();
?>