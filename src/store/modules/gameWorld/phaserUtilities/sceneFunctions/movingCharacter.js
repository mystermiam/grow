import { Grow } from './../../index'

import store from '../../../../index'

// Movement function --> moving characters  <-- should be moved into character (external function files)


// Example of how to use it in scene:
// Import: import movingCharacter from './../../phaserUtilities/sceneFunctions/movingCharacter'
// Use:    movingCharacter('RunningChild', 'runningChild', [['up',1920],['left',1010],['up',10]], 50);
export default function movingCharacter(character, characterKey,  movement, speedValue, i = 0){

  // Make a translate to pixels function, translates time and speed into pixels

  // I would like to be able to move characters by field?
  // There is a certain time that a character needs to move to a second field
  // Can I do this with pixels? / speed times time


  let scene = Grow.scene.scenes[store.state.player.sceneActive];

  if (i === 0 && scene.anims.anims.entries[characterKey + "-left-walk"] === undefined && characterKey !== 'none'){
    // Load animations
    scene.anims.create({
        key: characterKey + "-left-walk",
        frames: scene.anims.generateFrameNames("atlas", { prefix: characterKey + "-left-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      });
      scene.anims.create({
        key: characterKey + "-right-walk",
        frames: scene.anims.generateFrameNames("atlas", { prefix: characterKey + "-right-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      });
      scene.anims.create({
        key: characterKey + "-front-walk",
        frames: scene.anims.generateFrameNames("atlas", { prefix: characterKey + "-front-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      });
      scene.anims.create({
        key: characterKey + "-back-walk",
        frames: scene.anims.generateFrameNames("atlas", { prefix: characterKey + "-back-walk", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      });
  }
 

  let speed = 0;
  if (speedValue !== undefined && speedValue > 0) { speed = speedValue } else { speed = 300 }
  
  if(characterKey !== 'none'){
   if(movement[i][0] === 'up'){
      scene[character].body.setVelocityY(-speed)
      scene[character].anims.play(characterKey + "-back-walk", true);
   } else if(movement[i][0] === 'down'){
      scene[character].body.setVelocityY(speed)
      scene[character].anims.play(characterKey + "-front-walk", true);
   } else if(movement[i][0] === 'left'){
      scene[character].body.setVelocityX(-speed)
      scene[character].anims.play(characterKey + "-left-walk", true);
   } else if(movement[i][0] === 'right'){
      scene[character].body.setVelocityX(speed)
      scene[character].anims.play(characterKey + "-right-walk", true);
   }

  } else {
    if(movement[i][0] === 'up'){
      scene[character].body.setVelocityY(-speed)
     
   } else if(movement[i][0] === 'down'){
      scene[character].body.setVelocityY(speed)
      
   } else if(movement[i][0] === 'left'){
      scene[character].body.setVelocityX(-speed)
     
   } else if(movement[i][0] === 'right'){
      scene[character].body.setVelocityX(speed)
      
   }
  }

     setTimeout(function(){

      let prevVelocity = scene[character].body.velocity.clone();

      scene[character].body.setVelocity(0); 

      i++;
      
      if(i < movement.length){
        
        movingCharacter(character, characterKey, movement, speed, i)

      } else {
        scene[character].anims.stop();

        // If we were moving, pick an idle frame to use // Based on misa at this pointerover
        if(characterKey !== 'none'){
        if      (prevVelocity.x < 0) scene[character].setTexture("atlas", "misa-left");
        else if (prevVelocity.x > 0) scene[character].setTexture("atlas", "misa-right");
        else if (prevVelocity.y < 0) scene[character].setTexture("atlas", "misa-back");
        else if (prevVelocity.y > 0) scene[character].setTexture("atlas", "misa-front");
        }
      }


     }, movement[i][1]);

}  

