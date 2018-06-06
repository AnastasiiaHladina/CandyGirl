import * as PIXI from 'pixi.js';
import * as buttonAction from './util/buttonHover';

let GUI, ButtonStart, ButtonSettings;
let Container = PIXI.Container;
let Sprite = PIXI.Sprite;
let StartContainer;

module.exports = (app, callback) => {
    app.stage.removeChild(StartContainer);
    StartContainer = new Container();
    
    GUI = new Sprite(app.GUITextureAtlas["0.png"]);
    GUI.scale.set(0.5, 0.5);
    GUI.position.set((window.innerWidth/2) - (GUI.width/2), (window.innerHeight/2) - (GUI.height/2));

    ButtonStart = new Sprite(app.GUITextureAtlas["30.png"]);//Button Start
    ButtonStart.scale.set(0.4, 0.4);
    ButtonStart.position.set((window.innerWidth/2) - (ButtonStart.width/2), (window.innerHeight/2) - (ButtonStart.height));

    ButtonSettings = new Sprite(app.GUITextureAtlas["19.png"]);//Button Settings
    ButtonSettings.scale.set(0.4, 0.4);
    ButtonSettings.position.set((window.innerWidth/2) - (ButtonSettings.width/2), (window.innerHeight/2) + (ButtonSettings.height/3));
    
    //buttonHover(ButtonStart);
    //buttonHover(ButtonSettings);

    ButtonStart.mouseover = function() { 
        buttonAction.Over(this);
    }
    ButtonStart.mouseout = function() {
        buttonAction.Out(this);
    }

    ButtonSettings.mouseover = function() {
        buttonAction.Over(this);
    }
    ButtonSettings.mouseout = function() {
        buttonAction.Out(this);
    }

    ButtonStart.buttonMode = ButtonStart.interactive = true;
    ButtonSettings.buttonMode = ButtonSettings.interactive = true;    

    ButtonStart.on("click", function(){ //Play
        callback(4);
    })
    
    ButtonSettings.on("click", function(){  //Settings
        callback(2);
    }) 

    StartContainer.addChild(GUI, ButtonStart, ButtonSettings);
    app.stage.addChild(StartContainer); 
}

function mouse(){

}