import { Scene } from 'phaser'


// Triggering Vue instances
//import store from '../../../index'
//store.getters['moduleName/getterName']
//store.state.dialogue.showDialogueBox = true;
//store.dispatch('dialogue/getPosition');

// All need to be reimported from static, wrong here
import sky from '../assets/sky.png'
import bomb from '../assets/bomb.png'
import ground from '../assets/platform.png'
import star from '../assets/star.png'
import dude from '../assets/dude.png'

    var platforms,
        player = {
          allowedToJump: true
        },
        stars,
        cursors,
        bombs,
        score,
        scoreText,
        keys = {
          spaceBar: false,
          left: false,
          right: false,
        };

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
  }

  preload () {
    //PlayScene
    this.load.image('sky', sky)
    this.load.image('bomb', bomb)
    this.load.image('ground', ground)
    this.load.image('star', star)
    this.load.spritesheet('dude', dude, {frameWidth: 32, frameHeight: 48});
  }
  create ()
    {
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //  Register the keys. Works with one key! But not with two!
        //keys.left = this.input.keyboard.on(Phaser.Input.Keyboard.KeyCodes.A, function () {return true});
        keys.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keys.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keys.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //  Stop the following keys from propagating up to the browser
       // this.Phaser.Input.Keyboard.KeyCodes.addKeyCapture([ Phaser.Input.Keyboard.KeyCodes.LEFT, Phaser.Input.Keyboard.KeyCodes.RIGHT, Phaser.Input.Keyboard.KeyCodes.SPACE ]);

        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);

        this.physics.add.overlap(player, stars, this.collectStar, null, this);


        bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
  }

  
  update ()
    {

        // With one key it works? Why? 
        if (keys.left.isDown)
        {

            player.setVelocityX(-160);

            player.anims.play('left', true);

            // Works, makes player stop, but directly, could use
            //keys.left.isDown = false;
        }
        
        else if (keys.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {

            player.setVelocityX(0);

            player.anims.play('turn');
        }

       // The player might try to jump if the jump key has been released while standing on the ground
        if(!keys.up.isDown && player.body.touching.down){
           player.allowedToJump = true;
        }
        // The jump key is down, the body is on the ground and the player is allowed to jump => jump!
        if(keys.up.isDown && player.body.touching.down && player.allowedToJump){
           /* Insert jump code */
           player.setVelocityY(-330);
           player.allowedToJump = false;
        }
    }

    collectStar (player, star)
    {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0)
        {
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }
    }

   hitBomb (player, bomb)
    {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }
}
