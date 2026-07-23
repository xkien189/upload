/* =============================================
   SCRIPT.JS — Ký Ức Thanh Xuân
   Interactive Memory Page
   ============================================= */

// ===========================
// LOADING SCREEN
// ===========================
(function () {
    const loadingScreen = document.getElementById('loading-screen');
    const loaderBar     = document.getElementById('loader-bar');
    const loaderText    = document.getElementById('loader-text');
    const phrases = [
        'Đang tua lại những khoảnh khắc...',
        'Mở cuốn album ký ức...',
        'Sắp xếp những tấm ảnh...',
        'Chuẩn bị hành trình...',
        'Sẵn sàng! 🎬'
    ];

    let progress = 0;
    let phraseIndex = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 18 + 5;
        if (progress > 100) progress = 100;
        loaderBar.style.width = progress + '%';

        phraseIndex = Math.floor((progress / 100) * (phrases.length - 1));
        loaderText.textContent = phrases[phraseIndex];

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => { loadingScreen.remove(); }, 800);
            }, 400);
        }
    }, 120);
})();

// ===========================
// PARTICLES CANVAS
// ===========================
(function () {
    const canvas = document.getElementById('particles-canvas');
    const ctx    = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COLORS = [
        'rgba(212,168,67,',
        'rgba(240,201,106,',
        'rgba(232,224,208,',
        'rgba(196,123,184,',
        'rgba(124,159,201,'
    ];

    class Particle {
        constructor() { this.reset(true); }
        reset(init) {
            this.x     = Math.random() * W;
            this.y     = init ? Math.random() * H : H + 10;
            this.size  = Math.random() * 1.5 + 0.4;
            this.speed = Math.random() * 0.4 + 0.1;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.drift = (Math.random() - 0.5) * 0.3;
        }
        update() {
            this.y -= this.speed;
            this.x += this.drift;
            if (this.y < -10) this.reset(false);
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.fill();
        }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    function loop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }
    loop();
})();

// ===========================
// HERO START BUTTON
// ===========================
const startBtn    = document.getElementById('start-btn');
const mainContent = document.getElementById('main-content');
const scrollHint  = document.getElementById('scroll-hint');
const audioWidget = document.getElementById('audio-widget');
const bgMusic     = document.getElementById('bg-music');

startBtn.addEventListener('click', () => {
    // Play music
    bgMusic.volume = 0.55;
    bgMusic.play().catch(() => {});
    audioWidget.classList.remove('hidden');

    // Reveal main content
    mainContent.classList.remove('hidden');

    // Smooth scroll to main content
    setTimeout(() => {
        mainContent.scrollIntoView({ behavior: 'smooth' });
        // Initialize observers AFTER content is visible in DOM
        initRevealObservers();
    }, 150);

    // Hide scroll hint and animate button
    startBtn.style.transform = 'scale(0.95)';
    startBtn.style.opacity = '0.5';
    startBtn.disabled = true;
    if (scrollHint) scrollHint.style.opacity = '0';
});

// ===========================
// SCROLL REVEAL (Intersection Observer)
// ===========================
function initRevealObservers() {
    const revealTargets = [
        ...document.querySelectorAll('.memory-card'),
        ...document.querySelectorAll('.chapter-intro'),
        ...document.querySelectorAll('.video-section'),
        ...document.querySelectorAll('.photo-wall-section'),
        document.querySelector('.final-content')
    ].filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => observer.observe(el));
}

// ===========================
// PAGE PROGRESS BAR
// ===========================
const pageProgress = document.getElementById('page-progress');

window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    pageProgress.style.width = pct + '%';
});

// ===========================
// VIDEO PLAYER
// ===========================
const video       = document.getElementById('main-video');
const vidPlayBtn  = document.getElementById('vid-play-btn');
const vidMuteBtn  = document.getElementById('vid-mute-btn');
const vidProgress = document.getElementById('vid-progress');
const vidWrap     = document.querySelector('.vid-progress-wrap');

if (video && vidPlayBtn) {
    vidPlayBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            vidPlayBtn.textContent = '⏸';
        } else {
            video.pause();
            vidPlayBtn.textContent = '▶';
        }
    });

    video.addEventListener('click', () => {
        vidPlayBtn.click();
    });

    vidMuteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        vidMuteBtn.textContent = video.muted ? '🔇' : '🔊';
    });

    video.addEventListener('timeupdate', () => {
        if (video.duration) {
            const pct = (video.currentTime / video.duration) * 100;
            vidProgress.style.width = pct + '%';
        }
    });

    video.addEventListener('ended', () => {
        vidPlayBtn.textContent = '▶';
    });

    if (vidWrap) {
        vidWrap.addEventListener('click', (e) => {
            const rect = vidWrap.getBoundingClientRect();
            const pct  = (e.clientX - rect.left) / rect.width;
            video.currentTime = pct * video.duration;
        });
    }

    // Auto-play video (muted) when in view
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
                vidPlayBtn.textContent = '⏸';
            } else {
                video.pause();
                vidPlayBtn.textContent = '▶';
            }
        });
    }, { threshold: 0.5 });

    if (document.getElementById('video-section')) {
        videoObserver.observe(document.getElementById('video-section'));
    }
}

// ===========================
// AUDIO WIDGET
// ===========================
const awToggle = document.getElementById('aw-toggle');
const awVisualizer = document.querySelector('.aw-visualizer');
let musicMuted = false;

if (awToggle) {
    awToggle.addEventListener('click', () => {
        musicMuted = !musicMuted;
        bgMusic.muted = musicMuted;
        awToggle.textContent = musicMuted ? '🔇' : '🔊';
        awToggle.classList.toggle('muted', musicMuted);
        // Freeze/unfreeze visualizer
        if (awVisualizer) {
            awVisualizer.querySelectorAll('span').forEach(s => {
                s.style.animationPlayState = musicMuted ? 'paused' : 'running';
            });
        }
    });
}

// ===========================
// LIGHTBOX
// ===========================
const images = [
    { src: 'z8022019183566_df59fa0b2b99f079d78655c90b3bf5e1.jpg', caption: '01 — Ngày Đầu Tiên Gặp Nhau · Lễ Khai Giảng ĐH Hạ Long' },
    { src: 'z8022019193137_f0a7cd5acd798e01416c81cc298a31a0.jpg', caption: '02 — Hội Trốn Tiết Chơi Game · Giờ Học "Nghiêm Túc"' },
    { src: 'z8022019193309_b02f86b6fc7a8e8736ec757e6dd982c8.jpg', caption: '03 — Đêm Không Ngủ Cùng Nhau · Hạ Long Về Đêm' },
    { src: 'z8022019195044_72a3a3ff26d5523cc740d19a72c4de99.jpg', caption: '04 — Tiệc Sinh Nhật Bất Ngờ · 8/10' },
    { src: 'z8022019205489_a7803dcdee851dfa3d24c183982eb435.jpg', caption: '05 — Đôi Bạn Thân Thiết · Khoảnh Khắc Tự Nhiên' },
    { src: 'z8022019231174_f03060d8ffcab162d3aab101ee12406d.jpg', caption: '06 — Buổi Chiều Tà Vỉa Hè · Chanh Leo & Chuyện Trò' },
    { src: 'z8022019233360_cc3aafa72ad560c7715f328b23691811.jpg', caption: '07 — Cùng Nhau Trên Những Con Đường · Road Trip' },
    { src: 'z8022019250538_706cd76fd32e487d9a567cddf62d0ba3.jpg', caption: '08 — Đêm Nhạc Đáng Nhớ · Sống Hết Mình' }
];

let currentLbIndex = 0;
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbClose   = document.getElementById('lb-close');
const lbPrev    = document.getElementById('lb-prev');
const lbNext    = document.getElementById('lb-next');

function openLightbox(index) {
    currentLbIndex = index;
    lbImg.src = images[index].src;
    lbImg.alt = images[index].caption;
    lbCaption.textContent = images[index].caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

function showNext() {
    currentLbIndex = (currentLbIndex + 1) % images.length;
    lbImg.style.opacity = '0';
    setTimeout(() => {
        lbImg.src = images[currentLbIndex].src;
        lbCaption.textContent = images[currentLbIndex].caption;
        lbImg.style.opacity = '1';
    }, 200);
}

function showPrev() {
    currentLbIndex = (currentLbIndex - 1 + images.length) % images.length;
    lbImg.style.opacity = '0';
    setTimeout(() => {
        lbImg.src = images[currentLbIndex].src;
        lbCaption.textContent = images[currentLbIndex].caption;
        lbImg.style.opacity = '1';
    }, 200);
}

if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lbNext)  lbNext.addEventListener('click', showNext);
if (lbPrev)  lbPrev.addEventListener('click', showPrev);

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// Keyboard nav
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowRight')  showNext();
    if (e.key === 'ArrowLeft')   showPrev();
});

// lbImg opacity transition
if (lbImg) {
    lbImg.style.transition = 'opacity 0.2s ease';
}

// Memory cards also open lightbox on click
document.querySelectorAll('.memory-media-wrap').forEach((wrap, i) => {
    wrap.addEventListener('click', () => openLightbox(i));
    wrap.title = 'Nhấn để phóng to';
});

// ===========================
// SMOOTH PARALLAX ON HERO
// ===========================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.getElementById('hero');
    if (hero && scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
        hero.style.opacity   = 1 - scrollY / window.innerHeight;
    }
});

// ===========================
// TOUCH SWIPE FOR LIGHTBOX
// ===========================
let touchStartX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (!lightbox.classList.contains('open')) return;
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
        if (diff < 0) showNext();
        else showPrev();
    }
}, { passive: true });

// ===========================
// EXPOSE openLightbox globally
// ===========================
window.openLightbox = openLightbox;
