/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects
  const KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
  }

  var speedx = 0
  var speedy = 0
  var x = 0
  var y = 0
  var walkspeed = 5
  var friction = .4

  var left = false
  var right = false
  var up = false
  var down = false

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', keydownhandler)
  $(document).on('keyup', keyuphandler);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {

    //friction code
    if (Math.abs(speedx) < 2) {
      speedx = 0
    } else {
      if (speedx < 0) {
        speedx = speedx + friction
      } else {
        speedx = speedx - friction
      }
    }
    if (Math.abs(speedy) < 2) {
      speedy = 0
    } else {
      if (speedy < 0) {
        speedy = speedy + friction
      } else {
        speedy = speedy - friction
      }
    }

        //key code
        if(left){
          speedx = -walkspeed
        }
        if(right){
          speedx = walkspeed
        }
        if(up){
          speedy = -walkspeed
        }
        if(down){
          speedy = walkspeed
        }

       //movement 
    x = x + speedx
    y = y + speedy

    //wall collision
    if(x <0){
      x = 0
      speedx = 0
    }
    if(x > 440 - 50){
      x = 440 - 50
      speedx = 0
    }
    if(y <0){
      y = 0
      speedy = 0
    }
    if(y > 440 - 50){
      y = 440 - 50
      speedy = 0
    }

    
    $("#walker").css("top", y)
    $("#walker").css("left", x)

  }

  /* 
  Called in response to events.
  */

  function keydownhandler(e) {
    if (e.which === KEY.LEFT) {
      left = true
    }
    if (e.which === KEY.RIGHT) {
      right = true
    }
    if (e.which === KEY.UP) {
      up = true
    }
    if (e.which === KEY.DOWN) {
      down = true
    }

  }
  function keyuphandler(e) {
    if (e.which === KEY.LEFT) {
      left = false
    }
    if (e.which === KEY.RIGHT) {
      right = false
    }
    if (e.which === KEY.UP) {
      up = false
    }
    if (e.which === KEY.DOWN) {
      down = false
    }
  }



  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
