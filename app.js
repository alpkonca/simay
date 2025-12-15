// ========================================
// Gift Picker - Main Application Logic
// ========================================

// ========================================
// CONFIGURATION - Add your watch images here!
// ========================================
// Each item should have: id, name, image (path to image file)
// 
// TO ADD YOUR OWN WATCHES:
// 1. Put your watch images in the "images/" folder
// 2. Update this array with the correct file names
// 3. Give each watch a unique id and a nice name
//
// Example with local images:
// { id: 1, name: "Classic Gold", image: "images/watch1.jpg" },
// { id: 2, name: "My Favorite", image: "images/my-watch.png" },

const WATCHES = [
    { id: 1, name: "Saat 1", image: "images/Screenshot 2025-12-15 at 21.00.58.png" },
    { id: 2, name: "Saat 2", image: "images/Screenshot 2025-12-15 at 21.01.01.png" },
    { id: 3, name: "Saat 3", image: "images/Screenshot 2025-12-15 at 21.01.04.png" },
    { id: 4, name: "Saat 4", image: "images/Screenshot 2025-12-15 at 21.01.14.png" },
    { id: 5, name: "Saat 5", image: "images/Screenshot 2025-12-15 at 21.01.20.png" },
    { id: 6, name: "Saat 6", image: "images/Screenshot 2025-12-15 at 21.01.25.png" },
    { id: 7, name: "Saat 7", image: "images/Screenshot 2025-12-15 at 21.01.32.png" },
    { id: 8, name: "Saat 8", image: "images/Screenshot 2025-12-15 at 21.01.41.png" },
    { id: 9, name: "Saat 9", image: "images/Screenshot 2025-12-15 at 21.01.46.png" },
    { id: 10, name: "Saat 10", image: "images/Screenshot 2025-12-15 at 21.01.50.png" },
    { id: 11, name: "Saat 11", image: "images/Screenshot 2025-12-15 at 21.01.58.png" },
    { id: 12, name: "Saat 12", image: "images/Screenshot 2025-12-15 at 21.02.02.png" },
    { id: 13, name: "Saat 13", image: "images/Screenshot 2025-12-15 at 21.02.07.png" },
    { id: 14, name: "Saat 14", image: "images/Screenshot 2025-12-15 at 21.16.50.png" },
    { id: 15, name: "Saat 15", image: "images/Screenshot 2025-12-15 at 21.18.28.png" },
    { id: 16, name: "Saat 16", image: "images/Screenshot 2025-12-15 at 21.19.38.png" },
    { id: 17, name: "Saat 17", image: "images/Screenshot 2025-12-15 at 21.20.11.png" },
    { id: 18, name: "Saat 18", image: "images/Screenshot 2025-12-15 at 21.21.02.png" },
    { id: 19, name: "Saat 19", image: "images/Screenshot 2025-12-15 at 21.22.21.png" },
    { id: 20, name: "Saat 20", image: "images/Screenshot 2025-12-15 at 21.23.41.png" },
    { id: 21, name: "Saat 21", image: "images/Screenshot 2025-12-15 at 21.24.46.png" },
    { id: 22, name: "Saat 22", image: "images/Screenshot 2025-12-15 at 21.25.43.png" },
];

// ========================================
// State Management
// ========================================

let state = {
    currentRound: 1,
    currentIndex: 0,
    ratings: {},          // { watchId: 'no' | 'maybe' | 'yes' | 'definitely' }
    currentPool: [],      // Current set of watches to rate
    tournamentPool: [],   // Watches for the final tournament
    tournamentPair: [],   // Current pair being compared
    nextRoundPool: [],    // Winners advancing to next round
    tournamentRemaining: 0, // Total contestants remaining
    pickingDisabled: false, // Prevent double-clicks
    eliminationOrder: [], // Track order of elimination (first eliminated = last in leaderboard)
};

// ========================================
// Screen Navigation
// ========================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ========================================
// Welcome & Start
// ========================================

function startRating() {
    // Initialize with all watches
    state.currentPool = [...WATCHES];
    state.currentIndex = 0;
    state.currentRound = 1;
    state.ratings = {};
    
    updateRoundBadge();
    updateProgress();
    showCurrentWatch();
    showScreen('rating-screen');
}

// ========================================
// Rating Phase
// ========================================

function showCurrentWatch() {
    const card = document.getElementById('current-card');
    const watch = state.currentPool[state.currentIndex];
    
    if (!watch) return;
    
    // Add enter animation
    card.classList.remove('exit-left', 'exit-right', 'enter');
    void card.offsetWidth; // Force reflow
    card.classList.add('enter');
    
    document.getElementById('current-image').src = watch.image;
    document.getElementById('current-name').textContent = watch.name;
}

function updateProgress() {
    document.getElementById('current-index').textContent = state.currentIndex + 1;
    document.getElementById('total-count').textContent = state.currentPool.length;
}

function updateRoundBadge() {
    const badge = document.getElementById('round-badge');
    if (state.currentRound === 1) {
        badge.textContent = '1. Tur';
    } else {
        badge.textContent = '2. Tur (Eleme)';
    }
}

function rate(rating) {
    const watch = state.currentPool[state.currentIndex];
    if (!watch) return;
    
    // Store the rating
    state.ratings[watch.id] = rating;
    
    // Animate card exit
    const card = document.getElementById('current-card');
    const exitClass = rating === 'no' ? 'exit-left' : 'exit-right';
    card.classList.add(exitClass);
    
    // Move to next after animation
    setTimeout(() => {
        state.currentIndex++;
        
        if (state.currentIndex >= state.currentPool.length) {
            // Round complete
            showRoundComplete();
        } else {
            updateProgress();
            showCurrentWatch();
        }
    }, 350);
}

// ========================================
// Round Complete
// ========================================

function showRoundComplete() {
    // Calculate stats
    const stats = { no: 0, maybe: 0, yes: 0, definitely: 0 };
    
    for (const watchId in state.ratings) {
        const rating = state.ratings[watchId];
        stats[rating]++;
    }
    
    document.getElementById('stat-no').textContent = stats.no;
    document.getElementById('stat-maybe').textContent = stats.maybe;
    document.getElementById('stat-yes').textContent = stats.yes;
    document.getElementById('stat-definitely').textContent = stats.definitely;
    
    // Set title and message based on round
    const title = document.getElementById('round-complete-title');
    const message = document.getElementById('round-message');
    const nextBtn = document.getElementById('next-action-btn');
    
    const yesAndDefinitely = stats.yes + stats.definitely;
    
    if (state.currentRound === 1) {
        title.textContent = '1. Tur Tamamlandı!';
        
        if (yesAndDefinitely === 0) {
            message.textContent = "Hmm, henüz bir favori yok mu? Tekrar deneyelim! 💭";
            nextBtn.innerHTML = '<span>Tekrar Dene</span>';
            nextBtn.onclick = () => resetAll();
        } else if (stats.no > 0 || stats.maybe > 0) {
            const refinedCount = state.currentPool.length - stats.no;
            message.textContent = `Harika seçimler! Şimdi ${refinedCount} saat arasından tekrar seçim yapalım mı? ("Hayır" dediklerin hariç) 💝`;
            nextBtn.innerHTML = '<span>Seçimi Daralt</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            nextBtn.onclick = () => nextRound();
        } else {
            // All yes or definitely - go straight to tournament
            message.textContent = "Hepsini beğendin! Şimdi final kapışması zamanı! 🔥";
            nextBtn.innerHTML = '<span>Final Kapışması</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            nextBtn.onclick = () => startTournament();
        }
    } else {
        title.textContent = '2. Tur Tamamlandı!';
        
        if (yesAndDefinitely === 0) {
            message.textContent = "Hâlâ kararsız mısın? Baştan başlayalım! 💭";
            nextBtn.innerHTML = '<span>Baştan Başla</span>';
            nextBtn.onclick = () => resetAll();
        } else if (yesAndDefinitely === 1) {
            // Only one favorite - declare winner directly
            const winnerId = Object.keys(state.ratings).find(id => 
                state.ratings[id] === 'yes' || state.ratings[id] === 'definitely'
            );
            const winner = WATCHES.find(w => w.id == winnerId);
            message.textContent = "Tek bir favori var! 🎯";
            nextBtn.innerHTML = '<span>Seçimini Gör</span>';
            nextBtn.onclick = () => showWinner(winner);
        } else {
            message.textContent = `${yesAndDefinitely} tane favori var! Şimdi en iyisini seçme zamanı! 🏆`;
            nextBtn.innerHTML = '<span>Final Kapışması</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            nextBtn.onclick = () => startTournament();
        }
    }
    
    showScreen('round-complete-screen');
}

// ========================================
// Round 2 (Refined)
// ========================================

function nextRound() {
    // Filter out "no" ratings for round 2
    state.currentPool = state.currentPool.filter(watch => 
        state.ratings[watch.id] !== 'no'
    );
    
    // Reset ratings but keep old data for reference
    const oldRatings = { ...state.ratings };
    state.ratings = {};
    state.currentIndex = 0;
    state.currentRound = 2;
    
    // Shuffle for variety
    shuffleArray(state.currentPool);
    
    updateRoundBadge();
    updateProgress();
    showCurrentWatch();
    showScreen('rating-screen');
}

// ========================================
// Tournament Phase
// ========================================

function startTournament() {
    // Get all watches rated as "yes" or "definitely"
    state.tournamentPool = WATCHES.filter(watch => 
        state.ratings[watch.id] === 'yes' || state.ratings[watch.id] === 'definitely'
    );
    
    // Shuffle for fairness
    shuffleArray(state.tournamentPool);
    
    if (state.tournamentPool.length <= 1) {
        // Direct to winner if only one
        state.eliminationOrder = [];
        showWinner(state.tournamentPool[0] || WATCHES[0]);
        return;
    }
    
    // Track total remaining in tournament (for display)
    state.tournamentRemaining = state.tournamentPool.length;
    // Winners of current round go here
    state.nextRoundPool = [];
    // Prevent double-clicks
    state.pickingDisabled = false;
    // Track elimination order (for leaderboard)
    state.eliminationOrder = [];
    
    updateTournamentDisplay();
    setupNextMatch();
    showScreen('tournament-screen');
}

function updateTournamentDisplay() {
    document.getElementById('remaining-count').textContent = state.tournamentRemaining;
}

function setupNextMatch() {
    // Check if current round is done (pool empty but we have next round winners)
    if (state.tournamentPool.length === 0 && state.nextRoundPool.length > 0) {
        // Move to next round
        state.tournamentPool = state.nextRoundPool;
        state.nextRoundPool = [];
        shuffleArray(state.tournamentPool);
    }
    
    // Check for winner
    if (state.tournamentPool.length === 1 && state.nextRoundPool.length === 0) {
        setTimeout(() => showWinner(state.tournamentPool[0]), 500);
        return;
    }
    
    // Check if we have at least 2 to compare
    if (state.tournamentPool.length < 2) {
        // Odd number - this one gets a bye to next round
        if (state.tournamentPool.length === 1) {
            state.nextRoundPool.push(state.tournamentPool.shift());
        }
        // Check again after bye
        setupNextMatch();
        return;
    }
    
    // Pick two contestants
    state.tournamentPair = [
        state.tournamentPool.shift(),
        state.tournamentPool.shift()
    ];
    
    // Display them
    const [left, right] = state.tournamentPair;
    
    const leftCard = document.getElementById('tournament-left');
    const rightCard = document.getElementById('tournament-right');
    
    leftCard.classList.remove('selected', 'eliminated');
    rightCard.classList.remove('selected', 'eliminated');
    
    document.getElementById('tournament-img-left').src = left.image;
    document.getElementById('tournament-name-left').textContent = left.name;
    
    document.getElementById('tournament-img-right').src = right.image;
    document.getElementById('tournament-name-right').textContent = right.name;
    
    // Animate in
    leftCard.style.animation = 'none';
    rightCard.style.animation = 'none';
    void leftCard.offsetWidth;
    leftCard.style.animation = 'fadeInUp 400ms ease-out';
    rightCard.style.animation = 'fadeInUp 400ms ease-out 100ms both';
    
    // Re-enable picking
    state.pickingDisabled = false;
}

function pickWinner(side) {
    // Prevent double-clicks
    if (state.pickingDisabled) return;
    state.pickingDisabled = true;
    
    const leftCard = document.getElementById('tournament-left');
    const rightCard = document.getElementById('tournament-right');
    
    const winnerIndex = side === 'left' ? 0 : 1;
    const loserIndex = side === 'left' ? 1 : 0;
    
    const winnerCard = side === 'left' ? leftCard : rightCard;
    const loserCard = side === 'left' ? rightCard : leftCard;
    
    // Animate
    winnerCard.classList.add('selected');
    loserCard.classList.add('eliminated');
    
    // Track eliminated watch (add to front - first eliminated = lowest rank)
    state.eliminationOrder.unshift(state.tournamentPair[loserIndex]);
    
    // Winner advances to next round
    state.nextRoundPool.push(state.tournamentPair[winnerIndex]);
    
    // Decrease remaining count
    state.tournamentRemaining--;
    updateTournamentDisplay();
    
    // Next match after animation
    setTimeout(() => {
        // Check if tournament is over (only 1 remaining)
        if (state.tournamentRemaining === 1) {
            showWinner(state.nextRoundPool[0]);
        } else {
            setupNextMatch();
        }
    }, 500);
}

// ========================================
// Winner Celebration
// ========================================

function showWinner(watch) {
    document.getElementById('winner-image').src = watch.image;
    document.getElementById('winner-name').textContent = watch.name;
    
    // Build leaderboard (winner + elimination order reversed)
    const leaderboard = [watch, ...state.eliminationOrder];
    populateLeaderboard(leaderboard);
    
    // Populate rating tabs
    populateRatingTabs();
    
    // Setup tab switching
    setupTabs();
    
    showScreen('winner-screen');
    createConfetti();
}

function populateLeaderboard(leaderboard) {
    const container = document.getElementById('leaderboard-list');
    container.innerHTML = '';
    
    if (leaderboard.length === 0) {
        container.innerHTML = '<div class="empty-message">Henüz sıralama yok</div>';
        return;
    }
    
    leaderboard.forEach((watch, index) => {
        const rank = index + 1;
        const badges = ['🥇', '🥈', '🥉'];
        const badge = badges[index] || '';
        
        const item = document.createElement('div');
        item.className = `leaderboard-item rank-${rank}`;
        item.innerHTML = `
            <span class="leaderboard-rank">${rank}</span>
            <div class="leaderboard-thumb">
                <img src="${watch.image}" alt="${watch.name}">
            </div>
            <span class="leaderboard-name">${watch.name}</span>
            ${badge ? `<span class="leaderboard-badge">${badge}</span>` : ''}
        `;
        container.appendChild(item);
    });
}

function populateRatingTabs() {
    const categories = ['definitely', 'yes', 'maybe', 'no'];
    
    categories.forEach(category => {
        const watches = WATCHES.filter(w => state.ratings[w.id] === category);
        const grid = document.getElementById(`grid-${category}`);
        const countEl = document.getElementById(`tab-count-${category}`);
        
        // Update count badge
        countEl.textContent = watches.length;
        
        // Populate grid
        grid.innerHTML = '';
        
        if (watches.length === 0) {
            grid.innerHTML = '<div class="empty-message">Bu kategoride saat yok</div>';
            return;
        }
        
        watches.forEach(watch => {
            const item = document.createElement('div');
            item.className = 'rating-grid-item';
            item.innerHTML = `
                <div class="thumb">
                    <img src="${watch.image}" alt="${watch.name}">
                </div>
                <div class="name">${watch.name}</div>
            `;
            grid.appendChild(item);
        });
    });
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active panel
            tabPanels.forEach(p => p.classList.remove('active'));
            document.getElementById(`panel-${tabId}`).classList.add('active');
        });
    });
}

function createConfetti() {
    const container = document.getElementById('confetti');
    container.innerHTML = '';
    
    const colors = ['#d4a574', '#e8c9a0', '#c77d8e', '#e4a5b3', '#f5f0e8'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        container.appendChild(confetti);
    }
}

// ========================================
// Utilities
// ========================================

function resetAll() {
    state = {
        currentRound: 1,
        currentIndex: 0,
        ratings: {},
        currentPool: [],
        tournamentPool: [],
        tournamentPair: [],
        nextRoundPool: [],
        tournamentRemaining: 0,
        pickingDisabled: false,
        eliminationOrder: [],
    };
    
    // Reset tabs to default state
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === 0);
    });
    document.querySelectorAll('.tab-panel').forEach((panel, i) => {
        panel.classList.toggle('active', i === 0);
    });
    
    showScreen('welcome-screen');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ========================================
// Initialize
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Preload images
    WATCHES.forEach(watch => {
        const img = new Image();
        img.src = watch.image;
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    const ratingScreen = document.getElementById('rating-screen');
    if (!ratingScreen.classList.contains('active')) return;
    
    switch (e.key) {
        case '1':
        case 'n':
        case 'N':
            rate('no');
            break;
        case '2':
        case 'm':
        case 'M':
            rate('maybe');
            break;
        case '3':
        case 'y':
        case 'Y':
            rate('yes');
            break;
        case '4':
        case 'd':
        case 'D':
            rate('definitely');
            break;
    }
});

// Tournament keyboard shortcuts
document.addEventListener('keydown', (e) => {
    const tournamentScreen = document.getElementById('tournament-screen');
    if (!tournamentScreen.classList.contains('active')) return;
    
    switch (e.key) {
        case 'ArrowLeft':
        case '1':
            pickWinner('left');
            break;
        case 'ArrowRight':
        case '2':
            pickWinner('right');
            break;
    }
});

