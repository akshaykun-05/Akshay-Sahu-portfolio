/* Super Portfolio Logic */

document.addEventListener('DOMContentLoaded', () => {
    /* Particles.js Config with Star Constellations (Enhanced) */
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } }, // Reduced from 120 to 60
                color: { value: ['#00f0ff', '#0d59f2', '#ffffff', '#ff003c'] }, // Multiple colors
                shape: {
                    type: ['circle', 'star'], // Added stars
                    star: { nb_sides: 5 }
                },
                opacity: {
                    value: 0.9,
                    random: true,
                    anim: { enable: true, speed: 0.5, opacity_min: 0.3, sync: false }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00f0ff',
                    opacity: 0.4,
                    width: 1.5,
                    shadow: {
                        enable: true,
                        color: '#00f0ff',
                        blur: 5
                    }
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: true, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: ['grab', 'bubble'] },
                    onclick: { enable: true, mode: 'repulse' },
                    resize: true
                },
                modes: {
                    grab: { distance: 250, line_linked: { opacity: 1 } },
                    bubble: { distance: 300, size: 8, duration: 2, opacity: 1, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 }
                }
            },
            retina_detect: true
        });
    }

    /* Optimized Custom Cursor (AK) */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        const animateCursor = () => {
            // Smooth dot follow
            dotX += (mouseX - dotX) * 1;
            dotY += (mouseY - dotY) * 1;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translateZ(0)`;

            // Smooth outline follow
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translateZ(0)`;

            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);
    }

    /* Optimized Eye Tracking (NW) */
    const dragonEye = document.querySelector('.dragon-eye');
    if (dragonEye) {
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;

        window.addEventListener('mousemove', (e) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 20;
            targetY = (e.clientY / window.innerHeight - 0.5) * 20;
        }, { passive: true });

        const animateEye = () => {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;
            dragonEye.style.transform = `translate(${currentX}px, ${currentY}px) translateZ(0)`;
            requestAnimationFrame(animateEye);
        };
        requestAnimationFrame(animateEye);
    }

    /* Optimized Dynamic Header & Active Links */
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('section[id]');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;

                // Header logic
                if (currentScroll <= 0) {
                    header.classList.remove('scroll-up', 'scroll-down');
                } else if (currentScroll > lastScroll && currentScroll > 100) {
                    header.classList.remove('scroll-up');
                    header.classList.add('scroll-down');
                } else if (currentScroll < lastScroll) {
                    header.classList.remove('scroll-down');
                    header.classList.add('scroll-up');
                }

                lastScroll = currentScroll;

                // Active section highlighting
                let current = '';
                sections.forEach(section => {
                    if (currentScroll >= (section.offsetTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
                });

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    /* Optimized Scroll Reveal with IntersectionObserver */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('active');

                // Animate skill bars
                if (el.classList.contains('skill-item')) {
                    const skillBar = el.querySelector('.skill-bar');
                    const skillPercentage = el.querySelector('.skill-percentage');

                    if (skillBar && !skillBar.classList.contains('animated')) {
                        const percent = skillBar.getAttribute('data-percent');
                        setTimeout(() => {
                            skillBar.style.width = percent + '%';
                            skillBar.classList.add('animated');
                        }, 200);

                        let currentPercent = 0;
                        const targetPercent = parseInt(percent);
                        const increment = targetPercent / 60;
                        const counter = setInterval(() => {
                            currentPercent += increment;
                            if (currentPercent >= targetPercent) {
                                currentPercent = targetPercent;
                                clearInterval(counter);
                            }
                            skillPercentage.textContent = Math.round(currentPercent) + '%';
                        }, 30);
                    }
                }
                revealObserver.unobserve(el);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

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

    /* Contact Form Handling */
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="relative z-10">TRANSMITTING...</span>';
            submitBtn.disabled = true;

            emailjs.send('service_uoyitub', 'template_npz79ig', {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            })
                .then(() => {
                    successMessage.classList.remove('hidden');
                    successMessage.classList.add('animate-fade-in');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                        successMessage.classList.remove('animate-fade-in');
                    }, 5000);
                })
                .catch(() => {
                    submitBtn.innerHTML = '<span class="relative z-10 text-neon-red">TRANSMISSION_FAILED</span>';
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }
});
});
