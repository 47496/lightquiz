<?php 
declare(strict_types=1);
require_once("../API/functions.php");

try {
    // create handle for cUrl to read the answer
    $ch = curl_init('http://localhost/ovningar/Lightquiz/API/saveUser.php');

    // get the answer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // calls to the page that needs testing

    // wrong call type (GET)
    echo "<p class='info'>Test of wrong call type</p>";
    methodGET($ch);
    
    // wrong Input parameters
    echo "<p class='info'>Test of no Input parameters type</p>";
    noInputPOST($ch);
        
    // too long name
    echo "<p class='info'>Test of 20+ character name</p>";
    userSavelongName($ch);

    // Everything ok
    echo "<p class='info'>Test of normal input</p>";
    userSaveOk($ch);

} catch (Exception $e) {
    echo "<p class='error'>";
    echo "something went wrong";
    echo $e->getMessage();
    echo "</p>";
} finally {
    // close handle for cUrl
    curl_close($ch);
}

function userSavenoInput($curlHandle) {
    // make call to POST instead of GET
    curl_setopt($curlHandle, CURLOPT_POST, true);

    // make call and get return string
    $jsonString = curl_exec($curlHandle);

    // get status for call
    $status = curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);

    if($status===400) {
        echo "<p class='ok'> answer 400, gives expected answer</p>";
    } else {
        echo "<p class='error'> status=$status instead of expected answer 400 </p>";
    }
}


function userSaveLongName($curlHandle) {
    // make call to POST instead of GET
    curl_setopt($curlHandle, CURLOPT_POST, true);

    // Input data
    $data = ['name' => 'TooLooooongNammeeeeeeeee' , 'email' => 'test@gmail.com', 'password' => 'password'];
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $data);

    // make call and get return string
    $jsonString = curl_exec($curlHandle);

    // get status for call
    $status = curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);

    if($status===400) {
        echo "<p class='ok'> answer 400, gives expected answer</p>";
    } else {
        echo "<p class='error'> status=$status instead of expected answer 400 </p>";
    }
}

function userSaveOk($curlHandle) {

    // connect to DB and make it possible to undo changes
    $db = connectDB();

    // make call to POST instead of GET
    curl_setopt($curlHandle, CURLOPT_POST, true);

    // Input data
    $data = ['name' => 'goodName' , 'email' => 'test@gmail.com', 'password' => 'password'];
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $data);

    // make call and get return string
    $jsonString = curl_exec($curlHandle);

    // get status for call
    $status = curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);

    if($status===200) {
        echo "<p class='ok'> answer 200, gives expected answer</p>";
        $db->exec("DELETE FROM `user` WHERE `email` = 'test@gmail.com';");
    } else {
        echo "<p class='error'> status=$status instead of expected answer 200 </p>";
    }

}