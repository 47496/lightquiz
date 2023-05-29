<?php

declare(strict_types=1);

require_once "./functions.php";

try {
// Check in(put data and clean
// Control method
if($_SERVER['REQUEST_METHOD']!=='POST'){
    $error=new stdClass();
    $error->message=["Wrong method", "site should get called by POST"];
    sendJSON($error, 405);
}

// Read input data
$name=filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
if(!isset($name) || mb_strlen($name)>50) {
    $error=new stdClass();
    $error->message=["Bad input", "name is formated badly"];
    sendJSON($error, 400);
}

$score = filter_input(INPUT_POST, 'score', FILTER_VALIDATE_INT); // Retrieve the 'score' value from POST
$score = (int) $score;

// connect to database
$db=connectDB();


// Inserts leaderboard into the table
$sql="INSERT INTO leaderboard (name, score) VALUES (:name,:score)";
$stmt = $db->prepare($sql);

// Send back answer
if($stmt->execute(['name'=>$name, 'score'=>$score])){
    sendJSON(200);
} else {
    $error=new stdClass();
    $error->message=["Cant execute"];
    sendJSON($error, 400);
}

} catch (PDOException $e) {
    // Handle any database-related errors
    $error->message=["Database Error: " . $e->getMessage()];
    sendJSON($error, 400);
} catch (Exception $e) {
    // Handle any other errors
    $error->message=["Error: " . $e->getMessage()];
    sendJSON($error, 400);
}
?>