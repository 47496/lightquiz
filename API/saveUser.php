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
$name=filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
if(!isset($name) || mb_strlen($name)>20 || !checkUsername($name)) {
    $error=new stdClass();
    $error->message=["Bad input", "name is formated badly or is already in use"];
    sendJSON($error, 400); 
}
$email=filter_input(INPUT_POST, 'email', FILTER_SANITIZE_SPECIAL_CHARS);
if(!isset($email) || mb_strlen($email)>50) {
    $error=new stdClass();
    $error->message=["Bad input", "email is formated badly"];
    sendJSON($error, 400);
}
$password=filter_input(INPUT_POST, 'password', FILTER_SANITIZE_SPECIAL_CHARS);
if(!isset($password) || mb_strlen($password)>50) {
    $error=new stdClass();
    $error->message=["Bad input", "password is formated badly"];
    sendJSON($error, 400); 
}
$password=password_hash($password, PASSWORD_DEFAULT);

// connect to database
$db=connectDB();

// Get all the questions for the quiz in a random order
$sql="INSERT INTO user (name, email, password, admin) VALUES (:name, :email, :password, 0)";
$stmt = $db->prepare($sql);

// Send back answer
if($stmt->execute(['name'=>$name, 'email'=>$email, 'password'=>$password])){
    sendJSON(200);
} else {
    $error=new stdClass();
    $error->message=["Cant execute", "IDK man"];
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