<?php
    require __DIR__ . "./../DbHandler.php";
    use Db\DbHandler;

    $dbConnection = new DbHandler();

    $catId = $_GET["id"];

    $dbConnection->delete("DELETE FROM cats WHERE id = $catId");
    