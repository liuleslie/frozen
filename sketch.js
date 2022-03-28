// sample paragraph for now; will need to compile all text later
let txt = "The turkey dinner had been chosen to test the concept because it usually was a big meal, a festive, once-or-twice-a-year meal when served at home, a menu associated with the holidays and good times, and a labor-intensive meal that showed off the convenience of a frozen entree to best advantage.";
let title = "FRESH NEVER FROZEN";
let words = []; // txt.split(" ");
let ptSize = 30; // subject to change, point size in pixels — textSize() refers to this from here on out
let myFont;
let permissionGranted = false;

function preload() {
  // myFont = loadFont('https://cdn.glitch.global/4033e654-2b4a-4823-b14d-ee672541d958/LetterGothicStd.otf?v=1647877556643')
}


function setup() {
  // SENSORS: rotation
  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    // ios 13
    DeviceOrientationEvent.requestPermission()
    .catch(() => {
      // show permission dialog first time only
      let button = createButton("allow sensors"); // to access sensors
      button.style("font-size","30px")
      button.center();
      button.mousePressed(requestAccess);
      throw error;
    })
    .then(() => { // on any subsequent visits, set to true to avoid additional popup dialog
      permissionGranted = true;
    })
  } else {
    // non ios13
    fill('black')
    text('non ios 13+ device',100,100)
    permissionGranted = true; // for testing
  }
  
  
  // P5
  var myCan = createCanvas(windowWidth,windowHeight);
  myCan.parent('p5Container')
  
  
  // P5: add words
  let currentX = 5; // starting x-coordinate
  let currentY = 50; // starting y-coordinate
  let tempWords = txt.split(" ");
  // let windowMargins = windowWidth*0.15;
  let windowMargins = 8; // windowWidth margins: spacing
  
  for (let i = 0; i < tempWords.length; i++) {
    // textFont(myFont);
    let wordWidth = textWidth(tempWords[i]) + textWidth(' ')
    // check if wordwidth at currentX will exceed screen size on the right edge
    words.push(new Word(tempWords[i],currentX,currentY,false)) // add new word with default attributes as text is laid out
    // currentX += (textWidth(tempWords[i] + ' ')) * 2.5
    
    // checking if text will go beyond the right edge of the screen
    if (i <= tempWords.length-2) { // if there is more text to print (if index is up to and including second to last letter)
      if (currentX + (textWidth(tempWords[i]+' ')) * 2.5 >= 300) {
        // currentX = 5; // move to left
        currentX = windowMargins
        currentY += (ptSize * 1.2) // move down to new line
      }
      else {
        currentX += (textWidth(tempWords[i] + ' ')) * 2.5
      }
    }
  }
  
  
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
  .then(response => {
    // response either granted or denied
    if (response == 'granted') {
      // ready to use sensors
      permissionGranted = true;
    } else {
      permissionGranted = false;
    }
  })
  .catch(console.error);
  this.remove();
}



function draw() {
  colorMode('RGB',255)
  angleMode(DEGREES)
  
  // see if device is iOS13+ or not
  // DeviceOrientationEvent, DeviceMotionEvent — if they exist, iOS13+
  if (!permissionGranted) return;
  
  // check touches code temporarily here — assume only one finger on screen
  if (touches.length >= 1) {
    latestX = touches[touches.length-1].x;
    latestY = touches[touches.length-1].y;
  }
  else { // nothing touching
    latestX = -30;
    latestY = -30;
  }

  

  
  // test: passive — when screen is idle (rotationX, Y, and Z all within [-2,2])
  if ((rotationX >= -2 && rotationX <= 2) && (rotationY >= -2 && rotationY <= 2) ) {
    // DEVICE IS FLAT: PASSIVE TEXT
    background(0,0,255)
    textSize(ptSize)
    fill('white')
    text('welcome to a small program about frozen  meals.',10,30,300,windowHeight)
  }
  else {
    // DEVICE ACTIVE
    background('yellow')
    
    // text('rotX'+rotationX,10,450);
    // text('rotY'+rotationY,10,480);
    // text('rotZ'+rotationZ,10,510);
    
    text('d x-axis (y can) '+(rotationX-pRotationX),10,510);
    text('d y-axis (x can) '+(rotationY-pRotationY),10,535);
    text('d z-axis '+(rotationZ-pRotationZ),10,560);
    
    text('window height: '+windowHeight,10,580)
    text('window width: '+windowWidth,10,610)
    // text('words[150] age: '+(millis()-words[150].touchedTime()))
  
    let latestX;
    let latestY;

    // check touches — assume only one finger on screen
    if (touches.length >= 1) {
      latestX = touches[touches.length-1].x;
      latestY = touches[touches.length-1].y;
    }
    else { // nothing touching
      latestX = -500;
      latestY = -500;
    }

  // USED
    for (let word of words) {
      word.draw(ptSize); // draw text
      word.update(latestX,latestY)
      // word.update(latestX,latestY,millis()); // check for updates
    }
  }
  

  
  
}

function windowResized() {
	resizeCanvas(windowWidth,windowHeight);
  // perhaps reload?
}

// this doesnt work because deviceMotionEvent not created yet
function deviceShaken() {
  background(Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255))
}

function touchStarted() {
  fill('red');
  
  if (touches.length >= 1) {
    latestX = touches[touches.length-1].x;
    latestY = touches[touches.length-1].y;
  }
  else { // nothing touching
    latestX = -30;
    latestY = -30;
  }
  
  // touches increments
  // how to loop through and check for words that have been touched?
  
  return false;
}

function touchEnded() {
  return false;
}


function touchMoved() { // how to get lines traced out to also affect text
	// stroke(125,132,209)
	// line(touchX, touchY, ptouchX, ptouchY);
  fill(Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255))
  ellipse(touchX,touchY,50,50)
  
  // for (var i =0; i<touches.length;i++) {
  //   // fill(Math.floor(Math.random()*255),30)
  //   fill(255,0)
  //   ellipse(touches[i].x,touches[i].y,30,30)
    
    // something to do with ptouchX: the faster/greater this is, the more easily letters get untethered?
  }
//   noStroke()
  
  
  
// 	return false;
// }

