/* ===================================================
   Neo-Brutalist Portfolio — script.js
   Scroll reveal, active nav, smooth interactions
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Scroll Reveal (IntersectionObserver) ----
    const revealElements = document.querySelectorAll('.reveal, .section-label');

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

    // Legacy Sandbox interactive logic removed. Graveyard apps are now displayed in a static stack list.


    // ===================================================
    // POCKETMC TWO-PANEL VIDEO SWITCHER
    // ===================================================
    const pocketVideosData = {
        1: {
            title: "The Whispering Cloud",
            category: "Short Film / Mythic Theme",
            video: "videos/ai-short-story.mp4",
            info: "A stylized Indian mythic/folklore story focused on a community experiencing a catastrophic drought caused by the 'Great Megh Raja' who hoards rain clouds. A lone frog and peacock succeed through song and dance, causing the cloud to shed joyful tears and restore the landscape.",
            skills: [
                "Consistent 2D Character Assets",
                "Generative Character Animation",
                "Contextual Color Keying & Audio Sync"
            ],
            tryUrl: "#"
        },
        2: {
            title: "PocketMC Project Explainer",
            category: "Minecraft Nostalgia Variant",
            video: "videos/product-promot-in-filmstyle.mp4",
            info: "This variant uses a retro gaming narrative structure, starting with a user's first nostalgic single-player Minecraft experience and contrasting it with the complexities of multi-user multiplayer deployment. It illustrates server corruption errors, memory crashes, and manual configuration issues before presenting the automated single-dashboard management software.",
            skills: [
                "Hybrid Creative Styling",
                "Motion Tracking & Data Visualization",
                "Dynamic UI Presentation Filters"
            ],
            tryUrl: "#"
        },
        3: {
            title: "Antigravity Workspace Platform",
            category: "Developer Platform",
            video: "videos/pure-ai-promo.mp4",
            info: "Introduces 'Antigravity', an advanced developer platform designed to replace context-switching bugs, multiple browser windows, and chaotic terminals with a unified workspace featuring AI agent managers.",
            skills: [
                "Tech Product UI/UX Motion Design",
                "Abstract Visual Prototyping",
                "Automated Asset Transitions"
            ],
            tryUrl: "#"
        },
        4: {
            title: "Evolution of Linux",
            category: "Historical Tech Theme",
            video: "videos/automated-storytime-ai.mp4",
            info: "Tracks the history of the Linux kernel from an unexpected 1990s volunteer project competing against massive corporations to becoming a global operating system framework powering modern web servers, embedded industrial hardware, robotics, and aerospace tech.",
            skills: [
                "Historical Image/Video Coherence",
                "Abstract Data Network Simulation",
                "Cinematic Video Upscaling"
            ],
            tryUrl: "#"
        },
        5: {
            title: "Chess.com Brand Ad & Campaign Reel",
            category: "Conversion-Focused Ad",
            video: "videos/CHESScom-promo-filmstyle-compressed.mp4",
            info: "A conversion-focused ad celebrating chess's core strategy loops. It illustrates a single user's transition from a beginner learning base mechanics into a competitor studying complex openings, and highlights how the platform connects millions of distinct individual stories globally.",
            skills: [
                "Photorealistic Product / Asset Rendering",
                "Mobile Integration Mapping",
                "Conversion-Driven Narrative Structure"
            ],
            tryUrl: "#"
        }
    };

    const pocketItems = document.querySelectorAll('.pocket-menu-item');
    const pocketVideo = document.getElementById('pocket-video');
    const pocketTitle = document.getElementById('pocket-title');
    const pocketCategory = document.getElementById('pocket-category');
    const pocketInfo = document.getElementById('pocket-info');
    const pocketSkills = document.getElementById('pocket-skills');
    const pocketViewFullBtn = document.getElementById('pocket-view-full-btn');

    pocketItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoIndex = item.dataset.video;
            const videoData = pocketVideosData[videoIndex];
            
            if (videoData) {
                // Update active sidebar item
                pocketItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Switch Video preview with smooth fade
                if (pocketVideo) {
                    pocketVideo.style.opacity = '0';
                    pocketVideo.style.transition = 'opacity 0.25s ease';
                    setTimeout(() => {
                        pocketVideo.src = videoData.video;
                        pocketVideo.load();
                        pocketVideo.play().catch(e => console.log("Playback prevented", e));
                        pocketVideo.style.opacity = '1';
                    }, 250);
                }

                // Update text fields
                if (pocketTitle) pocketTitle.textContent = videoData.title;
                if (pocketCategory) pocketCategory.textContent = videoData.category;
                if (pocketInfo) pocketInfo.textContent = videoData.info;

                // Update skills tags
                if (pocketSkills) {
                    pocketSkills.innerHTML = videoData.skills
                        .map(skill => `<span class="pocket-skill-tag">${skill}</span>`)
                        .join('');
                }
            }
        });
    });

    if (pocketViewFullBtn && pocketVideo) {
        pocketViewFullBtn.addEventListener('click', () => {
            if (pocketVideo.requestFullscreen) {
                pocketVideo.requestFullscreen();
            } else if (pocketVideo.webkitRequestFullscreen) {
                pocketVideo.webkitRequestFullscreen();
            } else if (pocketVideo.msRequestFullscreen) {
                pocketVideo.msRequestFullscreen();
            }
        });
    }

    // ===================================================
    // MERMAID DIAGRAM SHOW/HIDE & RENDER SYSTEM
    // ===================================================
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({ startOnLoad: false, theme: 'default' });
    }

    document.querySelectorAll('.workflow-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const workflowId = btn.dataset.workflow;
            const container = document.getElementById(`${workflowId}-workflow`);
            if (container) {
                const isHidden = container.style.display === 'none';
                container.style.display = isHidden ? 'block' : 'none';
                if (isHidden && !container.classList.contains('rendered')) {
                    const pre = container.querySelector('.mermaid-definition');
                    if (pre) {
                        const code = pre.textContent;
                        const uniqueId = `mermaid-${workflowId}`;
                        mermaid.render(uniqueId, code).then(({ svg }) => {
                            container.innerHTML = svg;
                            container.classList.add('rendered');
                        }).catch(err => {
                            console.error("Mermaid rendering failed:", err);
                        });
                    }
                }
            }
        });
    });

});
