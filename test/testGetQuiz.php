<?php
declare(strict_types=1);
require_once("../API/functions.php");

// Function to test the "getQuiz" API
function testGetQuiz() {
    try {
        // create handle for cUrl to read the answer
        $ch = curl_init('http://localhost/ovningar/Lightquiz/API/saveQuiz.php');
    
        // get the answer as a string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
        // calls to the page that needs testing
        
        echo "<p class='info'>Test of wrong call type</p>";
        // Test case 1 - Wrong call type (GET)
        methodGET();
        
        echo "<p class='info'>Test of no Input parameters type</p>";
        // Test case 2 - Wrong Input parameters
        noInputPOST();

        echo "<p class='info'>Test of normal input</p>";
        // Test case 3 - Everything ok
        quizGetOk();
    } catch (Exception $e) {
        echo "<p class='error'>";
        echo "Something went wrong";
        echo $e->getMessage();
        echo "</p>";
    }
}

// Function to test the API with normal input
function quizGetOk() {
    // Simulate a valid request with normal input parameters

    // Call the API function
    getQuiz();
}

// Call the function to test the "getQuiz" API
testGetQuiz();
?>
