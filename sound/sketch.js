let sound;
let x;
let speedX;
let s=50;
function setup(){
    createCanvas(400,400);
    //sound.play();
}

function draw(){
    background(220);
    fill(0);
    circle(mouseX,mouseY,50);
}

function preload(){
    sound=loadSound("sounds/kick.mp3");
}

function mousePressed(){
    if(sound.isplaying()==false){
        sound.play();
    } else {
        sound.stop();
    }
}