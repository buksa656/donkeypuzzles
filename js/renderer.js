// Rendering engine for the game
class Renderer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        
        this.slotWidth = 60;
        this.slotHeight = 120;
        this.yarnRadius = 20;
        this.yarnSpacing = 25;
        
        this.resize();
    }
    
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.scale = this.canvas.width / rect.width;
    }
    
    render(yarns, targetSlots, tempSlots, draggedYarn) {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw slots
        this.drawSlots(targetSlots, 'target');
        this.drawSlots(tempSlots, 'temp');
        
        // Draw yarns
        yarns.forEach(yarn => {
            if (yarn !== draggedYarn) {
                this.drawYarn(yarn);
            }
        });
        
        // Draw dragged yarn on top
        if (draggedYarn) {
            this.drawYarn(draggedYarn, true);
        }
    }
    
    drawSlots(slots, type) {
        const y = type === 'target' ? 50 : this.canvas.height - 170;
        const spacing = 20;
        const totalWidth = slots.length * (this.slotWidth + spacing);
        const startX = (this.canvas.width - totalWidth) / 2;
        
        slots.forEach((slot, index) => {
            const x = startX + index * (this.slotWidth + spacing);
            
            // Store position for hit detection
            slot.renderPosition = { x, y, width: this.slotWidth, height: this.slotHeight };
            
            // Draw slot background
            this.ctx.fillStyle = slot.isComplete() ? '#90EE90' : '#E0E0E0';
            this.ctx.strokeStyle = type === 'target' ? '#FF6B9D' : '#667eea';
            this.ctx.lineWidth = 3;
            
            this.roundRect(x, y, this.slotWidth, this.slotHeight, 10);
            this.ctx.fill();
            this.ctx.stroke();
            
            // Draw capacity indicator
            this.ctx.fillStyle = '#666';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`${slot.yarns.length}/${slot.capacity}`, x + this.slotWidth / 2, y + this.slotHeight + 15);
        });
    }
    
    drawYarn(yarn, isDragged = false) {
        const pos = this.getYarnScreenPosition(yarn);
        
        // Draw yarn ball with gradient
        const gradient = this.ctx.createRadialGradient(pos.x - 5, pos.y - 5, 5, pos.x, pos.y, this.yarnRadius);
        gradient.addColorStop(0, this.lightenColor(yarn.color, 30));
        gradient.addColorStop(1, yarn.color);
        
        this.ctx.fillStyle = gradient;
        this.ctx.strokeStyle = this.darkenColor(yarn.color, 20);
        this.ctx.lineWidth = isDragged ? 4 : 2;
        
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, this.yarnRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Draw yarn texture lines
        this.ctx.strokeStyle = this.darkenColor(yarn.color, 40);
        this.ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2;
            const x1 = pos.x + Math.cos(angle) * 8;
            const y1 = pos.y + Math.sin(angle) * 8;
            const x2 = pos.x + Math.cos(angle + Math.PI) * 8;
            const y2 = pos.y + Math.sin(angle + Math.PI) * 8;
            
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, 10, angle, angle + Math.PI);
            this.ctx.stroke();
        }
        
        // Store position for hit detection
        yarn.renderPosition = { x: pos.x, y: pos.y, radius: this.yarnRadius };
    }
    
    getYarnScreenPosition(yarn) {
        if (yarn.dragPosition) {
            return yarn.dragPosition;
        }
        
        const posData = yarn.getPosition();
        const slot = yarn.currentSlot;
        
        if (slot && slot.renderPosition) {
            const slotPos = slot.renderPosition;
            return {
                x: slotPos.x + slotPos.width / 2,
                y: slotPos.y + slotPos.height - 30 - (posData.index * this.yarnSpacing)
            };
        }
        
        return { x: 0, y: 0 };
    }
    
    isYarnAtPosition(yarn, pos) {
        if (!yarn.renderPosition) return false;
        
        const dx = pos.x - yarn.renderPosition.x;
        const dy = pos.y - yarn.renderPosition.y;
        return Math.sqrt(dx * dx + dy * dy) < yarn.renderPosition.radius;
    }
    
    isSlotAtPosition(slot, pos) {
        if (!slot.renderPosition) return false;
        
        const slotPos = slot.renderPosition;
        return pos.x >= slotPos.x && 
               pos.x <= slotPos.x + slotPos.width &&
               pos.y >= slotPos.y && 
               pos.y <= slotPos.y + slotPos.height;
    }
    
    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * this.scale,
            y: (e.clientY - rect.top) * this.scale
        };
    }
    
    roundRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }
    
    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }
    
    darkenColor(color, percent) {
        return this.lightenColor(color, -percent);
    }
}