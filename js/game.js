// Main game logic
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.renderer = new Renderer(this.canvas, this.ctx);
        this.levelManager = new LevelManager();
        
        this.currentLevel = 1;
        this.moves = 0;
        this.score = 0;
        
        this.yarns = [];
        this.slots = [];
        this.tempSlots = [];
        
        this.selectedYarn = null;
        this.draggedYarn = null;
        this.history = [];
        
        this.setupEventListeners();
    }
    
    start() {
        this.loadLevel(this.currentLevel);
    }
    
    async loadLevel(levelNum) {
        const levelData = await this.levelManager.getLevel(levelNum);
        
        if (!levelData) {
            console.log('🎉 All levels completed!');
            return;
        }
        
        this.currentLevel = levelNum;
        this.moves = 0;
        this.score = 0;
        this.history = [];
        
        // Create slots
        this.slots = [];
        this.tempSlots = [];
        
        for (let i = 0; i < levelData.targetSlots; i++) {
            this.slots.push(new Slot(i, 'target', levelData.slotCapacity));
        }
        
        for (let i = 0; i < levelData.tempSlots; i++) {
            this.tempSlots.push(new Slot(i, 'temp', levelData.slotCapacity));
        }
        
        // Create yarns
        this.yarns = [];
        levelData.yarns.forEach((yarnData, index) => {
            const yarn = new Yarn(yarnData.color, index);
            const slot = this.tempSlots[yarnData.startSlot % this.tempSlots.length];
            slot.addYarn(yarn);
            this.yarns.push(yarn);
        });
        
        this.updateUI();
        this.renderer.render(this.yarns, this.slots, this.tempSlots, this.draggedYarn);
    }
    
    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.handleStart(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleEnd(e));
        
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleStart(e.touches[0]);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleMove(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.handleEnd(e.changedTouches[0]);
        });
    }
    
    handleStart(e) {
        const pos = this.renderer.getMousePos(e);
        const clickedYarn = this.findYarnAt(pos);
        
        if (clickedYarn && clickedYarn.isTopOfStack()) {
            this.selectedYarn = clickedYarn;
            this.draggedYarn = clickedYarn;
            this.renderer.render(this.yarns, this.slots, this.tempSlots, this.draggedYarn);
        }
    }
    
    handleMove(e) {
        if (this.draggedYarn) {
            const pos = this.renderer.getMousePos(e);
            this.draggedYarn.dragPosition = pos;
            this.renderer.render(this.yarns, this.slots, this.tempSlots, this.draggedYarn);
        }
    }
    
    handleEnd(e) {
        if (this.draggedYarn) {
            const pos = this.renderer.getMousePos(e);
            const targetSlot = this.findSlotAt(pos);
            
            if (targetSlot && targetSlot.canAddYarn(this.draggedYarn)) {
                this.moveYarn(this.draggedYarn, targetSlot);
            }
            
            this.draggedYarn.dragPosition = null;
            this.draggedYarn = null;
            this.renderer.render(this.yarns, this.slots, this.tempSlots, null);
            
            this.checkWinCondition();
        }
    }
    
    moveYarn(yarn, targetSlot) {
        const sourceSlot = yarn.currentSlot;
        
        if (sourceSlot) {
            this.history.push({
                yarn: yarn,
                from: sourceSlot,
                to: targetSlot
            });
            
            sourceSlot.removeYarn(yarn);
        }
        
        targetSlot.addYarn(yarn);
        this.moves++;
        this.updateUI();
    }
    
    findYarnAt(pos) {
        // Check all slots for yarns
        const allSlots = [...this.slots, ...this.tempSlots];
        
        for (const slot of allSlots) {
            const yarn = slot.getTopYarn();
            if (yarn && this.renderer.isYarnAtPosition(yarn, pos)) {
                return yarn;
            }
        }
        
        return null;
    }
    
    findSlotAt(pos) {
        const allSlots = [...this.slots, ...this.tempSlots];
        
        for (const slot of allSlots) {
            if (this.renderer.isSlotAtPosition(slot, pos)) {
                return slot;
            }
        }
        
        return null;
    }
    
    checkWinCondition() {
        // Check if all target slots are complete
        for (const slot of this.slots) {
            if (!slot.isComplete()) {
                return false;
            }
        }
        
        // Level complete!
        this.score += Math.max(1000 - (this.moves * 10), 100);
        this.updateUI();
        showLevelComplete(this.moves, this.score);
        return true;
    }
    
    undo() {
        if (this.history.length === 0) return;
        
        const lastMove = this.history.pop();
        lastMove.to.removeYarn(lastMove.yarn);
        lastMove.from.addYarn(lastMove.yarn);
        
        this.moves++;
        this.updateUI();
        this.renderer.render(this.yarns, this.slots, this.tempSlots, null);
    }
    
    reset() {
        this.loadLevel(this.currentLevel);
    }
    
    showHint() {
        // Find a valid move and highlight it
        console.log('💡 Hint requested');
        // TODO: Implement hint logic
    }
    
    nextLevel() {
        this.currentLevel++;
        this.loadLevel(this.currentLevel);
    }
    
    updateUI() {
        document.getElementById('level-display').textContent = `Level: ${this.currentLevel}`;
        document.getElementById('moves-display').textContent = `Moves: ${this.moves}`;
        document.getElementById('score-display').textContent = `Score: ${this.score}`;
    }
}