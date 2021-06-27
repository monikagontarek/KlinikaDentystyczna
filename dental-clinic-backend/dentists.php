<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once "./db.php";
include_once "./helpers.php";
// model ten będzie wdrażał wszytskie metodu CRUD zaimplementowane przez frontend
$json = file_get_contents('php://input');
$data = json_decode($json);


if($_SERVER['REQUEST_METHOD'] == "GET")
    getDentists($conn, $data);


function getDentists($conn, $data){
    // $dentistName = $data->dentistName;
    // $pwd = $data->password;

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

    for($i = 0; $i < count($dentists); ++$i) {
        $dentists[$i]['reservations'] = array();
        $sql = "select * from t_event e JOIN t_users u on e.id_user = u.id where e.id_dent = ?";
        if(!$stmt->prepare($sql)){
            http_response_code(400);
            echo "Coś posżło nie tak, spróbuj raz jszcze.";
            exit();
        }
        $stmt->bind_param('s', $dentists[$i]['id']);
        $stmt->execute();
        $result = $stmt->get_result();
        $reservations = $result->fetch_all(MYSQLI_ASSOC);
        $dentists[$i]['reservations'] = $reservations ;

    };



    $dentistsMapped = array_map(
        function($dentist){ 
            
            $reservationsMapped = array_map(
                function($reservation){        
                    $reservationMapped = (object) [
                        'id' => $reservation['id'],
                        'title' => $reservation['email'],
                        'start' => $reservation['data_start']
                    ];
        
                    return $reservationMapped;
                }, 
            $dentist['reservations']);


            $dentistMapped = (object) [
                'id' => $dentist['id'],
                'firstName' => $dentist['name'],
                'lastName' => $dentist['surname'],
                'pesel' => $dentist['pesel'],
                'email' => $dentist['email'],
                'phone' => $dentist['phone'],
                'reservations' => $reservationsMapped
            ];


            return $dentistMapped;
        }, 
    $dentists);



    echo json_encode($dentistsMapped);
    http_response_code(200);



    
}