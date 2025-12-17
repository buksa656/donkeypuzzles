// Main game initialization
let game;

window.addEventListener('DOMContentLoaded', () => {
    console.log('🐴 DonkeyPuzzles Starting...');
    
    // Initialize game
    game = new Game();
    
    // Show menu
    showMenu();
    
    // Button event listeners
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('next-level-btn').addEventListener('click', nextLevel);
    document.getElementById('select-level-btn').addEventListener('click', showLevelSelect);
    document.getElementById('settings-btn').addEventListener('click', showSettings);
    document.getElementById('close-select-btn').addEventListener('click', hideModals);
    document.getElementById('close-settings-btn').addEventListener('click', hideModals);
    
    document.getElementById('undo-btn').addEventListener('click', () => game.undo());
    document.getElementById('reset-btn').addEventListener('click', () => game.reset());
    document.getElementById('hint-btn').addEventListener('click', () => game.showHint());
    
    // Settings
    document.getElementById('sound-toggle').addEventListener('change', (e) => {
        game.settings.soundEnabled = e.target.checked;
    });
    document.getElementById('particles-toggle').addEventListener('change', (e) => {
        game.settings.particlesEnabled = e.target.checked;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (game) game.renderer.resize();
    });
});

function showMenu() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('level-complete').classList.add('hidden');
    document.getElementById('level-select').classList.add('hidden');
    document.getElementById('settings').classList.add('hidden');
}

function hideModals() {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('level-complete').classList.add('hidden');
    document.getElementById('level-select').classList.add('hidden');
    document.getElementById('settings').classList.add('hidden');
}

function startGame() {
    hideModals();
    game.start();
}

function nextLevel() {
    hideModals();
    game.nextLevel();
}

function showLevelSelect() {
    document.getElementById('level-select').classList.remove('hidden');
    
    // Create level buttons
    const levelButtons = document.getElementById('level-buttons');
    levelButtons.innerHTML = '';
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.className = `level-btn ${i <= game.completedLevels + 1 ? '' : 'disabled'}`;
        btn.textContent = i;
        btn.disabled = i > game.completedLevels + 1;
        btn.addEventListener('click', () => {
            game.currentLevel = i;
            game.loadLevel(i);
            hideModals();
        });
        levelButtons.appendChild(btn);
    }
}

function showSettings() {
    document.getElementById('settings').classList.remove('hidden');
}

function showLevelComplete(moves, score, isPerfect = false) {
    document.getElementById('final-moves').textContent = moves;
    document.getElementById('final-score').textContent = score;
    
    if (isPerfect) {
        document.getElementById('perfect-bonus').classList.remove('hidden');
    } else {
        document.getElementById('perfect-bonus').classList.add('hidden');
    }
    
    document.getElementById('level-complete').classList.remove('hidden');
}