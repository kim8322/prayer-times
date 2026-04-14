let prayerTimes = {};
let nextPrayer = { name: '', time: '', moment: null };
let audioEnabled = false; // Start muted to comply with browser policies
const adanAudio = new Audio('adan.mp3');

const daysArabic = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت"
];

// Selectors
const clockEl = document.getElementById('clock');
const hijriEl = document.getElementById('hijri-date');
const gregorianEl = document.getElementById('gregorian-date');
const dayNameEl = document.getElementById('day-name');
const nextNameEl = document.getElementById('next-prayer-name');
const nextCountdownEl = document.getElementById('next-prayer-countdown');
const audioBtn = document.getElementById('audio-btn');
const volumeIcon = document.getElementById('volume-icon');
const muteIcon = document.getElementById('mute-icon');

function updateClock() {
    const now = new Date();

    // Day Name
    if (dayNameEl) dayNameEl.textContent = daysArabic[now.getDay()];

    // Main Clock
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${h}:${m}:${s}`;

    // Gregorian Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (gregorianEl) gregorianEl.textContent = now.toLocaleDateString('en-GB', options);

    if (Object.keys(prayerTimes).length > 0) {
        updateCountdown(now);
        checkAdan(h, m, s);
    }
}

function updateCountdown(now) {
    if (!nextPrayer.moment) findNextPrayer(now);

    let diff = nextPrayer.moment - now;

    if (diff < 0) {
        findNextPrayer(now);
        diff = nextPrayer.moment - now;
    }

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (nextCountdownEl) {
        nextCountdownEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function findNextPrayer(now) {
    const times = [
        { name: 'الفجر', id: 'Fajr', time: prayerTimes.Fajr },
        { name: 'الظهر', id: 'Dhuhr', time: prayerTimes.Dhuhr },
        { name: 'العصر', id: 'Asr', time: prayerTimes.Asr },
        { name: 'المغرب', id: 'Maghrib', time: prayerTimes.Maghrib },
        { name: 'العشاء', id: 'Isha', time: prayerTimes.Isha }
    ];

    const nowTime = now.getHours() * 60 + now.getMinutes();
    let found = false;

    // Remove old active states
    document.querySelectorAll('.prayer-card').forEach(c => c.classList.remove('active'));

    for (let p of times) {
        const [h, m] = p.time.split(':').map(Number);
        const pTime = h * 60 + m;

        if (pTime > nowTime) {
            nextPrayer = {
                name: p.name,
                id: p.id,
                time: p.time,
                moment: new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m)
            };
            found = true;
            break;
        }
    }

    if (!found) {
        // Next prayer is Fajr tomorrow
        const [h, m] = times[0].time.split(':').map(Number);
        nextPrayer = {
            name: times[0].name,
            id: times[0].id,
            time: times[0].time,
            moment: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, h, m)
        };
    }

    if (nextNameEl) nextNameEl.textContent = nextPrayer.name;

    // Highlight current/upcoming card
    const currentCard = document.getElementById(`card-${nextPrayer.id}`);
    if (currentCard) currentCard.classList.add('active');
}

let lastAdanPlayed = "";

function checkAdan(h, m, s) {
    if (!audioEnabled) return;

    const currentTime = `${h}:${m}`;
    
    // Check if we already played for this prayer minute
    if (currentTime === lastAdanPlayed) return;

    // Sanitize and check against prayer times
    const sanitizedTimes = Object.values(prayerTimes).map(t => t.split(' ')[0]);

    if (sanitizedTimes.includes(currentTime)) {
        lastAdanPlayed = currentTime; // Mark as played
        console.log(` Adan Triggered at ${currentTime}`);
        adanAudio.currentTime = 0;
        adanAudio.play().catch(e => console.error("Adan playback blocked by browser:", e));
    }
}

function updateHijriDate() {
    const date = new Date();
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        calendar: 'islamic-civil'
    };
    const hijriFormatter = new Intl.DateTimeFormat('ar-SA', options);
    const hijriDateString = hijriFormatter.format(date);
    if (hijriEl) hijriEl.textContent = hijriDateString;
}

async function fetchPrayerTimes() {
    try {
        const response = await fetch('prayer_times.php');
        const data = await response.json();

        if (data.status === 'success') {
            // Core timings to display
            const corePrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
            prayerTimes = {};

            corePrayers.forEach(p => {
                if (data.timings[p]) {
                    prayerTimes[p] = data.timings[p].split(' ')[0];
                }
            });

            // Update UI cards
            for (let [name, time] of Object.entries(prayerTimes)) {
                const el = document.getElementById(`${name.toLowerCase()}-time`);
                if (el) el.textContent = time;
            }

            updateHijriDate();
            findNextPrayer(new Date());
            console.log("Prayer times synced:", prayerTimes);
        }
    } catch (error) {
        console.error("Error fetching prayer times:", error);
        console.log("Script is working ✅");
    }
}

// Event Listeners
audioBtn.addEventListener('click', () => {
    audioEnabled = !audioEnabled;

    // Toggle Button UI
    audioBtn.classList.toggle('muted', !audioEnabled);
    if (volumeIcon) volumeIcon.classList.toggle('hidden', !audioEnabled);
    if (muteIcon) muteIcon.classList.toggle('hidden', audioEnabled);

    // Initial play "unlock" for adantest
    if (audioEnabled) {
        // Warm up the audio object
        adanAudio.play().then(() => {
            adanAudio.pause();
            adanAudio.currentTime = 0;
        }).catch(e => console.log("Audio warm-up failed:", e));
    }
});

// Init
setInterval(updateClock, 1000);
updateHijriDate();
fetchPrayerTimes();
// Refresh every hour
setInterval(fetchPrayerTimes, 3600000);