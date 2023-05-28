<?php 
declare(strict_types=1);
require_once("../API/functions.php");

try {
    // create handle for cUrl to read the answer
    $ch = curl_init('http://localhost/ovningar/Lightquiz/API/checkUser.php');

    // get the answer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // calls to the page that needs testing

    // create a temporary user
    echo "<p class='info'>Test of creating a temporary user</p>";
    testTemporaryUser();

    // wrong call type (GET)
    echo "<p class='info'>Test of wrong call type</p>";
    methodGET($ch);
    
    // wrong Input parameters
    echo "<p class='info'>Test of no Input parameters</p>";
    noInputPOST($ch);
    
    // test wrong user
    echo "<p class='info'>Test of wrong user information</p>";
    wrongUserTest($ch);
    
    // test correct user
    echo "<p class='info'>Test of correct user information</p>";
    correctUserTest($ch);

} catch (Exception $e) {
    echo "<p class='error'>";
    echo "something went wrong";
    echo "$e->getMessage()";
    echo "</p>";
} finally {
    // close handle for cUrl
    curl_close($ch);
}

function testTemporaryUser() {
    $db = connectDB();
    $name = "nameTest";
    $email = "emailTest@gmail.com";
    $password = "passwordTest";
    $password=password_hash($password, PASSWORD_DEFAULT);
    $sql="INSERT INTO user (name, email, password, admin) VALUES (:name, :email, :password, 0)";
    $stmt = $db->prepare($sql);
    if($stmt->execute(['name'=>$name, 'email'=>$email, 'password'=>$password])) {
        echo "<p class='ok'> answer 200, created a temporary user</p>";
    } else {
        echo "<p class='error'> status=$status instead of expected answer 200 </p>";
    }

}

function wrongUserTest($curlHandle) {
    // connect to DB and make it possible to undo changes
    $db = connectDB();

    // make call to POST instead of GET
    curl_setopt($curlHandle, CURLOPT_POST, true);

    // Input data
    $data = ['email' => 'wrongemailTestawdad@gmail.com' , 'password' => 'wrongPasswordTestdawd'];
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $data);

    // make call and get return string
    $jsonString = curl_exec($curlHandle);

    // get status and response for call 
    $status = curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);
    $response = curl_getinfo($curlHandle, CURLINFO_PRIVATE );

    if($status===400) {
        echo "<p class='ok'> answer 400, gives expected answer</p>";
    } else {
        echo "<p class='error'> status=$status instead of expected answer 400</p>";
    }
}

function correctUserTest($curlHandle) {
    // connect to DB and make it possible to undo changes
    $db = connectDB();

    // make call to POST instead of GET
    curl_setopt($curlHandle, CURLOPT_POST, true);

    // Input data
    $data = ['email' => 'emailTest@gmail.com' , 'password' => 'passwordTest'];
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $data);

    // make call and get return string
    $jsonString = curl_exec($curlHandle);

    // get status for call
    $status = curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);

    if($status===200) {
        echo "<p class='ok'> answer 200, gives expected answer</p>";
        $db->exec("DELETE FROM `user` WHERE `email` = 'emailTest@gmail.com';");
    } else {
        echo "<p class='error'> status=$status instead of expected answer 200 </p>";
        $db->exec("DELETE FROM `user` WHERE `email` = 'emailTest@gmail.com';");
    }


}