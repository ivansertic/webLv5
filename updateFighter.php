<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zadatak 1</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
</head>

<body>
    <div class="container d-flex flex-column align-items-center col-5">
        <h1>Update Fighter</h1>
    </div>
    <div class="container d-flex flex-column align-items-center col-5">
        <form>
            <div class = "row d-flex flex-column align-items-center side">
                <label for="fighter_id"> Fighter Id </label>
                <input name="fighter_id" id="fighter_id"  value=<?=$_GET['id']?> readonly>
            </div>
            <div class = "row d-flex flex-column align-items-center side">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="row d-flex flex-column align-items-center side">
                <label for="age">Age</label>
                <input type="number" id="age" name="age" required>
            </div>
            <div class="row d-flex flex-column align-items-center side">
                <label for="catInfo">Cat info</label>
                <input type="text" id="catInfo" name="catInfo" required>
            </div>
            <div class="row d-flex flex-column align-items-center side">
                <label for="wins">Wins</label>
                <input type="number" id="wins" name="wins" required>
            </div>
            <div class="row d-flex flex-column align-items-center side">
                <label for="loss">Loss</label>
                <input type="number" id="loss" name="loss" required>
            </div>
            <div class="row d-flex flex-column align-items-center">
                <label for="uploadFile">Cat Image</label>
                <input id="uploadFile" name="uploadFile" type="file">
                <p id="imagePath">tekst</p>
            </div>
            <br>
            <div id= "buttons" class="container d-flex flex-column align-items-center side col-5">
                <div class = "row d-flex flex-column align-items-center side">
                    <input type="submit" id="submit" name="submit" value="Submit">
                    <input type="button" id="cancle" name="cancle" value="Cancle" onclick="location.href = 'index.php';">
                    <input type="button" id="delete" name="delete" value="Delete">
                </div>
            </div>
        </form>
    </div>
    <?php
        require "./controller/DbHandler.php";
        use Db\DbHandler;

        $database = new DbHandler();
        $id = $_GET['id'];

        $pickedCat = $database->select("SELECT * FROM cats WHERE id = $id");
        $input = $pickedCat->fetch_assoc();

        $name = $input["cat_name"];
        $age = $input["cat_age"];
        $info = $input["cat_info"];
        $wins = $input["wins"];
        $loss = $input["loss"];
        $image_path = $input["image_path"];

        echo "
        <script>
                document.getElementById('name').value = '$name';
                document.getElementById('age').value  = '$age';
                document.getElementById('catInfo').value  = '$info';
                document.getElementById('wins').value  = '$wins';
                document.getElementById('loss').value  = '$loss';
                document.getElementById('imagePath').textContent  = '$image_path';
        </script>" 
        
    ?>
    <script src="./src/updateFighter.js"></script>
    <script src="./src/deleteFighter.js"></script>
</body>

</html>