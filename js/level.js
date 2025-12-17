// Level management system
class LevelManager {
    constructor() {
        this.levels = null;
    }
    
    async loadLevels() {
        if (this.levels) return this.levels;
        
        try {
            const response = await fetch('levels/levels.json');
            this.levels = await response.json();
            return this.levels;
        } catch (error) {
            console.error('Failed to load levels:', error);
            // Return default levels if loading fails
            return this.getDefaultLevels();
        }
    }
    
    async getLevel(levelNum) {
        const levels = await this.loadLevels();
        return levels.levels[levelNum - 1] || null;
    }
    
    getDefaultLevels() {
        return {
            levels: [
                {
                    id: 1,
                    targetSlots: 3,
                    tempSlots: 2,
                    slotCapacity: 4,
                    yarns: [
                        { color: '#FF6B9D', startSlot: 0 },
                        { color: '#FF6B9D', startSlot: 0 },
                        { color: '#FF6B9D', startSlot: 0 },
                        { color: '#FF6B9D', startSlot: 0 },
                        { color: '#4ECDC4', startSlot: 1 },
                        { color: '#4ECDC4', startSlot: 1 },
                        { color: '#4ECDC4', startSlot: 1 },
                        { color: '#4ECDC4', startSlot: 1 },
                        { color: '#FFD93D', startSlot: 0 },
                        { color: '#FFD93D', startSlot: 0 },
                        { color: '#FFD93D', startSlot: 1 },
                        { color: '#FFD93D', startSlot: 1 }
                    ]
                }
            ]
        };
    }
}