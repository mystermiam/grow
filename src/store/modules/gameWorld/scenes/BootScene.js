import { Scene } from 'phaser'
import BaseScene from './BaseScene';

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    //Comes from ES6 / Phaser / Webpack example
    //this.load.setBaseURL('./assets/');
    //this.load.json('assets');
  }

  create () {
    this.scene.start('Bedroom')
  }
}

