/**
 * Main Entry Point
 * Handles Input Listeners and UI interaction
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Init Modules
    Ads.init();
    const engine = new Engine();
    
    // 2. Input Handling
    window.addEventListener('keydown', (e) => {
        engine.player.keys[e.key] = true;
        if(e.key === 'Escape') togglePause();
    });

    window.addEventListener('keyup', (e) => engine.player.keys[e.key] = false);

    // Mouse Tracking for building
    const canvas = document.getElementById('gameCanvas');
    engine.player.mouseX = 0;
    engine.player.mouseY = 0;

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        engine.player.mouseX = e.clientX - rect.left;
        engine.player.mouseY = e.clientY - rect.top;
    });

    // Clicking to Build/Destroy
    canvas.addEventListener('mousedown', (e) => {
        if(!engine.isRunning) return;

        const mx = engine.player.mouseX + engine.camX;
        const my = engine.player.mouseY + engine.camY;
        const gx = Math.floor(mx / engine.world.tileSize);
        const gy = Math.floor(my / engine.world.tileSize);

        // Right click (or shift+click) removes, Left adds
        // Here: Check collision with player before placing
        if (e.button === 0) {
             // Basic collision check: Don't place block inside player
             const pGx = Math.floor(engine.player.x / engine.world.tileSize);
             const pGy = Math.floor(engine.player.y / engine.world.tileSize);
             
             if(gx !== pGx || gy !== pGy) {
                engine.world.setBlock(gx, gy, engine.player.selectedBlock);
             }
        } else {
            engine.world.setBlock(gx, gy, 0); // Remove
        }
    });

    // Hotbar Selection
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => {
        slot.addEventListener('click', () => {
            slots.forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
            engine.player.selectedBlock = parseInt(slot.dataset.type);
        });
    });

    // Pause System
    const pauseMenu = document.getElementById('pause-menu');
    const resumeBtn = document.getElementById('btn-resume');

    function togglePause() {
        engine.isRunning = !engine.isRunning;
        if(!engine.isRunning) pauseMenu.classList.remove('hidden');
        else pauseMenu.classList.add('hidden');
    }

    resumeBtn.addEventListener('click', togglePause);

    // 3. Start Game
    engine.init();

    // 4. Memory Challenge Logic (Cognitive Feature)
    setInterval(() => {
        if(engine.isRunning) {
            triggerMemoryChallenge();
        }
    }, 30000); // Every 30 seconds

    function triggerMemoryChallenge() {
        const panel = document.getElementById('pattern-challenge');
        panel.classList.remove('hidden');
        
        // Draw a random color on the mini canvas
        const miniCtx = document.getElementById('miniCanvas').getContext('2d');
        const colors = ['#ff9800', '#4caf50', '#607d8b'];
        const targetColor = colors[Math.floor(Math.random() * colors.length)];
        
        miniCtx.fillStyle = targetColor;
        miniCtx.fillRect(0,0,100,100);
        miniCtx.fillStyle = "white";
        miniCtx.font = "12px Arial";
        miniCtx.fillText("Build 5 blocks!", 10, 50);

        // Auto hide after 5 seconds to test memory
        setTimeout(() => {
            panel.classList.add('hidden');
        }, 5000);
    }
});
