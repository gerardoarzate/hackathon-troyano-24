<?php
include 'Controlador.php';


header('Content-Type: application/json');


$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$auth=false;
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $auth = $_SERVER['HTTP_AUTHORIZATION'];
}


$parts = explode('/', $uri);
$endpoint = $parts[1];

switch ($endpoint) {
    case 'conductores':
        $con = Conectar();
            $result = Ejecutar($con, "SELECT * FROM conductores");
            $conductores = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $conductores[] = $row;
            }
            Desconectar($con);
            http_response_code(200);
            echo json_encode($conductores);
        break;
    case 'familiares':
        $con = Conectar();
            $result = Ejecutar($con, "SELECT * FROM familiares");
            $familiares = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $familiares[] = $row;
            }
            Desconectar($con);
            http_response_code(200);
            echo json_encode($familiares);
        break;
    case 'empresas':
        $con = Conectar();
            $result = Ejecutar($con, "SELECT * FROM empresas");
            $empresas = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $empresas[] = $row;
            }
            Desconectar($con);
            http_response_code(200);
            echo json_encode($empresas);
        break;
    case 'usuarios':
        if (!$auth){
            http_response_code(401); 
            echo json_encode(['error' => 'Unauthorized']);
            exit; 
        }
        $apiKey = explode(' ',$auth)[1];
        $con = Conectar();
        $query = "SELECT * FROM apikeys WHERE ApiKey = '$apiKey'";
        $result = Ejecutar($con, $query);
        if (mysqli_num_rows($result) === 0) {
            http_response_code(401); 
            echo json_encode(['error' => 'Unauthorized']);
            exit; 
        }
            $result = Ejecutar($con, "SELECT * FROM usuariocompleto");
            $usuarios = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $usuarios[] = $row;
            }
            Desconectar($con);
            http_response_code(200);
            echo json_encode($usuarios);
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid endpoint']);
        break;
}
?>