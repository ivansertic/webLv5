<?php
    require __DIR__ . "./../DbHandler.php";
    use Db\DbHandler;

    $dbConnection = new DbHandler();

    $catId = $_POST["catId"];

    $wins = $_POST["wins"];
    $loss = $_POST["loss"];

    $dbConnection->update("UPDATE cats SET wins = $wins WHERE id = $catId ");
    $dbConnection->update("UPDATE cats SET loss = $loss WHERE id = $catId");