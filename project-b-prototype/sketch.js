let mainPage;

function setup() {
    createCanvas(800, 600);
    mainPage = new MainPage();
}

function draw() {
    background(20);
    mainPage.display();
}
