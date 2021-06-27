<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once "./db.php";
include_once "./helpers.php";



if($_SERVER['REQUEST_METHOD'] == "GET")
    getDentists($conn);


function getDentists($conn){

    $currentUser = getCurrentUser();
    if($currentUser->id_permissions != 1 ) {
        http_response_code(401);
        exit();
    }


    $sql = "select * from t_users where id_permissions = 2";
    $stmt = $conn->stmt_init();
    if(!$stmt->prepare($sql)){
        http_response_code(400);
        echo "Coś posło nie tak, spróbuj raz jszcze.";
        exit();
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    $dentists = $result->fetch_all(MYSQLI_ASSOC);
    
    
    
    
    $dentistsMapped = array_map(
        function($dentist){ 
            

            $dentistMapped = (object) [
                'id' => $dentist['id'],
                'firstName' => $dentist['name'],
                'lastName' => $dentist['surname'],
                'pesel' => $dentist['pesel'],
                'email' => $dentist['email'],
                'phone' => $dentist['phone']
            ];


            return $dentistMapped;
        }, 
    $dentists);
    
    echo json_encode($dentistsMapped);
    http_response_code(200);



    
}