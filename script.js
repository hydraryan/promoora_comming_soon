// --- Countdown Logic ---
function updateCountdown() {
    const launchDate = new Date('March 5, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
        const container = document.querySelector('.countdown-container');
        if (container) container.innerHTML = "<h1>We have launched!</h1>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const setElementText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text < 10 ? '0' + text : text;
    };

    setElementText('days', days);
    setElementText('hours', hours);
    setElementText('minutes', minutes);
    setElementText('seconds', seconds);
}

setInterval(updateCountdown, 1000);
updateCountdown();


// --- Particle Animation Logic ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * 0.4) - 0.2; // Slow horizontal drift
        this.directionY = (Math.random() * 0.4) - 0.2; // Slow vertical drift
        this.size = Math.random() * 2; // Variable size
        this.color = '#ffffff';
        this.opacity = Math.random() * 0.5 + 0.1; // Variable opacity
    }

    // Method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1.0; // Reset alpha
    }

    // Check particle position, check mouse position, move the particle, draw the particle
    update() {
        // Check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // Draw particle
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000; // Density based on screen size
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

// Start animation
init();
animate();
