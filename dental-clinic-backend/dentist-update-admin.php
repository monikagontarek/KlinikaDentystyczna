<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once "./db.php";
include_once "./helpers.php";

$json = file_get_contents('php://input');
$data = json_decode($json);


if($_SERVER['REQUEST_METHOD'] == "PUT")
    updateDentist($conn, $data);


function updateDentist($conn, $data){
    
    $name = $data->name;
    $surname = $data->surname;
    $pesel = $data->pesel;
    $email = $data->email;
    $phone = $data->phone;
    $password = $data->password;
    $id_permissions = $data->id_permissions;
   


    $sql = "update t_users SET  name =?, surname =?, pesel =?, email =?, phone =?, password =?, id_permissions =? where email = ?;";
    
  
    $stmt = $conn->stmt_init();
    if(!$stmt->prepare($sql)){
        http_response_code(400);
        echo "Coś poszło nie tak, spróbuj raz jszcze.";
        exit();
    }
    $stmt->bind_param('ssssssss', $name, $surname, $pesel, $email, $phone, $password, $id_permissions, $email);

    if($stmt->execute()){
        
        // $res_body = $result->fetch_assoc();
        http_response_code(200); 
        // echo json_encode($res_body); 
        
        exit();
    }else{
        http_response_code(400);
        echo "Aktualizacja danych dentysty nie powiodłao się";
        exit();
    }
    
}