<?php 
declare(strict_types=1);

try {
    // create handle for cUrl to read the answer
    $ch = curl_init('http://localhost/ovningar/Lightquiz/API/checkUser.php');

    // get the answer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // calls to the page that needs testing

    // create a temporary user
    echo "<p class='info'>Test of creating a temporary user</p>";

    // wrong call type (GET)
    echo "<p class='info'>Test of wrong call type</p>";
    wrongMethod($ch);
    
    // wrong Input parameters
    echo "<p class='info'>Test of no Input parameters type</p>";
    noInput($ch);
    

} catch (Exception $e) {
    echo "<p class='error'>";
    echo "something went wrong";
    echo "$e->getMessage()";
    echo "</p>";
} finally {
    // close handle for cUrl
    curl_close($ch);
}

function wrongMethod($curlHandle) {
    // make call and get return string
    $jsonString = curl_exec($curlHandle);

    // get status for call
    $status = curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);

    if($status===405) {
        echo "<p class='ok'> answer 405, gives expected answer</p>";
    } else {
        echo "<p class='error'> status=$status instead of expected answer 405 </p>";
    }
}

function noInput($curlHandle) {
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