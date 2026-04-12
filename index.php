<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Masjid Clock - Prayer Times Casablanca</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="overlay"></div>

    <div class="side-decorations">
        <div class="decor-card left">
            <img src="ALLAH.png" alt="Allah Name">
        </div>
        <div class="decor-card right">
            <img src="Mohamed.png" alt="Mohamed Name">
        </div>
    </div>

    <main class="app-container">
        <header class="main-header">
            <h1 class="city-name text-reveal">Casablanca</h1>
            <div class="date-container">
                <p id="day-name" class="day-name"></p>
                <p id="hijri-date" class="hijri"></p>
                <p id="gregorian-date" class="gregorian"></p>
            </div>
        </header>

        <section class="clock-section">
            <div class="main-clock" id="clock">00:00:00</div>
            <div class="next-prayer-info">
                <span class="label"> الصَّلَاةُ القَادِمَةُ :</span>
                <span id="next-prayer-name" class="name">---</span>
                <span id="next-prayer-countdown" class="countdown">--:--:--</span>
            </div>
        </section>

        <section class="prayer-cards-grid">
            <!-- Cards will be populated by JS for better control, or I can keep them here and update them -->
            <div class="prayer-card" id="card-Fajr">
                <span class="prayer-name">الفجر</span>
                <span class="prayer-time" id="fajr-time">--:--</span>
            </div>
            <div class="prayer-card" id="card-Dhuhr">
                <span class="prayer-name">الظهر</span>
                <span class="prayer-time" id="dhuhr-time">--:--</span>
            </div>
            <div class="prayer-card" id="card-Asr">
                <span class="prayer-name">العصر</span>
                <span class="prayer-time" id="asr-time">--:--</span>
            </div>
            <div class="prayer-card" id="card-Maghrib">
                <span class="prayer-name">المغرب</span>
                <span class="prayer-time" id="maghrib-time">--:--</span>
            </div>
            <div class="prayer-card" id="card-Isha">
                <span class="prayer-name">العشاء</span>
                <span class="prayer-time" id="isha-time">--:--</span>
            </div>
        </section>

        <footer class="main-footer">
            <div class="audio-toggle">
                <button id="audio-btn" class="audio-button" title="Toggle Adan Audio">
                    <svg id="volume-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L5.413 8.587A2 2 0 0 1 4 9.171H2a1 1 0 0 0-1 1v3.658a1 1 0 0 0 1 1h2a2 2 0 0 1 1.413.584l4.384 4.384c.316.316.803.111.803-.336V4.702Z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                    <svg id="mute-icon" class="hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L5.413 8.587A2 2 0 0 1 4 9.171H2a1 1 0 0 0-1 1v3.658a1 1 0 0 0 1 1h2a2 2 0 0 1 1.413.584l4.384 4.384c.316.316.803.111.803-.336V4.702Z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>
                </button>
            </div>
        </footer>
    </main>

    <!-- Scripts -->
    <script src="script.js"></script>
    
</body>

</html>