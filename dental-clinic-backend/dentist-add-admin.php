<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once "./db.php";
include_once "./helpers.php";
// model ten będzie wdrażał wszytskie metodu CRUD zaimplementowane przez frontend
$json = file_get_contents('php://input');
$data = json_decode($json);


if($_SERVER['REQUEST_METHOD'] == "POST")
    addDentist($conn, $data);


function addDentist($conn, $data){

    $currentUser = getCurrentUser();
    if($currentUser->id_permissions != 1 ) {
        http_response_code(401);
        exit();
    }

    
    
    $id= gen_uuid();
    $name = $data->firstName;
    $surname = $data->lastName;
    $pesel = "";
    $email = $data->email;
    $phone = "";
    $password = $data->password;
    $id_permissions=2;

    $password = password_hash($password, PASSWORD_DEFAULT);


    $sql = "Insert into t_users (id, name, surname, pesel, email, phone, password, id_permissions) values (?,?,?,?,?,?,?,?);";
    $stmt = $conn->stmt_init();
    if(!$stmt->prepare($sql)){
        http_response_code(400);
        echo "Coś poszło nie tak, spróbuj raz jszcze.";
        exit();
    }
    $stmt->bind_param('ssssssss', $id, $name, $surname, $pesel, $email, $phone, $password, $id_permissions);
    $stmt->execute();
    $result = $stmt->get_result();
    if($stmt->affected_rows > 0){
        http_response_code(200);
        exit();
    }else{
        http_response_code(400);
        echo "Dodanie dentysty do bazy, nie powiodło się";
        exit();
    }

       
}