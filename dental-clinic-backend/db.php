<?php
$host="localhost:3306";
$db = "id16963265_denti";
$user = "root";
$pwd = "root";


$conn = new mysqli($host, $user, $pwd, $db);

if($conn->connect_errno){
    http_response_code(400);
    header('Content_type: text/plain');
    echo $conn->connect_error;
    exit();
}

