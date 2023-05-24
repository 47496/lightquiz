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

$id=filter_input(INPUT_POST, 'id', FILTER_SANITIZE_SPECIAL_CHARS);

if(!isset($id) || mb_strlen($id)>50) {
    $error=new stdClass();
    $error->message=["Bad input", "id is formated badly"];
    sendJSON($error, 400);
}
$id = (int) $id;
// connect to database
$db=connectDB();

// Delete Quiz from the table
$sql = "DELETE FROM `quiz` WHERE `id` = :id;";
$stmt = $db->prepare($sql);

// Send back answer
if($stmt->execute(['id'=>$id])){
    sendJSON(200);
} else {
    $error=new stdClass();
    $error->message=["Cant execute"];
    sendJSON($error, 400);
}

} catch (PDOException $e) {
    // Handle any database-related errors
    echo "Database Error: " . $e->getMessage();
} catch (Exception $e) {
    // Handle any other errors
    echo "Error: " . $e->getMessage();
}
?>