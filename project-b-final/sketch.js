let currentPage;
let mainPage;
let sleepPage;
let photosPage;

let imgs = [];

// hand tracking
// let handPose;
// let video;
// let hands = [];
// let bgSound;



function preload() {
    for (let i = 1; i <= 11; i++) {
        imgs.push(loadImage("pic" + i + ".jpg"));
    }
    bgSound = loadSound("forest.mp3");
    console.log("Loaded");
    // ml5 model
    //handPose = ml5.handPose({ maxHands: 1, flipped: false });
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // webcam (hidden)
    //video = createCapture(VIDEO);
    //video.size(width, height);
    //video.hide();

    // start hand tracking
    //handPose.detectStart(video, gotHands);

    mainPage = new MainPage();
    sleepPage = new Sleep();
    photosPage = new Photos(imgs, bgSound); 

    currentPage = mainPage;
}

function draw() {
    background(0);

    if (currentPage == photosPage) {
    }

    currentPage.display();

    if (currentPage == sleepPage && sleepPage.isDone) {
        currentPage = photosPage;
    }
}

function keyPressed() {
    if (currentPage.handleKeyPressed)
        currentPage.handleKeyPressed(key, keyCode);
}

function mousePressed() {
    if (currentPage.handleMousePressed)
        currentPage.handleMousePressed(mouseX, mouseY);
}

// hand tracking callback
//function gotHands(results) {
//    hands = results;
//}
