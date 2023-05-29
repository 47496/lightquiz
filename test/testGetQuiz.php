<?php
declare(strict_types=1);
require_once("../API/functions.php");

// Function to test the "getQuiz" API
try {
    // create handle for cUrl to read the answer
    $ch = curl_init('http://localhost/ovningar/Lightquiz/API/getQuiz.php');

    // get the answer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    // calls to the page that needs testing
    
    // Everything ok
    echo "<p class='info'>Test of normal input</p>";
    quizGetOk($ch);

} catch (Exception $e) {
    echo "<p class='error'>";
    echo "Something went wrong";
    echo $e->getMessage();
    echo "</p>";
}

function quizGetOk($curlHandle) {
    //make call type GET
    curl_setopt($curlHandle, CURLOPT_CUSTOMREQUEST, 'GET');

    // make call and get return string
    $responseJSON = curl_exec($curlHandle);

    //converts it into an object
    $response = json_decode($responseJSON);
    if (is_array($response)) { // if response is an array
        if (count($response) > 0) {
            echo "<p class='ok'>Get quiz works, " . count($response) . " Rows returned</p>";
        } else {
            echo "<p class='ok'>Get quiz works, No rows returned</p>";
        }
    } else {
        echo "<p class='error'>Get quiz doesnt work</p>";
    }
}

