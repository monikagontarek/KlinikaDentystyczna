<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once "./db.php";
include_once "./helpers.php";
// model ten będzie wdrażał wszytskie metodu CRUD zaimplementowane przez frontend
$json = file_get_contents('php://input');
$data = json_decode($json);


if($_SERVER['REQUEST_METHOD'] == "POST")
    registration($conn, $data);


function registration($conn, $data){
    $id= gen_uuid();
    $name = $data->firstName;
    $surname = $data->lastName;
    $pesel = $data->pesel;
    $email = $data->mail;
    $phone = $data->phone;
    $password = $data->password;
    $id_permissions=3;

    $password = password_hash($password, PASSWORD_DEFAULT);

    $contains1 = "@admin.pl";
    $contains2 = "@denti.pl";

    if(isset($data->email)&& preg_match("/\b($contains1)\b/", $email)){
        $id_permissions = 1;
    }
    else if(isset($data->email)&& preg_match("/\b($contains2)\b/", $email)){
        $id_permissions = 2;
    }
    else{
        $id_permissions= 3;
    }
  

    $sql = "Insert into t_users (id, name, surname, pesel, email, phone, password, id_permissions) values (?,?,?,?,?,?,?,?);";
    $stmt = $conn->stmt_init();
    if(!$stmt->prepare($sql)){
        http_response_code(400);
        echo "Coś posżło nie tak, spróbuj raz jszcze.";
        exit();
    }
    $stmt->bind_param('ssssssss', $id, $name, $surname, $pesel, $email, $phone, $password, $id_permissions);
    $stmt->execute();
    $result = $stmt->get_result();
    if($stmt->affected_rows > 0){
       
        // affected_rows - pobiera liczbe zmienionych wierszy w poprzedniej operacji MySql
        // pobierz wiersz wyników jako tablicę asocjacyjną 
        // $res_body = $result->fetch_assoc();
        http_response_code(200);
        // zwraca reprezentację wartości w postaci JSON
        
        exit();
    }else{
        http_response_code(400);
        echo "Rejestracja nie powiodła się";
        exit();
    }

    // if(mysqli_num_rows($result)>0){
    //     $res_body = $result->fetch_assoc();
        
    //     error_log("message");

    //     if(!$isValid){
    //         http_response_code(401);
    //         $object = (object) [
    //             'errorMessage' => 'invalid2 username or password'
    //             ];
    //         echo json_encode($object);
    //     } else {
    //         http_response_code(200);

    //         echo json_encode($res_body);  
    //     }


    // }
    // else{
    //     http_response_code(401);
    //     $object = (object) [
    //         'errorMessage' => 'invalid username or password'
    //         ];
    //     echo json_encode($object);
    // }
}