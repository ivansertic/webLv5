<?php
    require __DIR__ . "./../DbHandler.php";

    use Db\DbHandler;

    $db = new DbHandler();

    $id = $_POST['fighter_id'];
    $cat_name = $_POST['name'];
    $cat_age = $_POST['age'];
    $cat_info = $_POST['catInfo'];
    $wins = $_POST['wins'];
    $loss = $_POST['loss'];
    $db = new DbHandler();
    $db->update("UPDATE cats SET cat_name='$cat_name',cat_age=$cat_age,cat_info='$cat_info',wins=$wins,loss=$loss WHERE id=$id");
        
    if(!($_FILES['uploadFile']['name'] == "")){
        $saveLocation="../../images/";
        $saveLocationShort="images/";

         $saveLocation=$saveLocation.basename($_FILES['uploadFile']['name']);
         $saveLocationShort=$saveLocationShort.$_FILES['uploadFile']['name'];
         move_uploaded_file($_FILES['uploadFile']['tmp_name'],$saveLocation);
         $db->update("UPDATE cats SET image_path ='$saveLocationShort' WHERE id=$id");
    }