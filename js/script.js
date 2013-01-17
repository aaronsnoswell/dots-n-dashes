/**
 * script.js - Core js for the Dots n Dashes game
 * @requires utils.js
 * @testwith tests.js
 */

// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

var DnD = {};

;(function(global) {
    var canvas = document.getElementById('gamecanvas'),
        ctx = canvas.getContext('2d'),
        cW = canvas.width,
        cH = canvas.height,
        cX = cW / 2,
        cY = cH / 2;

    var circles = [],
        GAMESIZE = 10,
        CIRCLE_RADIUS = 15,
        CIRCLE_PADDING = CIRCLE_RADIUS * 5,
        CIRCLE_BORDERSIZE = 3;

    canvas.addEventListener("mousedown", pointerDown, false);
    canvas.addEventListener("touchstart", pointerDown, false);

    canvas.addEventListener("mousemove", pointerMove, false);
    canvas.addEventListener("touchmove", pointerMove, true);

    canvas.addEventListener("touchend", pointerUp, false);
    document.body.addEventListener("mouseup", pointerUp, false);
    document.body.addEventListener("touchcancel", pointerUp, false);

    init();

    var running = true;
    function loop() {
        try {
            if(running) {
                requestAnimFrame(loop, canvas);

                // Main function here
                main();
            } else {
                quit();
            }
        } catch(err) {
            running = false;
        }
    }
    loop();

    function main() {
        update();
        draw();
    }

    function update() {

    }

    function draw() {
        ctx.clearRect(0, 0, cW, cH);
        drawCirlces();
    }

    function init() {
        createCircles();
    }

    function quit() {
        // Pass
    }

    function createCircles() {
        for(var x=0; x<GAMESIZE; x++) {
            for(var y=0; y<GAMESIZE; y++) {
                circles.push({
                    x: x*CIRCLE_PADDING + CIRCLE_RADIUS + CIRCLE_BORDERSIZE,
                    y: y*CIRCLE_PADDING + CIRCLE_RADIUS + CIRCLE_BORDERSIZE,
                    hovering: false
                });
            }
        }
    }

    var mouseDown = false;
    function getInputPointer(e) {
        if (!e) e = event;

        var pointerX, pointerY;

        if(e.targetTouches !== undefined) {
            // Touch event
            e.preventDefault();
            pointerX = e.targetTouches[0].pageX - canvas.offsetLeft;
            pointerY = e.targetTouches[0].pageY - canvas.offsetTop;
        } else {
            // Mouse event
            pointerX = e.pageX - canvas.offsetLeft;
            pointerY = e.pageY - canvas.offsetTop;
        }

        return {
            x: pointerX,
            y: pointerY,
            down: mouseDown
        }
    }

    function pointerDown(e) {
        mouseDown = true;
        pointerEvt(getInputPointer(e));
    }

    function pointerMove(e) {
        pointerEvt(getInputPointer(e));
    }

    function pointerUp(e) {
        mouseDown = false;
        pointerEvt(getInputPointer(e));
    }

    function pointerEvt(inputPointer) {
        for(var i=0; i<circles.length; i++) {
            var circle = circles[i];
            if((Math.abs(inputPointer.x - circle.x) < CIRCLE_RADIUS) &&
                Math.abs(inputPointer.y - circle.y) < CIRCLE_RADIUS) {
                circles[i].hovering = true;
                continue;
            } else {
                circles[i].hovering = false;
            }
        }
    }

    function drawCirlces() {
        for(var i=0; i<circles.length; i++) {
            var circle = circles[i];

            ctx.beginPath();
            ctx.arc(
                circle.x,
                circle.y,
                CIRCLE_RADIUS,
                0,
                2*Math.PI,
                false
            );

            ctx.fillStyle = '#009900';
            if(circle.hovering) {
                ctx.fillStyle = "#990000";
            }

            ctx.lineWidth = CIRCLE_BORDERSIZE;
            ctx.strokeStyle = '#003300';

            ctx.fill();
            ctx.stroke();
        }
    }


})(this);

    


