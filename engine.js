/**
 * Game Engine
 * Main Loop, Rendering, and Logic coordination
 */

class Engine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.world = new World(50, 50); // 50x50 grid
        this.player = new Player(this.world);
        this.isRunning = false;
        this.score = 0;
        
        // Viewport camera
        this.camX = 0;
        this.camY = 0;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    init() {
        this.world.generate();
        this.isRunning = true;
        this.loop();
    }

    resize() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
    }

    update() {
        if (!this.isRunning) return;
        this.player.update();
        
        // Camera Follow Logic
        this.camX = this.player.x - this.canvas.width / 2;
        this.camY = this.player.y - this.canvas.height / 2;
        
        // Clamp Camera
        this.camX = Math.max(0, Math.min(this.camX, (this.world.width * this.world.tileSize) - this.canvas.width));
        this.camY = Math.max(0, Math.min(this.camY, (this.world.height * this.world.tileSize) - this.canvas.height));
    }

    draw() {
        // clear screen
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(-this.camX, -this.camY);

        // Draw World (Optimization: Only draw visible blocks)
        const startCol = Math.floor(this.camX / this.world.tileSize);
        const endCol = startCol + (this.canvas.width / this.world.tileSize) + 1;
        const startRow = Math.floor(this.camY / this.world.tileSize);
        const endRow = startRow + (this.canvas.height / this.world.tileSize) + 1;

        for (let y = startRow; y <= endRow; y++) {
            for (let x = startCol; x <= endCol; x++) {
                let block = this.world.getBlock(x, y);
                let posX = x * this.world.tileSize;
                let posY = y * this.world.tileSize;

                // Draw Floor
                this.ctx.fillStyle = '#1a1a1a';
                this.ctx.fillRect(posX, posY, this.world.tileSize, this.world.tileSize);
                this.ctx.strokeStyle = '#222';
                this.ctx.strokeRect(posX, posY, this.world.tileSize, this.world.tileSize);

                // Draw Block if not empty
                if (block !== 0) {
                    this.drawBlock3D(posX, posY, this.world.blockColors[block]);
                }
            }
        }

        // Draw Player
        this.ctx.fillStyle = '#fff';
        this.ctx.shadowColor = '#00bcd4';
        this.ctx.shadowBlur = 15;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.size, this.player.size);
        this.ctx.shadowBlur = 0; // reset

        // Draw Cursor (Selection)
        this.drawCursor();

        this.ctx.restore();
    }

    drawBlock3D(x, y, color) {
        const size = this.world.tileSize;
        // Top Face
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);
        
        // Pseudo-3D bevel effect
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
        this.ctx.strokeRect(x, y, size, size);
        
        // Shadow for depth
        this.ctx.fillStyle = "rgba(0,0,0,0.2)";
        this.ctx.fillRect(x + 2, y + size - 5, size - 4, 3);
    }

    drawCursor() {
        const mx = this.player.mouseX + this.camX;
        const my = this.player.mouseY + this.camY;
        const gx = Math.floor(mx / this.world.tileSize);
        const gy = Math.floor(my / this.world.tileSize);
        
        const px = gx * this.world.tileSize;
        const py = gy * this.world.tileSize;

        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(px, py, this.world.tileSize, this.world.tileSize);
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}
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

