<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once "./db.php";
include_once "./helpers.php";

$json = file_get_contents('php://input');
$data = json_decode($json);


if($_SERVER['REQUEST_METHOD'] == "POST")
    createEvent($conn, $data);


function createEvent($conn, $data){
    $currentUser = getCurrentUser();


    $dentistId = $data->dentistId;
    $eventStart = $data->eventStart;
    // $d = DateTime::createFromFormat('Y-m-d H:i', $eventStart);
    // $eventStartTimestamp = $d->getTimestamp();


    // echo json_encode($currentUser);
    // http_response_code(200);

    $id= gen_uuid();
    $sql = "Insert into t_event (id, id_dent, id_user, data_start, data_end) values (?,?,?,?,?);";
    $stmt = $conn->stmt_init();
    if(!$stmt->prepare($sql)){
        http_response_code(400);
        echo "Coś posżło nie tak, spróbuj raz jszcze.";
        exit();
    }
    $stmt->bind_param('sssss',  $id, $dentistId, $currentUser->id,$eventStart, $eventStart);
    $stmt->execute();
    if($stmt->affected_rows > 0){
        // affected_rows - pobiera liczbe zmienionych wierszy w poprzedniej operacji MySql
        // pobierz wiersz wyników jako tablicę asocjacyjną 
        http_response_code(200);
        // zwraca reprezentację wartości w postaci JSON
        exit();
    }else{
        http_response_code(400);
        echo "Dodanie nowego eventu nie powiodło się";
        exit();
    }

}