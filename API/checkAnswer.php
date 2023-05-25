<?php

declare(strict_types=1);

require_once "./functions.php";

try {

// Check in(put data and clean
// Control method
if($_SERVER['REQUEST_METHOD']!=='POST'){
    $error=new stdClass();
    $error->message=["Wrong method", "site should get called my POST"];
    sendJSON($error, 405);
}

// Read input data
$model=filter_input(INPUT_POST, 'model', FILTER_SANITIZE_SPECIAL_CHARS);
if(!isset($model) || mb_strlen($model)>50) {
    $error=new stdClass();
    $error->message=["Bad input", "model is formated badly"];
    sendJSON($error, 400);
}


$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT); // Retrieve the 'id' value from POST
$id = (int) $id;

// connect to database
$db=connectDB();

// Get all the questions for the quiz in a random order
$sql="SELECT model FROM quiz WHERE model = :model AND id = :id;";
$stmt = $db->prepare($sql);
$stmt->execute(['model'=>$model, 'id'=>$id]);
$answer = $stmt->fetchAll(PDO::FETCH_ASSOC);
// Send back answer
if(!$answer==""){
    $out=true;
    sendJSON($out, 200);
} else {
    $out=false;
    sendJSON($out, 200);
}

} catch (PDOException $e) {
    // Handle any database-related errors
    echo "Database Error: " . $e->getMessage();
} catch (Exception $e) {
    // Handle any other errors
    echo "Error: " . $e->getMessage();
}
?>