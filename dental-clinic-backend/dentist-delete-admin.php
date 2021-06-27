<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once "./db.php";
include_once "./helpers.php";

$json = file_get_contents('php://input');
$data = json_decode($json);


if($_SERVER['REQUEST_METHOD'] == "DELETE")
    deleteDentist($conn, $data);


function deleteDentist($conn, $data){

    $currentUser = getCurrentUser();
    if($currentUser->id_permissions != 1 ) {
        http_response_code(401);
        exit();
    }


    
    $id = $data->id;
// zapytanie do sql działą prawidłowo sprawdzałam w bazie
    $sql = "delete  from t_users where id=?;";
    $stmt = $conn->stmt_init();
    if(!$stmt->prepare($sql)){
        http_response_code(400);
        echo "Coś poszło nie tak, spróbuj raz jszcze.";
        exit();
    }
    $stmt->bind_param('s', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if($stmt->affected_rows > 0){
        
        http_response_code(200); 
        exit();
    }else{
        http_response_code(400);
        echo "Usuwanie nie powiodłao się";
        exit();
    }
    
}