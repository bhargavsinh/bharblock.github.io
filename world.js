/* ===== world.js ===== */
class World {
    constructor() {
        this.tileSize = 40;
        this.width = 100; // 100x100 blocks
        this.height = 100;
        this.map = new Array(this.height).fill(0).map(() => new Array(this.width).fill(0));
        
        // Colors for blocks (Neon Theme)
        this.colors = {
            1: '#00f3ff', // Cyan
            2: '#bc13fe', // Purple
            3: '#ffea00', // Yellow
            4: '#0aff0a'  // Green
        };
    }

    generate() {
        // ૧. આખો નકશો ભરો (More Blocks!)
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // 85% જગ્યાએ બ્લોક હશે (પહેલા 5% હતા)
                if (Math.random() > 0.85) { 
                    this.map[y][x] = Math.floor(Math.random() * 4) + 1;
                }
            }
        }
        
        // ૨. સેન્ટર (Spawn Area) ખાલી રાખો જેથી પ્લેયર ફસાઈ ન જાય
        // પણ હવે થોડું નાનું રાખો (5x5)
        const cx = Math.floor(this.width / 2);
        const cy = Math.floor(this.height / 2);
        for(let y = cy - 3; y <= cy + 3; y++) {
            for(let x = cx - 3; x <= cx + 3; x++) {
                this.map[y][x] = 0;
            }
        }
    }

    getBlock(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return -1;
        return this.map[y][x];
    }

    setBlock(x, y, id) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        this.map[y][x] = id;
    }
}
