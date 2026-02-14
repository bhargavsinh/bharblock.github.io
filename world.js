/**
 * World System
 * Manages the grid, block types, and generation.
 */

class World {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tileSize = 40;
        this.map = [];
        this.blockColors = {
            0: '#222',       // Empty/Floor
            1: '#4caf50',    // Grass
            2: '#795548',    // Dirt
            3: '#607d8b',    // Stone
            4: '#ff9800'     // Memory Block (Gold)
        };
    }

    generate() {
        // Initialize empty grid
        for (let y = 0; y < this.height; y++) {
            let row = [];
            for (let x = 0; x < this.width; x++) {
                // Simple procedural noise (Random clusters)
                const rand = Math.random();
                let type = 0; // Floor
                
                if (rand > 0.85) type = 3; // Stone
                else if (rand > 0.75) type = 2; // Dirt
                else if (rand > 0.65) type = 1; // Grass
                
                // Clear center spawn area
                if (x > 10 && x < 20 && y > 10 && y < 20) type = 0;

                row.push(type);
            }
            this.map.push(row);
        }
    }

    getBlock(x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.map[y][x];
        }
        return 3; // Return stone (wall) if out of bounds
    }

    setBlock(x, y, type) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.map[y][x] = type;
            return true;
        }
        return false;
    }
}
