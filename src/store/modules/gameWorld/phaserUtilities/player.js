// Sensor field (solves collide problem)
//I've set a key-less child sprite to the player in the same size and set the anchor depending on the direction the player look (0.5 +/- 0.25, 0.5 +/- 0.25), to let it leap a bit of.
// With this "sensor-field" I can work with overlap to pass the object for evaluation.
   
// Battle plan for sensor field: 
// Create a sprite inside the player file, otherwise create a separate file
// On player move - Fix file to player location 
// Move it ahead a little bit, so that it can overlap with others
// update it depending on which player the sprite faces
import { Grow } from './../index'

import store from '../../../index'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
 		
 	      this.scene = config.scene;
        let scene = this.scene;
        
        this.actionCounter = 0;

        // are probably not necessary
        this.inAction = false;
        this.inDialogue = false;
        this.contactWithCharacter = false;
        
        this.characterLastContacted = null;

        this.isAllowedToMove = true;
        this.characterInteraction = [];

        // Cursors registered by Phaser!
        this.cursors = scene.input.keyboard.createCursorKeys();

        
        scene.physics.world.enable(this);
        

        //Later on spawn character from this position on login
    	 	/*this.lastPosition = {
    	      x: x,
    	      y: y,
    	      emittedOn: Date.now()
    	    };*/

        
  // Create a sprite with physics enabled via the physics system. The image used for the sprite has
  // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
	 	this.setSize(30, 40);
    this.setOffset(0, 24);

    // UNFINISHED: Make the collision area around the sprite smaller
    //this.frame.centerX = 0;

    

    if(scene.anims.anims.entries["misa-left-walk"] === undefined){   

    // pretty good function to put things into that should only be created once at creation :p

		scene.anims.create({
		    key: "misa-left-walk",
		    frames: scene.anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
		    frameRate: 10,
		    repeat: -1
		  });
		  scene.anims.create({
		    key: "misa-right-walk",
		    frames: scene.anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
		    frameRate: 10,
		    repeat: -1
		  });
		  scene.anims.create({
		    key: "misa-front-walk",
		    frames: scene.anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
		    frameRate: 10,
		    repeat: -1
		  });
		  scene.anims.create({
		    key: "misa-back-walk",
		    frames: scene.anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
		    frameRate: 10,
		    repeat: -1
		  });

      }

	 	  config.scene.add.existing(this);



      // Sensorfield!
      this.sensorField = scene.physics.add.sprite(this.x, this.y);
      this.sensorField.frame.width = 30;
      this.sensorField.frame.height = 40;


	 	} // End of constructor

move(time, delta) {
// Movement
  if (this.isAllowedToMove === true){
  const speed = 150;


  this.prevVelocity = this.body.velocity.clone();
  
  // Current movement pattern
  // register that key is down --> .isDown === true;

  // No function / event listener to set .isDown === false;
  // idea: Listen for how long a key was pressed beforehand and set it to false if it wasn't pressed in the last 100ms
  // 2nd idea: make character always move a full field like in pokemon

  // Stop any previous movement from the last frame
  this.body.setVelocity(0);
  
  if (this.cursors.left.isDown) {
    this.body.setVelocityX(-speed);
    this.sensorField.x = this.x - 13
    this.sensorField.y = this.y + 15

  } else if (this.cursors.right.isDown) {
    this.body.setVelocityX(speed);
    this.sensorField.x = this.x + 10
    this.sensorField.y = this.y + 15
  } else if (this.cursors.up.isDown) {
    this.body.setVelocityY(-speed);
    this.sensorField.x = this.x 
    this.sensorField.y = this.y - 5
  } else if (this.cursors.down.isDown) {
    this.body.setVelocityY(speed);
    this.sensorField.x = this.x 
    this.sensorField.y = this.y + 28    
  }

  // Update the animation last and give left/right animations precedence over up/down animations
  // Should be added to movement function above?
  if (this.cursors.left.isDown) {
    this.anims.play("misa-left-walk", true);
  } else if (this.cursors.right.isDown) {
    this.anims.play("misa-right-walk", true);
  } else if (this.cursors.up.isDown) {
    this.anims.play("misa-back-walk", true);
  } else if (this.cursors.down.isDown) {
    this.anims.play("misa-front-walk", true);
  } else {
    this.anims.stop();

    // If we were moving, pick an idle frame to use
    if      (this.prevVelocity.x < 0) this.setTexture("atlas", "misa-left");
    else if (this.prevVelocity.x > 0) this.setTexture("atlas", "misa-right");
    else if (this.prevVelocity.y < 0) this.setTexture("atlas", "misa-back");
    else if (this.prevVelocity.y > 0) this.setTexture("atlas", "misa-front");
  }
 
  /*if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
    console.log('yeeehaaa')
  }*/

  // I don't know yet how to stop the animation after keypress, this should happen automatically
  // but this is currently not the case, I think because of how we installed the thing, maybe it will work if we run it like a vue app? 
  
  /*this.cursors.left.isDown = false;
   this.cursors.right.isDown = false;
   this.cursors.up.isDown = false;
   this.cursors.down.isDown = false;
*/
  } //End of player is allowed to move function


// Player functions

}




} // End of export

