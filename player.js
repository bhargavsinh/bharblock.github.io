/**
 * Player Controller
 * Handles movement inputs and world interaction.
 */

class Player {
    constructor(world) {
        this.world = world;
        this.x = 15 * world.tileSize; // Start pixel X
        this.y = 15 * world.tileSize; // Start pixel Y
        this.size = 20;
        this.speed = 4;
        this.selectedBlock = 1; // Default grass
        this.keys = {};
    }

    update() {
        let dx = 0;
        let dy = 0;

        if (this.keys['ArrowUp'] || this.keys['w']) dy = -this.speed;
        if (this.keys['ArrowDown'] || this.keys['s']) dy = this.speed;
        if (this.keys['ArrowLeft'] || this.keys['a']) dx = -this.speed;
        if (this.keys['ArrowRight'] || this.keys['d']) dx = this.speed;

        this.move(dx, 0);
        this.move(0, dy);
    }

    move(dx, dy) {
        // Future position
        const newX = this.x + dx;
        const newY = this.y + dy;

        // Bounding box collision
        if (!this.checkCollision(newX, this.y)) this.x = newX;
        if (!this.checkCollision(this.x, newY)) this.y = newY;
    }

    checkCollision(x, y) {
        // Convert pixel to grid coords for corners of player
        const corners = [
            {x: x, y: y},
            {x: x + this.size, y: y},
            {x: x, y: y + this.size},
            {x: x + this.size, y: y + this.size}
        ];

        for (let p of corners) {
            let gx = Math.floor(p.x / this.world.tileSize);
            let gy = Math.floor(p.y / this.world.tileSize);
            // Blocks > 0 are solid
            if (this.world.getBlock(gx, gy) !== 0) return true;
        }
        return false;
    }
}
