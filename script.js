// =============================================
// === LOADING SCREEN & INITIALIZATION ===
// =============================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => { loadingScreen.style.display = 'none'; }, 800);
        }, 500); // minimal display time
    }
});

// =============================================
// === LOVE TIMER — Bắt đầu từ 20:00 ngày 20/11/2025 ===
// =============================================
const LOVE_START = new Date('2025-11-20T20:00:00+07:00');

function updateTimer() {
    const now = new Date();
    const diff = Math.max(0, now - LOVE_START); // ms

    const totalSeconds = Math.floor(diff / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    const pad = n => String(n).padStart(2, '0');

    // Welcome screen timer
    const ds = document.getElementById('t-days');
    const hs = document.getElementById('t-hours');
    const ms = document.getElementById('t-minutes');
    const ss = document.getElementById('t-seconds');
    if (ds) ds.textContent = days;
    if (hs) hs.textContent = pad(hours);
    if (ms) ms.textContent = pad(minutes);
    if (ss) {
        // Flash animation on second change
        ss.textContent = pad(seconds);
        ss.style.animation = 'none';
        ss.offsetHeight; // reflow
        ss.style.animation = 'secondFlash 0.5s ease';
    }

    // Fireworks screen timer (same values)
    const fd = document.getElementById('fw-days');
    const fh = document.getElementById('fw-hours');
    const fm = document.getElementById('fw-minutes');
    const fsec = document.getElementById('fw-seconds');
    if (fd) fd.textContent = days;
    if (fh) fh.textContent = pad(hours);
    if (fm) fm.textContent = pad(minutes);
    if (fsec) fsec.textContent = pad(seconds);
}

// Update every second
updateTimer();
setInterval(updateTimer, 1000);


// =============================================
// === THREE.JS — Background Particles ===
// =============================================
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

const colorPalette = [
    new THREE.Color('#ffffff'), // White
    new THREE.Color('#fff9e6'), // Warm white
    new THREE.Color('#e0f7fa'), // Cyan-ish white
    new THREE.Color('#ffeaa7'), // Gold/Yellow
    new THREE.Color('#ffb8b8')  // Soft pink
];

for (let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i]   = (Math.random() - 0.5) * 35; // Spread wider X
    posArray[i+1] = (Math.random() - 0.5) * 35; // Spread wider Y
    posArray[i+2] = (Math.random() - 0.5) * 30 - 5; // Spread deeper Z
    
    // Most stars are white/warm, only a few are colored
    const c = (Math.random() > 0.3) ? colorPalette[0] : colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colorsArray[i] = c.r; colorsArray[i+1] = c.g; colorsArray[i+2] = c.b;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color',    new THREE.BufferAttribute(colorsArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.12, vertexColors: true,
    transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);
camera.position.z = 4;


// =============================================
// === THREE.JS — 3D Globe Gallery (36 ảnh) ===
// =============================================
const realImages = [
    'z7987408132280_b9515decb7cbd6c53dadfa29886b0fc3.jpg',
    'z7987408132659_fa4cae9623a20bfc302db75b13a3d9d7.jpg',
    'z7987408135527_557b186a51bd96111cda97acfb01214a.jpg',
    'z7987408139590_40014b19a30b67cd19be74b47874628b.jpg',
    'z7987408144442_8baad70d77ec90ada8533ad1f51138b9.jpg',
    'z7987408155551_80058dcbc36c331511745253924bd4ad.jpg',
    'z7987408159126_f53f57666ec67d1017aaf888d1e7e6d5.jpg',
    'z7987408162227_05fc3a3f762523d420671e0f7520be8a.jpg',
    'z7987408167808_84c1cbe297b037617af22f907637cc21.jpg',
    'z7987408174227_753437ec166a24806737951c6ecb23a4.jpg',
    'z7987408177293_c6b10e270ab1cc6f79cab4271f8b2f89.jpg',
    'z7987408179860_45be1044c4c3ad79679f4e56a4a6f529.jpg',
    'z7987408180508_2f9ace6a500fddbfab882705d2848d03.jpg',
    'z7987408182024_b03645940c4b605d8ceeb060c953f66a.jpg',
    'z7987408187712_41594c9734dda3aa0f8bc14761ae0f61.jpg',
    'z7987408191212_01996b65c2a19ea363b8a012d84277ae.jpg',
    'z7987408192155_d8539de68380ff8544d2a721cf258a2d.jpg',
    'z7987408203048_164592fa02e884aea05c615659c28ffd.jpg',
    'z7987408203194_e2a5e17d463e6790ca93a310142069e6.jpg',
    'z7987408203405_3cd9e6a4d4c2cd6f4f8d474550a47542.jpg',
    'z7987408206719_27e3584c004ba7520a49fc80c5ce1435.jpg',
    'z7987408213418_d01fa2866e0c76153846e9a84a2fec74.jpg',
    'z7987408218128_1880daca0a48d7d292467cd7a6cdf054.jpg',
    'z7987408220736_6924ef0c4be74740d9937b5f5cc8ec08.jpg',
    'z7987408225541_c40fa15deac8152f83ec62e70bac1ccf.jpg',
    'z7987408226974_0e05615cf4906a4cbedbf2eb4388187e.jpg',
    'z7987408227326_7904d76f6bc6865fa2d9c8137ac2abac.jpg',
    'z7987408232437_0e9db32229b79694f772d46d0e75c98b.jpg',
    'z7987408242833_9059f8d45594079f8424cb5010a2be76.jpg',
    'z7987408247685_5e63a6512118a740f31880cabaeb902e.jpg',
    'z7987408249334_28de8948baeca775c3fe24915be370e3.jpg',
    'z7987408252485_16174e05e3acba11299eac9b73c6410f.jpg',
    'z7987408255389_4341c249a5c1192986adf23da6e30620.jpg',
    'z7987408262236_2fe335735744ac14511301e1f0c912de.jpg',
    'z7987408263726_3a40643ccdba67ed9ff271505ae18bb4.jpg',
    'z7987408132659_fa4cae9623a20bfc302db75b13a3d9d7.jpg' // #36
];

const globeGroup = new THREE.Group();
const textureLoader = new THREE.TextureLoader();
const numImages = realImages.length;
const radius = 5;

for (let i = 0; i < numImages; i++) {
    const imgSrc = realImages[i];
    const texture = textureLoader.load(imgSrc);
    texture.minFilter = THREE.LinearFilter;

    const planeGeo = new THREE.PlaneGeometry(1.5, 2.25);
    const planeMat = new THREE.MeshBasicMaterial({
        map: texture, side: THREE.DoubleSide,
        transparent: true, opacity: 0
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.userData.src = imgSrc;

    const phi   = Math.acos(-1 + (2 * i) / numImages);
    const theta = Math.sqrt(numImages * Math.PI) * phi;
    plane.position.x = radius * Math.cos(theta) * Math.sin(phi);
    plane.position.y = radius * Math.sin(theta) * Math.sin(phi);
    plane.position.z = radius * Math.cos(phi);
    plane.lookAt(0, 0, 0);
    globeGroup.add(plane);
}

globeGroup.visible = false;
scene.add(globeGroup);


// =============================================
// === MOUSE + ANIMATION LOOP ===
// =============================================
let mouseX = 0, mouseY = 0;
// Normalised mouse coordinates for raycaster
const mouseNorm = new THREE.Vector2();

document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
    mouseNorm.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouseNorm.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

const clock = new THREE.Clock();
let isInsideGlobe = false;
let isLightboxOpen = false;

// Raycaster for hover effect
const hoverRaycaster = new THREE.Raycaster();
let hoveredPlane = null;

function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!isInsideGlobe) {
        particlesMesh.rotation.y = t * 0.05;
        particlesMesh.rotation.x = t * 0.02;
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    } else {
        globeGroup.rotation.y += 0.0015;
        globeGroup.rotation.x += 0.0005;
        if (!isLightboxOpen) {
            // Minimum sensitivity
            camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.002;
            camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.002;
            camera.lookAt(0, 0, 0);

            // Hover effect
            hoverRaycaster.setFromCamera(mouseNorm, camera);
            const intersects = hoverRaycaster.intersectObjects(globeGroup.children);
            
            if (intersects.length > 0) {
                const object = intersects[0].object;
                if (hoveredPlane !== object) {
                    if (hoveredPlane) {
                        gsap.to(hoveredPlane.scale, { x: 1, y: 1, duration: 0.2 });
                        gsap.to(hoveredPlane.material.color, { r: 1, g: 1, b: 1, duration: 0.2 });
                    }
                    hoveredPlane = object;
                    gsap.to(hoveredPlane.scale, { x: 1.06, y: 1.06, duration: 0.2 });
                    gsap.to(hoveredPlane.material.color, { r: 1, g: 0.85, b: 0.85, duration: 0.2 });
                }
            } else {
                if (hoveredPlane) {
                    gsap.to(hoveredPlane.scale, { x: 1, y: 1, duration: 0.2 });
                    gsap.to(hoveredPlane.material.color, { r: 1, g: 1, b: 1, duration: 0.2 });
                    hoveredPlane = null;
                }
            }
        }
    }
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// =============================================
// === FIREWORKS ENGINE (Canvas 2D) ===
// =============================================
const fwCanvas  = document.getElementById('fireworks-canvas');
const fwCtx     = fwCanvas.getContext('2d');
let fwRunning   = false;
let fwParticles = [];
let fwAnimId    = null;

function resizeFwCanvas() {
    fwCanvas.width  = window.innerWidth;
    fwCanvas.height = window.innerHeight;
}
resizeFwCanvas();
window.addEventListener('resize', resizeFwCanvas);

const FIREWORK_COLORS = [
    '#ff6b81','#ffd700','#00cfff','#ff9a9e','#a18cd1',
    '#fbc531','#e84393','#00ff88','#ff4757','#ecf0f1'
];

class FwParticle {
    constructor(x, y, color) {
        this.x = x; this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = 0.012 + Math.random() * 0.012;
        this.size  = 2.5 + Math.random() * 2;
        this.trail = [];
    }
    update() {
        this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
        if (this.trail.length > 6) this.trail.shift();
        this.x  += this.vx;
        this.y  += this.vy;
        this.vy += 0.09; // gravity
        this.vx *= 0.98;
        this.alpha -= this.decay;
    }
    draw(ctx) {
        // Trail
        this.trail.forEach((p, i) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, this.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = p.alpha * (i / this.trail.length) * 0.3;
            ctx.fill();
        });
        // Head
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.shadowColor = this.color;
        ctx.shadowBlur  = 10;
        ctx.fill();
        ctx.shadowBlur  = 0;
        ctx.globalAlpha = 1;
    }
}

function launchFirework() {
    const x = 80 + Math.random() * (fwCanvas.width - 160);
    const y = 60 + Math.random() * (fwCanvas.height * 0.55);
    const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
    
    // Giảm số lượng hạt pháo hoa nếu là điện thoại (đỡ lag)
    const isMobile = window.innerWidth <= 768;
    const count = isMobile ? (25 + Math.floor(Math.random() * 20)) : (80 + Math.floor(Math.random() * 60));
    
    for (let i = 0; i < count; i++) {
        fwParticles.push(new FwParticle(x, y, color));
    }
}

function fireworksLoop() {
    fwCtx.fillStyle = 'rgba(0,0,0,0.18)';
    fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);

    fwParticles = fwParticles.filter(p => p.alpha > 0.01);
    fwParticles.forEach(p => { p.update(); p.draw(fwCtx); });

    fwAnimId = requestAnimationFrame(fireworksLoop);
}

function startFireworks() {
    fwCanvas.style.display = 'block';
    fwRunning = true;
    fireworksLoop();

    // Launch salvos
    const salvo = () => {
        if (!fwRunning) return;
        
        // Giảm số chùm pháo bắn cùng lúc trên điện thoại
        const isMobile = window.innerWidth <= 768;
        const burstCount = isMobile ? (1 + Math.floor(Math.random() * 1)) : (2 + Math.floor(Math.random() * 3));
        
        for (let b = 0; b < burstCount; b++) {
            setTimeout(launchFirework, b * 120);
        }
        setTimeout(salvo, (isMobile ? 800 : 600) + Math.random() * 500);
    };
    salvo();
}


// =============================================
// === UI LOGIC & GSAP ANIMATIONS ===
// =============================================
const openBtn        = document.getElementById('open-letter-btn');
const welcomeScreen  = document.getElementById('welcome-screen');
const mainScreen     = document.getElementById('main-screen');
const fireworksScreen= document.getElementById('fireworks-screen');
const bgMusic        = document.getElementById('bg-music');
const textContainer  = document.getElementById('text-container');
const typewriterText = document.getElementById('typewriter-text');
const heartGallery   = document.getElementById('heart-gallery-container');
const finalBtn       = document.getElementById('final-btn');
const beatingHeart   = document.querySelector('.beating-heart');
const imageSpinner   = document.querySelector('.image-spinner');
// Dove elements
const doveScene      = document.getElementById('dove-scene');
const doveFly        = document.getElementById('dove-fly');
const miniLetter     = document.getElementById('mini-letter');
const mlSparkle      = document.querySelector('.ml-sparkle');
const wingTopEl      = document.getElementById('wing-top');
const wingBotEl      = document.getElementById('wing-bottom');

const letterContent = "Gửi bé yêu,\nThời gian qua, anh biết mình đã có những lúc chưa đủ tinh tế, nhiều lúc chưa suy nghĩ được nhiều và làm bé buồn... Nhưng em bé à, mọi khoảnh khắc bên em đều là những ký ức tuyệt đẹp mà anh luôn trân trọng. Dù thế giới này có bao nhiêu điều đẹp đẽ đi chăng nữa, anh vẫn chỉ hướng về bé thôi. Vì với anh em là người đẹp nhất rồi. Anh thì hông biết gấp sao, nhưng  mà anh biết cách làm ra sao hihi. Bé cùng anh nhìn ngắm không gian này nhé, có thể nó chưa được đẹp nhưng nó là cả bầu trời mà anh muốn gửi tới bé í...\n\n(Hãy chạm vào trái tim nhé ❤️)";

// Audio Controls
const audioControlBtn = document.getElementById('audio-control');
let isMuted = false;

audioControlBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    audioControlBtn.innerHTML = isMuted ? '🔇' : '🔊';
});

// Open letter button
openBtn.addEventListener('click', () => {
    bgMusic.volume = 0.7;
    bgMusic.play().catch(e => console.log('Audio:', e));
    audioControlBtn.classList.remove('hidden');

    gsap.to(welcomeScreen, {
        opacity: 0,
        filter: 'blur(15px)',
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
            welcomeScreen.classList.remove('active');
            welcomeScreen.classList.add('hidden');
            mainScreen.classList.remove('hidden');
            mainScreen.classList.add('active');
            gsap.to(particlesMaterial, { size: 0.1, duration: 1.5, yoyo: true, repeat: 1 });
            startMainSequence();
        }
    });
});

function startMainSequence() {
    // Show the dove scene overlay
    doveScene.style.display = 'flex';

    // Place dove at bottom-right of center
    const startX =  window.innerWidth  * 0.38;
    const startY =  window.innerHeight * 0.35;
    gsap.set(doveFly,    { x: startX, y: startY, opacity: 0, scale: 0.45, rotation: 12 });
    gsap.set(miniLetter, { opacity: 0, y: -30, scale: 1 }); // starts above center, falls in

    const tl = gsap.timeline();

    // 1. Dove materialises
    tl.to(doveFly, { opacity: 1, scale: 1, duration: 0.5, ease: 'power1.out' })

    // 2. Fly in arc: first rise slightly, then glide to centre
      .to(doveFly, {
          x: startX * 0.4,
          y: -window.innerHeight * 0.06,
          rotation: 5,
          duration: 1.3,
          ease: 'power1.out'
      })
      .to(doveFly, {
          x: 0, y: 0, rotation: 0,
          duration: 1.0,
          ease: 'power2.inOut'
      })

    // 3. Dove slows, gentle hover bob
      .to(doveFly, { y: -14, duration: 0.28, ease: 'sine.inOut' })
      .to(doveFly, { y:   6, duration: 0.28, ease: 'sine.inOut' })
      .to(doveFly, { y:   0, duration: 0.22, ease: 'sine.inOut' })

    // 4. Letter drops at screen center (independent of dove)
      .to(miniLetter, {
          opacity: 1, y: 0,
          duration: 0.55,
          ease: 'bounce.out'
      }, '-=0.1')
      .to(mlSparkle, { opacity: 1, duration: 0.3 })

    // 5. Dove speeds wings and flies away upper-left
      .add(() => {
          wingTopEl.style.animationDuration = '0.14s';
          wingBotEl.style.animationDuration = '0.14s';
      }, '+=0.5')
      .to(doveFly, {
          x: -window.innerWidth * 0.45,
          y: -window.innerHeight * 0.38,
          opacity: 0,
          scale: 0.35,
          rotation: -18,
          duration: 1.1,
          ease: 'power3.in'
      })

    // 6. Mini-letter zooms out & fills screen (transition to text)
      .to(miniLetter, {
          scale: 22,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.in',
          transformOrigin: '50% 50%'
      }, '-=0.6')

    // 7. Hide dove scene, show text glass card
      .add(() => { doveScene.style.display = 'none'; })
      .to(textContainer, {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'back.out(1.4)',
          onComplete: startTypewriter
      });
}

function startTypewriter() {
    let i = 0;
    typewriterText.innerHTML = '';
    function typeWriter() {
        if (i < letterContent.length) {
            const ch = letterContent.charAt(i);
            typewriterText.innerHTML += (ch === '\n') ? '<br>' : ch;
            i++;
            setTimeout(typeWriter, 40);
        } else {
            showGallery();
        }
    }
    setTimeout(typeWriter, 500);
}

function showGallery() {
    heartGallery.classList.remove('hidden');
    gsap.from(heartGallery, { opacity: 0, y: 50, scale: 0.5, duration: 1.5, ease: 'back.out(1.5)' });
}

// Click Heart → Globe
beatingHeart.addEventListener('click', () => {
    gsap.to([textContainer, imageSpinner, beatingHeart], {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0.9,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
            textContainer.style.display   = 'none';
            imageSpinner.style.display    = 'none';
            beatingHeart.style.display    = 'none';
        }
    });

    globeGroup.visible = true;
    globeGroup.children.forEach(p => gsap.to(p.material, { opacity: 0.9, duration: 2.5, ease: 'power1.inOut' }));
    isInsideGlobe = true;
    gsap.to(camera.position, { z: 0, duration: 3.5, ease: 'power3.inOut' });

    setTimeout(() => {
        finalBtn.classList.remove('hidden');
        gsap.to(finalBtn, { display: 'block', opacity: 1, y: -20, duration: 1 });
    }, 2500);
});

// Final button → Fireworks screen
finalBtn.addEventListener('click', () => {
    // Transition to fireworks screen
    gsap.to([heartGallery, finalBtn], { 
        opacity: 0, filter: 'blur(15px)', scale: 0.8, duration: 1.2, ease: 'power2.in' 
    });

    // Fade out globe
    globeGroup.children.forEach(p => gsap.to(p.material, { opacity: 0, duration: 1.5 }));
    gsap.to(camera.position, { z: 4, duration: 2.5, ease: 'power2.inOut' });

    setTimeout(() => {
        isInsideGlobe = false;

        // Show fireworks screen
        fireworksScreen.classList.remove('hidden');
        gsap.set(fireworksScreen, { opacity: 0, scale: 0.85, filter: 'blur(10px)' });
        fireworksScreen.classList.add('active');
        gsap.to(fireworksScreen, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'back.out(1.2)' });

        // Start fireworks canvas
        startFireworks();
    }, 1000);
});


// =============================================
// === LIGHTBOX (Raycaster click on globe) ===
// =============================================
const raycaster      = new THREE.Raycaster();
const mouse          = new THREE.Vector2();
const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightbox-img');
const lightboxContent= document.querySelector('.lightbox-content');
const closeLightboxBtn = document.getElementById('close-lightbox');

function openLightbox(src) {
    isLightboxOpen = true;
    lightboxImg.src = src;
    gsap.set(lightboxContent, { scale: 0.3, opacity: 0 });
    lightbox.style.display = 'flex';
    canvas.classList.add('canvas-blur');
    gsap.to(lightbox,        { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.to(lightboxContent, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)', delay: 0.1 });
}

function closeLightbox() {
    gsap.to(lightboxContent, { scale: 0.3, opacity: 0, duration: 0.35, ease: 'power2.in' });
    gsap.to(lightbox, {
        opacity: 0, duration: 0.4, delay: 0.2,
        onComplete: () => {
            lightbox.style.display = 'none';
            canvas.classList.remove('canvas-blur');
            isLightboxOpen = false;
        }
    });
}

closeLightboxBtn.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) closeLightbox();
});

window.addEventListener('click', event => {
    if (!isInsideGlobe) return;
    if (event.target.closest('#final-btn')) return;
    if (isLightboxOpen) return;

    mouse.x =  (event.clientX / window.innerWidth)  * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const hits = raycaster.intersectObjects(globeGroup.children);
    if (hits.length > 0) {
        const plane = hits[0].object;
        if (plane.userData.src) {
            openLightbox(plane.userData.src);
            gsap.to(plane.scale, { x: 1.15, y: 1.15, duration: 0.25, yoyo: true, repeat: 1 });
        }
    }
});
