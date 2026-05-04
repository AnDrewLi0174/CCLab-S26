class Photos {
    constructor(imgs,sound) {
        this.imgs = imgs;
        this.sound = sound;
        console.log(this.sound);

        this.currentIndex = 0;
        this.currentImg = this.imgs[this.currentIndex];

        this.pixelSize = 1;
        this.fade = 0;

        this.animating = false;
        this.phase = "idle";

        this.drawW = 0;
        this.drawH = 0;
        this.offsetX = 0;
        this.offsetY = 0;

        this.noiseOffsetX = random(1000);
        this.noiseOffsetY = random(1000);

        this.entries = [
            "Sheikh Zayed Mosque, 2024.08.24, UAE. I was never religious, but at that moment, I saw.",
            "Architecture, Nightlife; Chengdu, Sichuan, China; 2025",
            "I went to the woods because I wished to live deliberately, to front only the essential facts of life… -- Walden, Henry David Thoreau",
            "'Wishing you a Purr-fect afternoon.' Said the cat, as I was passing by.",
            "How do you tell photos from paintings? Sichuan, China; December 2025",
            "Sunset, a lone boat, tranquility; Ningxia, China, Summer 2024",
            "'Hows the catch today?' -- Asks one to the other. 'Somewhat fishy.' -- Was the reply'; Zhejiang, China, January 2025",
            "One loves the sunset, when one is so sad… -- The Little Prince.",
            "Sunrise, Cat, Sand, 6:56 AM",
            "I had to wake up at 5AM for this, grumbles Andrew.",
            "When you have no experience dune sledding, you might just get desert for dessert"
        ];

        this.randomSentences = [
            "How do we preserve memories?",
            "Photographs, some might say.",
            "But photos don't include everything.",
            "How about sound?",
            "Or words,sense of touch, even scent?",
            "How do we remember?",
            "How do we leave traces behind, even if we're gone?"
        ];

        this.showEntry = true;
        this.activeSentences = [];
        this.lastSpawnTime = 0;

        this.computeImageLayout();
    }

    handleKeyPressed(k, code) {
        if (code == ENTER && !this.animating) {
            this.startTransition();
        }
    }

    startTransition() {
        this.animating = true;
        this.phase = "pixelate";
    }

    startSound() {
        if (this.sound && !this.sound.isPlaying()) {
            this.sound.setLoop(true);
            //this.sound.setVolume(0.4);
            this.sound.play();
        }
    }

    display() {
        fill(0, 1);
        rect(0, 0, width, height);

        this.drawImage();

        fill(0, this.fade);
        rect(0, 0, width, height);

        if (this.animating) {
            this.updateAnimation();
        }

        this.updateFloatingSentences();
        this.drawFloatingSentences();
        this.drawEntryPopup();

        this.drawButtons();
        if (this.sound && !this.sound.isPlaying()) {
            this.startSound();
            console.log("Playing");
        }
    }

    drawImage() {
        this.currentImg.loadPixels();

        let s = max(4, this.pixelSize * 4);

        for (let x = 0; x < this.currentImg.width; x += s) {
            for (let y = 0; y < this.currentImg.height; y += s) {

                if (noise(x * 0.05 + this.noiseOffsetX, y * 0.05 + this.noiseOffsetY) < 0.5) continue;

                let index = (floor(x) + floor(y) * this.currentImg.width) * 4;

                let r = this.currentImg.pixels[index + 0];
                let g = this.currentImg.pixels[index + 1];
                let b = this.currentImg.pixels[index + 2];

                let screenX = map(x, 0, this.currentImg.width, 0, this.drawW) + this.offsetX;
                let screenY = map(y, 0, this.currentImg.height, 0, this.drawH) + this.offsetY;

                let d = dist(mouseX, mouseY, screenX, screenY);
                let rad = map(d, 0, width / 2, s * 3, 1);

                fill(r, g, b);
                noStroke();
                ellipse(screenX, screenY, rad, rad);
            }
        }
    }

    updateAnimation() {
        if (this.phase == "pixelate") {
            this.pixelSize = min(this.pixelSize + 2, 60);

            if (this.pixelSize >= 60) {
                this.phase = "fade";
            }
        } 
        else if (this.phase == "fade") {
            this.fade = min(this.fade + 15, 255);

            if (this.fade >= 255) {
                this.switchImage();
                this.phase = "reveal";
            }
        } 
        else if (this.phase == "reveal") {
            this.fade = max(this.fade - 15, 0);
            this.pixelSize = max(this.pixelSize - 2, 1);

            if (this.fade == 0 && this.pixelSize == 1) {
                this.animating = false;
                this.phase = "idle";
            }
        }
    }

    switchImage() {
        this.currentIndex = (this.currentIndex + 1) % this.imgs.length;
        this.currentImg = this.imgs[this.currentIndex];

        this.computeImageLayout();

        this.noiseOffsetX = random(1000);
        this.noiseOffsetY = random(1000);

        this.showEntry = true;
    }

    surpriseSwitch() {
        let newIndex;

        do {
            newIndex = floor(random(this.imgs.length));
        } while (newIndex == this.currentIndex && this.imgs.length > 1);

        this.currentIndex = newIndex;
        this.currentImg = this.imgs[this.currentIndex];

        this.computeImageLayout();

        this.noiseOffsetX = random(1000);
        this.noiseOffsetY = random(1000);

        this.showEntry = true;
    }

    computeImageLayout() {
        let imgRatio = this.currentImg.width / this.currentImg.height;
        let canvasRatio = width / height;

        if (imgRatio > canvasRatio) {
            this.drawW = width;
            this.drawH = width / imgRatio;
        } else {
            this.drawH = height;
            this.drawW = height * imgRatio;
        }

        this.offsetX = (width - this.drawW) / 2;
        this.offsetY = (height - this.drawH) / 2;
    }

    updateFloatingSentences() {
        if (this.activeSentences.length < 5) {
            if (millis() - this.lastSpawnTime > random(2000, 5000)) {
                this.activeSentences.push({
                    text: random(this.randomSentences),
                    x: random(50, width - 200),
                    y: random(50, height - 50),
                    w: 200,
                    h: 40
                });

                this.lastSpawnTime = millis();
            }
        }
    }

    drawFloatingSentences() {
        for (let s of this.activeSentences) {
            fill(0, 180);
            rect(s.x, s.y, s.w, s.h, 6);

            fill(255);
            textAlign(LEFT, CENTER);
            textSize(14);
            text(s.text, s.x + 10, s.y + s.h / 2);
        }
    }

    drawEntryPopup() {
        if (!this.showEntry) return;

        let w = width * 0.5;
        let h = height * 0.3;
        let x = (width - w) / 2;
        let y = (height - h) / 2;

        fill(0, 220);
        rect(x, y, w, h, 12);

        fill(255);
        textAlign(LEFT, TOP);
        textSize(16);

        let entry = this.entries[this.currentIndex % this.entries.length];
        text(entry, x + 20, y + 20, w - 40, h - 40);
    }

    drawButtons() {
        let x = 20;
        let y = 20;
        let w = 140;
        let h = 45;

        fill(120);
        noStroke();
        rect(x, y, w, h, 8);

        fill(0);
        textAlign(CENTER, CENTER);
        textSize(16);
        text("← Back", x + w / 2, y + h / 2);

        fill(180);
        rect(x, y + 60, w, h, 8);

        fill(0);
        text("Surprise Me", x + w / 2, y + 60 + h / 2);
    }

    handleMousePressed(mx, my) {
        userStartAudio(); // I asked AI , and it said this is the way to bypass webpages blocking autoplay.
        if (this.showEntry) {
            this.showEntry = false;
            return;
        }

        for (let i = this.activeSentences.length - 1; i >= 0; i--) {
            let s = this.activeSentences[i];

            if (mx > s.x && mx < s.x + s.w && my > s.y && my < s.y + s.h) {
                this.activeSentences.splice(i, 1);
                return;
            }
        }

        let x = 20;
        let y = 20;
        let w = 140;
        let h = 45;

        if (mx > x && mx < x + w && my > y && my < y + h) {
            if (this.sound) this.sound.stop();
            currentPage = mainPage;
        }

        if (mx > x && mx < x + w && my > y + 60 && my < y + 60 + h) {
            this.surpriseSwitch();
        }
    }
}
