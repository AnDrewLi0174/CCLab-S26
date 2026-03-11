let angle = 0;
let cx;
let cy;

let preyCaught = false;
let eatPhase = 0;

function setup() {
  let canvas =createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  cx = width/2;
  cy = height/2;
  colorMode(HSB,100);
  noCursor();
}

function updateAranea() {

  if(preyCaught) return;

  let mouseInside =
    mouseX >= 0 && mouseX <= width &&
    mouseY >= 0 && mouseY <= height;

  if (mouseInside) {

    let targetAngle = atan2(mouseY - cy, mouseX - cx);

    if (mouseIsPressed) {
      targetAngle += PI;
    }

    let diff = angleDifference(targetAngle, angle);
    angle += diff * 0.08;

  } else {

    if (frameCount % 90 === 0) {
      angle += random(-PI/3, PI/3);
    }
  }

  let speed = 3.5 + noise(frameCount * 0.02) * 1.2;
  let vx = cos(angle) * speed;
  let vy = sin(angle) * speed;

  cx += vx;
  cy += vy;

  let margin = -70;

  if (cx < margin || cx > width - margin) {
    vx *= -1;
    angle = atan2(vy, vx);
    cx = constrain(cx, margin, width - margin);
  }

  if (cy < margin || cy > height - margin) {
    vy *= -1;
    angle = atan2(vy, vx);
    cy = constrain(cy, margin, height - margin);
  }
}

function angleDifference(a, b) {
  let diff = a - b;
  while (diff > PI) diff -= TWO_PI;
  while (diff < -PI) diff += TWO_PI;
  return diff;
}

function fish(x, y) {

  push();

  noStroke();
  fill(30, 80, 90);
  ellipse(x,y,18,10);

  triangle(x-10,y,x-16,y+5,x-16,y-5);

  triangle(x-2,y-5,x-3,y-10,x+6,y-5);

  fill(0);
  circle(x+5,y-1,2.5);

  pop();
}

function rock(x,y){

  push();

  noStroke();
  fill(20,20,60);

  beginShape();
  for(let a=0;a<TWO_PI;a+=0.4){
    let n = noise(a*3 + frameCount*0.02)*18;
    let rx = x + cos(a)*(22+n);
    let ry = y + sin(a)*(18+n*0.7);
    vertex(rx,ry);
  }
  endShape(CLOSE);

  pop();
}

function aranea(x,y){

  push();
  translate(x,y);

  let h = (frameCount * 1.5) % 100;
  let freq = 0.05;

  let x0 = map(sin(freq*PI*frameCount),-1,1,-100,100);
  let y0 = 0;

  let xA = 0;
  let yA = map(cos(freq*PI*frameCount),-1,1,-100,100);

  let x1 = map(sin(freq*PI*frameCount+PI/4),-1,1,-70,70);
  let y1 = map(sin(freq*PI*frameCount+PI/4),-1,1,-70,70);

  let x2 = map(sin(freq*PI*frameCount+3*PI/4),-1,1,-70,70);
  let y2 = map(-sin(freq*PI*frameCount+3*PI/4),-1,1,-70,70);

  stroke(h,100,100);
  strokeWeight(2);

  line(0,0,x0,y0);
  line(0,0,xA,yA);
  line(0,0,x1,y1);
  line(0,0,x2,y2);

  noStroke();
  fill(h,100,100);

  circle(x0,y0,30);
  circle(xA,yA,30);
  circle(x1,y1,30);
  circle(x2,y2,30);

  let coreSize;

  if(preyCaught){
    eatPhase += 0.25;
    coreSize = 50 + sin(eatPhase)*20;
  } else {
    coreSize = 40 + 6*sin(frameCount*0.15);
  }

  fill((h+50)%100,100,100);
  circle(0,0,coreSize);

  pop();
}

function bg(){

  push();

  let backgroundCoarsity = map(noise(5),0,1,5,10);
  background(0);

  push();
  noStroke();

  for (let x = backgroundCoarsity / 2; x < width; x += backgroundCoarsity) {
    for (let y = backgroundCoarsity / 2; y < height; y += backgroundCoarsity) {

      let s = backgroundCoarsity * noise(frameCount * 0.1 + x * y * 0.003);

      let di1 = dist(mouseX, mouseY, x, y);
      let b1 = map(di1, 0, 50, 100, 0);

      let d12 = dist(cx,cy,x,y);
      let b2 = map(d12,0,100,100,0);

      if (b1>b2){
        fill(50 + noise(x * y * 0.01) * 20, 80, b1);
      } else {
        fill(50 + noise(x * y * 0.01) * 20, 80, b2);
      }

      if (noise(x * y * 0.007) > 0.5) {
        circle(x,y,s);
      } else {
        rectMode(CENTER);
        rect(x,y,s,s);
      }
    }
  }

  pop();
  pop();
}

function draw() {

  bg();

  updateAranea();

  if(!preyCaught && !mouseIsPressed){
    let d = dist(cx,cy,mouseX,mouseY);
    if(d < 25){
      preyCaught = true;
    }
  }

  push();
  translate(cx,cy);
  rotate(angle);
  aranea(0,0);
  pop();

  if (!preyCaught){

    if(mouseIsPressed){
      rock(mouseX,mouseY);
    } else {
      fish(mouseX,mouseY);
    }

  }

  if(preyCaught){
    push();
    textAlign(CENTER,CENTER);
    textSize(42);
    fill(0,0,100);
    stroke(0);
    strokeWeight(3);
    text("YOU HAVE BEEN PREYED",width/2,height/2);
    textSize(18);
    noStroke();
    text("Press R to reset",width/2,height/2+40);
    pop();
  }

}

function keyPressed(){

  if(key === 'r' || key === 'R'){
    preyCaught = false;
    cx = width/2;
    cy = height/2;
    eatPhase = 0;
  }

}