class World {
    constructor() {
        this.tileSize = 40;
        this.width = 100; // 100x100 blocks
        this.height = 100;
        this.map = new Array(this.height).fill(0).map(() => new Array(this.width).fill(0));
        
        // Colors for blocks (Neon Theme)
        this.colors = {
            1: '#00f3ff', // Cyan Neon
            2: '#bc13fe', // Purple Neon
            3: '#ffea00', // Yellow Neon
            4: '#0aff0a'  // Green Neon
        };
    }

    generate() {
        // Create a simple floor pattern
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (Math.random() > 0.95) {
                    this.map[y][x] = Math.floor(Math.random() * 4) + 1;
                }
            }
        }
        // Spawn Area Clear
        for(let y=45; y<55; y++) {
            for(let x=45; x<55; x++) {
                this.map[y][x] = 0;
            }
        }
    }

    getBlock(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return -1; // Boundary
        return this.map[y][x];
    }

    setBlock(x, y, id) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        this.map[y][x] = id;
    }
}
