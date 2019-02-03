import { Grow } from './../index'

import store from '../../../index'

import Player from './../phaserUtilities/player'

// Import Sprites here 
import exampleCharacterPNG from './../assets/atlas/atlas.png'
import exampleCharacterJSON from './../assets/atlas/atlas.json'


export default function loadScene(scene, state) {


// import happens in scene itself? (dynamic import)


// Scene preload
if(state == 'preload'){

	let numberOfActiveScene = 0;

    for(let i=0;i<Grow.scene.scenes.length;i++){
      if(Grow.scene.scenes[i].sys.config.key === scene.sys.config.key){
        numberOfActiveScene = i;
      }
    }

    store.dispatch('player/changeActiveScene', numberOfActiveScene);

    // Load PLAYER
    scene.load.atlas("atlas", exampleCharacterPNG, exampleCharacterJSON);
}




// Scene create
if(state == 'create'){


// load spawnpoint and player // if you arrive through doors find alternate spawnpoint // if you teleport and there is no door back, look if there is a number (if spawnpoint is not enough)
let spawnPoint;

if(Grow.previousMap){
  let name = Grow.previousMap + 'Spawn'
  console.log(name)
  spawnPoint = scene.map.findObject("SpawnPoints", obj => obj.name === name);
} else {
  spawnPoint = scene.map.findObject("SpawnPoints", obj => obj.name === "Spawn Point");
}

if(spawnPoint){
   // LOAD PLAYER
  scene.player = new Player({
            scene: scene,
            key: 'atlas',
            x: spawnPoint.x,
            y: spawnPoint.y
        });
} else {
  scene.player = new Player({
            scene: scene,
            key: 'atlas',
            x: 100,
            y: 100
        });
}

  
 

/*
  scene.sensorField = new SensorField({
    scene: scene,
    key: '',
    x: spawnPoint.x,
    y: spawnPoint.y,

  })
*/ 




  // CAMERA  // the camera is fixed to the center of the 
             //  screen if the map size is smaller than 800/600px
  const camera = scene.cameras.main;
  camera.startFollow(scene.player);
  
  let moveMapX = 0;
  let moveMapY = 0;

  if (scene.map.widthInPixels < 800){
    // Move map to the right, so that it is centered
    moveMapX = (800 - scene.map.widthInPixels) / 2
  } 

  if (scene.map.widthInPixels < 600){
    // Move map down, so that it is centered
    moveMapY = (600 - scene.map.heightInPixels) / 2
  }
  
  camera.setBounds(-moveMapX, -moveMapY, scene.map.widthInPixels, scene.map.heightInPixels);


// load doors 
// Idea for later: If the door is closed, one needs to use space to open it, if it is open, one doesn't need space

// Find the number of doors in a room
let numberOfDoors = 0;
let objectLayerDoors = 0;

// Find the number of objects in a room
let objectLayer = 0;
let numberOfObjects = 0;

for(let i = 0; i <scene.map.objects.length; i++){
  if(scene.map.objects[i].name == 'Doors'){
    objectLayerDoors = i;
    numberOfDoors = scene.map.objects[i].objects.length;
  } else if(scene.map.objects[i].name == 'Objects'){
    objectLayer = i;
    numberOfObjects = scene.map.objects[i].objects.length;
  }
}

// Find Objects
let sceneObjects = [];

for(let i = 0; i < numberOfObjects; i++){
  let object = scene.map.objects[objectLayer].objects[i];
  sceneObjects[i] = object.name;
  console.log(object.name)
  scene[sceneObjects[i]] = scene.physics.add.sprite(object.x, object.y);

  scene[sceneObjects[i]].body.width = object.width;
  scene[sceneObjects[i]].body.height = object.height;
  scene[sceneObjects[i]].displayOriginX = 0;
  scene[sceneObjects[i]].displayOriginY = 0;
  scene[sceneObjects[i]].setImmovable(true);
}



// Find the name of the doors and create objects that bring you to another room
let doors = [];

for(let i = 0; i < numberOfDoors; i++){
  let doorObject = scene.map.objects[objectLayerDoors].objects[i];
  doors[i] = doorObject.name;
  

  // Create a door sprite 
  scene[doors[i]] = scene.physics.add.sprite(doorObject.x, doorObject.y);

  scene[doors[i]].body.width = doorObject.width;
  scene[doors[i]].body.height = doorObject.height;
  scene[doors[i]].displayOriginX = 0;
  scene[doors[i]].displayOriginY = 0;

  // Create a collider with door
  scene.physics.add.collider(scene.player, scene[doors[i]], function(){
    // Setting game variable to previous door
    Grow.previousMap = scene.sys.config.key

    // Remove dialogues from object
    store.commit('dialogue/emptyDialogue');
    scene.scene.stop(scene.sys.config.key); 
    scene.scene.start(doors[i]);
  }, null, scene);
}

// 

}

}










/* MAP LOADER

// Load MAP
    // Make sure this has the right type (name after mapName)

    // function is called with mapName
    let mapName = 'bedroom'
    let tilesets = []; 

    for (let i = 0; i < map.tilesets.length; i++){
      tilesets.push('./../../assets/tilesets/' + map.tilesets[i].name + '.png')
    }
    
    for (let i = 0; i < map.tilesets.length; i++){
      this.load.image(map.tilesets[i].name, tilesets[i])
    }

    console.log(map)
     

    this.load.tilemapTiledJSON(mapName, map);

    


    // Takes too damn long, load in bootscene and then play maybe
    // this.load.audio('backgroundMusic', backgroundMusic)
}

create() {

  let mapName = 'bedroom'
  this.map = this.make.tilemap({ key: mapName });

  const tilesetBedroom0 = this.map.addTilesetImage("Inside_A4", map.tilesets[i].name);
  const tilesetBedroom1 = this.map.addTilesetImage("Inside_B", map.tilesets[i].name);
  const tilesetBedroom2 = this.map.addTilesetImage("SF_Inside_B", map.tilesets[i].name);
  const tilesetBedroom3 = this.map.addTilesetImage("mack_char01", map.tilesets[i].name);
  
  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = this.map.createStaticLayer("Below Player", [tilesetBedroom0,tilesetBedroom1,tilesetBedroom2,tilesetBedroom3], 0, 0);
  const worldLayer = this.map.createStaticLayer("Collision Layer", [tilesetBedroom0,tilesetBedroom1,tilesetBedroom2,tilesetBedroom3], 0, 0);
  const aboveLayer = this.map.createStaticLayer("Above Player", [tilesetBedroom0,tilesetBedroom1,tilesetBedroom2,tilesetBedroom3], 0, 0);




*/