import * as PIXI from 'pixi.js';
import buttonHover from './util/buttonHover';

let GUI, ButtonStart, ButtonSettings;
let Container = PIXI.Container;
let Sprite = PIXI.Sprite;
let LevelContainer;

module.exports = (app, GUITextureAtlas, callback) => {
    LevelContainer = new Container();
        GUI = new Sprite(GUITextureAtlas["4.png"]);
        GUI.scale.set(0.5, 0.5);
        GUI.position.set((window.innerWidth/2) - (GUI.width/2), (window.innerHeight/2) - (GUI.height/2));
        app.stage.addChild(GUI);   
}