<?php 
header('Content-Type: application/json');

$city = "Casablanca";
$country = "Morocco"; 
$date = 'today';
$apiUrl = "https://api.aladhan.com/v1/timingsByCity/$date?city=$city&country=$country";

try {
    $response = @file_get_contents($apiUrl);
    if ($response === false) {
        throw new Exception("Failed to fetch prayer times.");
    }
    
    $data = json_decode($response);
    if (!$data || $data->code !== 200) {
        throw new Exception("Invalid API response.");
    }

    $timings = $data->data->timings;
    $dateInfo = $data->data->date;

    echo json_encode([
        'status' => 'success',
        'timings' => [
            'Fajr' => $timings->Fajr,
            'Sunrise' => $timings->Sunrise,
            'Dhuhr' => $timings->Dhuhr,
            'Asr' => $timings->Asr,
            'Maghrib' => $timings->Maghrib,
            'Isha' => $timings->Isha,
            'Sunset' => $timings->Sunset,
        ],
        'date' => [
            'readable' => $dateInfo->readable,
            'hijri' => $dateInfo->hijri->date,
            'hijri_month' => $dateInfo->hijri->month->en,
            'hijri_year' => $dateInfo->hijri->year,
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>