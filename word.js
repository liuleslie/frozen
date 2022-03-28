let m = 0.1;
let tempPtSize = 30; // temp hard coded value; should be passed to update() or perhaps be an attribute of the class

class Word {
  
  constructor(what,x,y,touched) {
    this.what = what;
    this.x = x;
    this.y = y;
    this.interactive = false;
    this.touches = 0;
    this.touchedTime = -1000;
  }
  
//   constructor(what,x,y,touched,textSize,i){
//     //attributes
//     this.what = what;
//     this.x = x; // x-co
//     this.y = y; // y-co 
//     // this.touched = false;    NB — can delete?
//     this.textHeight = textSize;
//     this.rBr = x+textWidth(what); // right bearing
//     // this.textColor = 'black'; // drawn black by default    NB — can delete?
//     // this.ind = i; // temp debugging var                  NB — can delete?
//     this.touches = 0; // tracking whether letter's been tapped before
//     this.interactive = false;
//   }
  
  draw(ptSize) {
    angleMode(DEGREES)
    colorMode('RGB', 255);
    if (this.touches == 1) {
      fill('red')
    }
    else if (this.touches > 1) {
      fill('green')
    }
    else {
      fill('black')
    }
    textSize(ptSize);
    text(this.what,this.x,this.y);
  }
  
  
  update(currentX,currentY) {
    angleMode(DEGREES)
    if ((currentX >= this.x) && (currentY >= this.y) && (currentX <= this.x + textWidth(this.what)) && (currentY <= this.y + tempPtSize)) {
      this.touches ++; // maybe a millis() to track each word's age (date of birth = when it was first touchced)
      if (this.touches == 1) {
        this.interactive = true;
        // this.touchedTime = currentMillisecond;
      }
    }
    if (this.interactive) {
      let boundXMin = 5;
      let boundXMax = 350;
      let boundYMin = 30;
      let boundYMax = 600;
      
      let offsetX = -300;
      let offsetY = -300;
      // take care of edges: should stay "trapped" within the screen — this is glitchy rn
      // let dyWord = rotationX;
      // let dxWord = rotationY;
      
      let wordWidth = textWidth(this.what);
      
      // rotation of device across X axis affects how the word slides up and down the canvas
      // The order the rotations are called is important, ie. if used together, 
      // it must be called in the order Z-X-Y or there might be unexpected behaviour.
      
      
      // lets have bounds of pRotY be [-45, 45]
      // the more you rotate, the more it moves
      
      let dy = rotationY - pRotationY;
      // offsetX = dy * (boundXMax-boundXMin) *0.03;
      let dx = rotationX - pRotationX;
      // offsetY = dx * (boundYMax-boundYMin) *0.03;
      
      
      
     
      // how do i bring time into this?
      // offsetX = map(pRotationY,-90,90,boundXMin,boundXMax-wordWidth) //need to account for word length (textWidth(this.what))
      
      // The system variable rotationX always contains the rotation of the device along the x axis. 
      // If the sketch angleMode() is set to DEGREES, the value will be -180 to 180. If it is set to RADIANS,
      //   the value will be -PI to PI.
      
      

      
      if (this.x < boundXMin) {this.x = boundXMin}
      if (this.x + wordWidth > boundXMax) {this.x = boundXMax-wordWidth}
      if (this.y < boundYMin) {this.y = boundYMin}
      if (this.y + tempPtSize > boundYMax) {this.y = boundYMax-tempPtSize}
      
      
      // below if statement hardcoded numbers feel sus
      // if ((this.x + offsetX <= 0) | (this.x + offsetX >= boundXMax) | (this.y + offsetY <= b) | (this.y + offsetY >= boundYMax)) {
      //   offsetX = (Math.random()*5)-2;
      //   offsetY = (Math.random()*5)-2;
      // }
      
      offsetX = dy * (Math.random()*10-10);
      offsetY = dx * (Math.random()*10-10);
      this.x -= offsetX;
      this.y -= offsetY;
    }
    
    // if (this.interactive) {
    //   // temp ix
    //   let offsetX = -500;
    //   let offsetY = -500;
    //   if ((this.x + offsetX <= 0) | (thsi.x + offsetX >= 300)) {
    //     offsetX = (Math.random()*2)-1;
    //     offsetY = (Math.random()*2)-1;
    //   }
    //   this.x += offsetX;
    //   this.y += offsetY;
    // }
  }
  
}
