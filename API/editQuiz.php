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
$model=filter_input(INPUT_POST, 'model', FILTER_SANITIZE_SPECIAL_CHARS);
if(!isset($model) || mb_strlen($model)>50) {
    $error=new stdClass();
    $error->message=["Bad input", "model is formated badly"];
    sendJSON($error, 400);
}

$picture = $_FILES['picture'];
if (!isset($picture) || $picture['error'] !== UPLOAD_ERR_OK) {
    $error=new stdClass();
    $error->message=["Bad input", "picture is formated badly"];
    sendJSON($error, 400);
};
$picture = file_get_contents($picture['tmp_name']);

$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT); // Retrieve the 'id' value from POST
$id = (int) $id;

// connect to database
$db=connectDB();


// Inserts quiz into the table
$sql="UPDATE quiz SET model = :model, picture = :picture WHERE id = :id";
$stmt = $db->prepare($sql);

// Send back answer
if($stmt->execute(['model'=>$model, 'picture'=>$picture, 'id'=>$id])){
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