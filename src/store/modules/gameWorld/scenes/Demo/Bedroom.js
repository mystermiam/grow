/* BUGS: 
Dialogue - option, doesn't close directly

*/
import { Scene } from 'phaser'

import { Grow } from './../../index' 

import store from '../../../../index'

// Import Tilemaps here
import tiles0 from './../../assets/tilesets/Inside_A4.png'
import tiles1 from './../../assets/tilesets/Inside_B.png'
import tiles2 from './../../assets/tilesets/SF_Inside_B.png'
import tiles3 from './../../assets/tilesets/mack_char01.png'

import bedroom from './../../assets/tilemaps/bedroom.json'

// Import Music here
//import backgroundMusic from './../../assets/music/background/Town_Music.mp3'

// Import images here
import star from './../../assets/star.png'

// Import Sprites.js here
import Player from './../../phaserUtilities/player'

import Character from './../../phaserUtilities/character'


// Import external functions
import movingCharacter from './../../phaserUtilities/sceneFunctions/movingCharacter'

import loadScene from './../../phaserUtilities/loadScene'
import {updateDialogue, updateOptions, updateUserInput} from './../../phaserUtilities/phaserDialogue'


export default class Bedroom extends Scene {

  constructor () {
    super({ key: 'Bedroom' })
  }

preload() {
    // Load basic functions that exist in every map
    loadScene(this, 'preload');

    // Load MAP
    // Make sure this has the right type (name after mapName)
      this.load.image("tilesBedroom0", tiles0 );
      this.load.image("tilesBedroom1", tiles1 );
      this.load.image("tilesBedroom2", tiles2 );
      this.load.image("tilesBedroom3", tiles3 );

      this.load.image("star", star);
    
    
      this.load.tilemapTiledJSON("mapBedroom", bedroom);

    


    // Takes too damn long, load in bootscene and then play maybe
    // this.load.audio('backgroundMusic', backgroundMusic)
}

create() {
  // Add and play the music // make it toggleAble
  /*
        this.music = this.sound.add('backgroundMusic');
        this.music.play({
            loop: true
        });
  */


  this.map = this.make.tilemap({ key: "mapBedroom" });

  // Find name inside of tilemap
  const tilesetBedroom0 = this.map.addTilesetImage("Inside_A4", "tilesBedroom0");
  const tilesetBedroom1 = this.map.addTilesetImage("Inside_B", "tilesBedroom1");
  const tilesetBedroom2 = this.map.addTilesetImage("SF_Inside_B", "tilesBedroom2");
  const tilesetBedroom3 = this.map.addTilesetImage("mack_char01", "tilesBedroom3");
  
  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = this.map.createStaticLayer("Below Player", [tilesetBedroom0,tilesetBedroom1,tilesetBedroom2,tilesetBedroom3], 0, 0);
  const worldLayer = this.map.createStaticLayer("Collision Layer", [tilesetBedroom0,tilesetBedroom1,tilesetBedroom2,tilesetBedroom3], 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", [tilesetBedroom0,tilesetBedroom1,tilesetBedroom2,tilesetBedroom3], 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Load basic functions that exist in every scene
  loadScene(this, 'create');

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(this.player, worldLayer);


  // Create a condition that it only executes once
  if(store.state.player.scenesToBeShown.indexOf('BeginningScene') >= 0){
    this.beginningScene(1);
  }

  if(store.state.player.scenesToBeShown.indexOf('PlaceStarScene') >= 0){
    this.placeStarScene();
  }




} // End of Create

update(time, delta) {
  // Update movement - triggers phaserutilities/player.js
  if(this.player.isAllowedToMove){
  
    this.player.move();

  //Update dialogue functions - triggers phaserDialogue.js
  } else if(this.player.characterInteraction[0] === 'dialogue'){
    
    updateDialogue()

  } else if (this.player.characterInteraction[0] === 'option'){
    
    updateOptions()

  } else if (this.player.characterInteraction[0] === 'userInput'){
    
    updateUserInput()

  }
} // End of update



// Add functions here!
placeStarScene(){

  // Character looks down  
this.player.setTexture("atlas", "misa-front")
// Disable character movement
this.player.isAllowedToMove = false;

let PlaceStarScene = [
['Arya', "Press 'i' to open the menu. Click on the star once and then click again to place it somewhere. "],
['Arya', "Please do not place it on furniture and such, as mom said the placement function is not error proof yet!"],
];


store.dispatch('dialogue/addDialogue', ['PlaceStarScene', PlaceStarScene])

this.player.characterInteraction[0] = 'dialogue' 

store.dispatch('dialogue/loadDialogue', 'PlaceStarScene') 

// Open up way to town
Grow.townDoorBlock = false

// Add Scene 3 Guide
store.commit('player/addSceneToList', 'TownGuide1Scene')


}

beginningScene(part){
let scene = Grow.scene.scenes[store.state.player.sceneActive]; 

if (part === 1) {
// Character looks down  
this.player.setTexture("atlas", "misa-back")
// Disable character movement
this.player.isAllowedToMove = false;

// It doesn't completely endConversation yet
let BeginningDemo = [
['Grow - A self development journey', 'Welcome to Grow. Explore with us the applications of games in the world of learning and self development.'],
['option',
  ['Begin Demo', ["dispatch('endConversation')", 'scene.player.setTexture("atlas", "misa-front")','setTimeout(() =>{scene.beginningScene(2)}, 100);']],
  ['Load Scene', [2]]
],
['Grow - A self development journey', 'Choose a scene to load it'],
['option',
  ['Living Room', [100, "scene.scene.stop('Bedroom')","scene.scene.start('LivingRoom')"]], 
  ['Town', [100, "scene.scene.stop('Bedroom')","scene.scene.start('Town')"]],
  ['Go back', [0]], 
]
];

//movingCharacter('player', 'misa', ['down', 1000], 100);

store.dispatch('dialogue/addDialogue', ['BeginningDemo', BeginningDemo]);

//store.commit('dialogue/changeDialogueStartsAt', [1, 'BeginningDemo', 1]);

scene.player.characterInteraction[0] = 'dialogue'; 

store.dispatch('dialogue/loadDialogue', 'BeginningDemo');

} // End of part 1

else if (part === 2) {

// Maybe the player moves up to the screen --> , "scene.movingCharacter(scene.player, 'misa', [['up',1920],['left',1010],['up',10]], 50)"
let BeginningDialogue = [
['Arya', 'Hey there dear Wanderer, my Name is Arya. Welcome to Grow - A self development journey.'],
['Arya', 'Before we begin. Can you tell me your name?'],
['userInput', 'What is your name?', 'player/changeUserName'],
['Arya', "Great, let's begin!"],
['Arya', "Use the arrow keys on your keyboard to move me around the place"],
['Arya', "If you want me to interact with other characters or objects, press the spacebar in the center of your keyboard!"],
['option',
  ['Okay, I understand', ["dispatch('endConversation')", "setTimeout(()=>{scene.player.characterInteraction[0] = 'dialogue'; dispatch('loadDialogue', 'GoDownDialogue')}, 7000)"]],
  ['Can you explain me the controls again?', [7]],
],
['Arya', "Sure, ask me as often as you want", [5]],
];

// create dialogue function!

store.dispatch('dialogue/addDialogue', ['BeginningDialogue', BeginningDialogue])

scene.player.characterInteraction[0] = 'dialogue' 

store.dispatch('dialogue/loadDialogue', 'BeginningDialogue') 

let GoDownDialogue = [
['Arya', 'It’s late I should go down and greet my roommate'],
];


store.dispatch('dialogue/addDialogue', ['GoDownDialogue', GoDownDialogue])


store.dispatch('player/removeSceneFromList', 'BeginningScene')


} // End of part 2

}










} // End of Export