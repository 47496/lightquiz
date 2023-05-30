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

// connect to database
$db=connectDB();

$sql="SELECT name, admin, password FROM user WHERE email = :email ;";
$stmt = $db->prepare($sql);
$stmt->execute(["email"=>$email]);
$row = $stmt->fetchAll(PDO::FETCH_ASSOC);
// Send back answer
if($row && password_verify($password,  $row[0]["password"])){
    // password correct
    unset($row[0]["password"]); // Remove the 'password' field from the array
    sendJSON($row);
} else {
    // password or email incorrect
    $error=new stdClass();
    $error->message=["email or password wrong"];
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