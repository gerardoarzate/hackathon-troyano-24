<?php
    function Conectar(){
        $Servidor="127.0.0.1";
        $Usuario="root";
        $Pwd="";
        $BD="Almacenamiento";
        $Con=mysqli_connect($Servidor, $Usuario, $Pwd, $BD);
        return $Con;
    }
    function Ejecutar($Con, $SQL){
        $Result=mysqli_query($Con,$SQL);
        return $Result;

    }

    function Procesar(){

    }

    function Desconectar($Con){
        $Var=mysqli_close($Con);
        return $Var;

    }



?>