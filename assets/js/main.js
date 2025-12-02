console.log('Cyber Matrix 2.0 Initialized');

// Starfield Warp Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const STAR_COUNT = 800;
const SPEED = 0.1;

function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * width - width / 2,
            y: Math.random() * height - height / 2,
            z: Math.random() * width
        });
    }
}

function drawStarfield() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    ctx.translate(width / 2, height / 2);

    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];

        // Move star closer
        star.z -= 2; // Speed

        // Reset if too close
        if (star.z <= 0) {
            star.x = Math.random() * width - width / 2;
            star.y = Math.random() * height - height / 2;
            star.z = width;
        }

        // Project 3D to 2D
        let sx = (star.x / star.z) * width;
        let sy = (star.y / star.z) * height;

        // Size based on depth
        let r = (1 - star.z / width) * 2.5;

        // Draw star
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();

        // Draw trail (warp effect)
        let px = (star.x / (star.z + 20)) * width;
        let py = (star.y / (star.z + 20)) * height;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - star.z / width})`;
        ctx.lineWidth = r;
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
    }

    ctx.translate(-width / 2, -height / 2);
    requestAnimationFrame(drawStarfield);
}

init();
drawStarfield();

// Resize handler
window.addEventListener('resize', init);

// Theme Switcher
function toggleThemePanel() {
    document.getElementById('theme-panel').classList.toggle('active');
}

function setTheme(theme) {
    const root = document.documentElement;

    switch (theme) {
        case 'deep-space': // Default
            root.style.setProperty('--primary', '#00f3ff');
            root.style.setProperty('--secondary', '#bc13fe');
            root.style.setProperty('--text-main', '#ffffff');
            root.style.setProperty('--bg-card', 'rgba(10, 15, 30, 0.85)');
            break;
        case 'red-alert':
            root.style.setProperty('--primary', '#ff0000');
            root.style.setProperty('--secondary', '#ff4400');
            root.style.setProperty('--text-main', '#ffcccc');
            root.style.setProperty('--bg-card', 'rgba(30, 5, 5, 0.9)');
            break;
        case 'void':
            root.style.setProperty('--primary', '#ffffff');
            root.style.setProperty('--secondary', '#888888');
            root.style.setProperty('--text-main', '#ffffff');
            root.style.setProperty('--bg-card', 'rgba(0, 0, 0, 0.95)');
            break;
    }

    // Save preference
    localStorage.setItem('theme', theme);
    // Only close if the panel is currently active, otherwise leave it open for selection
    if (document.getElementById('theme-panel').classList.contains('active')) {
        toggleThemePanel();
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme('deep-space'); // Default
}

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    const panel = document.getElementById('theme-panel');
    const toggle = document.querySelector('.theme-toggle');

    if (panel && toggle && !panel.contains(e.target) && !toggle.contains(e.target) && panel.classList.contains('active')) {
        panel.classList.remove('active');
    }
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => console.log('Service Worker Registered'))
            .catch((err) => console.log('Service Worker Error', err));
    });
}
