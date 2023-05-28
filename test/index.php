<?php
declare(strict_types=1);
require_once "commonTest.php";

?>
<!DOCTYPE html>
<html>

<head>
    <title>Test site</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="test.css">
</head>

<body>
    <h1>Test Site for all API-calls</h1>
    <div class="testContainer">
        <h2>Check User</h2>
        <?php require_once "testCheckUser.php" ?>
    </div>
    <div class="testContainer">
        <h2>Save User</h2>
        <?php require_once "testSaveUser.php" ?>
    </div>
    <!--<div class="testContainer">
        <h2>Get Leaderboard</h2>
        <?php require_once "testGetLeaderboard.php" ?>
    </div>
    <div class="testContainer">
        <h2>Save Leaderboard</h2>
        <?php require_once "testSaveLeaderboard.php" ?>
    </div>-->
    <div class="testContainer">
        <h2>Get Quiz</h2>
        <?php require_once "testGetQuiz.php" ?>
    </div>
    <div class="testContainer">
        <h2>Check Answer</h2>
        <?php require_once "testCheckAnswer.php" ?>
    </div>
    <div class="testContainer">
        <h2>Save Quiz</h2>
        <?php require_once "testSaveQuiz.php" ?>
    </div>
    <div class="testContainer">
        <h2>DeleteQuiz</h2>
        <?php require_once "testDeleteQuiz.php" ?>
    </div>
    <div class="testContainer">
        <h2>Update Quiz</h2>
        <?php require_once "testEditQuiz.php" ?>
    </div>
</body>


</html>