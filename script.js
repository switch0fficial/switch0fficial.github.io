/* ============================================
   SWITCH - Cinematic Gaming Creator Website
   JavaScript Implementation
   ============================================ */

// ============================================
// CONFIGURATION - Easy to customize
// ============================================
const SWITCH_CONFIG = {
    creatorName: "SWITCH",
    tiktok: "https://www.tiktok.com/@switch0fficial",
    whatsapp: "https://whatsapp.com/channel/0029VbAf5sq5fM5b2CXTge32",
    email: "switchtiktokofficial@gmail.com",
    profileImage: "assets/images/pfp.jpg.png",
    
    // TikTok video URLs - Add or remove videos here
    tiktokVideos: [
        {
            url: "https://vt.tiktok.com/ZSqEA9H8n/",
            title: "Blood Strike Cinematic Edit #1",
            description: "Intense gameplay moments transformed into cinematic experience."
        },
        {
            url: "https://vt.tiktok.com/ZSqEAAXPt/",
            title: "Blood Strike Cinematic Edit #2",
            description: "Highlight reel with cinematic editing techniques."
        },
        {
            url: "https://vt.tiktok.com/ZSqEAPpxs/",
            title: "Blood Strike Cinematic Edit #3",
            description: "Action-packed sequence with visual effects."
        },
        {
            url: "https://vt.tiktok.com/ZSqEAXbcb/",
            title: "Blood Strike Cinematic Edit #4",
            description: "Smooth transitions and dynamic camera work."
        },
        {
            url: "https://vt.tiktok.com/ZSqEAhYbc/",
            title: "Blood Strike Cinematic Edit #5",
            description: "Final edit in the series with enhanced visuals."
        }
    ],
    
    // Featured video URL
    featuredVideo: "https://vt.tiktok.com/ZSqEA9H8n/",
    
    // Performance settings
    particleCount: 2000,
    reducedMotionParticleCount: 500,
    mobileParticleCount: 300
};

// ============================================
// GLOBAL VARIABLES
// ============================================
let scene, camera, renderer, particles, clock;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let isMobile = false;
let reducedMotion = false;

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initCinematicIntro();
    initThreeJS();
    initNavigation();
    initScrollAnimations();
    initCard3DEffect();
    generateEditCards();
    initProfileImage();
    checkPerformanceSettings();
});

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorInner = document.querySelector('.cursor-inner');
    const cursorOuter = document.querySelector('.cursor-outer');
    
    // Disable on mobile
    if (window.innerWidth < 1024) {
        cursor.style.display = 'none';
        return;
    }
    
    document.addEventListener('mousemove', (e) => {
        cursorInner.style.left = e.clientX + 'px';
        cursorInner.style.top = e.clientY + 'px';
        
        // Outer cursor follows with delay
        setTimeout(() => {
            cursorOuter.style.left = e.clientX + 'px';
            cursorOuter.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .edit-card, .card-3d');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOuter.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOuter.classList.remove('hover');
        });
    });
}

// ============================================
// CINEMATIC INTRO
// ============================================
function initCinematicIntro() {
    const intro = document.getElementById('cinematicIntro');
    const threeCanvas = document.getElementById('threeCanvas');
    
    // Auto-skip after animation
    setTimeout(() => {
        if (intro.style.display !== 'none') {
            skipIntro();
        }
    }, 4000);
    
    function skipIntro() {
        gsap.to(intro, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                intro.style.display = 'none';
                threeCanvas.classList.add('active');
                animateHeroElements();
            }
        });
    }
}

function animateHeroElements() {
    // Animate hero text
    gsap.to('.hero-text', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Animate profile
    gsap.to('.hero-profile', {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
}

// ============================================
// THREE.JS 3D BACKGROUND
// ============================================
function initThreeJS() {
    const canvas = document.getElementById('threeCanvas');
    
    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clock for animations
    clock = new THREE.Clock();
    
    // Create scene elements
    createParticles();
    createGrid();
    createGeometricObjects();
    createLightBeams();
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);
    
    // Start animation loop
    animate();
}

function createParticles() {
    const particleCount = reducedMotion ? SWITCH_CONFIG.reducedMotionParticleCount : 
                          isMobile ? SWITCH_CONFIG.mobileParticleCount : 
                          SWITCH_CONFIG.particleCount;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const color1 = new THREE.Color(0x00d4ff); // Cyan
    const color2 = new THREE.Color(0x2a4a7a); // Blue
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
        
        const mixedColor = Math.random() > 0.5 ? color1 : color2;
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function createGrid() {
    const gridHelper = new THREE.GridHelper(200, 50, 0x00d4ff, 0x1a2a4a);
    gridHelper.position.y = -30;
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
}

function createGeometricObjects() {
    // Create floating geometric shapes
    const geometries = [
        new THREE.IcosahedronGeometry(2, 0),
        new THREE.OctahedronGeometry(2, 0),
        new THREE.TetrahedronGeometry(2, 0)
    ];
    
    const material = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    
    for (let i = 0; i < 5; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 100;
        mesh.position.y = (Math.random() - 0.5) * 100;
        mesh.position.z = (Math.random() - 0.5) * 50 - 20;
        
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.5 + 0.5,
            floatOffset: Math.random() * Math.PI * 2
        };
        
        scene.add(mesh);
    }
}

function createLightBeams() {
    // Create subtle light beams
    const beamGeometry = new THREE.CylinderGeometry(0.1, 0.1, 100, 8);
    const beamMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.1
    });
    
    for (let i = 0; i < 3; i++) {
        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        beam.position.x = (Math.random() - 0.5) * 100;
        beam.position.z = (Math.random() - 0.5) * 50 - 30;
        beam.rotation.z = (Math.random() - 0.5) * 0.5;
        scene.add(beam);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onScroll() {
    const scrollY = window.scrollY;
    const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
    
    // Move camera based on scroll
    camera.position.y = -scrollPercent * 20;
}

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    
    // Smooth camera movement based on mouse
    targetX = mouseX * 5;
    targetY = mouseY * 5;
    
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    
    camera.lookAt(scene.position);
    
    // Animate particles
    if (particles) {
        particles.rotation.y = elapsedTime * 0.05;
        particles.rotation.x = elapsedTime * 0.02;
    }
    
    // Animate geometric objects
    scene.children.forEach(child => {
        if (child.userData && child.userData.rotationSpeed) {
            child.rotation.x += child.userData.rotationSpeed.x;
            child.rotation.y += child.userData.rotationSpeed.y;
            child.position.y += Math.sin(elapsedTime * child.userData.floatSpeed + child.userData.floatOffset) * 0.02;
        }
    });
    
    renderer.render(scene, camera);
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.fromTo(section,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate cards
    const cards = document.querySelectorAll('.card-3d, .edit-card');
    cards.forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 30,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.fromTo(title,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// ============================================
// 3D CARD TILT EFFECT
// ============================================
function initCard3DEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ============================================
// GENERATE EDIT CARDS
// ============================================
function generateEditCards() {
    const editsGrid = document.getElementById('editsGrid');
    
    SWITCH_CONFIG.tiktokVideos.forEach((video, index) => {
        const card = document.createElement('div');
        card.className = 'edit-card card-3d';
        card.setAttribute('data-tilt', '');
        
        card.innerHTML = `
            <div class="edit-preview">
                <div class="edit-number">${String(index + 1).padStart(2, '0')}</div>
                <div class="edit-overlay">
                    <svg viewBox="0 0 24 24" fill="currentColor" class="play-icon">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                </div>
            </div>
            <div class="edit-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <a href="${video.url}" target="_blank" rel="noopener noreferrer" class="edit-btn">WATCH ON TIKTOK</a>
            </div>
        `;
        
        card.addEventListener('click', () => {
            window.open(video.url, '_blank', 'noopener,noreferrer');
        });
        
        editsGrid.appendChild(card);
    });
    
    // Re-initialize 3D effect for new cards
    initCard3DEffect();
}

// ============================================
// PROFILE IMAGE HANDLING
// ============================================
function initProfileImage() {
    const profileImage = document.getElementById('profileImage');
    
    // Check if profile image exists
    profileImage.onerror = function() {
        // If image doesn't exist, show placeholder
        this.style.background = 'linear-gradient(135deg, #0a0e1a, #1a2a4a)';
        this.alt = 'Profile placeholder - Add your image to assets/images/profile.png';
    };
}

// ============================================
// PERFORMANCE SETTINGS
// ============================================
function checkPerformanceSettings() {
    // Check for reduced motion preference
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for mobile
    isMobile = window.innerWidth < 768;
    
    // Update particle count based on settings
    if (reducedMotion || isMobile) {
        // Reduce animations
        document.body.classList.add('reduced-motion');
    }
}

// ============================================
// GLITCH EFFECT
// ============================================
function initGlitchEffect() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        // Random glitch effect
        setInterval(() => {
            if (Math.random() > 0.95) {
                text.style.animation = 'none';
                setTimeout(() => {
                    text.style.animation = '';
                }, 200);
            }
        }, 3000);
    });
}

// Initialize glitch effect
initGlitchEffect();

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initLazyLoading();

// ============================================
// PRELOAD CRITICAL ASSETS
// ============================================
function preloadAssets() {
    const criticalAssets = [
        SWITCH_CONFIG.profileImage
    ];
    
    criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = asset;
        document.head.appendChild(link);
    });
}

// Preload assets
preloadAssets();

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c SWITCH ', 'background: #00d4ff; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Cinematic Gaming Creator Website ', 'color: #00d4ff; font-size: 14px;');
console.log('%c Built with Three.js & GSAP ', 'color: #8a9ab0; font-size: 12px;');
