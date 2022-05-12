/* global $, sessionStorage */

window.onload = function () { runProgram() }; // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 100;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  document.addEventListener("mousemove", mouseMove)
  document.addEventListener("click", mouseClick)
  const pWidt = Math.PI / 12
  const fieldRadius = 300
  const paddleWidth = 15
  const centerx = canvas.width / 2
  const centery = canvas.height / 2
  const paddleMaxSpeed = .08
  const gridSpacingRows = 10
  const gridSpacingCollums = 30
  const paddleTrackingStrength = .003
  // Game Item Objects
  var points = {
    red: 0,
    blue: 0,
  }
  var startMenuSpinCountThing = 0
  var pointScored = false
  var mousePressed = false
  var gameStarted = false
  var gameTypeSelected = false
  var AiMistakeFrame = 1
  var aiBluePaddle = true
  var aiRedPaddle = true
  var mouseX = centerx
  var mouseY = centery
  var p1Down = false
  var p1Up = false
  var redPos = 0 - pWidt / 2
  var bluePos = Math.PI - pWidt / 2
  var pRedSpeed = 0
  var pBlueSpeed = 0
  var circlex = centerx
  var circley = centery
  var circleRadius = 3
  var circleAngle = 0+ (Math.PI * Math.floor(Math.random() * 2))
  var circleSpeed = 5 
  var bottomAngle = 0
  var topAngle = 0
  const circleWallAcceleration = .1
  const anglePadding = 200

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (!gameStarted) {
      startScreenOverlay()
      return
    }
    if (!gameTypeSelected) {
      gameSelectionOverlay()
      return
    }
    drawGrid()
    if (pointScored) {
      pointScoredOverlay()
    } else {
      bluePaddle()
      redPaddle()
      //circle

      showPoints()
      circleHandler()
    }

    mousePressed = false //clear any unhandled mousepresses
  }

  function showPoints() {
    ctx.fillStyle = 'blue'
    ctx.fillText(points.blue, 100, 100)
    ctx.fillStyle = 'red'
    ctx.fillText(points.red, 550, 100)
  }

  function pointScoredOverlay() {
    if (points.red > 3) {
      //red wins
      ctx.fillStyle = 'black'
      ctx.fillRect(0,0,canvas.width,canvas.height)
      ctx.fillStyle = 'red'
      ctx.font = 'bold 100px monospace';
      ctx.fillText("Red Wins!",50,350)
      
    } else if (points.blue > 3) {
      //blue wins
      ctx.fillStyle = 'black'
      ctx.fillRect(0,0,canvas.width,canvas.height)
      ctx.fillStyle = 'blue'
      ctx.font = 'bold 100px monospace';
      ctx.fillText("Blue Wins!",50,350)
    } else {
      ctx.fillStyle = 'white'
      ctx.fillText("Blue:" + points.blue + "   Red:" + points.red, centerx - 125, centery)

      if (mousePressed) {
        pointScored = false
      }
      return
    }
    if(mousePressed){
      //restartGame
      pointScored = false
      gameStarted = false
      gameTypeSelected = false
      points.red = 0
      points.blue = 0
    }
 

  }

  function gameSelectionOverlay() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (mouseTouching(canvas.width / 6, canvas.height / 6, canvas.width / 3 * 2, canvas.height / 4)) {
      ctx.fillStyle = 'lightgreen'
      ctx.fillRect(canvas.width / 6, canvas.height / 6, canvas.width / 3 * 2, canvas.height / 4)
      ctx.fillStyle = 'black'
      ctx.fillText("One Player.", canvas.width / 6 + 150, canvas.height / 6 + 100)
      if (mousePressed) {
        mousePressed = false
        aiBluePaddle = true
        aiRedPaddle = false
        gameTypeSelected = true
      }
    } else {
      ctx.fillStyle = 'green'
      ctx.fillRect(canvas.width / 6, canvas.height / 6, canvas.width / 3 * 2, canvas.height / 4)
      ctx.fillStyle = 'white' 
        ctx.fillText("One Player.", canvas.width / 6 + 150, canvas.height / 6 + 100)
    }
    if (mouseTouching(canvas.width / 6, canvas.height / 6 * 3, canvas.width / 3 * 2, canvas.height / 4)) {
      ctx.fillStyle = 'lightgreen'
      ctx.fillRect(canvas.width / 6, canvas.height / 6 * 3, canvas.width / 3 * 2, canvas.height / 4)
      ctx.fillStyle = 'black'
      ctx.fillText("No Player.", canvas.width / 6 + 150, canvas.height / 6 * 3 + 100)
      if (mousePressed) {
        mousePressed = false
        aiBluePaddle = true
        aiRedPaddle = true
        gameTypeSelected = true
        circleSpeed = 9
      }
    } else {
      ctx.fillStyle = 'green'
      ctx.fillRect(canvas.width / 6, canvas.height / 6 * 3, canvas.width / 3 * 2, canvas.height / 4)
      ctx.fillStyle = 'white'
      ctx.fillText("No Player.", canvas.width / 6 + 150, canvas.height / 6 * 3 + 100)
    }




  }

  function redPaddle() {
    if (aiRedPaddle) {
      if (AiMistakeFrame <= 0) { //ai controlled paddle
        if (circley > fieldRadius * Math.sin(redPos + 3 * (pWidt / 4)) + centery) { //circle is below paddle
          pRedSpeed = pRedSpeed + paddleTrackingStrength
        } else if (circley < fieldRadius * Math.sin(redPos + pWidt / 4) + centery) { //circle is above paddle
          pRedSpeed = pRedSpeed - paddleTrackingStrength
        } else {
          pRedSpeed = 0
        }
      }
    } else { //mouse controlled paddle
      if (mouseY > fieldRadius * Math.sin(redPos + 3 * (pWidt / 4)) + centery) {
        pRedSpeed = paddleMaxSpeed
      } else if (mouseY < fieldRadius * Math.sin(redPos + pWidt / 4) + centery) {
        pRedSpeed = -paddleMaxSpeed
      } else {
        pRedSpeed = 0
      }
    }

    if (pRedSpeed >= paddleMaxSpeed) { //speed limiter
      pRedSpeed = paddleMaxSpeed
    } else if (pRedSpeed <= -paddleMaxSpeed) {
      pRedSpeed = -paddleMaxSpeed
    }

    if (redPos + pWidt > Math.PI / 2) { //makes sure the paddle stays on the correct side
      pRedSpeed = 0
      redPos = Math.PI / 2 - pWidt
    }
    if (redPos < -(Math.PI / 2)) {
      pRedSpeed = 0
      redPos = -(Math.PI / 2)
    }
    // ctx.fillText(pRedSpeed + " blue:" + pBlueSpeed, 100, 100)
    redPos = redPos + pRedSpeed //add speed to paddle

    ctx.strokeStyle = 'red'
    ctx.lineWidth = paddleWidth
    ctx.beginPath()
    ctx.arc(centerx, centery, fieldRadius, redPos, redPos + pWidt)
    ctx.stroke()
  }

  function bluePaddle() {
    if (aiBluePaddle) { //is the paddle controlled by ai

      if (AiMistakeFrame-- <= 0) {

        if (circley > fieldRadius * Math.sin(bluePos + pWidt / 2) + centery) { //circle is below paddle
          pBlueSpeed = pBlueSpeed - paddleTrackingStrength
        } else if (circley < fieldRadius * Math.sin(bluePos + 3 * (pWidt / 4)) + centery) { //circle is above paddle
          pBlueSpeed = pBlueSpeed + paddleTrackingStrength
        } else {
          pBlueSpeed = 0
        }
      } else {
        // ctx.fillRect(100, 100, 100, 100)f
      }
    }

    if (pBlueSpeed >= paddleMaxSpeed) { //speed limiter
      pBlueSpeed = paddleMaxSpeed
    } else if (pBlueSpeed <= -paddleMaxSpeed) {
      pBlueSpeed = -paddleMaxSpeed
    }

    if (bluePos < Math.PI / 2) { //makes sure the paddle stays on the correct side
      pBlueSpeed = 0
      bluePos = Math.PI / 2
    }
    if (bluePos + pWidt > Math.PI + Math.PI / 2) {
      pBlueSpeed = 0
      bluePos = Math.PI + Math.PI / 2 - pWidt
    }

    bluePos = bluePos + pBlueSpeed

    ctx.strokeStyle = 'blue'
    ctx.lineWidth = paddleWidth
    ctx.beginPath()
    ctx.arc(centerx, centery, fieldRadius, bluePos, bluePos + pWidt)
    ctx.stroke()
  }
  function circleHandler() {
    ctx.fillStyle = 'limegreen'
    ctx.beginPath()
    ctx.arc(circlex, circley, circleRadius, 0, 2 * Math.PI)
    ctx.fill()

    //set angles
    topAngle = Math.atan2((centery - fieldRadius + anglePadding) - circley, centerx - circlex)
    bottomAngle = Math.atan2((centery + fieldRadius - anglePadding) - circley, centerx - circlex)

    circlex += Math.cos(circleAngle) * circleSpeed
    circley += Math.sin(circleAngle) * circleSpeed

    // debug()
    let circleDistance = Math.hypot((circlex) - centerx, (circley) - centery)
    if (circleDistance > fieldRadius + 10) {
      if (circlex > centerx) {
        pointFor("blue")
      } else {
        pointFor('red')
      }
      return
    }
    if (circleDistance > fieldRadius - 10) { //checking for the next circle, not this one

      if (circlex > centerx) {//red bounce check
        if (circley > fieldRadius * Math.sin(redPos) + centery && circley < fieldRadius * Math.sin(redPos + pWidt) + centery) {
          //hit
        } else {
          //miss
          return
        }
      } else {//blue bounce check
        if (circley > fieldRadius * Math.sin(bluePos + pWidt) + centery && circley < fieldRadius * Math.sin(bluePos) + centery) {
          //hit
        } else {
          //miss
          return
        }
      }

      if (circleSpeed > 0) {
        circleSpeed += circleWallAcceleration
      } else {
        circleSpeed -= circleWallAcceleration
      }


      if (topAngle < 0 && circlex > centerx) { //here be dragons
        // I don't understand enough about math to know why this is needed
        topAngle = topAngle + Math.PI * 2
      }
      if (bottomAngle < 0 && circlex > centerx) {
        ctx.fillStyle = "lightblue"
        bottomAngle = bottomAngle + Math.PI * 2
      }
      circleAngle = Math.random() * (bottomAngle - topAngle) + topAngle

      AiMistakeFrame = Math.floor(Math.random() * 30 + 10)


    }
  }

  function pointFor(paddle) {
    redPos = 0 - pWidt / 2
    bluePos = Math.PI - pWidt / 2
    pRedSpeed = 0
    pBlueSpeed = 0
    circlex = centerx
    circley = centery
    circleAngle = 0
    if(aiBluePaddle && aiRedPaddle){
      circleSpeed = 9
    }else{
      circleSpeed = 5
    }
    pointScored = true
    points[paddle]++

   
  }

  function startScreenOverlay() {
    let xpadding = centerx - 45
    let ypadding = centery
    let wordRadius = canvas.width / 3 - 40
    let spaicng = Math.PI / 2

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'green'
    ctx.font = 'bold 48px monospace';
    ctx.fillText('pong', Math.cos(startMenuSpinCountThing + spaicng * 3) * wordRadius + xpadding, Math.sin(startMenuSpinCountThing + spaicng * 3) * wordRadius + ypadding)
    ctx.fillText('but', Math.cos(startMenuSpinCountThing) * wordRadius + xpadding, Math.sin(startMenuSpinCountThing) * wordRadius + ypadding)
    ctx.fillText('round', Math.cos(startMenuSpinCountThing + spaicng) * wordRadius + xpadding, Math.sin(startMenuSpinCountThing + spaicng) * wordRadius + ypadding)
    ctx.fillText('lol', Math.cos(startMenuSpinCountThing + spaicng * 2) * wordRadius + xpadding, Math.sin(startMenuSpinCountThing + spaicng * 2) * wordRadius + ypadding)
    startMenuSpinCountThing += Math.PI / 1000

    if (mousePressed) {
      mousePressed = false
      gameStarted = true
    }

    ctx.fillStyle = 'white'
    ctx.font = '30px monospace';
    ctx.fillText('click to start game', 200, canvas.height - 50)
  }


  function drawGrid() {
    let collums = fieldRadius / gridSpacingCollums
    ctx.strokeStyle = "green"
    ctx.lineWidth = .5
    for (var i = 0; i <= collums; i++) {
      ctx.beginPath()
      ctx.arc(centerx, centery, i * gridSpacingCollums, 0, 2 * Math.PI)
      ctx.stroke()
    }
    for (var i = 0; i <= Math.PI * 2; i = i + Math.PI / gridSpacingRows) {
      ctx.beginPath()
      ctx.moveTo(Math.sin(i) * fieldRadius + centerx, Math.cos(i) * fieldRadius + centery)
      ctx.lineTo(Math.sin(i + Math.PI) * fieldRadius + centerx, Math.cos(i + Math.PI) * fieldRadius + centery)
      ctx.stroke()
    }
  }

  /* 
  Called in response to events.
  */
  function keyup(e) {


  }

  function keydown(e) {

  }

  function mouseMove(e) {
    mouseX = e.offsetX
    mouseY = e.offsetY
  }

  function mouseClick() {
    mousePressed = true
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function mouseTouching(x, y, width, height) {
    if (mouseX < x + width) {
      if (mouseX > x) {
        if (mouseY > y) {
          if (mouseY < y + height) {
            return true
          }
        }
      }
    }
    return false
  }

  var debugAngle = -Math.PI * 2
  var debugAgnleDirection = Math.PI / 400
  function debug() {



    // ctx.fillStyle = 'white'
    // ctx.fillRect(0,fieldRadius * Math.sin(redPos + pWidt) + centery,10000,1)
    // ctx.fillRect(0,fieldRadius * Math.sin(redPos ) + centery,10000,1)
    // ctx.fillStyle = 'blue'
    // ctx.fillRect(0,fieldRadius * Math.sin(bluePos + pWidt / 4) + centery,10000,1)
    // ctx.fillRect(0,fieldRadius * Math.sin(bluePos +3 * ( pWidt / 4)) + centery,10000,1)

    ctx.fillStyle = 'red'
    ctx.fillRect(0, fieldRadius * Math.sin(redPos + pWidt / 4) + centery, 10000, 1)
    ctx.fillRect(0, fieldRadius * Math.sin(redPos + 3 * (pWidt / 4)) + centery, 10000, 1)



    //show angles
    // ctx.fillText("top: " + topAngle * 180 / Math.PI, circlex, circley + 10)
    // ctx.fillText("bottom: " + bottomAngle * 180 / Math.PI, circlex, circley + 20)
    // //set ball to mouse
    // circlex = mouseX
    // circley = mouseY

    // check entire circle
    // debugAngle += debugAgnleDirection
    // circlex = Math.cos(debugAngle) * (fieldRadius + 5) + centerx
    // circley = Math.sin(debugAngle) * (fieldRadius + 5) + centery

    // if (debugAngle > bottomAngle) {
    //   debugAgnleDirection = -Math.abs(debugAgnleDirection)
    // }
    // if (debugAngle < topAngle) {
    //   debugAgnleDirection = Math.abs(debugAgnleDirection)
    // }
    ctx.fillText("debug angle:" + (debugAngle % (Math.PI * 2)) * 180 / Math.PI, circlex, circley + 30)

    // ctx.clearRect(0, 0, 200, 200)
    // ctx.fillText(pLeftSpeed, 100, 170)
    // ctx.fillText(mouseY, 100, 50)
    // ctx.fillText("center " + ((centeringForce) * (circley - centery) / fieldRadius), 100, 100)
    // ctx.fillText(Math.abs(circleSpeedx) + Math.abs(circleSpeedy), 100, 10)


    //showAngle of direction
    ctx.strokeStyle = "yellow"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(circlex, circley)
    ctx.lineTo(circlex + Math.cos(circleAngle) * 50, circley + Math.sin(circleAngle) * 50)
    ctx.moveTo(circlex, circley)
    ctx.lineTo(circlex + Math.cos(bottomAngle) * 200, circley + Math.sin(bottomAngle) * 200)
    ctx.moveTo(circlex, circley)
    ctx.lineTo(circlex + Math.cos(topAngle) * 200, circley + Math.sin(topAngle) * 200)
    ctx.moveTo(circlex, circley)
    ctx.lineTo(circlex + Math.cos(debugAngle) * 200, circley + Math.sin(debugAngle) * 200)
    ctx.stroke()

    let angle1 = Math.atan2(circley - (centery - fieldRadius), circlex - centerx)
    let angle2 = Math.atan2(circley - (centery + fieldRadius), circlex - centerx)

    if (circlex > centerx) {
      ctx.beginPath()
      ctx.arc(circlex, circley, 50, angle2 + Math.PI, angle1 + Math.PI)
      ctx.stroke()
    } else {
      ctx.beginPath()
      ctx.arc(circlex, circley, 50, angle1 + Math.PI, angle2 + Math.PI)
      ctx.stroke()
    }

    ctx.fillText((circleAngle) * 180 / Math.PI, circlex, circley)

    // ctx.fillStyle = "white" //top of paddle
    // ctx.fillRect(0, pRadius * Math.sin(pLeftPos) + centery, 1000, 1)
    // ctx.fillRect(pRadius * Math.cos(pLeftPos) + centery, 0, 1, 1000)

    // ctx.fillStyle = "blue" //bottom of paddle
    // ctx.fillRect(0, pRadius * Math.sin(pLeftPos + pWidt) + centery, 1000, 1)
    // ctx.fillRect(pRadius * Math.cos(pLeftPos + pWidt) + centery, 0, 1, 1000)
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
