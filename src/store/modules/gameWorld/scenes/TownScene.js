//Battle plan:
// Learn about using constants (variable management)
// Learn about absolute paths
// Learn about using constants like this!
// import { MAP_TOWN, IMAGE_TOWN } from '../constants/assets';
// This one could be good for the guide example! Movement sprites
// import guide from '@/store/assets/sprites/guide.png'


// Example code:

//store.getters['moduleName/getterName']
//store.state.dialogue.showDialogueBox = true;
//store.dispatch('dialogue/startDialogue', Player.characterLastContacted);

import { Scene } from 'phaser'

import createNPCs from './../utilities/createNPCs'
//import dialogueModule from './../utilities/dialogue'

import store from '../../../index'

import { Grow } from './../index'

//import Phaser from 'phaser'

//Town Scene
import examplePNG from "./../assets/tilesets/tuxmon-sample-32px-extruded.png"
import exampleJSON from "./../assets/tilemaps/tuxemon-town.json"

import exampleCharacterPNG from './../assets/atlas/atlas.png'
import exampleCharacterJSON from './../assets/atlas/atlas.json'



import vicky from './../assets/sprites/npc_vicky.png'
import thorsten from './../../../../../static/raw_sprites/spritesmith/npcs/npc_aprilFool.png'
import discutor from './../../../../../static/raw_sprites/spritesmith/npcs/npc_tyler.png'

// Player.variable checks the variable in the player.js file; this.player checks the newly created instance
import Player from './../phaserUtilities/player'

import Character from './../phaserUtilities/character'

import Star from './../assets/star.png'



// Only need it if debug is activated
let showDebug = false;


 
export default class TownScene extends Scene {

  constructor () {
    super({ key: 'TownScene' })
  }

preload() {
    //Set active scene for vue
    let numberOfActiveScene = 0;
    for(let i=0;i<Grow.scene.scenes.length;i++){
      if(Grow.scene.scenes[i].sys.config.key === this.sys.config.key){
        numberOfActiveScene = i;
      }
    }
    store.dispatch('player/changeActiveScene', numberOfActiveScene);


  //currently the image needs to be preloaded to be able to insert it into the game from createNPC
  this.load.image('star', Star );


  this.load.image("tiles", examplePNG );
  this.load.tilemapTiledJSON("map", exampleJSON);
  // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
  // the player animations (walking left, walking right, etc.) in one image. For more info see:
  //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
  // If you don't use an atlas, you can do the same thing with a spritesheet, see:
  //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
  this.load.atlas("atlas", exampleCharacterPNG, exampleCharacterJSON);

  this.load.spritesheet("thorsten", thorsten,  {frameWidth: 120, frameHeight: 120} );
  this.load.spritesheet("discutor", discutor,  {frameWidth: 100, frameHeight: 100} );
  this.load.spritesheet("vicky", vicky,  {frameWidth: 100, frameHeight: 100} );
}

create() {

  // Loading TileMap
  this.map = this.make.tilemap({ key: "map" });

  // Parameters are the name character gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name character used in preload)
  const tileset = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = this.map.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = this.map.createStaticLayer("World", tileset, 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", tileset, 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Object layers in Tiled let character embed extra info into a map - like a spawn point or custom
  // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
  const spawnPoint = this.map.findObject("Objects", obj => obj.name === "Spawn Point");
  
  // LOAD PLAYER
  this.player = new Player({
            scene: this,
            key: 'atlas',
            x: spawnPoint.x,
            y: spawnPoint.y
        });

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(this.player, worldLayer);

  // CAMERA
  const camera = this.cameras.main;
  camera.startFollow(this.player);
  camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


  /* // Welcome text that has a "fixed" position on the screen
  this.add
    .text(16, 16, 'Welcome to Grow Playground', {
      font: "18px monospace",
      fill: "#000000",
      padding: { x: 20, y: 10 },
      backgroundColor: "#ffffff"
    })
    .setScrollFactor(0)
    .setDepth(30);
*/

// CHARACTERS 
// create a group for characters --> add characters to group --> add collider for group 
// This group contains all the characters for collision and calling update-methods
this.characters = this.add.group();

// LOAD CHARACTER

let DiscutorDialogue = [
['Discutor', "I'm the mightiest man in the whole universe!"],
['Player', 'Sure, sure :p'],
['option', 
  ['Jump on his head', [1]], 
  ['Kick him out of the screen', [3, "scene.Discutor.setImmovable(false)"]],  
  ['Leave him behind', [10]]
],
['Discutor', 'Hah! You see. Nothing happened!'],
['Player', "Let's see about that!"],
];
this.Discutor = new Character({
          scene: this,
          key: 'discutor',
          x: 340,
          y: 1120,
          furtherVar: [
            ['characterNumber', 0],
            ['name', 'Discutor'],
            ['interaction', 'dialogue'],
            ['dialogue', DiscutorDialogue],
            ['dialogueStartsAt', 0],
            ['size', [60,60]],
            ['offSet', [35,20]],
          ]
      });

let ThorstenDialogue = [
['Thorsten', 'Hey there new one! Would you like to listen to some French Rap?'],
['option', 
  ['Yeah, I would love to listen to some music', [10, 'https://music.youtube.com/watch?v=U_OFNlaeTP0&list=RDEMrVtQ-lZ7fMpTG2noSdOlEA']], 
  ["I'm searching for something else ;) ", [10]]
]
];

this.Thorsten = new Character({
          scene: this,
          key: 'thorsten',
          x: 470,
          y: 880,
          furtherVar: [
            ['characterNumber', 1],
            ['name', 'Thorsten'],
            ['interaction', 'dialogue'],
            ['dialogue', ThorstenDialogue],  
            ['dialogueStartsAt', 0],
            ['size', [80,80]],
            ['offSet', [20,20]],
          ]
      }); 


  // LOAD Vicky Questgiver

let VickyDialogue = [
['Vicky', "Hey there fellow, I have a quest for you!"],
['Player', "Quests? You mean like in RPG's!?"],
['Vicky', "Exactly, so do you want it or not?"],
['option', 
  ["What do you want me to do?", [4]],
  ["Like a real RPG player, accept Quest anyways", [10, "dispatch('loadInterface/openQuestContainer', 'test', {root:true})", "dispatch('changeDialogueStartsAt', [2, 'Vicky', 7])", 'console.log("scene.Vicky.dialogueStartsAt")']],
  ["I'm not really a 'Quest Person'", [10]]
],
['Vicky', "You will have to do..."],
['option', 
  ["Ah, that sounds doable!", [2]],
  ["No, I'm out!", [10]],
],
// 5
["Warning", "This shouldn't be shown, alternate conversation after this point"],

["Vicky", 'Come back, once you finished the quest'],
];

this.Vicky = new Character({
          scene: this,
          key: 'vicky',
          x: 280,
          y: 1170,
          furtherVar: [
            ['characterNumber', 2],
            ['name', 'Vicky'],
            ['interaction', 'dialogue'],
            ['dialogue', VickyDialogue],
            ['dialogueStartsAt', 0],
            ['size', [56,56]],
            ['offSet', [0,0]],
          ]
      });






  // Items one can find 
  this.itemsOneCanFind = this.physics.add.group()

  // Create as characters
  this.star = this.itemsOneCanFind.create(200, 1150, 'star')
  // Add dialogue to star
  let dialogue_star = ['Item', 'You just found a star, press "i" to use it'];
  store.dispatch('dialogue/addDialogue', dialogue_star);


  this.physics.add.overlap(this.player, this.itemsOneCanFind, this.collectItem, null, this); // how to find the item in itemsonecanfind?



  // Doors to other instances
  const doorMusicHouse = this.map.findObject("Objects", obj => obj.name === "Door_ValueGuy");

  this.doorMusicHouse = this.physics.add.sprite(doorMusicHouse.x, doorMusicHouse.y);
  
  this.physics.add.collider(this.player, this.doorMusicHouse, 
    function(){
      this.scene.stop(this.sys.config.key); 
      this.scene.start('HouseOfMusicScene', null);
    }, null, this);

}

update(time, delta) {
  // Update movement
  if(this.player.isAllowedToMove){
  this.player.move();
  }

  if(this.player.characterInteraction[0] === 'dialogue'){
    this[this.player.characterInteraction[1]].updateDialogue()
  } else if (this.player.characterInteraction[0] === 'option'){
    console.log("!")
    this[this.player.characterInteraction[1]].updateOptions()
  }

} // End of update



collectItem(player, item){
  // Get item name 
  let name = item.texture.key; 
  // add item to createNPC objectsInInventory
  store.dispatch('createNPCs/findItem', name)

  // dispatch dialogue?
  // this.player.characterInteraction = ['dialogue', '' + 'dialogue_' + name + '']
  
  //alert('You found a rare item, use i to open your itembox and use it ;)')
  // Remove item
  this[name].disableBody(true, true);
}

}












/* Graveyard

/*let you = {
          inAction: false,
          isAllowedToMove: true,
          contactWithCharacter: false,
          characterLastContacted: null,
        };*/

  /*
  player = this.physics.add
    .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
    .setSize(30, 40)
    .setOffset(0, 24);

  */


  // Create the player's walking animations from the texture atlas. These are stored in the global
  // animation manager so any sprite can access them.
  /*anims = this.anims;
  anims.create({
    key: "misa-left-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-right-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-front-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-back-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });*/




    /*
  // Debug graphics
  this.input.keyboard.once("keydown_D", event => {
    // Turn on physics debugging to show player's hitbox
    this.physics.world.createDebugGraphic();

    // Create worldLayer collision graphic above the player, but below the help text
    const graphics = this.add
      .graphics()
      .setAlpha(0.75)
      .setDepth(20);
    worldLayer.renderDebug(graphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
*/




/*
  this.physics.add.collider(this.player, this.discutor, 

    function(){
    
      if(keys.spaceBar.isDown){
          this.player.actionCounter++
    
          if(this.player.actionCounter === 1){

              this.player.characterInteraction = ['dialogue', 'Discutor']; 

              store.dispatch('dialogue/loadDialogue');
    
              //Set timeout sets this to window!
              setTimeout(function(){ Grow.scene.scenes[2].player.actionCounter = 0}, 1000);
    
  }}}, null, this);

*/




//Experiments

/* LOAD EXAMPLE CHARACTER
  this.exampleCharacter = new Character({
            scene: this,
            key: 'loading from where?',
            x: 340,
            y: 1120,
            furtherVar: {
              'name': 'exampleCharacterName',
              'interaction': 'kindOfInteraction',
            }
        });
*/
  // Maybe one should give the different characters in a scene a number, 
  // so that one can find them in this.characters.children

  //console.log(this.characters.children.entries[0])
  //this.discutor.calling();



/*
playMusic(){
  // Load iframe with youtube music

  // 2nd try: Open new tab with music :check! with several NPCs :check
  if(this.player.characterLastContacted === 'Thorsten'){
    console.log('Thorsten: opening tab to play music: Techno!')
    window.open('https://music.youtube.com/watch?v=wNPiGiQNNrU&list=RDAMPLPLhc9cpTh-PxX1cw-8qEfEKUSlTzY3l3Dw');
  } if(this.player.characterLastContacted === 'Tommy'){
    console.log('Tommy: opening tab to play music: Epic!')
    window.open('https://music.youtube.com/watch?v=fuO2JWumMZ0&list=RDQMoLN4u0LZsho');
  }  
}

*/


/*
  // Run the update method of all enemies
  this.enemyGroup.children.entries.forEach(
      (sprite) => {
          sprite.update(time, delta);
      }
*/
/*
  if(this.player.spaceBar.isDown && !this.player.inAction && this.player.contactWithCharacter){
     
     this.player.inAction = true;
    
     if(this.player.characterLastContacted === 'Tommy' || this.player.characterLastContacted === 'Thorsten'){
       this.playMusic();
     } 
  
  // After 250 ms set playerinaction to false?

*/

/*
  // Tommy epic music
  Tommy = this.physics.add
    .sprite(440,840, 'exampleCharacter')
    .setSize(32, 32)
    .setOffset(0, 0)
    .setImmovable(true);

  Tommy.setDisplaySize(40,40)

 
  this.physics.add.collider(this.player, Tommy, function(){this.player.contactWithCharacter = true; this.player.characterLastContacted = 'Tommy'; setTimeout(function(){ this.player.contactWithCharacter = false; }, 1000);}, null, this);
  
*/
