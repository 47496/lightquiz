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
    <h2>Check Answer</h2>
    <?php require_once "testCheckAnswer.php" ?>
    <h2>Check User</h2>
    <?php require_once "testCheckUser.php" ?>
    <h2>Save User</h2>
    <?php require_once "testSaveUser.php" ?>
    <h2>DeleteQuiz</h2>
    <?php require_once "testDeleteQuiz.php" ?>
    <h2>Get Leaderboard</h2>
    <?php require_once "testGetLeaderboard.php" ?>
    <h2>save Leaderboard</h2>
    <?php require_once "testSaveLeaderboard.php" ?>
    <h2>Get Quiz</h2>
    <?php require_once "testGetQuiz.php" ?>
    <h2>Save Quiz</h2>
    <?php require_once "testSaveQuiz.php" ?>
    <h2>Update Quiz</h2>
    <?php require_once "testEditQuiz.php" ?>
</body>

</html>