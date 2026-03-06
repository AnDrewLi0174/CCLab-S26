let angle = 0;
let cx 
let cy
function setup() {
    let canvas =createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    cx=width/2
    cy=height/2
    colorMode(HSB,100)
    //noCursor();
}
function updateAranea() {

  let mouseInside =
    mouseX >= 0 && mouseX <= width &&
    mouseY >= 0 && mouseY <= height;

  if (mouseInside) {

    let targetAngle = atan2(mouseY - cy, mouseX - cx);

    if (mouseIsPressed) {
      targetAngle += PI;   // face away
    }

    let diff = angleDifference(targetAngle, angle);
    angle += diff * 0.08;   // smooth turning

  } else {

    // random walk
    if (frameCount % 90 === 0) {   // not too fast
      angle += random(-PI/3, PI/3);
    }
  }
  let margin = 80;   // how close before reacting
  let turnForce = 0.1;

  if (cx < margin) {
    angle += turnForce;
  }
  if (cx > width - margin) {
    angle -= turnForce;
  }
  if (cy < margin) {
    angle += turnForce;
  }
  if (cy > height - margin) {
    angle -= turnForce;
  }

  // Move forward in facing direction
  let speed = 1.5 + noise(frameCount * 0.02) * 1.2;
  cx += cos(angle) * speed;
  cy += sin(angle) * speed;
}
function angleDifference(a, b) {
  let diff = a - b;
  while (diff > PI) diff -= TWO_PI;
  while (diff < -PI) diff += TWO_PI;
  return diff;
}
function aranea(x,y){
  push();
  noStroke();
  fill(frameCount*2%360,80,80)
  beginShape();
  vertex(x-40,y)
  vertex(x+25,y+30)
  vertex(x+25,y-30)
  endShape();
  pop();
}
function bg(){
  // insert week 4 here 
  push();
  //noStroke()
  //fill(10,100,100)
  //rect(0,100,800,300)
  let backgroundCoarsity;
  let waveGap = 50;

  let rockX = 0;
  let rockY = 0;
  let rockTimer = 0;
  let rockActive = false;
  let rockAlpha = 0;

  let wasPressed = false;
  backgroundCoarsity = map(noise(5),0,1,5,10);
  waveGap = random(30, 70);
  background(0);

  push();
  noStroke();
  for (let x = backgroundCoarsity / 2; x < width; x += backgroundCoarsity) {
    for (let y = backgroundCoarsity / 2; y < height; y += backgroundCoarsity) {
      let s = backgroundCoarsity * noise(frameCount * 0.1 + x * y * 0.003);
      let di = dist(mouseX, mouseY, x, y);
      let b = map(di, 0, 200, 100, 0);
      fill(50 + noise(x * y * 0.01) * 20, 80, b);
      if (noise(x * y * 0.007) > 0.5) {
        circle(x, y, s);
      } else {
        rectMode(CENTER);
        rect(x, y, s, s);
      }
    }
  }
  pop();

  push();
  let prevx;
  let prevy;
  for (let y = 50; y < 500; y += 50) {
    let portion = map(noise(y * 0.01), 0, 1, 0.2, 0.3);
    let offset = map(noise(10*y), 0, 1, 0, 1 - portion);
    for (let i = 0; i < 40; i++) {
      let x = map(i, 0, 40, offset * width, (offset + portion) * width);
      let y1 = y + 10 * sin(frameCount * 0.08 + i * 0.15 + y * 0.03);
      let di2 = dist(mouseX, mouseY, x, y1);
      let b2 = map(di2, 0, 220, 100, 20);
      fill(200, 0, b2);
      circle(x, y1, 3.5);
      if (i>0){
        push();
        stroke(200,0,b2);
        line(prevx,prevy,x,y1);
        pop();
      }
      prevx=x;
      prevy=y1;
    }
  }
  pop();

  let justPressed = mouseIsPressed && !wasPressed;

  if (justPressed) {
    rockX = mouseX;
    rockY = mouseY;
    rockTimer = 0;
    rockActive = true;
    rockAlpha = 100;
  }

  wasPressed = mouseIsPressed;

  if (rockActive) {
    rockTimer++;

    rockAlpha = map(rockTimer, 0, 500, 100, 0);
    if (rockTimer > 1800) {
      rockActive = false;
    }

    push();
    noFill();
    strokeWeight(2.5);

    fill(20, 30, rockAlpha);
    noStroke();
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.4) {
      let n = noise(a * 3 + rockTimer * 0.006) * 28;
      let x = rockX + cos(a) * (22 + n);
      let y = rockY + sin(a) * (18 + n * 0.7);
      vertex(x, y);
    }
    endShape(CLOSE);

    pop();
  }
  
  pop();
}
function draw() {
  //background(220);
  bg();
  updateAranea();
  translate(cx,cy)
  push();
  rotate(angle)
  aranea(0,0)
  pop();
}