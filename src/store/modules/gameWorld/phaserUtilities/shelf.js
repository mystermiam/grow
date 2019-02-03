// Dialogue box version
// Create multiple options ( more than 3 )
// Add link 

// External version 
// Create Vue component (should exist already)
// >
//  >
//  >


export default class Shelf extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key); 
 		
 	    this.scene = config.scene;
        let scene = this.scene;
        
        //define further variables for this character
        for (let i=0;i<config.furtherVar.length;i++){
            this[config.furtherVar[i][0]] = config.furtherVar[i][1]
        }


        scene.physics.world.enable(this);

        this.setSize(this.size[0], this.size[1]);
        this.setDisplaySize(this.size[0], this.size[1]);
        this.setOffset(this.offSet[0],this.offSet[1]);
        this.setImmovable(true);



    
        config.scene.add.existing(this);



        scene.physics.add.collider(scene.player, this, function(){
    
          if(scene.player.cursors.space.isDown){
              scene.player.actionCounter++
        
              if(scene.player.actionCounter === 1){
                // Could be useful for mapping player actions later on
                  scene.player.characterInteraction = ['shelf' + this.shelfType, this.name]; 
                  alert("!")  };
                  //Set timeout sets this to window!
                  setTimeout(function(){ scene.player.actionCounter = 0}, 1000);
        
        }}, null, this);

    } // End of constructor


    updateFunction(time, delta) {
    	// call from scene
    }

    otherFunction(){

    }


 } // End of export