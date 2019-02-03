import { Scene } from 'phaser'

import { Grow } from './../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../index'

// Import Tilemaps here
import tiles from "./../assets/tilesets/PathAndObjects.png"
import map from "./../assets/tilemaps/EmptyGrassField.json"

// Import Images here
import star from './../assets/star.png'
import bomb from './../assets/bomb.png'
import vicky from './../assets/sprites/npc_vicky.png'
import thorsten from './../../../../../static/raw_sprites/spritesmith/npcs/npc_aprilFool.png'
import discutor from './../../../../../static/raw_sprites/spritesmith/npcs/npc_tyler.png'
import ValueGuy from './../assets/sprites/npc_ian.png'

// import guide
import dude from '../assets/dude.png'


// Import Sprites.js here (should be bundled)

import Character from './../phaserUtilities/character'
import Shelf from './../phaserUtilities/shelf'

// Import external functions
import loadScene from './../phaserUtilities/loadScene'
import {updateDialogue, updateOptions, updateUserInput} from './../phaserUtilities/phaserDialogue'


// Steps to take: 1) Import into scenes/index.js 
export default class EmptyGrassField extends Scene {

  constructor () {
    super({ key: 'EmptyGrassField' })
  }

preload() {
  //simplifies all generalizable functions //imported from phaserUtilities
  loadScene(this, 'preload');
  
  //currently the image needs to be preloaded to be able to insert it into the game from createNPC
  this.load.image("star", star );
  this.load.image("bomb", bomb );

  this.load.image('ValueGuy', ValueGuy);
  this.load.image("thorsten", thorsten,  {frameWidth: 120, frameHeight: 120} );
  this.load.image("discutor", discutor,  {frameWidth: 100, frameHeight: 100} );
  this.load.image("vicky", vicky,  {frameWidth: 100, frameHeight: 100} );

  this.load.spritesheet('dude', dude, {frameWidth: 32, frameHeight: 48});

  
    
    // Load MAP
    // Make sure this has the right type
    this.load.image("tiles", tiles );
    this.load.tilemapTiledJSON("map", map);

} // End of Preload

create() {

  // Loading TileMap
  this.map = this.make.tilemap({ key: "map" });

  const tileset = this.map.addTilesetImage("EmptyGrassField", "tiles");

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = this.map.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = this.map.createStaticLayer("Collision Layer", tileset, 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", tileset, 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  aboveLayer.setDepth(10);

  loadScene(this, 'create');

   // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(this.player, worldLayer); 





  // Items one can find 
  this.itemsOneCanFind = this.physics.add.group()

  // Create as characters
  this.createItem('bomb', 260,140, 'https://docs.google.com/document/d/13BDpVuM0gMo8xoHvfJcf-uKYH0UxXiBJc2mBm0ZftHk/edit', 'Gaell - Data Visualization');
  this.createItem('star', 340,150, 'https://www.youtube.com/watch?v=Gzm_mcLyMVo', 'Classcraft - games in the classroom');

  this.physics.add.collider(this.player, this.itemsOneCanFind, this.collectItem, null, this); // how to find the item in itemsonecanfind?



  // CREATE CHARACTERS

  let DiscutorDialogue = [
['Discutor', "Hey there wanderer, would you like to work more efficiently?"],
['option', 
  ['Sure, I would like to learn more about learning', [4]],
  ['I want to have a tool that can help me!', [2]],  
  ["No, I'm currently not interested", ["dispatch('endConversation')"]]
],
['Discutor', 'Then check out this new tool'],
['option', 
  ['try out tool', ["dispatch('endConversation')", 'http://grow.cri-paris.org/#/pomodoro']], 
  ['Leave him behind', ["dispatch('endConversation')"]]
],
['Discutor', 'Did you ever hear about the last lecture of Randy Pusch from MIT?'],
['option', 
  ['No I have never heard about it', [6]], 
  ['Actually I know this one already', [7]]
],
['option', 
  ['let me check it out', ["dispatch('endConversation')", 'https://www.youtube.com/watch?v=ji5_MqicxSo']], 
  ['Actually I have better things to do', ["dispatch('endConversation')"]]
],
['Discutor', "That's too bad, that's all the content I know. Maybe come back later, when my content is updated"],

];


this.Discutor = new Character({
          scene: this,
          key: 'discutor',
          x: 150,
          y: 540,
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
['Thorsten', 'Hey there new one. I was created to give you a nice working environment!'],
['option', 
  ['Cool, set it up!', [2, 'http://grow.cri-paris.org/#/pomodoro']], 
  ["I'm searching for something else ;) ", ["dispatch('endConversation')"]]
],
['Thorsten', 'Which music would you like?'],
['option', 
  ['Relax', ["dispatch('endConversation')", '']], 
  ['Focus', ["dispatch('endConversation')", '']],
  ['No Music for now', ["dispatch('endConversation')"]],
],
];

this.Thorsten = new Character({
          scene: this,
          key: 'thorsten',
          x: 425,
          y: 170,
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



let VickyDialogue = [
['Vicky', 'Hey there wanderer! I have the pleasure to be your personal coach today. Your first task is to do 10 push ups'],
['option', 
  ['Accept Quest', [10, 
      "dispatch('loadInterface/openQuestContainer', 'exercise', {root:true})", 
      "dispatch('changeDialogueStartsAt', [3, 'QuestGiver', 5])",
      "dispatch('changeDialogueStartsAt', [3, 'QuestGiver', 2, 15000])",]], 
  ["Leave", [10]]
],

['Quest', 'Did you finish the Quest?'],
['option', 
  ['Yes, I finished', [4, 
      "dispatch('setCurrentMessageType', 'userInput')", 
      "dispatch('changeDialogueStartsAt', [3, 'QuestGiver', 2])"]], 
  ["No, not yet", [10]]
],
['How do you feel after the exercise?', null],


['Quest', 'It should take more time to finish this quest'],
  
];

this.QuestGiver = new Character({
          scene: this,
          key: 'vicky',
          x: 530,
          y: 500,
          furtherVar: [
            ['characterNumber', 2],
            ['name', 'QuestGiver'],
            ['interaction', 'dialogue'],
            ['dialogue', VickyDialogue],  
            ['dialogueStartsAt', 0],
            ['size', [60,60]],
            ['offSet', [0,0]],
          ]
      }); 


  // Welcome text that has a "fixed" position on the screen
  this.add
    .text(16, 16, "When you program, be in the moment!", {
      font: "18px monospace",
      fill: "#000000",
      padding: { x: 20, y: 10 },
      backgroundColor: "#ffffff"
    })
    .setScrollFactor(0)
    .setDepth(30);




// Doors to other instances (to be continued)
  //const doorMusicHouse = this.map.findObject("Objects", obj => obj.name === "Door_ValueGuy");
 let TeleporterDialogue = [
['Teleporter', "Where would you like to go?"],
['option', 
  ["I'd like to go to Town", ["scene.scene.stop('EmptyGrassField'); scene.scene.start('TownScene');"]], 
  ["Visit the Value guy", ["scene.scene.stop('EmptyGrassField'); scene.scene.start('HouseOfMusicScene');"]],
],
];

this.Teleporter = new Character({
          scene: this,
          key: 'thorsten',
          x: 200,
          y: 200,
          furtherVar: [
            ['characterNumber', 7],
            ['name', 'Teleporter'],
            ['interaction', 'dialogue'],
            ['dialogue', TeleporterDialogue],
            ['dialogueStartsAt', 0],
            ['size', [100,100]],
            ['offSet', [0,0]],
          ]
      });




  let QuizzorDialogue = [
['Quizzor', "Would you like to participate in the CRI quiz? if you answer all the questions correctly, you will earn a neat reward!"],
['option', 
  ['Sure, I have nothing to lose', [2]], 
  ["I tried already one too many times", ["commit('endConversation')"]],
],
['Quizzor', "Cool! First question: What is the principal value of the CRI?"],
['option', 
  ['#Yolo', [10]], 
  ['#Open', [4]],
  ['#Freedom', [10]],
],
['Quizzor', "Next up! Second question: What can you find on the lowest floor of the CRI?"],
['option', 
  ['Free Hotdogs', [10]], 
  ['A Book Archive', [10]],
  ['Gender Free Toilets', [6]]
],
['Quizzor', "Next up! Third and last question: Who has access to the CRI on Saturday afternoons?"],
['option', 
  ['Only Francois Taddei', [10]], 
  ['No one', [10]],
  ['Everyone, all the time!', [8]]
],
['Quizzor', "That's correct! Claim your reward!"],
['option', 
  ['Claim reward, check your inventory by pressing "i"', ["commit('endConversation')", ]],
],
['Quizzor', "That's not correct. Try again!"],


];

this.Quizzor = new Character({
          scene: this,
          key: 'discutor',
          x: 320,
          y: 200,
          furtherVar: [
            ['characterNumber', 5],
            ['name', 'Quizzor'],
            ['interaction', 'dialogue'],
            ['dialogue', QuizzorDialogue],
            ['dialogueStartsAt', 0],
            ['size', [60,60]],
            ['offSet', [35,20]],
          ]
      });





this.misa = this.physics.add.sprite(380, 400, 'atlas');


//this.firstScene();







} // End of Create

update(time, delta) {
  // Update movement
  if(this.player.isAllowedToMove){
  
  this.player.move();

  //Update dialogue function - triggers phaserDialogue.js
  } else if(this.player.characterInteraction[0] === 'dialogue'){
    
    updateDialogue()

  } else if (this.player.characterInteraction[0] === 'option'){
    
    updateOptions()

  } else if (this.player.characterInteraction[0] === 'userInput'){
    
    updateUserInput()

  }
} // End of update

// Add functions of the Scene here


firstScene(){
// Character looks down  
this.player.setTexture("atlas", "misa-front")
// Disable character movement
this.player.isAllowedToMove = false;

// Speed times time === px moved, move 2 fields up = 96
this.movingCharacter('misa', [['up',1920],['left',1010],['up',10]], 50);

// Start dialogue after movement
let firstDialogue = [
['Quest', '?'],
['option', 
  ['Yes, I finished', [4, 
      "dispatch('setCurrentMessageType', 'userInput')", 
      "dispatch('changeDialogueStartsAt', [3, 'QuestGiver', 2])"]], 
  ["No, not yet", [10]]
]
];

store.dispatch('dialogue/addDialogue', ['firstDialogue', firstDialogue])

setTimeout(function(){
  let scene = Grow.scene.scenes[store.state.player.sceneActive]; 
  
  scene.player.characterInteraction[0] = 'dialogue' 

  store.dispatch('dialogue/loadDialogue', 'firstDialogue') 
}, 2940 ); // Time that is needed for the movement

};



// Movement function --> moving characters
movingCharacter(character, movement, speedValue, i = 0){

  // Make a translate to pixels function, translates time and speed into pixels


  // I would like to be able to move characters by field?
  // There is a certain time that a character needs to move to a second field
  // Can I do this with pixels? / speed times time
  let scene = Grow.scene.scenes[store.state.player.sceneActive];

  if (i === 0){
    // Load animations
    scene.anims.create({
        key: character + "-left-walk",
        frames: scene.anims.generateFrameNames("atlas", { prefix: character + "-left-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      });
      scene.anims.create({
        key: character + "-right-walk",
        frames: scene.anims.generateFrameNames("atlas", { prefix: character + "-right-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      });
      scene.anims.create({
        key: character + "-front-walk",
        frames: scene.anims.generateFrameNames("atlas", { prefix: character + "-front-walk.", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      });
      scene.anims.create({
        key: character + "-back-walk",
        frames: scene.anims.generateFrameNames("atlas", { prefix: character + "-back-walk", start: 0, end: 3, zeroPad: 3 }),
        frameRate: 10,
        repeat: -1
      });
  }
 

  let speed = 0;
  if (speedValue !== undefined && speedValue > 0) { speed = speedValue } else { speed = 300 }

   if(movement[i][0] === 'up'){
      scene[character].body.setVelocityY(-speed)
      scene[character].anims.play(character + "-back-walk", true);
   } else if(movement[i][0] === 'down'){
      scene[character].body.setVelocityY(speed)
      scene[character].anims.play(character + "-front-walk", true);
   } else if(movement[i][0] === 'left'){
      scene[character].body.setVelocityX(-speed)
      scene[character].anims.play(character + "-left-walk", true);
   } else if(movement[i][0] === 'right'){
      scene[character].body.setVelocityX(speed)
      scene[character].anims.play(character + "-right-walk", true);
   }

     setTimeout(function(){

      let prevVelocity = scene[character].body.velocity.clone();

      scene[character].body.setVelocity(0); 

      i++;
      
      if(i < movement.length){
        
        scene.movingCharacter(character, movement, speed, i)

      } else {
        scene[character].anims.stop();

        // If we were moving, pick an idle frame to use // Based on misa at this pointerover
        if      (prevVelocity.x < 0) scene[character].setTexture("atlas", "misa-left");
        else if (prevVelocity.x > 0) scene[character].setTexture("atlas", "misa-right");
        else if (prevVelocity.y < 0) scene[character].setTexture("atlas", "misa-back");
        else if (prevVelocity.y > 0) scene[character].setTexture("atlas", "misa-front");
      }

     }, movement[i][1]);

}  



collectItem(player, item){
  // Get item name
  
  // dispatch dialogue eventually, detached from character 
  // this.player.characterInteraction = ['itemFound', 'itemID']
  
  // add item to createNPC objectsInInventory // push whatever information is needed
    store.dispatch('createNPCs/findItem', [item.name,item.key,item.link])
  
  

  alert('You found an item, use "i" to open your itembox and use it')
  // Remove item 
  this['item' + item.x + item.y].disableBody(true, true);
}

createItem(key, x, y, link, linkTitle){
  // Create individual name depending on location! 
  // Unfinished: Should it mention or be equal to scene number like in createNPCs/gameContainerClicked
  this['item' + x + y] = this.itemsOneCanFind.create(x, y, key);

  // Add a link to the item
  if (link && linkTitle) { 
    this['item' + x + y].link = link;
    this['item' + x + y].linkTitle = linkTitle;
  } else if (link){ this['item' + x + y].link = link; }
 
  this['item' + x + y].key = key;
  this['item' + x + y].name = 'item' + x + y;

  


  // Make character interactive so that he reacts to click events
  this['item' + x + y].setInteractive();

  this['item' + x + y].on('pointerover', () => { 

  // should be only added once
  if (linkTitle) { this.hoverText = this.add.text(x - 100, y - 40, this['item' + x + y].linkTitle,
                                        {
                                          font: "10px monospace",
                                          fill: "#000000",
                                          padding: { x: 20, y: 10 },
                                          backgroundColor: "#ffffff"
                                        })
                                        .setScrollFactor(0)
                                        .setDepth(30);


  };
  

  });

  this['item' + x + y].on('pointerout', () => {
    this.hoverText.setText('')
  });

}






} // End of Export































/*

// Quiz

  let QuizzorDialogue = [
['Quizzor', "Would you like to participate in the CRI quiz? if you answer all the questions correctly, you will earn a neat reward!"],
['option', 
  ['Sure, I have nothing to lose', [2]], 
  ["I tried already one too many times", ["commit('endConversation')"]],
],
['Quizzor', "Cool! First question: What is the principal value of the CRI?"],
['option', 
  ['#Yolo', [10]], 
  ['#Open', [4]],
  ['#Freedom', [10]],
],
['Quizzor', "Next up! Second question: What can you find on the lowest floor of the CRI?"],
['option', 
  ['Free Hotdogs', [10]], 
  ['A Book Archive', [10]],
  ['Gender Free Toilets', [6]]
],
['Quizzor', "Next up! Third and last question: Who has access to the CRI on Saturday afternoons?"],
['option', 
  ['Only Francois Taddei', [10]], 
  ['No one', [10]],
  ['Everyone, all the time!', [8]]
],
['Quizzor', "That's correct! Claim your reward!"],
['option', 
  ['Claim reward, check your inventory by pressing "i"', ["commit('endConversation')", ]],
],
['Quizzor', "That's not correct. Try again!"],


];

this.Quizzor = new Character({
          scene: this,
          key: 'discutor',
          x: 320,
          y: 200,
          furtherVar: [
            ['characterNumber', 5],
            ['name', 'Quizzor'],
            ['interaction', 'dialogue'],
            ['dialogue', QuizzorDialogue],
            ['dialogueStartsAt', 0],
            ['size', [60,60]],
            ['offSet', [35,20]],
          ]
      });

*/





/*  // Create a shelf

  //Battle plan: 

  //Create shelf in map: Objects
  const shelf_1 = this.map.findObject("Objects", obj => obj.name === "shelf_1");

  //Create an empty sprite to collide with
  this.shelf_3_1 = new Shelf({
    scene: this,
    key: null,
    x: shelf_1.x,
    y: shelf_1.y,
    furtherVar: [
      ['name', 'shelf_1'],
      ['shelfType', 1],
      ['size', [shelf_1.width, shelf_1.height]],
      ['offSet', [0,0]],
    ]
  })

  // Call shelf function in utilities 
  // if one collides with shelf it opens up shelf container
  // */







