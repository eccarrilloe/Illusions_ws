/**
 * DATA
 */
let currentState = 0;
let stateOption = 0;
let stateOptions = 0;
let stateData = {};

let boxPosition = {};
let direction = 'right';

let beepSound = null;

const STATES = {
  MENU: 0,
  CAFEWALL: 1,
  CHESSBOARD: 2,
  BEEP: 3,
  LILAC: 4,
  SCINTILLATE: 5,
  STRIPES: 6,
  RECTCOLOR: 7
}

/**
 * OPTICAL ILLUSIONS
 */

function refreshStateData() {
  switch (currentState) {
  case STATES.CAFEWALL:
    break;
  case STATES.CHESSBOARD:
    break;
  case STATES.BEEP:
    stateData = {
      ballPosition: 100,
      soundPlayed: false,
      speed: 5,
      ballRadius: 20
    }
    break;
  case STATES.LILAC:
    let circleRadius = 70;
    stateData = {
      circles: 12,
      circleColor: color(200, 162, 200),
      radius: 200,
      circleRadius: circleRadius,
      numOfDisks: 20,
      centerX: int(windowWidth / 2),
      centerY: int(windowHeight / 2),
      hiddenCircle: 0
    }
    break;
  case STATES.SCINTILLATE:
    stateData = {
      boxSize: 100,
      numOfLines: 24,
      innerCircleSize: 15,
      innerCircleColor: color(111, 111, 111),
      outerCircleSize: 30,
      outerCircleColor: color(119, 67, 119),
      lineLength: 50,
      lineColor: color(0),
      lineWeigth: 3
    }
    break;
  case STATES.SCINTILLATE:
    break;
  case STATES.STRIPES:
    stateData = {
      stripeLength: 5
    }
    break;
  case STATES.RECTCOLOR:
    stateData = {
      stripeLength: 20,
      speed: 2,
      boxSize: {
        width: 80,
        height: 30
      },
      examples: [{
        background: color(50, 50, 50),
        stripeColor: color(200, 200, 200),
        firstBarColor: color(0, 255, 0),
        secondBarColor: color(50, 0, 0)
      }, {
        background: color(50, 50, 50),
        stripeColor: color(100, 100, 100),
        firstBarColor: color(0, 255, 0),
        secondBarColor: color(50, 0, 0)
      }, {
        background: color(0, 0, 0),
        stripeColor: color(255, 255, 255),
        firstBarColor: color(255, 255, 255),
        secondBarColor: color(0, 0, 0)
      }, {
        background: color(100, 100, 100),
        stripeColor: color(100, 100, 100),
        firstBarColor: color(255, 255, 255),
        secondBarColor: color(0, 0, 0)
      }]
    };
  }

}

function menu() {
  fill(255);
  strokeWeight(0);
  textAlign(CENTER);
  background('#222222');

  textSize(28);
  textStyle(BOLD);
  text('OPTICAL ILLUSIONS', (windowWidth / 2), (windowHeight / 2) - 100);

  textSize(20);
  textStyle(ITALIC);
  text('por rvcristiand & eccarrilloe', (windowWidth / 2), (windowHeight / 2) - 50);

  textSize(14);
  textStyle(NORMAL);
  text('Para cambiar de ilusion use las flechas de navegacion DERECHA e IZQUIERDA', (windowWidth / 2), (windowHeight / 2) + 30);
  text('Para cambiar el estado de la ilusion use las flechas de navegacion ARRIBA y ABAJO', (windowWidth / 2), (windowHeight / 2) + 60);
}

function cafeWall() {
  stroke(125);
  strokeWeight(1);
  background(255);

  stateOptions = 2;
  let boxSize = 50;
  let boxOffset = 25;
  let blackBox = false;

  for (let i = 0; i < windowHeight / boxSize; i++) {
    blackBox = i % 2 == 0;
    for (let j = 0; j < windowWidth / boxSize; j++) {
      if (blackBox && stateOption == 0) {
        fill(0);
      } else {
        fill(255);
      }

      if (i % 2 == 0) {
        rect(j * boxSize, i * boxSize, boxSize, boxSize);
      } else {
        rect(j * boxSize - boxOffset, i * boxSize, boxSize, boxSize);
      }

      blackBox = !blackBox;
    }
  }
}

function chessBoard() {
  fill(0);
  stroke(255);
  background(255);

  stateOptions = 2;
  let boxSize = 50;
  let ellipseRadius = 10;

  for (let i = 0; i < windowHeight / boxSize; i++) {
    for (let j = 0; j < windowWidth / boxSize; j++) {
      if (stateOption === 0) {
        strokeWeight(10);
        rect(j * boxSize, i * boxSize, boxSize, boxSize);
      } else {
        fill(0);
        strokeWeight(5);
        rect(j * boxSize, i * boxSize, boxSize, boxSize);

        fill(255);
        strokeWeight(1);
        ellipse(j * boxSize, i * boxSize, ellipseRadius);
      }
    }
  }
}

function beep() {
  background(255);
  frameRate(50);
  fill(0, 0, 255);
  stroke(0);
  strokeWeight(1);

  let ballBound = Math.floor(windowHeight * 0.7);
  let offsetX = Math.floor(windowWidth * 0.25);

  ellipse(stateData.ballPosition + offsetX, stateData.ballPosition, stateData.ballRadius);
  ellipse(ballBound - stateData.ballPosition + offsetX, stateData.ballPosition, stateData.ballRadius);

  if (stateData.ballPosition, stateData.ballPosition + offsetX >= ballBound - stateData.ballPosition + offsetX && stateData.soundPlayed === false) {
    beepSound.play();
    stateData.soundPlayed = true;
  }

  if (stateData.ballPosition < ballBound) {
    stateData.ballPosition += stateData.speed;
  } else {
    stateOption = 1;
  }
}

function lilac() {
  background(225);
  frameRate(10);

  let lineOffset = 10;

  strokeWeight(2);
  line(stateData.centerX - lineOffset, stateData.centerY, stateData.centerX + lineOffset, stateData.centerY);
  line(stateData.centerX, stateData.centerY - lineOffset, stateData.centerX, stateData.centerY + lineOffset);

  let angle = 2 * PI / stateData.circles;

  strokeWeight(0);
  for (let i = 0; i < stateData.circles; i++) {
    let xi = stateData.centerX + stateData.radius * cos(i * angle);
    let yi = stateData.centerY + stateData.radius * sin(i * angle);

    if (i != stateData.hiddenCircle) {
      for (let j = 0; j < stateData.numOfDisks; j++) {
        fill(red(stateData.circleColor), green(stateData.circleColor), blue(stateData.circleColor), j * (255 / stateData.numOfDisks));
        ellipse(xi, yi, stateData.circleRadius - j * (stateData.circleRadius / stateData.numOfDisks));
      }
    }
  }
  stateData.hiddenCircle = (stateData.hiddenCircle + 1) % stateData.circles;
}

function scintillate() {
  var angle = 2 * PI / stateData.numOfLines;

  for (var i = 0; i < windowHeight / stateData.boxSize; i++) {
    for (var j = 0; j < windowWidth / stateData.boxSize; j++) {
      var centerX = j * stateData.boxSize + stateData.boxSize / 2;
      var centerY = i * stateData.boxSize + stateData.boxSize / 2;

      strokeWeight(stateData.lineWeigth);
      stroke(stateData.lineColor);

      for (var k = 0; k < stateData.numOfLines; k++) {
        x = centerX + (stateData.lineLength * cos(angle * k));
        y = centerY + (stateData.lineLength * sin(angle * k));

        line(centerX, centerY, x, y);
      }

      strokeWeight(0);
      fill(stateData.outerCircleColor);
      ellipse(j * stateData.boxSize + stateData.boxSize / 2, i * stateData.boxSize + stateData.boxSize / 2, stateData.outerCircleSize);
      fill(stateData.innerCircleColor);
      ellipse(j * stateData.boxSize + stateData.boxSize / 2, i * stateData.boxSize + stateData.boxSize / 2, stateData.innerCircleSize);
    }
  }
}

function stripes() {
  stateOptions = 2;
  background(255);

  var boxWidth = Math.floor((windowWidth / 2) % 2 == 0 ? windowWidth / 2 : windowWidth / 2 - 1);
  var boxHeight = Math.floor((windowHeight / 2) % 2 == 0 ? windowHeight / 2 : windowHeight / 2 - 1);

  boxWidth = boxWidth + (5 - boxWidth % 5);
  boxHeight = boxHeight + (5 - boxHeight % 5);

  var boxOffsetX = windowWidth / 4;
  var boxOffsetY = windowHeight / 4;

  strokeWeight(0);
  fill(255, 0, 90);
  rect(boxOffsetX, boxOffsetY, boxWidth, boxHeight);
  fill(139, 195, 74);
  rect(boxOffsetX, boxOffsetY + boxHeight / 2, boxWidth / 2, boxHeight / 2);
  rect(boxOffsetX + boxWidth / 2, boxOffsetY, boxWidth / 2, boxHeight / 2);


  if (stateOption === 0) {
    var j = 0;
    for (var i = boxOffsetY; i < boxOffsetY + boxHeight; i += stateData.stripeLength) {
      if (j % 2 == 0) {
        fill(239, 127, 26);
        rect(boxOffsetX, i, boxWidth / 2, stateData.stripeLength);

        if (i < boxOffsetY + boxHeight / 2 - stateData.stripeLength) {
          fill(255, 0, 90);
        } else {
          fill(239, 127, 26);
        }

        if (i < boxOffsetY + boxHeight - stateData.stripeLength) {
          rect(boxOffsetX + boxWidth / 2, i + stateData.stripeLength, boxWidth / 2, stateData.stripeLength);
        }
      }
      j += 1;
    }
  }
}

function rectColor() {
  frameRate(50);
  stateOptions = 4;
  background(stateData.examples[stateOption].background);
  strokeWeight(0);
  fill(stateData.examples[stateOption].stripeColor);
  for (var i = 0; i < windowWidth / stateData.stripeLength; i++) {
    if (i % 2 == 0) {
      rect(i * stateData.stripeLength, 0, stateData.stripeLength, windowHeight);
    }
  }

  fill(stateData.examples[stateOption].firstBarColor);
  var firstBoxPosition = boxPosition.first;
  rect(firstBoxPosition.x, firstBoxPosition.y, stateData.boxSize.width, stateData.boxSize.height);

  fill(stateData.examples[stateOption].secondBarColor);
  var secondBoxPosition = boxPosition.second;
  rect(secondBoxPosition.x, secondBoxPosition.y, stateData.boxSize.width, stateData.boxSize.height);

  if (direction === 'right') {
    boxPosition.first.x += stateData.speed;
    boxPosition.second.x += stateData.speed;
    if (boxPosition.first.x >= windowWidth * 0.75) {
      direction = 'left';
    }
  } else {
    boxPosition.first.x -= stateData.speed;
    boxPosition.second.x -= stateData.speed;
    if (boxPosition.first.x <= windowWidth * 0.25) {
      direction = 'right';
    }
  }
}

/**
 * P5.js Functions
 */
function preload() {
  beepSound = loadSound('./assets/beep.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Helvetica');
  textSize(12);
  fill(0);
  currentState = 0;
  refreshStateData();
  boxPosition = {
    first: {
      x: Math.floor(windowWidth / 4),
      y: Math.floor(windowHeight * 0.3)
    },
    second: {
      x: Math.floor(windowWidth / 4),
      y: Math.floor(windowHeight * 0.6)
    }
  };
}

function draw() {
  background(255);
  switch (currentState) {
  case STATES.MENU:
    menu();
    break;
  case STATES.CAFEWALL:
    cafeWall();
    break;
  case STATES.CHESSBOARD:
    chessBoard();
    break;
  case STATES.BEEP:
    beep();
    break;
  case STATES.LILAC:
    lilac();
    break;
  case STATES.SCINTILLATE:
    scintillate();
    break;
  case STATES.STRIPES:
    stripes();
    break;
  case STATES.RECTCOLOR:
    rectColor();
    break;
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    currentState = (currentState + 1) % Object.keys(STATES).length;
    refreshStateData();
    stateOption = 0;
  } else if (keyCode == LEFT_ARROW) {
    currentState = currentState >= 1 ? currentState - 1 : Object.keys(STATES).length - 1;
    refreshStateData();
    stateOption = 0;
  } else if (keyCode == UP_ARROW) {
    stateOption = (stateOption + 1) % stateOptions;
    refreshStateData();
  } else if (keyCode == DOWN_ARROW) {
    refreshStateData();
    stateOption = (stateOption - 1) % stateOptions;
  }
}
