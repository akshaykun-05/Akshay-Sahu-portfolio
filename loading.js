// Interactive Dragon Loading Screen with Parallax
let progress = 0;
let activeLogIndex = 0;
let isAccelerating = false;
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;
let loadingComplete = false;

// DOM Elements
const dragonContainer = document.getElementById('dragon-container');
const dragonImage = document.getElementById('dragon-image');
const parallaxBg = document.getElementById('parallax-bg');
const contentWrapper = document.getElementById('content-wrapper');
const titleContainer = document.getElementById('title-container');
const magicCircle = document.getElementById('magic-circle');
const progressBar = document.getElementById('progress-bar');
const progressHead = progressBar.querySelector('.progress-head');
const percentage = document.getElementById('percentage');
const statusText = document.getElementById('status-text');
const versionText = document.getElementById('version-text');
const pulseDot = document.querySelector('.pulse-dot');
const mainTitle = document.querySelector('.main-title');
const logItems = document.querySelectorAll('.log-item');
const circleRings = document.querySelectorAll('.circle-ring');
const embersContainer = document.getElementById('embers-container');
const interactionHint = document.querySelector('.interaction-hint');

// Mouse Movement Handler (disabled on mobile for performance)
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    });
}

// Smooth Mouse Interpolation with throttling
let rafId = null;
function updateMousePosition() {
    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;
    
    // Apply parallax transforms with GPU acceleration
    if (parallaxBg) {
        parallaxBg.style.transform = `translate3d(${mouseX * 15}px, ${mouseY * 15}px, 0)`;
    }
    
    if (dragonContainer) {
        dragonContainer.style.transform = `translate3d(calc(-50% + ${mouseX * 40}px), calc(-50% + ${mouseY * 40}px), 0)`;
    }
    
    if (titleContainer) {
        titleContainer.style.transform = `translate3d(${mouseX * 20}px, ${mouseY * 20}px, 0)`;
    }
    
    if (contentWrapper) {
        contentWrapper.style.transform = `translate3d(${mouseX * 10}px, ${mouseY * 10}px, 0)`;
    }
    
    if (magicCircle) {
        magicCircle.style.transform = `translate3d(${mouseX * 70}px, ${mouseY * 70}px, 0) perspective(1000px) rotateX(75deg)`;
    }
    
    rafId = requestAnimationFrame(updateMousePosition);
}

updateMousePosition();

// Acceleration Controls
document.addEventListener('mousedown', () => {
    if (loadingComplete) {
        completeLoading();
        return;
    }
    
    isAccelerating = true;
    dragonImage.classList.add('accelerating');
    mainTitle.classList.add('accelerating');
    progressHead.classList.add('accelerating');
    pulseDot.classList.add('fast');
    circleRings.forEach(ring => ring.classList.add('fast'));
    statusText.textContent = 'OVERCLOCKING...';
    versionText.textContent = 'OVERRIDE ACTIVE';
});

document.addEventListener('mouseup', () => {
    if (loadingComplete) return;
    
    isAccelerating = false;
    dragonImage.classList.remove('accelerating');
    mainTitle.classList.remove('accelerating');
    progressHead.classList.remove('accelerating');
    pulseDot.classList.remove('fast');
    circleRings.forEach(ring => ring.classList.remove('fast'));
    statusText.textContent = 'SYSTEM INITIALIZING';
    versionText.textContent = 'V.2.4.0-RC';
});

document.addEventListener('mouseleave', () => {
    if (loadingComplete) return;
    
    isAccelerating = false;
    dragonImage.classList.remove('accelerating');
    mainTitle.classList.remove('accelerating');
    progressHead.classList.remove('accelerating');
    pulseDot.classList.remove('fast');
    circleRings.forEach(ring => ring.classList.remove('fast'));
    statusText.textContent = 'SYSTEM INITIALIZING';
    versionText.textContent = 'V.2.4.0-RC';
});

// Click anywhere to continue when loading is complete
document.addEventListener('click', () => {
    if (loadingComplete) {
        completeLoading();
    }
});

// Create Embers
function createEmbers() {
    const emberCount = 15; // Reduced from 30 to 15 for better performance
    for (let i = 0; i < emberCount; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 2 + Math.random() * 5;
        const size = 1 + Math.random() * 4;
        const drift = (Math.random() * 100 - 50);
        
        ember.style.left = `${left}%`;
        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        ember.style.animationDelay = `${delay}s`;
        ember.style.animationDuration = `${duration}s`;
        ember.style.setProperty('--drift', `${drift}px`);
        
        embersContainer.appendChild(ember);
    }
}

createEmbers();

// Update Embers Speed on Acceleration
function updateEmbersSpeed() {
    const embers = document.querySelectorAll('.ember');
    embers.forEach(ember => {
        if (isAccelerating) {
            const currentDuration = parseFloat(ember.style.animationDuration);
            ember.style.animationDuration = `${currentDuration * 0.3}s`;
        } else {
            // Reset to original duration
            const duration = 2 + Math.random() * 5;
            ember.style.animationDuration = `${duration}s`;
        }
    });
}

// Progress Simulation (FASTER)
function updateProgress() {
    const intervalTime = isAccelerating ? 20 : 50; // Faster intervals
    const progressAmount = isAccelerating ? 3 : 1.5; // Larger increments
    
    if (progress < 99) {
        progress += Math.random() * progressAmount;
        progress = Math.min(99, progress);
        
        const displayProgress = Math.floor(progress);
        percentage.textContent = displayProgress;
        progressBar.style.width = `${progress}%`;
    } else if (progress >= 99 && progress < 100) {
        progress = 100;
        percentage.textContent = '100';
        progressBar.style.width = '100%';
        loadingComplete = true;
        
        // Change hint text
        interactionHint.textContent = 'CLICK ANYWHERE TO CONTINUE';
        interactionHint.style.animation = 'pulse 0.8s ease-in-out infinite';
        interactionHint.style.color = 'rgba(255, 0, 0, 0.8)';
        interactionHint.style.fontSize = '12px';
    }
    
    setTimeout(updateProgress, intervalTime);
}

// Update Active Log
function updateLogs() {
    logItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === activeLogIndex) {
            item.classList.add('active');
        }
    });
    
    activeLogIndex = (activeLogIndex + 1) % logItems.length;
    
    const logInterval = isAccelerating ? 150 : 600; // Faster log updates
    setTimeout(updateLogs, logInterval);
}

// Complete Loading
function completeLoading() {
    // Fade out
    document.getElementById('loading-screen').style.transition = 'opacity 0.5s ease';
    document.getElementById('loading-screen').style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'portfolio.html';
    }, 500);
}

// Rotate Spinner in First Log
function rotateSpinner() {
    const spinner = logItems[0].querySelector('span');
    if (spinner) {
        let rotation = 0;
        setInterval(() => {
            rotation += isAccelerating ? 30 : 10;
            spinner.style.display = 'inline-block';
            spinner.style.transform = `rotate(${rotation}deg)`;
        }, isAccelerating ? 50 : 100);
    }
}

// Initialize
updateProgress();
updateLogs();
rotateSpinner();

// Update embers speed when acceleration changes
setInterval(() => {
    updateEmbersSpeed();
}, 100);
