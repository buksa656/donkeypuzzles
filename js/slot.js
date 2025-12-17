// Slot class for holding yarns
class Slot {
    constructor(id, type, capacity) {
        this.id = id;
        this.type = type; // 'target' or 'temp'
        this.capacity = capacity;
        this.yarns = [];
        this.targetColor = null; // For target slots
    }
    
    addYarn(yarn) {
        if (this.yarns.length >= this.capacity) {
            return false;
        }
        
        this.yarns.push(yarn);
        yarn.currentSlot = this;
        
        // Set target color for target slots
        if (this.type === 'target' && !this.targetColor) {
            this.targetColor = yarn.color;
        }
        
        return true;
    }
    
    removeYarn(yarn) {
        const index = this.yarns.indexOf(yarn);
        if (index > -1) {
            this.yarns.splice(index, 1);
            yarn.currentSlot = null;
            
            // Reset target color if empty
            if (this.yarns.length === 0) {
                this.targetColor = null;
            }
            
            return true;
        }
        return false;
    }
    
    getTopYarn() {
        return this.yarns[this.yarns.length - 1] || null;
    }
    
    canAddYarn(yarn) {
        // Check capacity
        if (this.yarns.length >= this.capacity) {
            return false;
        }
        
        // For target slots, check color matching
        if (this.type === 'target') {
            if (this.targetColor && this.targetColor !== yarn.color) {
                return false;
            }
        }
        
        return true;
    }
    
    isComplete() {
        return this.type === 'target' && 
               this.yarns.length === this.capacity && 
               this.yarns.every(y => y.color === this.targetColor);
    }
    
    getYarnPosition(yarn) {
        const index = this.yarns.indexOf(yarn);
        // Position will be calculated by renderer
        return { slotId: this.id, type: this.type, index: index };
    }
}