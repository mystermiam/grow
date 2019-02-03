/*
Bugs:

- Block door
- Quiz
- Collision errors (Aurelie)



FISHING
- Create messages in Pomodoro timer (Jabol)  <--
- hide the game / iframe fit (hide progressbar)  <--
- I think we caught something - Create popup above character , fading out (Your fishing skill has increased by 1) <-- maybe
- Add experience
- Add image in createNPCs (can't seem to find it)


- Finding a way to align the Vue Interface with your screen

- Need to find Hugo to get laptops



- Maria's home. Create room with female character 
- Let Arya ask you who you would write a note to - first user input, which person, then she asks you to write a message on a post it 





- I want more interaction with the surroundings and the web
- Quiz (middle of town)
- Quote character (asian scene)
- Value guy (bottom town)
- touch nose - im a character made for the sole purpose of hacking you
- Asking you to write something on the suggestion board
- Fisherman. Since I started fishing my productivity has increased by 200%. This number is scientifically validated.


- Portal is on a white background currently


ASIAN GARDEN
- cosmetic errors with layers
- collision errors
- create scene load music


Cosmetic errors: 
Dialogue: - option mistake - loads in the top of the screen and then moves after 100ms down - put it clearly in vueinterface

Aurelie
- Change collision in maps. Maybe create a fourth layer 

- download sounds (success, cracking sound) / music to be played in the music rooms
- find animation for success (rpg maker has these level up animations)
- Make a teleporter sprite that we can use to go to the concert hall

- Make layout for paper to let people write down possible applications
  (we can frame the experience as a coexploration) (A3) <-- put it on the wall and people can explore it with you



Quiz
- Find funny questions <--
- Link up to the solutions <--
- Attach item (really rare item) <--
- Attach dialogue function when clicking on this item (It doesn't look like it is doing 
  anything, but I will keep it because it is rare <-- or something like this)


- Your brain can survive for five to 10 minutes without oxygen. https://science.howstuffworks.com/life/inside-the-mind/human-brain/brain-death1.htm
- You might feel like you got a workout, but sex only burns about 3.6 calories a minute. http://blogs.discovermagazine.com/seriouslyscience/2013/11/04/sex-count-workout/
- If you touch your nose with your fingers crossed you will feel two noses


createNPCs.js
- scene.bottle is not working

Improve on conversations (do that together in between)

Create different kind of interactions 

Potentially:
Quest: Cool one

Have a character standing around that you can add questions too

Random quote guy (maybe in Asian place) - “Never underestimate the ability of a small group of dedicated people to
change the world. Indeed, it is the only thing that ever has.”

*/

import { Scene } from 'phaser'

import { Grow } from './../../index' // necessary? 3 times games phaser, scene, Grow

import store from '../../../../index'

// Import Tilemaps here
import tiles0 from "./../../assets/tilesets/Inside_C.png"
import tiles1 from "./../../assets/tilesets/Outside_A5.png"
import tiles2 from "./../../assets/tilesets/PathAndObjects.png"
import tiles3 from "./../../assets/tilesets/Outside_A1.png"
import tiles4 from "./../../assets/tilesets/Outside_A2.png"
import tiles5 from "./../../assets/tilesets/Outside_A3.png"
import tiles6 from "./../../assets/tilesets/Outside_B.png"
import tiles7 from "./../../assets/tilesets/Outside_C.png"
import tiles8 from "./../../assets/tilesets/town.png"
import tiles9 from "./../../assets/tilesets/wood_tileset.png"
import tiles10 from "./../../assets/tilesets/outside6.png"

import map from "./../../assets/tilemaps/V2.json"

// Import images

// Provisional child running around
import dude from './../../assets/dude.png'
import quizMaster from './../../../../../../static/raw_sprites/spritesmith/npcs/npc_tyler.png'

import quizGuy from './../../assets/sprites/Arabicfullguy.png'
import red_circle from './../../assets/sprites/REDCIRCLE.png'
import fishingRod from './../../assets/sprites/fishingRod.png'
import runningChild from './../../assets/sprites/punkcompleteguy.png'
import halfbottle from './../../assets/sprites/halfbottle.png'
import bottle from './../../assets/sprites/bottle.png'
import girlinred from './../../assets/sprites/girlinred.png'
import fisherman from './../../assets/sprites/fisherman.png'
import knightBlue from './../../assets/sprites/knightblue.png'
import knight from './../../assets/sprites/knight.png'
import portal1 from './../../assets/sprites/portal1.png'
import portal2 from './../../assets/sprites/portal2.png'



// Import Sprites.js here
import Player from './../../phaserUtilities/player'

import Character from './../../phaserUtilities/character'

//import bell from './../../assets/music/sounds/bell.mp3'

// Import external functions
import movingCharacter from './../../phaserUtilities/sceneFunctions/movingCharacter'
import loadScene from './../../phaserUtilities/loadScene'
import {updateDialogue, updateOptions, updateUserInput} from './../../phaserUtilities/phaserDialogue'
   

// Steps to take: 1) Import into scenes/index.js 
export default class Town extends Scene {

  constructor () {
    super({ key: 'Town' })
  }

preload() {
    // Load basic functions that exist in every map
    loadScene(this, 'preload');

    // Load MAP
    // Make sure this has the right type (name after mapName)
      this.load.image("tilesTown0", tiles0 );
      this.load.image("tilesTown1", tiles1 );
      this.load.image("tilesTown2", tiles2 );
      this.load.image("tilesTown3", tiles3 );
      this.load.image("tilesTown4", tiles4 );
      this.load.image("tilesTown5", tiles5 );
      this.load.image("tilesTown6", tiles6 );
      this.load.image("tilesTown7", tiles7 );
      this.load.image("tilesTown8", tiles8 );
      this.load.image("tilesTown9", tiles9 );
      this.load.image("tilesTown10", tiles10 );

      this.load.tilemapTiledJSON("DemoTown", map);

      this.load.image('runningChild', runningChild)
      this.load.image('quizMaster', quizMaster)
      this.load.image('red_circle', red_circle)

      this.load.spritesheet('dude', dude, {frameWidth: 32, frameHeight: 48});
      this.load.spritesheet('quizGuy', quizGuy, {frameWidth: 32, frameHeight: 48});
      this.load.image('quizGuy', quizGuy)
      this.load.image('fishingRod', fishingRod)
      this.load.image('red_circle', red_circle)
      this.load.image('halfbottle', halfbottle)
      this.load.image('bottle', bottle)
      this.load.image('quizMaster', quizMaster)
      this.load.image('red_circle', red_circle)
      this.load.image('girlinred', girlinred)
      this.load.image('fisherman', fisherman)
      this.load.image('portal1', portal1)
      this.load.image('portal2', portal2)
      this.load.image('knight', knight)
      this.load.image('knightBlue', knightBlue)

    // Takes too damn long, load in bootscene and then play maybe
    // this.load.audio('backgroundMusic', backgroundMusic)
    //this.load.audio('bell', bell)
    

}

create() {
  // Add and play the music // make it toggleAble
  /*
        this.music = this.sound.add('backgroundMusic');
        this.music.play({
            loop: true
        });
  */


  this.map = this.make.tilemap({ key: "DemoTown" });

  // Find name inside of tilemap
  // Parameters are the name character gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name character used in preload)
  const tilesetTown0 = this.map.addTilesetImage("Inside_C", "tilesTown0");
  const tilesetTown1 = this.map.addTilesetImage("Outside_A5", "tilesTown1");
  const tilesetTown2 = this.map.addTilesetImage("PathAndObjects", "tilesTown2");
  const tilesetTown3 = this.map.addTilesetImage("Outside_A1", "tilesTown3");
  const tilesetTown4 = this.map.addTilesetImage("Outside_A2", "tilesTown4");
  const tilesetTown5 = this.map.addTilesetImage("Outside_A3", "tilesTown5");
  const tilesetTown6 = this.map.addTilesetImage("Outside_B", "tilesTown6");
  const tilesetTown7 = this.map.addTilesetImage("Outside_C", "tilesTown7");
  const tilesetTown8 = this.map.addTilesetImage("town", "tilesTown8");
  const tilesetTown9 = this.map.addTilesetImage("wood_tileset", "tilesTown9"); 
  const tilesetTown10 = this.map.addTilesetImage("outside6", "tilesTown10");

  let tilesets = [tilesetTown1, tilesetTown2, tilesetTown3, tilesetTown4, tilesetTown5, tilesetTown6, tilesetTown7, tilesetTown8, tilesetTown9, tilesetTown10];
  const belowLayer = this.map.createStaticLayer("Below Player", tilesets, 0, 0);
  const worldLayer = this.map.createStaticLayer("Collision Layer", tilesets, 0, 0);
  const notCollisionLayer = this.map.createStaticLayer("Not Collision Layer", tilesets, 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", tilesets, 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Load basic functions that exist in every scene
  loadScene(this, 'create');

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(this.player, worldLayer);

  //this.player.setCollideWorldBounds(true);
// Everything previous to this should be automatized

// ALL THE TOWN CHARACTERS




/************************** Portal ********************************/
/*
let PortalDialogue = [
['Arya', "This is the access point to the 'concert hall'", ["scene.Portal.setTexture('portal2')"]],
['Arya', "At the moment you can only access the Asian Garden, but in a few days they will open the dungeon I have heard."],
['option', 
  ['Go to Asian Garden', [100, "scene.scene.stop('Town')","scene.scene.start('AsianGarden')"]],
  ["I prefer to stay here for the moment", [100]]  
],
];

// Keeps on running


this.Portal = new Character({
          scene: this,
          key: 'portal1',
          x: 120,
          y: 200,
          furtherVar: [
            ['characterNumber', 5],
            ['name', 'Portal'],
            ['interaction', 'dialogue'],
            ['dialogue', PortalDialogue],
            ['dialogueStartsAt', 0],
            ['size', [80,80]],
            ['offSet', [35,20]],
          ]
      });


*/

/************************** End: Portal ********************************/






/************************** Fisherman ********************************/




/************************** End: Fisherman ********************************/



/************************** Town Events ********************************/


let blockedSouthDoor = [
  ['Event','It seems like the door is locked!'],
];
 
  this.blockedSouthDoor = new Character({
          scene: this,
          x: 150,
          y: 560,
          furtherVar: [
            ['characterNumber', 0],
            ['name', 'blockedSouthDoor'],
            ['interaction', 'dialogue'],
            ['dialogue', blockedSouthDoor],
            ['dialogueStartsAt', 0],
            ['size', [30,40]],
            ['offSet', [0,0]],
          ]
  }); 


let SignPostDialogue = [
  ['Arya','The sign says: Fishing Spot to the North West'],
  ['Arya','Daily Funfacts to the North East'],
];
 
  this.SignPost = new Character({
          scene: this,
          x: 840,
          y: 365,
          furtherVar: [
            ['characterNumber', 0],
            ['name', 'SignPost'],
            ['interaction', 'dialogue'],
            ['dialogue', SignPostDialogue],
            ['dialogueStartsAt', 0],
            ['size', [30,30]],
            ['offSet', [0,0]],
          ]
  }); 

/************************** End: blocked door ********************************/



/************************** Value Guy ********************************/

  let valueList = [
    ['Acceptance',''],
    ['Accomplishment',''],
    ['Dependability', ''],
    ['Consistency', ''],
    ['Achievement', ''],
    ['Open-mindedness', ''],
    ['Craftsmanship', ''],
    ['Altruism', ''],
    ['Honesty', ''],
    ['Amusement', ''],
    ['Assertiveness', ''],
    ['Efficacy', ''],
    ['Endurance', ''],
  ];

  let currentValues = this.generateValues(3, 13);

  let dialogueValueGuy = [
  ['Gregoire, the Value Guy','Hey there! My name is Gregoire, the Value Guy.'],
  ['Gregoire, the Value Guy','Values are the prinipals underlying your behavior. It can lead you to interesting results reflecting on them.'],
  ['Gregoire, the Value Guy','With me you can choose one value each week to explore and reflect upon'],
  ['Gregoire, the Value Guy',"I'm currently reflecting on the value of 'Chivalry'."],
  ['Gregoire, the Value Guy','Would you like to try out this exercise with me?'],
  ['option', 
    ['Sure, I would like to try it out. ', [6]],
    ['Run away from the truth', ["dispatch('endConversation')"]],  
  ],
  ['Gregoire, the Value Guy','Great, I generated 3 random values for you for this week, choose the one that you would like to explore.'],
  ['option', 
    [valueList[currentValues[0]][0], [8]], 
    [valueList[currentValues[1]][0], [8]], 
    [valueList[currentValues[2]][0], [8]]
  ],
  ['Gregoire, the Value Guy','Good Choice! Keep me updated. You can come to me each day and tell me what you have learned!', ["endConversation","vueStore.dispatch('dialogue/changeDialogueStartsAt', [3, 'ValueGuy', 9])"]],
  ['Gregoire, the Value Guy','Come back to me tomorrow and tell me what you have learnt!'],
  ];

  this.ValueGuy = new Character({
          scene: this,
          key: 'knight',
          x: 290,
          y: 605,
          furtherVar: [
            ['characterNumber', 0],
            ['name', 'ValueGuy'],
            ['interaction', 'dialogue'],
            ['dialogue', dialogueValueGuy],
            ['dialogueStartsAt', 0],
            ['size', [46,46]],
            ['offSet', [0,0]],
          ]
  }); 







/************************** End: Value Guy ********************************/






/************************** TOMMY THE RUNNING CHILD ********************************/
// BUGS: - ChangeDialogueStartsAt Doesn't work yet
//       - Phaser sprite doesnt load animations correctly

// maybe put in first message a stop signal   
let RunningChildDialogue = [
['Tommy', "I'm so excited, I'm so excited"],
['option', 
  ['What are you so excited about?', [2]],
  ['Keep on running Tommy, you will catch the stars', ["dispatch('endConversation')"]],  
],
['Tommy', "I'm excited about all the updates that are gonna come soon!"],
['Arya', "What are you talking about?"],
['Tommy', "Multiplayer, ... *drools on the floor* "],
['Tommy', "I can't wait anymore!", ["endConversation","vueStore.dispatch('dialogue/changeDialogueStartsAt', [3, 'RunningChild', 6])"]],
['Tommy', "Waaaaahh"],
];

// Keeps on running


this.RunningChild = new Character({
          scene: this,
          key: 'dude',
          x: 200,
          y: 750,
          furtherVar: [
            ['characterNumber', 0],
            ['name', 'Tommy'],
            ['interaction', 'dialogue'],
            ['dialogue', RunningChildDialogue],
            ['dialogueStartsAt', 0],
            ['size', [40,40]],
            ['offSet', [0,0]],
          ]
      });

// Battle plan: 
// create two objects with the child in between --> give the child a speed to run to the left
// If it collides with one of the objects it changes speed - create colliders with the two objects and with player
// If you talk to the child it stop and sets the frame to turn 
// When you end the conversation it runs back to the left 
this.anims.create({
            key: 'runningChild_left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

this.anims.create({
    key: 'runningChild_right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});


this.physics.add.collider(this.RunningChild, this.player);
this.physics.add.collider(this.RunningChild, this.runningChildCollisionLeft, this.childCollidesWithObject('right'));
this.physics.add.collider(this.RunningChild, this.runningChildCollisionRight, this.childCollidesWithObject('left'));

this.RunningChild.anims.play("runningChild_right", true);
this.RunningChild.body.setVelocityX(10);



/************************** END: TOMMY THE RUNNING CHILD ********************************/






/************************** The Quiz Master ********************************/
// Turn the screen dark and you sit in a chair opposite him?

 let QuizDialogue = [
['Quizzor', "Are you ready to answer some trick questions?"],
['Quizzor', "Sorry, but I never introduce myself"],
['option', 
  ['Sure, I have nothing to lose', [3]], 
  ["Maybe, another time", [100]],
],
['Quizzor', "Learning can be hard sometimes... have you ever felt like that too?"],
['Quizzor', "Oh! And... Have you ever heard of the 'forgetting curve'? Let's see if you can guess how often you have to interact with an information before really learning it!"],
['option', 
  ['Multiple times a day, especially before going to bed', [6]], 
  ['The day after you first heard of it, then two days later, then six days later', [7]],
  ['Never, I never forget a thing!', [8]],
],

['Quizzor', "Don't put it that hard on yourself! You actually need just a few repetition, but at the right moment on your learning curve, to be very effective", [9]],
['Quizzor', "Congrats! You have found the right pace!", [9]],
['Quizzor', "Good for you! But if you ever feel like your memory is getting lazy one day, try the second option: we better learn how to learn according to our natural rythms!", [9]],



['Quizzor', "Our bodies are full of mysteries, and wonders... and weird stuff as well."],
['Quizzor', "Do you know what happens when you cross fingers on the tip of your nose and rub it around with eye closed?"],
['option', 
  ['Nothing but you made me look funny', [12]], 
  ['Oh... I think... I feel it!!', [15]],
  ['Is it safe?', [18]]
],
['Quizzor', " I'm sorry about that, but you should try again (and I'll do it with you if it can help). This technique creates the illusion that you have two noses! "],
['Quizzor', " What happens is that your brain cannot interprete right the information it recieves: your fingers says they feel two distinct touch points where your nose is supposed to be, and your eyes are not here to contradict them! "],
['Quizzor', " There are a lot of illusions that can be created in the body, look up another exemple, the Pinocchio Illusion ", [20]],

['Quizzor', " What just happened is that your brain cannot interprete right the information it recieves: your fingers says they feel two distinct touch points where your nose is supposed to be, and your eyes are not here to contradict them!"],
['Quizzor', " There are a lot of illusions that can be created in the body, look up another exemple, the Pinocchio Illusion", [20]],


['Quizzor', " No worries, the effect will deseaper as soon as you open your eyes! This technique just creates the illusion that you have two noses! "],
['Quizzor', " What happens is that your brain cannot interprete right the information it recieves: your fingers says they feel two distinct touch points where your nose is supposed to be, and your eyes are not here to contradict them!"],
['Quizzor', "There are a lot of illusions that can be created in the body, look up another exemple, the Pinocchio Illusion ", [20]],

['Quizzor', "Thanks for participating, I will have new questions for you tomorrow!"],
];


this.anims.create({
    key: 'quizGuy_right',
    frames: this.anims.generateFrameNumbers('quizGuy', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});


this.Quizzor = new Character({
          scene: this,
          key: 'knightBlue',
          x: 920,
          y: 85,
          furtherVar: [
            ['characterNumber', 6],
            ['name', 'Quizzor'],
            ['interaction', 'dialogue'],
            ['dialogue', QuizDialogue],
            ['dialogueStartsAt', 0],
            ['size', [46,46]],
            ['offSet', [0,0]],
          ]
      });






/************************** End: The Quiz Master ********************************/






/************************** Buy a Book - Go on a journey ********************************/
let BookGuyDialogue = [
['Boken', "Hey dear Wanderer, there my name is Boken and my role in this town to take you on magic journeys"],
['option', 
  ['Whatever it is, I want it!', [8]], 
  ["Magic Journeys?", [2]],
],

['Boken', "Yeah. Magic journeys are created by your fellow World Wanderers to guide you along different experiences."],
['Arya', "What kind of experiences?"],
['Boken', "We have experiences around books and podcasts so far, but it is also possible to enrich other experiences with it"],
['Arya', "How does it work?"],
['Boken', "You choose an experience and if you are prepared for the journey (e.g. you have the book), you travel through the world of Elyrion to discover more about it"],
['option', 
  ['How does it work?', [8]], 
  ['When do we start?', [8]],
],
['Boken', "The only journey that I have for you right now is: 'Mastery of love' from Don Miguel Ruiz"],
['Boken', "Do you have that book?"],

['option', 
  ["No, I don't have it yet", [12]], 
  ['Yes, I have it at home', [11]],
],
['Boken', "Sorry, that answer doesn't work yet. I mean, what did you expect, it's just a demo", [10]],
['Boken', "So, your first quest will be to get the book. I will attach to the quest the amazon link, but feel free to buy it anywhere you want or get it from someone in the community"],

['option', 
  ['Accept Quest', [14]], 
  ["Leave him behind", [100]],
],
['Boken', "I see you soon. I attached the quest to your questlog."],
['Boken', "You can open the questlog with Q"],

['option', 
  ["I'll come back soon", [100]], 
]

];

// Add quest
this.BookGuy = new Character({
          scene: this,
          key: 'quizMaster',
          x: 500,
          y: 200,
          furtherVar: [
            ['characterNumber', 1],
            ['name', 'BookGuy'],
            ['interaction', 'dialogue'],
            ['dialogue', BookGuyDialogue],
            ['dialogueStartsAt', 0],
            ['size', [60,60]],
            ['offSet', [35,20]],
          ]
      });



/************************** End: Buy a Book - Go on a journey ********************************/





/************************** Fishing ********************************/
let FishingDialogue = [

['Arya', "This is the spot!", ['scene.player.setTexture("atlas", "misa-right")']],
['Arya', "Fishing is just one example of how we can use external functionalities in this world to improve their impact."],
['Arya', "The application that we are going to show you here is a 'global' pomodoro timer."],
['Arya', "Pomodoro is a working technique that helps you to stay focused."],
['Arya', "The visualization inside of the game serves as a reward system that is custom built around the functionality."],
['Arya', "For how long do you want to fish?"],
['option', 
  ['60 seconds', [8]], 
  ["25 minutes", [7]],
  ["40 minutes", [7]],
],
['Arya', "Do you want to sit here the whole day? This is just a demo", [3]],
['Arya', "Okay, let's go. When you start fishing it will bring up the pomodoro Interface for a few seconds ", ['endConversation','scene.fishingScene(1)']],
['Arya', "I don't feel like fishing right now", [100]],
];

this.Fishing = new Character({
          scene: this,
          key: 'red_circle',
          x: 374,
          y: 80,
          furtherVar: [
            ['characterNumber', 2],
            ['name', 'Fishing'],
            ['interaction', 'dialogue'],
            ['dialogue', FishingDialogue],
            ['dialogueStartsAt', 0],
            ['size', [40,40]],
            ['offSet', [-20,30]],
          ]
      });

//this.fishingScene(1)
// Add item 
    
/************************** End: Fishing ********************************/


/************************** Calling Scenes ********************************/
//if(store.state.player.scenesToBeShown.indexOf('TownGuide1Scene') >= 0){
    this.townGuide(1);
//}

/************************** End: Calling Scenes ********************************/


} // End of Create



update(time, delta) {
  // Update movement - triggers phaserutilities/player.js
  if(this.player.isAllowedToMove){
  
    this.player.move();

  //Update dialogue functions - triggers phaserDialogue.js
  } else if(this.player.characterInteraction[0] === 'dialogue'){
    Town
    updateDialogue()

  } else if (this.player.characterInteraction[0] === 'option'){
    
    updateOptions()

  } else if (this.player.characterInteraction[0] === 'userInput'){
    
    updateUserInput()

  }
} // End of update



// Add functions here!




townGuide(part){
  if(part == 1){
  
  let guideOne = [
    ['Arya', "What do you want to see first?"],
    ['option', 
      ['Fishing (Visualizing external functionalities)', [2]], 
      ['Quiz (Entertainment + Learning)', [4]],
      ['I just want to explore freely', [100]],
    ],
    ['Arya', "Okay, just follow the way up north until the water"],
    ['Arya', "There is a red circle to show you my favourite spot to fish", [100]],
    ['Arya', "He usually wanders a bit out of the city."],
    ['Arya', "I think we might find him in the North West near the water"],
  ]

  store.dispatch('dialogue/addDialogue', ['guideOne', guideOne])

  store.dispatch('dialogue/loadDialogue', 'guideOne')
  

  } 
}






fishingScene(part){
  let scene = Grow.scene.scenes[store.state.player.sceneActive];
  if (part == 1){
    setTimeout(() =>{
      store.commit('loadInterface/openPomodoroIframe')
    }, 5000);
    

    // Make player unable to move
    scene.player.isAllowedToMove = false;
    
    

    // change frame of picture from red circle to fishing route 
    this.Fishing.setTexture("fishingRod");
    this.Fishing.setDisplaySize(66, 66);
   
    // add timer below 
    store.commit('loadInterface/showTimerDisplay')
    store.dispatch('timer/setTimer', [1500,300,900,30,'work', 1])
  
    

    // Post something in chat to explain the pomodoro timer
    
    // Click on the X in the upper right corner to switch back to other view
    
    // After 30 seconds closePomodoroIframe and see your character fishing
    setTimeout(() =>{
      store.commit('loadInterface/closePomodoroIframe')
      this.fishingScene(2)
    }, 15000);

  } else if (part == 2){


    setTimeout(() =>{
      // Before dialogue starts - move the bottle towards the fishing rope
    this.Bottle = new Character({
          scene: this,
          key: 'halfbottle',
          x: 460,
          y: 0,
          furtherVar: [
            ['characterNumber', 4],
            ['name', 'Bottle'],
            ['interaction', 'floating_around'],
            ['size', [22,22]],
            ['offSet', [35,20]],
          ]
      });

    movingCharacter('Bottle','none', 
      [['down',250],['left',250],
       ['down',250],['left',250],
       ['down',250],['left',250],
       ['down',250],['left',250],
       ['down',100],['left',100], 
       ['down',300],['left',100], 
       ['down',550]],
       50);

    }, 12500)
    


    let CaughtSomethingDialogue = [
      ['Arya', "I think we have caught something!"],
      ['Arya', "What's this? Oh, wow that's a first!", ["scene.Fishing.setTexture('red_circle');","scene.Fishing.setDisplaySize(40, 40);"]],
      ['Arya', "It's a bottle!"],
      ['Arya', "I added the bottle to the inventory. You can check it out yourself if you want to"],
    ];
    
    // Make a 20 seconds timeout here --> start dialogue once timer ends
    store.dispatch('dialogue/addDialogue', ['CaughtSomethingDialogue', CaughtSomethingDialogue])

    //this.bell = this.sound.add('bell');

    setTimeout(()=>{
      this.player.characterInteraction[0] = 'dialogue' 

      //this.bell.play();

      store.dispatch('createNPCs/findItem', ['bottle','bottle'])

      // maybe have a timeout before this one
      store.dispatch('dialogue/loadDialogue', 'CaughtSomethingDialogue')

      //Make bottle disappear 
      this.Bottle.disableBody(true,true)

      // Change dialogue starts at
      this.Fishing.dialogueStartsAt = 9;

      // Make timer disappear
      store.commit('loadInterface/hideTimerDisplay')

      // Finish quest
      store.dispatch('quests/questAccomplished', [3, 5], {root:true})

    }, 20000)
  


    
  }
}



childCollidesWithObject(direction){
let scene = Grow.scene.scenes[store.state.player.sceneActive];

if(direction == 'left') {
scene.RunningChild.anims.play("runningChild_left", true);
scene.RunningChild.body.setVelocityX(200);
} else if(direction == 'right') {
scene.RunningChild.anims.play("runningChild_right", true);
scene.RunningChild.body.setVelocityX(-200);
}

}




generateValues(numberOfValues, valueListLength){
  let currentValues = [];
  let repetition = 0;

  do {
  
  let value = Math.floor(Math.random() * valueListLength)
  
  if (currentValues.indexOf(value) < 0){
    currentValues.push(value);
    repetition++
  }

  } while (repetition < numberOfValues)

  return currentValues
}


} // End of Export
























/*

 /*    
  for (let i = 0; i<map.tilesets.length; i++){
    let name = 'tileSet' + i
    import { name } from './../../assets/tilesets/' + map.tilesets[i].name + '.png'  
  }
  */
        
      // for loop through map.json --> find length
      
      // import all tileset names 
      // load images from paths of imported modules
   
    /*

      let name = map.tilesets[i].name;
        let path = './../' + map.tilesets[i].image + '';
        import eval(name) from path


      https://stackoverflow.com/questions/46253183/es6-import-in-for-of-loop

      const moduleNames = ['NumberUtils', 'StringUtils', 'ArrayUtils', 'MyModule', 'AnotherModule', 'BaseModule']

      let modules = {}

      for (const moduleName of moduleNames) {
        import module from './' + moduleName
        modules.moduleName = module
      }

      export modules







  
 let QuizDialogue = [
['Quizzor', "Would you like to participate in the CRI quiz? if you answer all the questions correctly, you will earn a neat reward!"],
['option', 
  ['Sure, I have nothing to lose', [2]], 
  ["I tried already one too many times", [100]],
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
  ['Claim reward, check your inventory by pressing "i"', ["commit('endConversation')"]],
],
['Quizzor', "That's not correct. Try again!"],


];

this.Quizzor = new Character({
          scene: this,
          key: 'quizMaster',
          x: 320,
          y: 200,
          furtherVar: [
            ['characterNumber', 1],
            ['name', 'Quizzor'],
            ['interaction', 'dialogue'],
            ['dialogue', QuizDialogue],
            ['dialogueStartsAt', 0],
            ['size', [60,60]],
            ['offSet', [35,20]],
          ]
      });





    */
