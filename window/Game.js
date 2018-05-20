import * as PIXI from 'pixi.js'; 
import {GUI, GetGirlHealth, SetGirlHealth} from './GUI/ShowGUI.js';
import {hitRectangle} from './util/ContactOfTwoRectangles.js'; 
import * as Girl from './entity/girl/Girl.js';
import {BG, MoveAll, setXGirl, getHeight} from './bg/ShowBG.js'; 
let q = 0, c = 0, x;


const keyboard = (window, app) => {
    window.addEventListener('keydown', function(e){
        x = Girl.WidthGirl();
        setKey(e.keyCode);
        if(isKeyDown('up') && isKeyDown('left')){
            Girl.AnimateGirl(app, -5); 
            MoveAll(-5);
        } 
        else if(isKeyDown('up') && isKeyDown('right')){
            Girl.AnimateGirl(app, 5); 
            MoveAll(5);
        } 
        else if(isKeyDown('up')){
           // Girl.AnimateGirl(app, 0, -20);  
           Girl.setJump(true);
        } 
        else if(isKeyDown('left')){
            q = 1 + c%20;
            c++;
            Girl.AnimateGirl(app, x * (-1), q); 
            MoveAll(-5);
        } 
        else if(isKeyDown('right')){
            q = 1 + c%20;
            c++;
            Girl.AnimateGirl(app, x, q); 
            MoveAll(5);
        }
        else if(isKeyDown('0')){ 
        }
    });
    window.addEventListener('keyup', function(e){
        clearKey(e.keyCode);
        if(isKeyDown('left')){
            Girl.AnimateGirl(app, x * (-1),0); 
            MoveAll(0);

            //setXGirl(Girl.PositionGirlByX());
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


module.exports = (app, GirlTextureAtlas, GUITextureAtlas, window) => {

    BG(app, 2);//First Level
    Girl.InitGirl(app, GirlTextureAtlas, getHeight);
    GUI(app, GUITextureAtlas);
    keyboard(window, app);
    
    // добавляем функцию апдейт
    app.ticker.add(update);
}











