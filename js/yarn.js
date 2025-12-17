// Yarn class representing a single yarn piece
class Yarn {
    constructor(color, id) {
        this.id = id;
        this.color = color;
        this.currentSlot = null;
        this.dragPosition = null;
    }
    
    isTopOfStack() {
        if (!this.currentSlot) return false;
        return this.currentSlot.getTopYarn() === this;
    }
    
    getPosition() {
        if (this.dragPosition) {
            return this.dragPosition;
        }
        
        if (this.currentSlot) {
            return this.currentSlot.getYarnPosition(this);
        }
        
        return { x: 0, y: 0 };
    }
}