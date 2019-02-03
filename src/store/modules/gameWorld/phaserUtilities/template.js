export default class Template extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
    	// create this.template = new Template() with config in the scene that uses the character
        super(config.scene, config.x, config.y, config.key); 
 		
 	    this.scene = config.scene;
        let scene = this.scene;
        
        this.variable = 0;



        scene.physics.world.enable(this);
    
        config.scene.add.existing(this);
    } // End of constructor


    updateFunction(time, delta) {
    	// call from scene
    }

    otherFunction(){

    }


 } // End of export