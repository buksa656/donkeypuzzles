// Main game initialization
let game;

window.addEventListener('DOMContentLoaded', () => {
    console.log('🧶 Yarn Puzzle Game Starting...');
    
    // Initialize game
    game = new Game();
    
    // Show menu
    showMenu();
    
    // Button event listeners
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('next-level-btn').addEventListener('click', nextLevel);
    document.getElementById('undo-btn').addEventListener('click', () => game.undo());
    document.getElementById('reset-btn').addEventListener('click', () => game.reset());
    document.getElementById('hint-btn').addEventListener('click', () => game.showHint());
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (game) game.renderer.resize();
    });
});

function showMenu() {
    document.getElementById('menu').classList.remove('hidden');
}

function hideMenu() {
    document.getElementById('menu').classList.add('hidden');
}

function startGame() {
    hideMenu();
    game.start();
}

function nextLevel() {
    document.getElementById('level-complete').classList.add('hidden');
    game.nextLevel();
}

function showLevelComplete(moves, score) {
    document.getElementById('final-moves').textContent = moves;
    document.getElementById('final-score').textContent = score;
    document.getElementById('level-complete').classList.remove('hidden');
}