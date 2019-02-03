import { Grow } from './../index' // necessary?

import store from '../../../index'

export default class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
    	// create this.template = new Template() with config in the scene that uses the character
        super(config.scene, config.x, config.y, config.key, config.furtherVar); 
 	
 	      this.scene = config.scene;
        let scene = this.scene
        // helps to identify in group: this.characters // not used yet

        //define further variables for this character
        for (let i=0;i<config.furtherVar.length;i++){
            this[config.furtherVar[i][0]] = config.furtherVar[i][1]
        }
        
       
        // console.log(this.size[0], this.size[1]) probably only works because size is a thing already
        scene.physics.world.enable(this);
        this.setSize(this.size[0], this.size[1])
        this.setDisplaySize(this.size[0], this.size[1]);
        this.setOffset(this.offSet[0],this.offSet[1]);
        this.setImmovable(true);

        scene.physics.add.collider(this, scene.player);

        // Undefined, because the individual name is not linked to the created character
      
        //if(this.linkTitle){
          // Make character interactive so that he reacts to click events (makes it only interactive if link is added in the beginning)
          this.setInteractive();


          this.on('pointerover', () => { 

          // should be only added once
            scene.hoverText = scene.add.text(config.x - 100, config.y - 40, this.link, 
                                        {
                                          font: "10px monospace",
                                          fill: "#000000",
                                          padding: { x: 20, y: 10 },
                                          backgroundColor: "#ffffff"
                                        })
                                        .setScrollFactor(0)
                                        .setDepth(30);

          });

          this.on('pointerout', () => {
            scene.hoverText.setText('')
          });
       //}




        // If the dialogue is pushed to dialogue.js here it needs to be deleted at some point, probably at scene switch
        if(this.dialogue){ store.dispatch('dialogue/addDialogue', ['' + this.name + '', this.dialogue, 0]);}
        


        if(this.createdCharacter === false || this.createdCharacter === undefined){
        

      // Currently the dialogue is called from here
      // should just start here (call once)
      // If dialogue is untrue then call
      scene.physics.add.overlap(scene.player.sensorField, this, function(){
      
          // Calls only if dialogue is not already loaded (if character is able to move)
          if(scene.player.cursors.space.isDown && scene.player.isAllowedToMove){
              scene.player.actionCounter++
        
              if(scene.player.actionCounter === 1){
                // Could be useful for mapping player actions later on
                  scene.player.characterInteraction = [this.interaction, this.name]; 
                  console.log('Character Interaction ', scene.player.characterInteraction)
                  
                  if(this.interaction === 'dialogue'){ store.dispatch('dialogue/loadDialogue'); };
                  //Set timeout sets this to window!
                  setTimeout(function(){ scene.player.actionCounter = 0}, 1000);
        
      }}}, null, this);

      } else if (this.createdCharacter === true){
       // Add basic dialogue function to newly created NPC
       // store.dispatch('dialogue/addNPC', this.characterNumber); // NPC should have an individual id , replaced here by 100


        // if there is a link he directly changes the option to go to link
        if(this.link){
          store.dispatch('dialogue/createCharacterWithLink', [this.name, [1,1], this.link, ]);
        }

        // Add here the functions for player constructed NPC's
        scene.physics.add.overlap(scene.player.sensorField, this, 

          function(){
    
              // Calls only if dialogue is not already loaded (if character is able to move)
              if(scene.player.cursors.space.isDown && scene.player.isAllowedToMove){
                  scene.player.actionCounter++
            
                  if(scene.player.actionCounter === 1){
                    // Could be useful for mapping player actions later on
                      scene.player.characterInteraction = [this.interaction, this.name]; 
                  
                      if(this.interaction === 'dialogue'){ store.dispatch('dialogue/loadDialogue'); };
            
                      //Set timeout sets this to window!
                      setTimeout(function(){ scene.player.actionCounter = 0}, 1000);
          
          }}}, null, this);


      }
        scene.add.existing(this);

       // scene.characters.add(this); 

    } // End of constructor

 



 } // End of export