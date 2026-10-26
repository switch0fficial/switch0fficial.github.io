/* ========================================
   SWITCH - Main JavaScript
   Hand-coded vanilla JS
   ======================================== */

// ========================================
// CONFIG OBJECT - Edit these values
// ========================================
const CONFIG = {
    // Social Links
    links: {
        whatsapp: 'https://whatsapp.com/channel/0029VbAf5sq5fM5b2CXTge32',
        tiktok: 'https://www.tiktok.com/@switch0fficial',
        discord: 'https://discord.gg/fPt2xJ8fZ',
        youtube: 'https://www.youtube.com/@switch0fficial_1',
        email: 'switchtiktokofficial@gmail.com'
    },
    
    // Edits (TikTok videos)
    edits: [
        { title: 'Epic Montage', type: 'edit', url: 'https://vt.tiktok.com/ZSg4uaGBP/', emoji: '🎬' },
        { title: 'Funny Moment', type: 'funny', url: 'https://vt.tiktok.com/ZSg4u4Ubw/', emoji: '😂' },
        { title: 'Pro Edit', type: 'edit', url: 'https://vt.tiktok.com/ZSg4uWnC2/', emoji: '⚡' },
        { title: 'Clutch Play', type: 'edit', url: 'https://vt.tiktok.com/ZSg4Hd387/', emoji: '🔥' },
        { title: 'Hilarious Clip', type: 'funny', url: 'https://vt.tiktok.com/ZSg4HLaGq/', emoji: '🤣' }
    ],
    
    // Websites built
    builds: [
        { 
            name: 'NFK', 
            url: 'https://switch0fficial.github.io/NFK/', 
            tags: ['HTML', 'CSS', 'JS'] 
        },
        { 
            name: 'Lil~Kay ⛷️', 
            url: 'https://switch0fficial.github.io/LilKay/', 
            tags: ['HTML', 'CSS', 'Three.js'] 
        },
        { 
            name: 'AnozieJOHN', 
            url: 'https://switch0fficial.github.io/AnozieJOHN/', 
            tags: ['HTML', 'CSS', 'JS'] 
        },
        { 
            name: 'Raider', 
            url: 'https://switch0fficial.github.io/raider/', 
            tags: ['HTML', 'CSS', 'Three.js'] 
        }
    ],
    
    // Stats (edit these numbers)
    stats: {
        videos: 150,
        followers: 5000
    },
    
    // Three.js settings
    threejs: {
        particleCount: window.innerWidth < 768 ? 200 : 400, // Lower for performance
        cameraSpeed: 0.0005
    }
};

// ========================================
// GLOBAL VARIABLES
// ========================================
let scene, camera, renderer, particles, shapes;
let kineticScene, kineticCamera, kineticRenderer, kineticGyro;
let soundEnabled = false;
let audioContext;
let isVoidMode = false;
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
let gyroRotation = { x: 0, y: 0 };
let gyroVelocity = { x: 0.002, y: 0.002 };
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initModeToggle();
    initSoundToggle();
    initScrollEffects();
    initNavDots();
    initEdits();
    initBuilds();
    initEmailCopy();
    initKonamiCode();
    initThreeBackground();
    initKineticCore();
    initCounters();
    initTypewriter();
    initProfilePhoto();
});

// ========================================
// LOADER
// ========================================
function initLoader() {
    const loader = document.getElementById('loader');
    const progress = document.querySelector('.loader-progress');
    const loaderText = document.querySelector('.loader-text');
    
    let percent = 0;
    const messages = ['Finding opponent...', 'Connecting to server...', 'Loading assets...', 'Ready!'];
    
    const interval = setInterval(() => {
        percent += Math.random() * 15;
        if (percent > 100) percent = 100;
        
        progress.style.width = percent + '%';
        loaderText.textContent = messages[Math.floor((percent / 100) * (messages.length - 1))];
        
        if (percent === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                playSound('ready');
            }, 500);
        }
    }, 100);
}

// ========================================
// CURSOR EFFECTS
// ========================================
function initCursor() {
    const crosshair = document.querySelector('.crosshair');
    const trail = document.querySelector('.cursor-trail');

    // Disable on touch devices and low-end devices
    if (window.matchMedia('(hover: none)').matches || window.innerWidth < 768) {
        crosshair.style.display = 'none';
        trail.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        crosshair.style.left = mouseX + 'px';
        crosshair.style.top = mouseY + 'px';
    });

    // Smooth trail (throttled for performance)
    let lastTrailUpdate = 0;
    function animateTrail() {
        const now = performance.now();
        if (now - lastTrailUpdate > 33) { // Limit to ~30fps for performance
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;

            trail.style.left = trailX + 'px';
            trail.style.top = trailY + 'px';
            lastTrailUpdate = now;
        }
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    
    // Click hit marker
    document.addEventListener('click', (e) => {
        crosshair.classList.add('active');
        playSound('hit');
        setTimeout(() => crosshair.classList.remove('active'), 100);
        
        // Hit marker effect
        const hitMarker = document.createElement('div');
        hitMarker.className = 'hit-marker';
        hitMarker.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 20px;
            height: 20px;
            border: 2px solid #FF1E3C;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            animation: hitMarker 0.3s ease forwards;
        `;
        document.body.appendChild(hitMarker);
        setTimeout(() => hitMarker.remove(), 300);
    });
    
    // Add hit marker animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes hitMarker {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Magnetic buttons
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ========================================
// MODE TOGGLE (Blood/Void)
// ========================================
function initModeToggle() {
    const toggle = document.getElementById('mode-toggle');
    const label = toggle.querySelector('.toggle-label');
    
    toggle.addEventListener('click', () => {
        isVoidMode = !isVoidMode;
        document.body.classList.toggle('void-mode', isVoidMode);
        label.textContent = isVoidMode ? 'VOID' : 'BLOOD';
        playSound('toggle');
        
        // Update Three.js colors
        if (particles) {
            const color = isVoidMode ? 0xB66BFF : 0xFF1E3C;
            particles.material.color.setHex(color);
        }
        
        if (kineticGyro) {
            const color = isVoidMode ? 0xB66BFF : 0xFF1E3C;
            kineticGyro.children.forEach(child => {
                if (child.material) {
                    child.material.color.setHex(color);
                    if (child.material.emissive) {
                        child.material.emissive.setHex(color);
                    }
                }
            });
        }
    });
}

// ========================================
// SOUND TOGGLE
// ========================================
function initSoundToggle() {
    const toggle = document.getElementById('sound-toggle');
    const icon = toggle.querySelector('.sound-icon');
    
    toggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        toggle.classList.toggle('active', soundEnabled);
        icon.textContent = soundEnabled ? '🔊' : '🔇';
        
        if (soundEnabled && !audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    });
}

function playSound(type) {
    if (!soundEnabled || !audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'hit':
            oscillator.frequency.value = 800;
            oscillator.type = 'square';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialDecayTo = 0.01;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.05);
            break;
        case 'toggle':
            oscillator.frequency.value = 400;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'ready':
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
    }
}

// ========================================
// SCROLL EFFECTS
// ========================================
function initScrollEffects() {
    // HP Bar (throttled)
    const hpFill = document.querySelector('.hp-fill');
    let lastScrollUpdate = 0;

    window.addEventListener('scroll', () => {
        const now = performance.now();
        if (now - lastScrollUpdate > 16) { // Throttle to ~60fps
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            hpFill.style.width = scrollPercent + '%';
            lastScrollUpdate = now;
        }
    });

    // Scroll Reveal
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));

    // Active nav dot (throttled)
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    let lastNavUpdate = 0;

    window.addEventListener('scroll', () => {
        const now = performance.now();
        if (now - lastNavUpdate > 100) { // Throttle to 10fps
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.dataset.section === current) {
                    dot.classList.add('active');
                }
            });
            lastNavUpdate = now;
        }
    });
}

// ========================================
// NAVIGATION DOTS
// ========================================
function initNavDots() {
    const dots = document.querySelectorAll('.nav-dot');
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const section = document.getElementById(dot.dataset.section);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ========================================
// EDITS SECTION
// ========================================
function initEdits() {
    const grid = document.querySelector('.edits-grid');
    
    CONFIG.edits.forEach(edit => {
        const card = document.createElement('div');
        card.className = 'edit-card';
        card.dataset.type = edit.type;
        card.innerHTML = `
            <div class="edit-thumbnail">${edit.emoji}</div>
            <div class="edit-info">
                <div class="edit-type">${edit.type}</div>
                <h3 class="edit-title">${edit.title}</h3>
                <a href="${edit.url}" target="_blank" rel="noopener noreferrer" class="edit-link">Watch on TikTok →</a>
            </div>
        `;
        grid.appendChild(card);
    });
    
    // Filter tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const cards = document.querySelectorAll('.edit-card');
            
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// ========================================
// BUILDS SECTION
// ========================================
function initBuilds() {
    const grid = document.querySelector('.builds-grid');
    
    CONFIG.builds.forEach(build => {
        const card = document.createElement('div');
        card.className = 'build-card';
        card.innerHTML = `
            <span class="hand-coded-badge">HAND-CODED</span>
            <h3 class="build-title">${build.name}</h3>
            <div class="build-tags">
                ${build.tags.map(tag => `<span class="build-tag">${tag}</span>`).join('')}
            </div>
            <a href="${build.url}" target="_blank" rel="noopener noreferrer" class="build-link">VIEW SITE →</a>
        `;
        grid.appendChild(card);
    });
}

// ========================================
// EMAIL COPY
// ========================================
function initEmailCopy() {
    const btn = document.getElementById('email-btn');
    
    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(CONFIG.links.email).then(() => {
            showKillFeed('Email copied!');
            playSound('hit');
        });
    });
}

// ========================================
// KILL FEED TOASTS
// ========================================
function showKillFeed(message) {
    const feed = document.querySelector('.kill-feed');
    const toast = document.createElement('div');
    toast.className = 'kill-toast';
    toast.textContent = message;
    feed.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}

// ========================================
// KONAMI CODE EASTER EGG
// ========================================
function initKonamiCode() {
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerGlitchMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function triggerGlitchMode() {
    document.body.style.animation = 'glitchMode 0.5s ease';
    showKillFeed('🎮 KONAMI CODE ACTIVATED!');
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitchMode {
            0%, 100% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 500);
}

// ========================================
// COUNTERS
// ========================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ========================================
// TYPEWRITER EFFECT
// ========================================
function initTypewriter() {
    const tagline = document.querySelector('.hero-tagline');
    const text = 'Blood Strike Creator & Web Developer';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            tagline.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }
    
    setTimeout(type, 1000);
}

// ========================================
// PROFILE PHOTO
// ========================================
function initProfilePhoto() {
    const img = document.getElementById('profile-img');
    const placeholder = document.getElementById('profile-placeholder');

    // Check if image source exists
    if (!img.src || img.src === window.location.href) {
        // No photo, show placeholder
        placeholder.classList.remove('hidden');
        img.style.display = 'none';
        return;
    }

    img.addEventListener('load', () => {
        img.classList.add('loaded');
        img.style.display = 'block';
        placeholder.classList.add('hidden');
    });

    img.addEventListener('error', () => {
        placeholder.classList.remove('hidden');
        img.style.display = 'none';
    });

    // Tap to preview
    img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;

        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 12px;
        `;

        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        modal.addEventListener('click', () => modal.remove());
    });
}

// ========================================
// THREE.JS BACKGROUND
// ========================================
function initThreeBackground() {
    const canvas = document.getElementById('bg-canvas');
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(1); // Cap at 1 for performance
    
    // Particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = CONFIG.threejs.particleCount;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: isVoidMode ? 0xB66BFF : 0xFF1E3C,
        size: 0.5,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Wireframe shapes
    shapes = new THREE.Group();
    const shapeGeometry = new THREE.IcosahedronGeometry(5, 0);
    const shapeMaterial = new THREE.MeshBasicMaterial({
        color: isVoidMode ? 0xB66BFF : 0xFF1E3C,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    
    for (let i = 0; i < 3; i++) {
        const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
        shape.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60
        );
        shape.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01
            }
        };
        shapes.add(shape);
    }
    scene.add(shapes);
    
    // Neon grid
    const gridHelper = new THREE.GridHelper(100, 20, isVoidMode ? 0xB66BFF : 0xFF1E3C, 0x2A2A33);
    gridHelper.position.y = -30;
    scene.add(gridHelper);
    
    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Touch interaction
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    });
    
    // Tap shockwave
    canvas.addEventListener('click', () => {
        particles.scale.set(1.5, 1.5, 1.5);
        setTimeout(() => particles.scale.set(1, 1, 1), 200);
    });
    
    // Animation loop (throttled)
    let lastFrameTime = 0;
    function animate(time) {
        requestAnimationFrame(animate);

        // Limit to 30fps for performance
        if (time - lastFrameTime < 33) return;
        lastFrameTime = time;

        // Rotate particles
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;

        // Rotate shapes
        shapes.children.forEach(shape => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
        });

        // Mouse interaction
        camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Scroll effect - camera dives deeper
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        camera.position.z = 50 - scrollPercent * 30;

        renderer.render(scene, camera);
    }

    animate(0);
    
    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Pause when tab hidden
    document.addEventListener('visibilitychange', () => {
        // Animation loops are already throttled, no need to pause
    });
}

// ========================================
// KINETIC CORE (Gyroscope)
// ========================================
function initKineticCore() {
    const canvas = document.getElementById('kinetic-canvas');
    
    // Scene setup
    kineticScene = new THREE.Scene();
    kineticCamera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    kineticCamera.position.z = 10;
    
    kineticRenderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    kineticRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    kineticRenderer.setPixelRatio(1);
    
    // Gyroscope rings
    kineticGyro = new THREE.Group();
    
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: isVoidMode ? 0xB66BFF : 0xFF1E3C,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    
    // Ring 1 (outer)
    const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(3, 0.05, 8, 32),
        ringMaterial
    );
    kineticGyro.add(ring1);

    // Ring 2 (middle)
    const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(2.2, 0.05, 8, 32),
        ringMaterial
    );
    ring2.rotation.x = Math.PI / 2;
    kineticGyro.add(ring2);

    // Ring 3 (inner)
    const ring3 = new THREE.Mesh(
        new THREE.TorusGeometry(1.5, 0.05, 8, 32),
        ringMaterial
    );
    ring3.rotation.y = Math.PI / 2;
    kineticGyro.add(ring3);

    // Glowing core
    const coreGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: isVoidMode ? 0xB66BFF : 0xFF1E3C,
        transparent: true,
        opacity: 0.9
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    kineticGyro.add(core);
    
    kineticScene.add(kineticGyro);
    
    // Drag interaction
    canvas.addEventListener('mousedown', startDrag);
    canvas.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    function startDrag(e) {
        isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        previousMousePosition = { x: clientX, y: clientY };
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;
        
        gyroVelocity.x = deltaY * 0.001;
        gyroVelocity.y = deltaX * 0.001;
        
        previousMousePosition = { x: clientX, y: clientY };
    }
    
    function endDrag() {
        isDragging = false;
    }
    
    // Click shockwave
    canvas.addEventListener('click', () => {
        kineticGyro.scale.set(1.3, 1.3, 1.3);
        setTimeout(() => kineticGyro.scale.set(1, 1, 1), 200);
        playSound('hit');
    });
    
    // Scroll changes spin speed
    window.addEventListener('scroll', () => {
        const scrollSpeed = 1 + (window.scrollY / 1000);
        gyroVelocity.x *= scrollSpeed;
        gyroVelocity.y *= scrollSpeed;
    });
    
    // Animation loop (throttled)
    let pulseScale = 1;
    let pulseDirection = 1;
    let lastFrameTime = 0;

    function animate(time) {
        requestAnimationFrame(animate);

        // Limit to 30fps for performance
        if (time - lastFrameTime < 33) return;
        lastFrameTime = time;

        // Apply rotation with inertia
        gyroRotation.x += gyroVelocity.x;
        gyroRotation.y += gyroVelocity.y;

        // Apply friction
        gyroVelocity.x *= 0.98;
        gyroVelocity.y *= 0.98;

        // Minimum spin
        if (Math.abs(gyroVelocity.x) < 0.002) gyroVelocity.x = 0.002;
        if (Math.abs(gyroVelocity.y) < 0.002) gyroVelocity.y = 0.002;

        // Rotate rings
        kineticGyro.children[0].rotation.x = gyroRotation.x;
        kineticGyro.children[0].rotation.y = gyroRotation.y;
        kineticGyro.children[1].rotation.x = gyroRotation.x + Math.PI / 2;
        kineticGyro.children[1].rotation.y = gyroRotation.y;
        kineticGyro.children[2].rotation.x = gyroRotation.x;
        kineticGyro.children[2].rotation.y = gyroRotation.y + Math.PI / 2;

        // Pulsing core
        pulseScale += 0.01 * pulseDirection;
        if (pulseScale > 1.2) pulseDirection = -1;
        if (pulseScale < 0.8) pulseDirection = 1;
        kineticGyro.children[3].scale.set(pulseScale, pulseScale, pulseScale);

        kineticRenderer.render(kineticScene, kineticCamera);
    }

    animate(0);
    
    // Resize handler
    window.addEventListener('resize', () => {
        kineticCamera.aspect = canvas.clientWidth / canvas.clientHeight;
        kineticCamera.updateProjectionMatrix();
        kineticRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}
