/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new TrafficTwins(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class TrafficTwins {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    this.angle = 0;
    this.red = true;
    this.green = true;
    this.redangle= PI/10;
    this.greenwalk = 0.5;
    this.greenx = 0
    this.greeny = 0
    this.t = 0
    

    
    
    
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.angle = map(sin(frameCount*0.05),-1,1,-PI/10,PI/10)
    this.greenwalk = sin(frameCount * 0.2) * 0.5;
    this.redangle=this.redangle+PI/100;
    if (frameCount%20 ==0){
      this.greenx = sin(this.t-frameCount%1000) * 10;
      this.greeny = cos(this.t+frameCount%1000) * 10;
    }
    if (frameCount%10 ==0){
      this.t = noise(frameCount)*1000;
      if(noise(this.t)>=0.5){
        this.red = true;
      } else {
        this.red = false;
      }
      if(noise(-this.t+frameCount)<=0.5){
        this.green = true;
      } else {
        this.green = false;
      }
    }
    
    
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    push();
    rotate(this.angle);
    noStroke();
    //main body
    push();
      fill(150,150,150)
      rect(-50,-100,100,200);
    pop();
    //led screens
    push();
      fill(0);
      rect(-40,-90,80,180);
    pop();
    // seperator
    push();
      fill(150,150,150);
      rect(-50,-10,100,20);
    pop();
    // Red.Jr
    push();
      if(this.red){
        translate(0, -45); // move to top half of screen
        rotate(this.redangle);
        fill(255, 0, 0);
        // head
        ellipse(0, -20, 12, 12);
        // body
        rect(-3, -15, 6, 20);
        // arms (straight down)
        rect(-8, -15, 4, 15);
        rect(4, -15, 4, 15);
        // legs (together)
        rect(-4, 5, 4, 15);
        rect(0, 5, 4, 15);
      }
    pop();
    //Green.Jr
    push();
      if(this.green){
        translate(this.greenx,this.greeny+45); // move to bottom half of screen
        fill(0, 255, 0);
        // head
        ellipse(0, -20, 12, 12);
        // body (slightly tilted forward)
        push();
        rotate(-0.2);
        rect(-3, -15, 6, 20);
        pop();
        // arms (opposite swing)
        push();
        rotate(this.greenwalk*0.4);
        rect(-8, -10, 4, 15);
        pop();
        push();
        rotate(-this.greenwalk*0.4);
        rect(4, -10, 4, 15);
        pop();
        // legs (walking split)
        push();
        rotate(-this.greenwalk);
        rect(-2, 5, 4, 15);
        pop();
        push();
        rotate(this.greenwalk);
        rect(2, 5, 4, 15);
        pop();
      }
    pop();
    pop();






    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/