<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once "./db.php";
include_once "./helpers.php";

$json = file_get_contents('php://input');
$data = json_decode($json);


if($_SERVER['REQUEST_METHOD'] == "POST")
    login($conn, $data);


function login($conn, $data){
    $email = $data->email;
    $password = $data->password;

    $sql = "select * from t_users where email=?;";
    $stmt = $conn->stmt_init();
    if(!$stmt->prepare($sql)){
        http_response_code(400);
        echo "Coś poszło nie tak, spróbuj raz jszcze.";
        exit();
    }
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if(mysqli_num_rows($result)>0){
        $user = $result->fetch_assoc();
        $isValid = password_verify($password, $user['password']);
        error_log("message");

        if(!$isValid){
            http_response_code(401);
            $object = (object) [
                'errorMessage' => 'invalid2 username or password'
                ];
            echo json_encode($object);
        } else {
            http_response_code(200);
            $user["jwt"] = jwt($user);
            echo json_encode($user);  
        }


    }
    else{
        http_response_code(401);
        $object = (object) [
            'errorMessage' => 'invalid username or password'
            ];
            // można również przekierowa do strony logowania: heder: Location ???
        echo json_encode($object);
    }
}