//creating blank variables as placeholders to define later

var context;
var controller;
var rectangle;
var loop;

context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 180;
context.canvas.width = 320;

rectangle = {//determines the size of the rectangle, as well as its velocity
    height: 32,
    jumping: true,
    width: 32,
    x: 144,
    x_velocity: 0,
    y: 0,
    y_velocity: 0
};

controller = {
    //these are the commands for the player in the game, currently left right and up
    left: false,
    right: false,
    up: false,

    keyListener: function (event) {

        // this is the function for listening for keypresses, it is tied to an event listener at the bottom

        var key_state = (event.type == "keydown") ?true : false;
        switch (event.keyCode) {
            case 37:
                //leftkey
                controller.left = key_state;
                break;
            case 38:
                //upkey
                controller.up = key_state;
                break;
            case 39:
                //rightkey
                controller.right = key_state;
                break;
        }
    }
};

loop =function() {
    if (controller.up && rectangle.jumping == false) {
        rectangle.y_velocity -=20;
        rectangle.jumping = true;
        //if the up key is pressed, and the rectangle ISNT jumping, it will now jump and change jumping to true
    }
    if (controller.left) {
        rectangle.x_velocity-=0.5;
        //decreases x velocity to make the object go left
    }
    if (controller.right) {
        rectangle.x_velocity +=0.5;
        //increases x velocity to make the object go right
    }
    //by decreasing and increasing velocity instead of setting it to a set number, you get fluid motion instead of choppy blocky motion

    rectangle.y_velocity +=1.5; //gravity effect
    //every frame of animation 1.5 is added to the rectangle y position. this causes the rectangle to fall until it reaches the bottom
    rectangle.x += rectangle.x_velocity;
    rectangle.y += rectangle.y_velocity;
    rectangle.x_velocity *= 0.9//friction effect
    rectangle.y_velocity *= 0.9//friction effect
    //slows down the velocity on button release to simulate a gradual slow down, and prevents the Denis Effect


      //this prevents the rectangle from dropping below the floor
      if (rectangle.y > 180 - 16 - 32) {
        // 180 is bottom of screen, 16 is the floor, and 32 is the top of the rectangle
        rectangle.jumping = false;
        // allows player to jump again once they hit the floor
        rectangle.y = 180 - 16 - 32;
        rectangle.y_velocity = 0;
    }

    if (rectangle.y < 0 + 16) {
        rectangle.jumping = false;
        rectangle.y = 0 + 16;
        rectangle.y_velocity = 0
    }
    //this prevents the rectangle from leaving the screen horizontally, creates a wrapping/looping effect
    if (rectangle.x < -32) {
        rectangle.x = 320;
    } else if (rectangle.x > 320) {
        rectangle.x = -32;
    }

    context.fillStyle = "#202020";
    //sets background to grey
    context.fillRect(0, 0, 320, 180); // draws the rectangle
    context.fillStyle = "#ff0000"; //sets the rectangle red
    context.beginPath();
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    context.fill();
    //draws the floor
    context.strokeStyle = "#202830";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, 164);
    context.lineTo(320, 164);
    context.stroke();
    //draws the ceiling
    context.strokeStyle = "#202830";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, 16);
    context.lineTo(320, 16);
    context.stroke();


    window.requestAnimationFrame(loop); //starts the loop
};

//these listen for button press and release
window.addEventListener("keydown", controller.keyListener)//key press
window.addEventListener("keyup", controller.keyListener)//key release
window.requestAnimationFrame(loop);