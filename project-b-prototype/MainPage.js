function keyPressed() {
    mainPage.handleKeyPressed(key, keyCode);
}

function mousePressed() {
    mainPage.handleMousePressed(mouseX, mouseY);
}

class MainPage {
    constructor() {
        this.textrecord = "";      // user input
        this.displayText = "";     // what is shown in box

        this.narratives = [
            "Searching...",
            "Nothing was found.",
            "But something found you.",
            "Welcome."
        ];

        this.narrativeIndex = 0;
        this.typingIndex = 0;
        this.isTyping = false;
        this.isNarrating = false;

        this.frameCounter = 0;
        this.showButton = false;
    }

    display() {
        this.titleDisplay();
        this.drawCobweb();
        this.drawSpider();
        this.searchBox();
        this.handleNarrative();
        this.drawButton();
    }

    // ---------------------------
    // INPUT HANDLING
    // ---------------------------
    handleKeyPressed(k, code) {
        // If narrative is running, ignore typing
        if (this.isNarrating) return;

        if (code === ENTER) {
            this.startNarrative();
        } else if (code === BACKSPACE) {
            this.textrecord = this.textrecord.slice(0, -1);
        } else if (k.length === 1) {
            this.textrecord += k;
        }
    }

    startNarrative() {
        this.isNarrating = true;
        this.displayText = "";
        this.narrativeIndex = 0;
        this.typingIndex = 0;
        this.isTyping = true;
    }

    handleMousePressed(mx, my) {
        if (!this.showButton) return;

        let x = width / 2 - 75;
        let y = height / 2 + 60;
        let w = 150;
        let h = 40;

        if (mx > x && mx < x + w && my > y && my < y + h) {
            console.log("Go to next page");
            // future: switch page here
        }
    }

    // ---------------------------
    // DISPLAY ELEMENTS
    // ---------------------------
    titleDisplay() {
        fill(200);
        textAlign(CENTER);
        textSize(32);
        text("Forgotten Search", width / 2, 80);
    }

    drawCobweb() {
        stroke(150);

        line(0, 0, 100, 50);
        line(0, 0, 50, 100);

        line(width, height, width - 100, height - 50);
        line(width, height, width - 50, height - 100);

        noStroke();
    }

    drawSpider() {
        let x = 80;
        let y = 50 + sin(frameCount * 0.05) * 10;

        stroke(200);
        line(x, 0, x, y);

        fill(0);
        ellipse(x, y, 10, 10);
        noStroke();
    }

    searchBox() {
        fill(255);
        rect(width / 2 - 200, height / 2 - 30, 400, 60, 5);

        fill(0);
        textAlign(LEFT);
        textSize(16);

        let textToShow = this.isNarrating ? this.displayText : this.textrecord;
        text(textToShow, width / 2 - 190, height / 2 + 5);
    }

    // ---------------------------
    // NARRATIVE SYSTEM
    // ---------------------------
    handleNarrative() {
        if (!this.isNarrating) return;

        this.frameCounter++;
        if (this.frameCounter % 3 !== 0) return;

        let fullText = this.narratives[this.narrativeIndex];

        if (this.isTyping) {
            if (this.typingIndex < fullText.length) {
                this.displayText += fullText[this.typingIndex];
                this.typingIndex++;
            } else {
                this.isTyping = false;
            }
        } else {
            if (this.displayText.length > 0) {
                this.displayText = this.displayText.slice(0, -1);
            } else {
                this.isTyping = true;
                this.typingIndex = 0;
                this.narrativeIndex++;

                if (this.narrativeIndex >= this.narratives.length) {
                    this.isNarrating = false;
                    this.showButton = true;
                }
            }
        }
    }

    drawButton() {
        if (!this.showButton) return;

        fill(100);
        rect(width / 2 - 75, height / 2 + 60, 150, 40, 5);

        fill(255);
        textAlign(CENTER);
        text("Enter", width / 2, height / 2 + 85);
    }
}



