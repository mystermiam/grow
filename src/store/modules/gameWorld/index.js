import Phaser from 'phaser'

//Examples
/*
import PlayScene from './scenes/PlayScene'
import platformerScene from './scenes/DynamicPlatformer/platformer-scene'
*/
import BootScene from './scenes/BootScene'

/*import TownScene from './scenes/TownScene'
import HouseOfMusicScene from './scenes/HouseOfMusicScene'
import EmptyGrassField from './scenes/EmptyGrassField'
import NuitBlancheTown from './scenes/NuitBlancheTown'
*/

// DEMO SCENES
import Bedroom from './scenes/Demo/Bedroom'
import LivingRoom from './scenes/Demo/LivingRoom'
import Town from './scenes/Demo/Town'
//import AsianGarden from './scenes/Demo/AsianGarden'
//import HouseMaria from './scenes/Demo/HouseMaria'


// The beginning of the real deal
//import DialogueTestGround from './scenes/A_new_beginning/DialogueTestGround'

var Grow = [];

function launch() {
  Grow = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 }, // Top down game, so no gravity
        debug: false
      }
    },
    scene: [BootScene,Bedroom, LivingRoom, Town ] // this defines, which number the scene has: Grow.scene.scenes[2].player;

    //scene: [BootScene, PlayScene]
    //scene: [BootScene, platformerScene]
  })
}

export default launch
export { launch }

export { Grow }