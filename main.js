const Input = {
    state: { up: false, down: false, left: false, right: false },
    
    init: function() {
        // Keyboard
        window.addEventListener('keydown', (e) => this.keyHandler(e, true));
        window.addEventListener('keyup', (e) => this.keyHandler(e, false));

        // Touch Buttons (D-Pad)
        this.bindTouch('up', 'up');
        this.bindTouch('down', 'down');
        this.bindTouch('left', 'left');
        this.bindTouch('right', 'right');

        // Actions
        document.getElementById('action-build').addEventListener('click', () => {
            game.interact(true);
        });
        document.getElementById('action-break').addEventListener('click', () => {
            game.interact(false);
        });

        // Hotbar
        document.querySelectorAll('.slot').forEach(slot => {
            slot.addEventListener('click', () => {
                document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
                slot.classList.add('active');
                engine.player.selectedBlock = parseInt(slot.dataset.id);
            });
        });
    },

    keyHandler: function(e, val) {
        if(e.key === 'w' || e.key === 'ArrowUp') this.state.up = val;
        if(e.key === 's' || e.key === 'ArrowDown') this.state.down = val;
        if(e.key === 'a' || e.key === 'ArrowLeft') this.state.left = val;
        if(e.key === 'd' || e.key === 'ArrowRight') this.state.right = val;
    },

    bindTouch: function(id, key) {
        const btn = document.getElementById(id);
        btn.addEventListener('touchstart', (e) => { e.preventDefault(); this.state[key] = true; });
        btn.addEventListener('touchend', (e) => { e.preventDefault(); this.state[key] = false; });
    }
};

// Interaction Logic attached to Game Object
const engine = new Engine();

engine.interact = function(isBuilding) {
    const gx = Math.floor(this.player.x / this.world.tileSize);
    const gy = Math.floor(this.player.y / this.world.tileSize);
    
    if(isBuilding) {
        // Don't build on self
        this.world.setBlock(gx, gy, this.player.selectedBlock);
    } else {
        this.world.setBlock(gx, gy, 0);
    }
};

Input.init();
engine.start();

// Desktop Mouse Interaction
document.getElementById('gameCanvas').addEventListener('mousedown', (e) => {
    const rect = e.target.getBoundingClientRect();
    const mx = e.clientX - rect.left + engine.camX;
    const my = e.clientY - rect.top + engine.camY;
    const gx = Math.floor(mx / engine.world.tileSize);
    const gy = Math.floor(my / engine.world.tileSize);

    if (e.button === 0) engine.world.setBlock(gx, gy, engine.player.selectedBlock);
    if (e.button === 2) engine.world.setBlock(gx, gy, 0);
});

document.addEventListener('contextmenu', event => event.preventDefault());
/* ===== main.js ===== */
// Global Error Handler for Mobile Debugging
window.onerror = function(msg, url, line) {
    alert("Error: " + msg + "\nLine: " + line);
};

const Input = {
    state: { up: false, down: false, left: false, right: false },
    
    init: function() {
        // Keyboard
        window.addEventListener('keydown', (e) => this.keyHandler(e, true));
        window.addEventListener('keyup', (e) => this.keyHandler(e, false));

        // Touch Buttons (D-Pad) with Safety Check
        this.bindTouch('up', 'up');
        this.bindTouch('down', 'down');
        this.bindTouch('left', 'left');
        this.bindTouch('right', 'right');

        // Actions
        const btnBuild = document.getElementById('action-build');
        const btnBreak = document.getElementById('action-break');
        
        if(btnBuild) btnBuild.addEventListener('touchstart', (e) => { e.preventDefault(); gameEngine.interact(true); });
        if(btnBreak) btnBreak.addEventListener('touchstart', (e) => { e.preventDefault(); gameEngine.interact(false); });

        // Hotbar
        document.querySelectorAll('.slot').forEach(slot => {
            slot.addEventListener('click', () => {
                document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
                slot.classList.add('active');
                if(gameEngine && gameEngine.player) {
                    gameEngine.player.selectedBlock = parseInt(slot.dataset.id);
                }
            });
        });
    },

    keyHandler: function(e, val) {
        if(e.key === 'w' || e.key === 'ArrowUp') this.state.up = val;
        if(e.key === 's' || e.key === 'ArrowDown') this.state.down = val;
        if(e.key === 'a' || e.key === 'ArrowLeft') this.state.left = val;
        if(e.key === 'd' || e.key === 'ArrowRight') this.state.right = val;
    },

    bindTouch: function(id, key) {
        const btn = document.getElementById(id);
        if(btn) {
            btn.addEventListener('touchstart', (e) => { e.preventDefault(); this.state[key] = true; });
            btn.addEventListener('touchend', (e) => { e.preventDefault(); this.state[key] = false; });
        } else {
            console.warn("Button not found: " + id);
        }
    }
};

// Start Game
let gameEngine;
try {
    gameEngine = new Engine();
    
    // Interaction Logic
    gameEngine.interact = function(isBuilding) {
        const gx = Math.floor(this.player.x / this.world.tileSize);
        const gy = Math.floor(this.player.y / this.world.tileSize);
        
        if(isBuilding) {
            this.world.setBlock(gx, gy, this.player.selectedBlock);
        } else {
            this.world.setBlock(gx, gy, 0);
        }
    };

    Input.init();
    gameEngine.start();
    
} catch (e) {
    alert("Game Init Error: " + e.message);
}

// Desktop Mouse Interaction
const cvs = document.getElementById('gameCanvas');
if(cvs) {
    cvs.addEventListener('mousedown', (e) => {
        if(!gameEngine) return;
        const rect = e.target.getBoundingClientRect();
        const mx = e.clientX - rect.left + gameEngine.camX;
        const my = e.clientY - rect.top + gameEngine.camY;
        const gx = Math.floor(mx / gameEngine.world.tileSize);
        const gy = Math.floor(my / gameEngine.world.tileSize);

        if (e.button === 0) gameEngine.world.setBlock(gx, gy, gameEngine.player.selectedBlock);
        if (e.button === 2) gameEngine.world.setBlock(gx, gy, 0);
    });
    
    cvs.addEventListener('contextmenu', event => event.preventDefault());
}

