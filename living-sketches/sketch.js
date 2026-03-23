let scanned = [];
let water;
let candle;
let chocolate;
let doodles;

let curWater = 0;
let curCandle = 0;
let curChocolate = 0;
let waterX;
let waterY;
let candleX;
let candleY;
//let rocketY = 500;
//let rocketSpeedY = 0;
//let curDoodle1 = 0;
//let curDoodle = 0;

function preload() {
  for (let i = 1; i <= 4; i++) {
    scanned.push(loadImage("frame" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(800, 500);

  eraseBg(scanned, 10);
  water = crop(scanned, 0,100 , 500, 500);
  candle = crop(scanned, 1300, 650, 200, 250);
  chocolate = crop(scanned, 0, 1100, 500, 500);
  //doodles2 = crop(scanned, 100, 1300, 366, 311);
}

function draw() {
  background(255);

  // examples: eye
  push();
  imageMode(CENTER);
  image(
    chocolate[curChocolate],
    mouseX,
    mouseY,
    chocolate[0].width * 0.25,
    chocolate[0].height * 0.25
  );

  curChocolate = floor((frameCount / 20) % chocolate.length);
  pop();

  // rain

  push();
  if (curWater==0){
    waterX=map(noise(frameCount*0.2),0,1,200,600);
    waterY=map(noise(frameCount*0.3),0,1,100,400);
  }
  translate(waterX, waterY);
  //rotate(radians(-90));
  imageMode(CENTER);
  image(
    water[curWater],
    0,
    0,
    water[0].width * 0.25,
    water[0].height * 0.25
  );
  pop();

  // rocket animation only has 4 frames
  curWater = floor((frameCount / 5) % 4);
  push();
  if (curCandle==0){
    candleX=map(noise(frameCount*0.7),0,1,200,600);
    candleY=map(noise(frameCount*0.5),0,1,100,400);
  }
  translate(candleX, candleY);
  //rotate(radians(-90));
  imageMode(CENTER);
  image(
    candle[curCandle],
    0,
    0,
    candle[0].width * 0.25,
    candle[0].height * 0.25
  );
  pop();

  // rocket animation only has 4 frames
  curCandle = floor((frameCount / 20) % 4);


}

// You shouldn't need to modify these helper functions:

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}
