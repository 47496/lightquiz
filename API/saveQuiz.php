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
$picture=filter_input(INPUT_POST, 'picture', FILTER_SANITIZE_SPECIAL_CHARS);
if(!isset($picture) || mb_strlen($picture)>50) {
    $error=new stdClass();
    $error->message=["Bad input", "Picture is formated badly"];
    sendJSON($error, 400);
}
    
// connect to database
$db=connectDB();


// Get all the questions for the quiz in a random order
$sql="INSERT INTO quiz (model, picture) VALUES (:model,:picture)";
$stmt = $db->prepare($sql);

if($stmt->execute(['model'=>$model, 'picture'=>$picture])){
    $id=$db->lastInsertId();
    sendJSON($id);
} else {
    $error=new stdClass();
    $error->message=["Cant execute", "IDK man"];
    sendJSON($error, 400);
}


// Send back answer

} catch (PDOException $e) {
    // Handle any database-related errors
    echo "Database Error: " . $e->getMessage();
} catch (Exception $e) {
    // Handle any other errors
    echo "Error: " . $e->getMessage();
}
?>