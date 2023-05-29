<?php 
declare(strict_types=1);
require_once("../API/functions.php");

try {
    // create handle for cUrl to read the answer
    $ch = curl_init('http://localhost/ovningar/Lightquiz/API/saveQuiz.php');

    // get the answer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // calls to the page that needs testing

    // wrong call type (GET)
    echo "<p class='info'>Test of wrong call type</p>";
    methodGET($ch);
    
    // wrong Input parameters
    echo "<p class='info'>Test of no Input parameters type</p>";
    noInputPOST($ch);

    // Everything ok
    echo "<p class='info'>Test of normal input</p>";
    quizSaveOk($ch);

} catch (Exception $e) {
    echo "<p class='error'>";
    echo "something went wrong";
    echo $e->getMessage();
    echo "</p>";
} finally {
    // close handle for cUrl
    curl_close($ch);
}

function quizSaveOk($curlHandle) {
    // connect to DB and make it possible to undo changes
    $db = connectDB();

    // make call to POST instead of GET
    curl_setopt($curlHandle, CURLOPT_POST, true);

    // Input data
    $data = array(
        'model' => 'modelTest',
        'picture' => new CURLFile("media/test.png")
    );
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $data);

    // make call and get return string
    $jsonString = curl_exec($curlHandle);
    // get status for call
    $status = curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);

    if($status===200) {
        echo "<p class='ok'> answer 200, gives expected answer</p>";
        $db->exec("DELETE FROM `quiz` WHERE `model` = 'modelTest';");
    } else {
        echo "<p class='error'> status=$status instead of expected answer 200 </p>";
    }
}