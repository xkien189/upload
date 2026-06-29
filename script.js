// --- Three.js Background Setup ---
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2500;
const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

const colorPalette = [
    new THREE.Color('#ff9a9e'),
    new THREE.Color('#fecfef'),
    new THREE.Color('#a18cd1'),
    new THREE.Color('#ffffff'),
    new THREE.Color('#ffecd2')
];

for(let i = 0; i < particlesCount * 3; i+=3) {
    posArray[i] = (Math.random() - 0.5) * 20;
    posArray[i+1] = (Math.random() - 0.5) * 20;
    posArray[i+2] = (Math.random() - 0.5) * 15 - 5;

    const randColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colorsArray[i] = randColor.r;
    colorsArray[i+1] = randColor.g;
    colorsArray[i+2] = randColor.b;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 4;

// --- 36 Real Images ---
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
    // Repeat a few to fill up to 36 unique slots
    'z7987408132280_b9515decb7cbd6c53dadfa29886b0fc3.jpg'
];

// --- 3D Globe Gallery Setup ---
const globeGroup = new THREE.Group();
const textureLoader = new THREE.TextureLoader();
const numImages = realImages.length; // 36 images
const radius = 5;

for (let i = 0; i < numImages; i++) {
    const imgSrc = realImages[i];
    const texture = textureLoader.load(imgSrc);
    texture.minFilter = THREE.LinearFilter;
    
    const planeGeo = new THREE.PlaneGeometry(1.5, 2.25);
    const planeMat = new THREE.MeshBasicMaterial({ 
        map: texture, 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.userData.src = imgSrc;

    // Fibonacci sphere distribution
    const phi = Math.acos(-1 + (2 * i) / numImages);
    const theta = Math.sqrt(numImages * Math.PI) * phi;
    
    plane.position.x = radius * Math.cos(theta) * Math.sin(phi);
    plane.position.y = radius * Math.sin(theta) * Math.sin(phi);
    plane.position.z = radius * Math.cos(phi);
    
    plane.lookAt(0, 0, 0);
    globeGroup.add(plane);
}

globeGroup.visible = false;
scene.add(globeGroup);

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();
let isInsideGlobe = false;
let isLightboxOpen = false;

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    
    if (!isInsideGlobe) {
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    } else {
        // Globe always rotates, even when lightbox is open
        globeGroup.rotation.y += 0.0015;
        globeGroup.rotation.x += 0.0005;
        
        if (!isLightboxOpen) {
            // Parallax - MINIMUM sensitivity (factor 0.003)
            camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.003;
            camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.003;
            camera.lookAt(0, 0, 0);
        }
    }

    renderer.render(scene, camera);
}
animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- UI Logic and GSAP Animations ---
const openBtn = document.getElementById('open-letter-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const mainScreen = document.getElementById('main-screen');
const bgMusic = document.getElementById('bg-music');
const textContainer = document.getElementById('text-container');
const typewriterText = document.getElementById('typewriter-text');
const heartGallery = document.getElementById('heart-gallery-container');
const envelopeContainer = document.getElementById('envelope-container');
const flap = document.querySelector('.flap');
const letterPaper = document.querySelector('.letter-paper');
const finalBtn = document.getElementById('final-btn');
const beatingHeart = document.querySelector('.beating-heart');
const imageSpinner = document.querySelector('.image-spinner');

const letterContent = "Gửi em,\nCó những điều anh luôn giấu kín, có những cảm xúc anh chưa từng nói ra. Thời gian qua, anh biết mình đã có những lúc chưa đủ tinh tế, chưa hiểu hết những mong muốn của em... Nhưng em biết không, mọi khoảnh khắc bên em đều là những ký ức tuyệt đẹp mà anh luôn trân trọng. Dù bầu trời có bao nhiêu vì sao, anh vẫn chỉ hướng về một người. Nhìn ngắm không gian này nhé, nó giống hệt như thế giới trong anh khi có em vậy...\n\n(Hãy chạm vào trái tim nhé ❤️)";

openBtn.addEventListener('click', () => {
    bgMusic.play().catch(e => console.log("Audio play failed:", e));

    gsap.to(welcomeScreen, {
        opacity: 0,
        duration: 1,
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
    const tl = gsap.timeline();
    tl.from(envelopeContainer, { opacity: 0, y: 50, duration: 1, ease: "power2.out" })
      .to(flap, { rotateX: 180, duration: 1, ease: "power2.inOut" }, "+=0.5")
      .to(letterPaper, { y: -150, zIndex: 5, duration: 1.2, ease: "power2.out" })
      .to(envelopeContainer, { opacity: 0, scale: 0.8, duration: 1, ease: "power2.in", onComplete: () => {
          envelopeContainer.style.display = 'none';
      }}, "+=0.5")
      .to(textContainer, { opacity: 1, y: -20, duration: 1, onComplete: startTypewriter });
}

function startTypewriter() {
    let i = 0;
    const speed = 40;
    typewriterText.innerHTML = "";
    
    function typeWriter() {
        if (i < letterContent.length) {
            const char = letterContent.charAt(i);
            typewriterText.innerHTML += (char === '\n') ? "<br>" : char;
            i++;
            setTimeout(typeWriter, speed);
        } else {
            showGalleryAndFinalButton();
        }
    }
    setTimeout(typeWriter, 500);
}

function showGalleryAndFinalButton() {
    heartGallery.classList.remove('hidden');
    gsap.from(heartGallery, { opacity: 0, y: 50, scale: 0.5, duration: 1.5, ease: "back.out(1.5)" });
}

// Click Heart → Enter 3D Globe
beatingHeart.addEventListener('click', () => {
    gsap.to([textContainer, imageSpinner, beatingHeart], { 
        opacity: 0, duration: 1, 
        onComplete: () => {
            textContainer.style.display = 'none';
            imageSpinner.style.display = 'none';
            beatingHeart.style.display = 'none';
        }
    });

    globeGroup.visible = true;
    globeGroup.children.forEach(plane => {
        gsap.to(plane.material, { opacity: 0.9, duration: 2 });
    });

    isInsideGlobe = true;
    gsap.to(camera.position, { z: 0, duration: 3, ease: "power3.inOut" });

    setTimeout(() => {
        finalBtn.classList.remove('hidden');
        gsap.to(finalBtn, { display: 'block', opacity: 1, y: -20, duration: 1 });
    }, 2500);
});

finalBtn.addEventListener('click', () => {
    finalBtn.innerHTML = "Anh thương em nhiều lắm ❤️";
    finalBtn.style.backgroundColor = "rgba(255, 71, 87, 0.5)";
    gsap.to(globeGroup.rotation, { y: globeGroup.rotation.y + 10, duration: 8, ease: "power2.in" });
});

// --- Image Click to Zoom (Raycaster + Lightbox) ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxContent = document.querySelector('.lightbox-content');
const closeLightboxBtn = document.getElementById('close-lightbox');

function openLightbox(imgSrc) {
    isLightboxOpen = true;
    lightboxImg.src = imgSrc;
    
    // Reset state before animating in
    gsap.set(lightboxContent, { scale: 0.3, opacity: 0 });
    lightbox.style.display = 'flex';
    canvas.classList.add('canvas-blur');

    // Animate the backdrop and content separately
    gsap.to(lightbox, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.to(lightboxContent, { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5, 
        ease: 'back.out(1.4)',
        delay: 0.1
    });
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

closeLightboxBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
});

// Close on backdrop click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
        closeLightbox();
    }
});

// Click images in 3D globe
window.addEventListener('click', (event) => {
    if (!isInsideGlobe) return;
    if (event.target.closest('#final-btn')) return;
    if (isLightboxOpen) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(globeGroup.children);

    if (intersects.length > 0) {
        const clickedPlane = intersects[0].object;
        const imgSrc = clickedPlane.userData.src;
        if (imgSrc) {
            openLightbox(imgSrc);
            gsap.to(clickedPlane.scale, { x: 1.15, y: 1.15, duration: 0.25, yoyo: true, repeat: 1 });
        }
    }
});
