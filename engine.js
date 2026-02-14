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

/* ===== engine.js ===== */
class Engine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // World Size increased for exploration
        this.world = new World(60, 60); 
        this.player = new Player(this.world);
        
        this.isRunning = false;
        
        // Camera Setup
        this.camX = 0;
        this.camY = 0;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    init() {
        this.world.generate();
        // Center camera on player initially
        this.camX = this.player.x - this.canvas.width / 2;
        this.camY = this.player.y - this.canvas.height / 2;
        
        this.loop();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    update() {
        if (!this.isRunning) return;
        
        this.player.update();
        
        // === SMOOTH CAMERA LOGIC (The Fix) ===
        // Target is where the camera WANTS to be (centered on player)
        let targetX = this.player.x - this.canvas.width / 2 + (this.player.size / 2);
        let targetY = this.player.y - this.canvas.height / 2 + (this.player.size / 2);

        // Clamp Target (Don't show outside world)
        let maxCamX = (this.world.width * this.world.tileSize) - this.canvas.width;
        let maxCamY = (this.world.height * this.world.tileSize) - this.canvas.height;

        targetX = Math.max(0, Math.min(targetX, maxCamX));
        targetY = Math.max(0, Math.min(targetY, maxCamY));

        // Move camera 10% of the way to the target (Smoothness factor 0.1)
        this.camX += (targetX - this.camX) * 0.1;
        this.camY += (targetY - this.camY) * 0.1;
    }

    draw() {
        // Dark Background
        this.ctx.fillStyle = '#0f0c29';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(-Math.floor(this.camX), -Math.floor(this.camY)); // Math.floor prevents blurry pixels

        // Draw Visible Blocks Only (Performance Optimization)
        const startCol = Math.floor(this.camX / this.world.tileSize);
        const endCol = startCol + (this.canvas.width / this.world.tileSize) + 2;
        const startRow = Math.floor(this.camY / this.world.tileSize);
        const endRow = startRow + (this.canvas.height / this.world.tileSize) + 2;

        for (let y = startRow; y <= endRow; y++) {
            for (let x = startCol; x <= endCol; x++) {
                let block = this.world.getBlock(x, y);
                if (block !== undefined) { // Check bounds
                    let posX = x * this.world.tileSize;
                    let posY = y * this.world.tileSize;

                    // Draw Floor Grid (Subtle)
                    this.ctx.strokeStyle = '#1a1a2e';
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(posX, posY, this.world.tileSize, this.world.tileSize);

                    if (block !== 0) {
                        this.drawBlock3D(posX, posY, this.world.blockColors[block]);
                    }
                }
            }
        }

        // Draw Player with Glow
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = '#00f2ff';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.size, this.player.size);
        this.ctx.shadowBlur = 0;

        // Draw Cursor
        this.drawCursor();

        this.ctx.restore();
    }

    drawBlock3D(x, y, color) {
        const size = this.world.tileSize;
        // Base
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);
        
        // Highlight (Top/Left)
        this.ctx.fillStyle = 'rgba(255,255,255,0.2)';
        this.ctx.fillRect(x, y, size, 4);
        this.ctx.fillRect(x, y, 4, size);

        // Shadow (Bottom/Right)
        this.ctx.fillStyle = 'rgba(0,0,0,0.4)';
        this.ctx.fillRect(x, y + size - 4, size, 4);
        this.ctx.fillRect(x + size - 4, y, 4, size);
    }

    drawCursor() {
        const mx = this.player.mouseX + this.camX;
        const my = this.player.mouseY + this.camY;
        const gx = Math.floor(mx / this.world.tileSize);
        const gy = Math.floor(my / this.world.tileSize);
        const px = gx * this.world.tileSize;
        const py = gy * this.world.tileSize;

        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(px, py, this.world.tileSize, this.world.tileSize);
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}

