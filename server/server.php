<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "notes";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');

// Upis u bazu

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

// Citanje iz baze

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM note";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $notes = array();

        while ($row = $result->fetch_assoc()) {
            $notes[] = $row;
        }
        echo json_encode($notes);
    } else {
        echo json_encode(array("message" => "No notes found"));
    }
}

$conn->close();
?>