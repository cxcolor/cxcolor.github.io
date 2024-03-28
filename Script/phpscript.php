<?php

if (isset($_GET["ip"])) {
    $ipAddress = $_GET["ip"];

    // Execute the `arp` command and parse the output to get the MAC address
    $arpOutput = shell_exec("arp -a $ipAddress");
    $lines = explode("\n", $arpOutput);

    for ($i = 1; $i < count($lines); ++$i) {
        $line = $lines[$i];

        if (strpos($line, $ipAddress) !== false) {
            $lineParts = explode(" ", $line);

            if (count($lineParts) >= 4) {
                $macAddress = $lineParts[3];

                if (strlen($macAddress) === 12 && preg_match('/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/', $macAddress) === 1) {
                    echo $macAddress;
                    exit
