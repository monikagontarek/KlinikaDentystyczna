<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once "./db.php";
include_once "./helpers.php";
// model ten będzie wdrażał wszytskie metodu CRUD zaimplementowane przez frontend
$json = file_get_contents('php://input');
$data = json_decode($json);


if($_SERVER['REQUEST_METHOD'] == "GET")
    getEvents($conn, $data);


function getEvents($conn, $data){
    $id_dent = $data->id_dent;
    
    $sql = "select * from t_event where id_dent = ?";
    $stmt = $conn->stmt_init();
    if(!$stmt->prepare($sql)){
        http_response_code(400);
        echo "Coś posło nie tak, spróbuj raz jszcze.";
        exit();
    }
    $stmt->execute();
    $result = $stmt->get_result();

    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    http_response_code(200);



    
}