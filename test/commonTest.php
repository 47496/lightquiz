<?php
declare(strict_types=1);

function methodGET($curlHandle) {
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

function noInputPOST($curlHandle) {
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

function testTemporaryQuiz() {
    $db = connectDB();
    $model = "modelTest";
    $picture = "pictureTest";
    $sql="INSERT INTO quiz (model, picture) VALUES (:model,:picture)";
    $stmt = $db->prepare($sql);
    if($stmt->execute(['model'=>$model, 'picture'=>$picture])) {
        echo "<p class='ok'> answer 200, created a temporary quiz</p>";
        $id=$db->lastInsertId();
        return $id;
    } else {
        echo "<p class='error'> status=$status instead of expected answer 200 </p>";
    }
}
