<?php 
declare(strict_types=1);
require_once("../API/functions.php");

try {
    // create handle for cUrl to read the answer
    $ch = curl_init('http://localhost/ovningar/Lightquiz/API/checkAnswer.php');

    // get the answer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // calls to the page that needs testing

    // create a temporary quiz
    echo "<p class='info'>Test of creating a temporary quiz</p>";
    testTemporaryQuiz();

    // wrong call type (GET)
    echo "<p class='info'>Test of wrong call type</p>";
    methodGET($ch);
    
    // wrong Input parameters
    echo "<p class='info'>Test of no Input parameters type</p>";
    noInputPOST($ch);

    // test wrong answer
    echo "<p class='info'>Test of wrong quiz answer</p>";
    wrongAnswerTest($ch);
    
    // test correct answer
    echo "<p class='info'>Test of correct quiz answer</p>";
    correctAnswerTest($ch);

} catch (Exception $e) {
    echo "<p class='error'>";
    echo "something went wrong";
    echo "$e->getMessage()";
    echo "</p>";
} finally {
    // close handle for cUrl
    curl_close($ch);
}

function wrongAnswerTest($curlHandle) {
    // connect to DB and make it possible to undo changes
    $db = connectDB();

    // make call to POST instead of GET
    curl_setopt($curlHandle, CURLOPT_POST, true);

    // Input data
    $data = ['model' => 'wrongModelTestawad' , 'picture' => 'wrongPictureTestdawd'];
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $data);

    // make call and get return string
    $jsonString = curl_exec($curlHandle);

    // get status and response for call 
    $status = curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);
    $response = curl_getinfo($curlHandle, CURLINFO_PRIVATE );

    if($status===200 && $jsonString === "false") {
        echo "<p class='ok'> answer 200 and output false, gives expected answer</p>";
    } else {
        echo "<p class='error'> status=$status & outout=$jsonString instead of expected answer 200 and output false </p>";
    }
}

function correctAnswerTest($curlHandle) {
    // connect to DB and make it possible to undo changes
    $db = connectDB();

    // make call to POST instead of GET
    curl_setopt($curlHandle, CURLOPT_POST, true);

    // Input data
    $data = ['model' => 'modelTest' , 'picture' => 'pictureTest'];
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
        $db->exec("DELETE FROM `quiz` WHERE `model` = 'modelTest';");
    }
}
