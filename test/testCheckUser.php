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
    methodGET($ch);
    
    // wrong Input parameters
    echo "<p class='info'>Test of no Input parameters type</p>";
    noInputPOST($ch);
    

} catch (Exception $e) {
    echo "<p class='error'>";
    echo "something went wrong";
    echo "$e->getMessage()";
    echo "</p>";
} finally {
    // close handle for cUrl
    curl_close($ch);
}
