class Player {
    constructor(world) {
        this.world = world;
        this.x = world.width * world.tileSize / 2;
        this.y = world.height * world.tileSize / 2;
        this.size = 20;
        this.speed = 5;
        this.color = '#ffffff';
        this.selectedBlock = 1;
    }

    update(input) {
        let dx = 0;
        let dy = 0;

        if (input.up) dy = -this.speed;
        if (input.down) dy = this.speed;
        if (input.left) dx = -this.speed;
        if (input.right) dx = this.speed;

        this.move(dx, 0);
        this.move(0, dy);
    }

    move(dx, dy) {
        // Simple collision check
        let nextX = this.x + dx;
        let nextY = this.y + dy;
        
        // Boundary Check
        if(nextX > 0 && nextX < this.world.width * this.world.tileSize) this.x = nextX;
        if(nextY > 0 && nextY < this.world.height * this.world.tileSize) this.y = nextY;
    }
}
