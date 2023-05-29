<?php

declare(strict_types=1);
require_once "./functions.php";
header('Content-Type: application/json');

try {
if($_SERVER['REQUEST_METHOD']!=='GET'){
    $error=new stdClass();
    $error->message=["Wrong method", "site should get called by GET"];
    sendJSON($error, 405);
}

// connect to database
$db=connectDB();


// Get all the questions for the quiz in a random order
$sql="SELECT name, MAX(score) AS score
FROM leaderboard
GROUP BY name
ORDER BY score DESC
LIMIT 10
";
$stmt = $db->query($sql);

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$retur = [];
// Put the results in an array
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