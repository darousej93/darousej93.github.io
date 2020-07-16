var init = function(window) {
    'use strict';
    var
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,

        app = window.opspark.makeApp(),
        canvas = app.canvas,
        view = app.view,
        fps = draw.fps('#000');


    window.opspark.makeGame = function() {

        window.opspark.game = {};
        var game = window.opspark.game;
        var circles = [];
        var directionRadCircle = [];
        var circleSpeed = []

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        var directionRad
        var numOfCircles = 100;
        for (var i = 0; i < numOfCircles; i++) {
            circles.push(draw.randomCircleInArea(canvas, true, true, '#999', 2))
            circleSpeed.push(Math.random() * 5)
            directionRad = Math.random() * Math.PI;
            directionRadCircle.push(directionRad);
            view.addChild(circles[i]);
        }
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////

        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            for (var i = 0; i < numOfCircles; i++) {
                game.checkCirclePosition(circles[i], i)
                circles[i].x += circleSpeed[i] * Math.sin(directionRadCircle[i] * 2);
                circles[i].y += circleSpeed[i] * Math.cos(directionRadCircle[i] * 2);
            }
        }

        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle, i) {

            if (circle.x >= canvas.width - circle.radius) {
                directionRadCircle[i] = 2 * Math.PI - directionRadCircle[i]
                circle.x += -2 * circleSpeed[i]
            }
            if (circle.x <= 0 + circle.radius) {
                directionRadCircle[i] = 2 * Math.PI - directionRadCircle[i]
                circle.x += 2 * circleSpeed[i]
            }
            if (circle.y <= 0 + circle.radius) {
                directionRadCircle[i] = Math.PI / 2 - directionRadCircle[i]
                circle.y += 2 * circleSpeed[i]

            }
            if (circle.y >= canvas.height - circle.radius) {
                directionRadCircle[i] = Math.PI / 2 - directionRadCircle[i]
                circle.y += -2 * circleSpeed[i]

            }
        }

        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////

        view.addChild(fps);
        app.addUpdateable(fps);

        game.circles = circles;
        game.update = update;

        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
