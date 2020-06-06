<?php
    require __DIR__ . "./../DbHandler.php";
    use Db\DbHandler;

    $dbConnection = new DbHandler();

    $id = $_POST['fighter_id'];
    $cat_name = $_POST['name'];
    $cat_age = $_POST['age'];
    $cat_info = $_POST['catInfo'];
    $wins = $_POST['wins'];
    $loss = $_POST['loss'];

    $dbConnection->delete("DELETE FROM cats WHERE id = $id");
    