<?php

$result_json = "";

if (isset($_GET["handle"])) {
    
    $handle = $_GET["handle"];
    // run python script with the input $handle
    // $result_json = analysis results in JSON format returned by python script
    echo $result_json;
    
}

?>