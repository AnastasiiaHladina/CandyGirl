import * as PIXI from 'pixi.js'; 
import {GUI, GetGirlHealth, SetGirlHealth} from './GUI/ShowGUI.js';
import {hitRectangle} from './util/ContactOfTwoRectangles.js'; 
import * as Girl from './entity/girl/Girl.js';
import * as Jelly from './entity/jellyMonsters/jellyMonsters.js';
import {BG, MoveAll, setXGirl, getHeight, Tiling} from './bg/ShowBG.js'; 
import  * as Music from './music/Music'; 
let q = 0, c = 0, x, speed = 10;
let checkAudio = true, checkA = true;

const keyboard = (window, app) => {
    window.addEventListener('keydown', function(e){
        x = Girl.WidthGirl();
        setKey(e.keyCode);
        if(isKeyDown('up') && isKeyDown('left')){
            Girl.AnimateGirl(app, -5); 
            MoveAll(speed * (-1));
            Jelly.MoveAllJelly(speed * (-1), Tiling);
        } 
        else if(isKeyDown('up') && isKeyDown('right')){
            Girl.AnimateGirl(app, 5); 
            MoveAll(speed);
            Jelly.MoveAllJelly(speed, Tiling);
        } 
        else if(isKeyDown('up')){ 
           Girl.setJump(true);
        } 
        else if(isKeyDown('left')){
            q = 1 + c%20;
            c++;
            if(checkAudio){
                checkAudio = false;
                if(checkA && !app.FirstLevel.includes('effect/ShortRun.mp3')){
                    app.FirstLevel.push('effect/ShortRun.mp3');
                    checkA = false;
                }
                Music.Audio_Stop();
                Music.Audio_Start(app.FirstLevel);
            } 
            Girl.AnimateGirl(app, x * (-1), q); 
            MoveAll(speed * (-1));
            Jelly.MoveAllJelly(speed * (-1), Tiling);
        } 
        else if(isKeyDown('right')){
            q = 1 + c%20;
            c++;
            if(checkAudio){
                checkAudio = false;
                if(checkA && !app.FirstLevel.includes('effect/ShortRun.mp3')){
                    app.FirstLevel.push('effect/ShortRun.mp3');
                    checkA = false;
                }
                Music.Audio_Stop();
                Music.Audio_Start(app.FirstLevel);
            } 
            Girl.AnimateGirl(app, x, q); 
            MoveAll(speed);
            Jelly.MoveAllJelly(speed, Tiling);
        }
        else if(isKeyDown('0')){
            Music.Audio_Start_Stop('effect/ShortQuit.mp3');
            Girl.GirlAttack(app);
        }
    });
    window.addEventListener('keyup', function(e){
        clearKey(e.keyCode);
        if(isKeyUp('left')){
            if(!checkAudio){
                checkAudio = true;
                Music.Stop_One_Of_Audio(1);
            }
            Girl.AnimateGirl(app, 0, 0);   
        } 
        if(isKeyUp('right')){
            if(!checkAudio){
                checkAudio = true;
                Music.Stop_One_Of_Audio(1);
            }
            Girl.AnimateGirl(app, 0, 0);
        } 
    });
}

function update(delta) {
    Girl.updateGirl(delta);
}

let keys = {
    'left' : 37,    
    'up'   : 38,
    'right': 39,
    'down' : 40,
    '0'    : 96
}; 
let keyDown = {};

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


module.exports = (app, window) => {
    app.FirstLevel = ['effect/forest.mp3'];
    Music.Audio_Start(app.FirstLevel);
    BG(app, 2);//First Level
    Girl.InitGirl(app, getHeight);
    Jelly.InitJelly(app, getHeight);
    GUI(app, Girl.GetCountCandy);
    keyboard(window, app);
    
    // добавляем функцию апдейт
    app.ticker.add(update);
}











