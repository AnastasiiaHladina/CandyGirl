import * as PIXI from 'pixi.js'; 
import {GUI, GetGirlHealth, SetGirlHealth, SetCountCandy, updateGUI} from './GUI/ShowGUI.js';
import {hitRectangle} from './util/ContactOfTwoRectangles.js'; 
import * as Girl from './entity/girl/Girl.js';
import * as Jelly from './entity/jellyMonsters/jellyMonsters.js';
import {BG, MoveAll, setXGirl, getHeight} from './bg/ShowBG.js'; 
import  * as Music from './music/Music'; 
let x, speed = 0, app;
let checkAudio = true, tempCount;


const keyboard = (window) => {

    window.addEventListener('keydown', function(e){
        setKey(e.keyCode);
        x = Girl.WidthGirl();
        if(isKeyDown('up')) { 
            Girl.setJump(true);
        } 
        if (isKeyDown('left')){ 
            if(checkAudio){
                checkAudio = false; 
                Music.Audio_Start(4);
            } 
            Girl.AnimateGirl(x * (-1));
            speed = -5;
            
        } 
        else if(isKeyDown('right')){
            if(checkAudio) {
                checkAudio = false; 
                Music.Audio_Start(4);
            } 
            Girl.AnimateGirl(x); 
            speed = 5; 
            console.log("Right")
        }
        if(isKeyDown('0')) { 
            Music.Audio_Start_Stop(5);
            Girl.GirlAttack(); 
        }
    });
    window.addEventListener('keyup', function(e){
        clearKey(e.keyCode);
        if(isKeyUp('left')){
            if(!checkAudio){
                checkAudio = true;
                Music.Stop_One_Of_Audio(4);
            }
            speed = 0;
            Girl.AnimateGirl(0);   
        } 
        if(isKeyUp('right')){
            if(!checkAudio){
                checkAudio = true;
                Music.Stop_One_Of_Audio(4);
            }
            speed = 0;
            Girl.AnimateGirl(0);
        } 
    });
}

function update(delta) {
    MoveAll(speed, delta);
    Jelly.MoveAllAnimals(speed, delta);
    if(speed > 0){
        Girl.AnimateGirl(delta); 
    } else if(speed < 0){
        Girl.AnimateGirl(-delta);
    } else {
        Girl.AnimateGirl(speed);
    }
    
    Girl.updateGirl(delta);
    updateGUI(delta);
}

let keyDown = {};
let keys = {
    'left' : 37,    
    'up'   : 38,
    'right': 39,
    'down' : 40,
    '0'    : 96
}; 
function setKey(keyCode){
    keyDown[keyCode] = true;
}

function isKeyDown(keyName){
    return keyDown[keys[keyName]] == true;
}

function clearKey(keyCode){
    keyDown[keyCode] = false;
}

function isKeyUp(keyName){
    return keyDown[keys[keyName]] == false;
}

 

module.exports = (_app, window) => {
    app = _app;        
    Music.Audio_Start(1);    
    BG(app);//First Level
    Jelly.InitJelly(app,  Girl.WidthGirl,  Girl.HeightGirl);
    Girl.InitGirl(app, Jelly.GetAllAnimals(), Jelly.GetAllFreeCandy());
    GUI(app);
    keyboard(window); 
    // добавляем функцию апдейт
    app.ticker.add(update);
}


