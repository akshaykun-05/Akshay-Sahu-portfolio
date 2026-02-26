/* Super Portfolio Logic */

document.addEventListener('DOMContentLoaded', () => {
    /* Particles.js Config with Star Constellations (Enhanced) */
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 120, density: { enable: true, value_area: 800 } }, // Increased from 40 to 120
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
                    distance: 200, 
                    color: '#00f0ff', 
                    opacity: 0.6, 
                    width: 2,
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

    /* Custom Cursor (AK) */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
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
    }

    /* Eye Tracking Logic (NW) */
    const dragonEye = document.querySelector('.dragon-eye');
    if (dragonEye) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            dragonEye.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    /* Dynamic Header on Scroll */
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('section[id]');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Header hide/show logic
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            header.classList.remove('scroll-down');
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
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (currentScroll >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* Scroll Reveal and Dragon Path Animation (AK) */
    const revealElements = document.querySelectorAll('.reveal');
    const scrollDragonPath = document.getElementById('scroll-dragon-path');

    const handleScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

        // Animate scrolling dragon
        if (scrollDragonPath) {
            const draw = scrollPercent * 2000;
            scrollDragonPath.style.strokeDashoffset = 2000 - draw;

            const moveX = scrollPercent * 100 - 50;
            const moveY = scrollPercent * 150 - 75;
            scrollDragonPath.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + scrollPercent * 0.2})`;
        }

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
                
                // Animate skill bars when they come into view
                if (el.classList.contains('skill-item')) {
                    const skillBar = el.querySelector('.skill-bar');
                    const skillPercentage = el.querySelector('.skill-percentage');
                    
                    if (skillBar && !skillBar.classList.contains('animated')) {
                        const percent = skillBar.getAttribute('data-percent');
                        
                        // Animate the bar width
                        setTimeout(() => {
                            skillBar.style.width = percent + '%';
                            skillBar.classList.add('animated');
                        }, 200);
                        
                        // Animate the percentage counter
                        let currentPercent = 0;
                        const targetPercent = parseInt(percent);
                        const increment = targetPercent / 60; // 60 frames for smooth animation
                        
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
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

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
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="relative z-10">TRANSMITTING...</span>';
            submitBtn.disabled = true;

            // Send email using EmailJS
            emailjs.send('service_uoyitub', 'template_npz79ig', {
                name: formData.name,
                email: formData.email,
                message: formData.message
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                successMessage.classList.remove('hidden');
                successMessage.classList.add('animate-fade-in');

                // Reset form
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                    successMessage.classList.remove('animate-fade-in');
                }, 5000);
            }, function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                submitBtn.innerHTML = '<span class="relative z-10 text-neon-red">TRANSMISSION_FAILED</span>';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }
});
