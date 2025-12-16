// ========================================
// Memory Tunnel - Animations & Rendering
// ========================================

// Render the timeline from data
function renderTimeline() {
    const timeline = document.getElementById('timeline');
    const { chapters, memories } = MEMORIES_DATA;
    
    let currentChapter = null;
    let html = '';
    
    memories.forEach((memory, index) => {
        // Add chapter marker if new chapter
        if (memory.chapter !== currentChapter) {
            currentChapter = memory.chapter;
            html += `
                <div class="chapter-marker">
                    <span>${chapters[currentChapter]}</span>
                </div>
            `;
        }
        
        // Add memory card
        const styleClass = memory.style ? ` ${memory.style}` : '';
        
        // Check if it's a video or photo
        let mediaHtml;
        if (memory.video) {
            mediaHtml = `
                <video src="photos/${memory.video}" playsinline muted loop></video>
                <div class="play-button">▶</div>
            `;
        } else {
            mediaHtml = `<img src="photos/${memory.photo}" alt="${memory.title}">`;
        }
        
        html += `
            <div class="memory-card${styleClass}${memory.video ? ' has-video' : ''}" data-aos="fade-up">
                <div class="memory-image">
                    ${mediaHtml}
                    <div class="memory-number">${String(memory.id).padStart(2, '0')}</div>
                </div>
                <div class="memory-content">
                    <div class="memory-tag">${memory.tag}</div>
                    <h3>${memory.title}</h3>
                    <p>${memory.description}</p>
                </div>
            </div>
        `;
    });
    
    timeline.innerHTML = html;
}

// Render songs from data
function renderSongs() {
    const songsList = document.getElementById('songs-list');
    const { songs } = MEMORIES_DATA;
    
    if (!songs || songs.length === 0) {
        songsList.innerHTML = '<p class="empty-message">Şarkılar eklenecek...</p>';
        return;
    }
    
    let html = '';
    songs.forEach((song, index) => {
        html += `
            <div class="song-card" data-aos="fade-up">
                <div class="song-number">${index + 1}</div>
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
                <div class="song-memory">${song.memory}</div>
            </div>
        `;
    });
    
    songsList.innerHTML = html;
}

// Render final message from data
function renderFinalMessage() {
    const { finalMessage } = MEMORIES_DATA;
    
    document.getElementById('final-title').textContent = finalMessage.title;
    document.getElementById('final-p1').textContent = finalMessage.paragraph1;
    document.getElementById('final-p2').textContent = finalMessage.paragraph2;
    document.getElementById('final-signature').textContent = finalMessage.signature;
}

// Scroll-based animations for memory cards
function initScrollAnimations() {
    const cards = document.querySelectorAll('.memory-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    cards.forEach(card => observer.observe(card));
}

// Final confetti
function initFinalConfetti() {
    const finalSection = document.querySelector('.final-message');
    const container = document.getElementById('final-confetti');
    let confettiTriggered = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !confettiTriggered) {
                confettiTriggered = true;
                createConfetti(container);
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(finalSection);
}

function createConfetti(container) {
    const colors = ['#d4a574', '#e8c9a0', '#e8b4b8', '#c77d8e', '#f5ebe0', '#b8a9c9'];
    const shapes = ['circle', 'square'];
    
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        confetti.style.backgroundColor = color;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (3 + Math.random() * 2) + 's';
        
        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        }
        
        container.appendChild(confetti);
    }
}

// Parallax effect for hero
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight);
        }
    });
}

// Video auto-play when scrolled into view
function initVideoPlayers() {
    const videoCards = document.querySelectorAll('.memory-card.has-video');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            const playBtn = entry.target.querySelector('.play-button');
            
            if (!video) return;
            
            if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                // Card is mostly visible - play video
                video.play();
                if (playBtn) playBtn.style.opacity = '0';
                entry.target.classList.add('video-playing');
            } else {
                // Card is not visible enough - pause video
                video.pause();
                if (playBtn) playBtn.style.opacity = '1';
                entry.target.classList.remove('video-playing');
            }
        });
    }, {
        threshold: [0, 0.6, 1],
        rootMargin: '-10% 0px -10% 0px'
    });
    
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            // Loop videos
            video.loop = true;
            video.muted = true; // Must be muted for autoplay to work
            
            // Click to toggle mute
            card.addEventListener('click', (e) => {
                if (e.target.closest('.memory-content')) return;
                video.muted = !video.muted;
                card.classList.toggle('unmuted', !video.muted);
            });
        }
        
        observer.observe(card);
    });
}

// Image loading placeholder
function initImagePlaceholders() {
    const images = document.querySelectorAll('.memory-image img');
    
    images.forEach(img => {
        img.style.backgroundColor = '#1a191f';
        
        img.addEventListener('load', () => {
            img.style.backgroundColor = 'transparent';
        });
        
        img.addEventListener('error', () => {
            img.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.innerHTML = '📸';
            placeholder.style.cssText = `
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 4rem;
                background: linear-gradient(135deg, #1a191f 0%, #141318 100%);
                color: #3a3a3a;
            `;
            img.parentElement.appendChild(placeholder);
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // First render the content from data
    renderTimeline();
    renderSongs();
    renderFinalMessage();
    
    // Then initialize animations
    initScrollAnimations();
    initVideoPlayers();
    initFinalConfetti();
    initParallax();
    initImagePlaceholders();
});

// Reveal animation on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
