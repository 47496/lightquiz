<?php

declare(strict_types=1);

require_once "./functions.php";

try {
// connect to database
$db=connectDB();


// Get all the questions for the quiz in a random order
$sql="SELECT id, model, picture FROM quiz ORDER BY RAND()";
$stmt = $db->query($sql);

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Put the results in an array
$retur = [];
foreach ($rows as $post) {
    $retur[] = $post;
}

// Format the quizzes as JSON and send back to the client
sendJSON($retur);

} catch (PDOException $e) {
    // Handle any database-related errors
    echo "Database Error: " . $e->getMessage();
} catch (Exception $e) {
    // Handle any other errors
    echo "Error: " . $e->getMessage();
}
?>