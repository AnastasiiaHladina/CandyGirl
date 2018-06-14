import * as PIXI from 'pixi.js';
import buttonHover from './util/buttonHover';
import SetLevel from './SetLevel';
import  * as Music from './music/Music';

let GUI;
let Container = PIXI.Container;
let Sprite = PIXI.Sprite;
let SettingsContainer;
let ButtonSettingsHome, ButtonSettingsSound, ButtonSettingsMusic, ButtonSettingsOk;

module.exports = (app, callback) => {
    app.stage.removeChild(SettingsContainer); 
    SettingsContainer = new Container();
    app.Sound = true;
    app.Music = true;
    GUI = new Sprite(app.GUITextureAtlas["11.png"]);
    GUI.scale.set(0.5, 0.5);
    GUI.position.set((window.innerWidth/2) - (GUI.width/2), (window.innerHeight/2) - (GUI.height/2));

    ButtonSettingsHome = new Sprite(app.GUITextureAtlas["29.png"]);//Button Home
    ButtonSettingsHome.scale.set(0.4, 0.4);
    ButtonSettingsHome.position.set((window.innerWidth/2) - (ButtonSettingsHome.width * 2.5), (window.innerHeight/2) - (ButtonSettingsHome.height / 2));

    ButtonSettingsSound = new Sprite(app.GUITextureAtlas["24.1.png"]);//Button Sound
    ButtonSettingsSound.scale.set(0.4, 0.4);
    ButtonSettingsSound.position.set((window.innerWidth/2) - (ButtonSettingsSound.width * 1.25), (window.innerHeight/2) - (ButtonSettingsSound.height /2));

    ButtonSettingsMusic = new Sprite(app.GUITextureAtlas["25.1.png"]);//Button Music
    ButtonSettingsMusic.scale.set(0.4, 0.4);
    ButtonSettingsMusic.position.set((window.innerWidth/2) + (ButtonSettingsMusic.width * 0.1), (window.innerHeight/2) - (ButtonSettingsMusic.height /2));

    ButtonSettingsOk = new Sprite(app.GUITextureAtlas["31.png"]);//Button Ok
    ButtonSettingsOk.scale.set(0.4, 0.4);
    ButtonSettingsOk.position.set((window.innerWidth/2) + (ButtonSettingsOk.width * 1.25), (window.innerHeight/2) - (ButtonSettingsOk.height / 2));
 
    ButtonSettingsHome.buttonMode = ButtonSettingsHome.interactive = true;   
    ButtonSettingsSound.buttonMode = ButtonSettingsSound.interactive = true;   
    ButtonSettingsMusic.buttonMode = ButtonSettingsMusic.interactive = true;   
    ButtonSettingsOk.buttonMode = ButtonSettingsOk.interactive = true;   

    ButtonSettingsHome.on("click", function(){
        callback(3);
    })

    ButtonSettingsSound.on("click", function(){ 
        app.Sound = false; 
        alert('Музыка выклюлены')
        Music.Audio_Stop();
    })

    ButtonSettingsMusic.on("click", function(){ 
        app.Music = false;
        alert('Звуковые эфекты выклюлены')
        Music.Audio_Stop();
    })

    ButtonSettingsOk.on("click", function(){  
        app.stage.removeChild(SettingsContainer); 
        callback(1);
    })

    SettingsContainer.addChild(GUI, ButtonSettingsHome, ButtonSettingsSound, ButtonSettingsMusic, ButtonSettingsOk);
    app.stage.addChild(SettingsContainer);  
}