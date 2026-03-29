/* ===================================================
   Neo-Brutalist Portfolio — script.js
   Scroll reveal, active nav, smooth interactions
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Scroll Reveal (IntersectionObserver) ----
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a:not(.nav-cta)');

    function updateActiveNav() {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ---- Navbar hide/show on scroll ----
    let lastScrollY = 0;
    const navbar = document.getElementById('navbar');
    navbar.style.transition = 'transform 0.35s ease, opacity 0.35s ease';

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Hide/show navbar
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
            navbar.style.transform = 'translateX(-50%) translateY(-120%)';
            navbar.style.opacity = '0';
        } else {
            navbar.style.transform = 'translateX(-50%) translateY(0)';
            navbar.style.opacity = '1';
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // ---- Sticker wiggle on hover ----
    document.querySelectorAll('.sticker').forEach(sticker => {
        sticker.addEventListener('mouseenter', () => {
            sticker.style.animation = 'wiggle 0.4s ease';
            setTimeout(() => { sticker.style.animation = ''; }, 400);
        });
    });

    // ---- Button press micro-interaction ----
    document.querySelectorAll('.btn, .contact-link, .project-links a').forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'translate(2px, 2px)';
            btn.style.boxShadow = '1px 1px 0px 0px #000';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
            btn.style.boxShadow = '';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.boxShadow = '';
        });
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Skills Tab Filtering ----
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            skillTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            tab.classList.add('active');

            const category = tab.dataset.category;

            // Filter skill cards
            skillCards.forEach(card => {
                if (category === 'all') {
                    card.classList.remove('hidden');
                } else {
                    if (card.dataset.category === category) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });


    // ---- Parallax tilt on hero card (subtle) ----
    const heroCard = document.querySelector('.hero-card');
    if (heroCard && window.matchMedia('(min-width: 800px)').matches) {
        heroCard.addEventListener('mousemove', (e) => {
            const rect = heroCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -2;
            const rotateY = (x - centerX) / centerX * 2;

            heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            heroCard.style.transition = 'transform 0.4s ease';
        });

        heroCard.addEventListener('mouseenter', () => {
            heroCard.style.transition = 'none';
        });
    }


    // ---- Lazy image fade-in ----
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
        }
    });

});
