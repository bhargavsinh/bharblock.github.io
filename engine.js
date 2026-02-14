// engine.js ની અંદર drawBlock3D ફંક્શન શોધો અને નીચેના કોડથી બદલી નાખો:

    drawBlock3D(x, y, color) {
        const size = this.world.tileSize;
        
        // Main Face
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);
        
        // Inner Bevel (3D Effect)
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "rgba(255,255,255,0.3)";
        this.ctx.strokeRect(x, y, size, size);
        
        // Bottom Shadow (Depth)
        this.ctx.fillStyle = "rgba(0,0,0,0.3)";
        this.ctx.fillRect(x, y + size - 4, size, 4);
        
        // Right Shadow (Depth)
        this.ctx.fillStyle = "rgba(0,0,0,0.3)";
        this.ctx.fillRect(x + size - 4, y, 4, size);
    }
