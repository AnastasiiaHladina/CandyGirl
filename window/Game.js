import * as PIXI from 'pixi.js'; 
import {GUI, GetGirlHealth, SetGirlHealth} from './GUI/ShowGUI.js';
import {hitRectangle} from './util/ContactOfTwoRectangles.js'; 
import * as Girl from './entity/girl/Girl.js';
import * as Jelly from './entity/jellyMonsters/jellyMonsters.js';
import {BG, MoveAll, setXGirl, getHeight, Tiling} from './bg/ShowBG.js'; 
let q = 0, c = 0, x, speed = 20;


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
            Girl.AnimateGirl(app, x * (-1), q); 
            MoveAll(speed * (-1));
            Jelly.MoveAllJelly(speed * (-1), Tiling);
        } 
        else if(isKeyDown('right')){
            q = 1 + c%20;
            c++;
            Girl.AnimateGirl(app, x, q); 
            MoveAll(speed);
            Jelly.MoveAllJelly(speed, Tiling);
        }
        else if(isKeyDown('0')){
            Girl.GirlAttack(app);
        }
    });
    window.addEventListener('keyup', function(e){
        clearKey(e.keyCode);
        if(isKeyUp('left')){
            Girl.AnimateGirl(app, 0, 0);   
        } 
        if(isKeyUp('right')){
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

    BG(app, 2);//First Level
    Girl.InitGirl(app, getHeight);
    Jelly.InitJelly(app, getHeight);
    GUI(app, Girl.GetCountCandy);
    keyboard(window, app);
    
    // добавляем функцию апдейт
    app.ticker.add(update);
}











