/* Particles.js Config */
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#00f0ff' },
            shape: { type: 'circle' },
            opacity: { value: 0.2, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 150, color: '#00f0ff', opacity: 0.1, width: 1 },
            move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'bubble' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { bubble: { distance: 200, size: 4, duration: 2, opacity: 0.4, speed: 3 } }
        },
        retina_detect: true
    });
}

/* Custom Cursor */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

/* Hero Parallax Effect */
const hero = document.getElementById('hero');
const dragonContainer = document.querySelector('.dragon-container');

window.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;

    if (dragonContainer) {
        dragonContainer.style.transform = `translate(${x}px, ${y}px)`;
    }
});

/* Scroll Reveal Animation */
const revealElements = document.querySelectorAll('.reveal');
const scrollDragonPath = document.getElementById('scroll-dragon-path');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.9;
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    // Animate scrolling dragon
    if (scrollDragonPath) {
        const draw = scrollPercent * 2000;
        scrollDragonPath.style.strokeDashoffset = 2000 - draw;

        // Move dragon horizontally/vertically based on scroll
        const moveX = scrollPercent * 100 - 50; // -5% to 5% range
        const moveY = scrollPercent * 150 - 75;
        scrollDragonPath.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + scrollPercent * 0.2})`;
    }

    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

/* Navigation Glass Effect on Scroll */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(10, 10, 26, 0.95)';
        nav.style.width = '100%';
        nav.style.left = '0';
        nav.style.top = '0';
        nav.style.borderRadius = '0';
    } else {
        nav.style.backgroundColor = 'rgba(10, 10, 26, 0.7)';
        nav.style.width = '90%';
        nav.style.left = '5%';
        nav.style.top = '20px';
        nav.style.borderRadius = '12px';
    }
});

/* Smooth Scroll for Links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

/* Simple Form Submission Handling (Visual feedback only) */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'TRANSMITTING...';
        btn.style.borderColor = 'var(--gold)';
        btn.style.color = 'var(--gold)';

        setTimeout(() => {
            btn.innerText = 'DATA RECEIVED';
            btn.classList.add('neon-border-blue');
            contactForm.reset();
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('neon-border-blue');
                btn.style.borderColor = 'var(--neon-blue)';
                btn.style.color = 'var(--neon-blue)';
            }, 3000);
        }, 2000);
    });
}
