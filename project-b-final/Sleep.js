class Sleep {
    constructor() {
        this.frameCounter = 0;
        this.dotCount = 0;
        this.isDone = false;
    }

    start() {
        this.frameCounter = 0;
        this.dotCount = 0;
        this.isDone = false;
    }

    display() {
        background(0);

        this.animateDots();

        fill(200);
        textAlign(CENTER, CENTER);
        textSize(32);

        let dots = ".".repeat(this.dotCount);
        text("Loading" + dots, width / 2, height / 2);
    }

    animateDots() {
        this.frameCounter++;

        // every ~20 frames update dots
        if (this.frameCounter % 20 == 0) {
            this.dotCount = (this.dotCount + 1) % 4; // 0→3 loop
        }

        // after ~20 seconds, finish loading
        if (this.frameCounter > 600) {
            this.isDone = true;
        }
    }
}