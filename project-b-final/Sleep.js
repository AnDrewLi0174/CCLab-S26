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

        if (this.frameCounter % 20 == 0) {
            this.dotCount = (this.dotCount + 1) % 4; 
        }

        if (this.frameCounter > 600) {
            this.isDone = true;
        }
    }
}