<?php

declare(strict_types=1);

// connect to database
$dsn = 'mysql:dbname=lightquiz;host=localhost';$dbUser='root';$dbPassword='';
$db = new PDO($dsn, $dbUser, $dbPassword);


// Get all the questions for the quiz in a random order
$stmt = $db->query('SELECT id, model, picture FROM quiz ORDER BY RAND()');
$result = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all rows as an associative array

// Put the results in an array
$retur = [];
foreach ($result as $row) {
    $post = new stdClass();
    $post->id = $row['id'];
    $post->model = $row['model'];
    $post->picture = $row['picture'];
    $retur[] = $post;
}

// Format the quizzes as JSON and send back to the client
header('Content-Type: application/json');
echo json_encode($retur);
?>