import * as PIXI from 'pixi.js'; 
import {GUI, GetGirlHealth, SetGirlHealth, SetCountCandy, updateGUI} from './GUI/ShowGUI.js';
import {hitRectangle} from './util/ContactOfTwoRectangles.js'; 
import * as Girl from './entity/girl/Girl.js';
import * as Jelly from './entity/jellyMonsters/jellyMonsters.js';
import {BG, MoveAll, setXGirl, getHeight} from './bg/ShowBG.js'; 
import  * as Music from './music/Music'; 
let x, speed = 10, app;
let checkAudio = true, tempCount;
let keyDown = {};

const keyboard = (window, _app) => {

    window.addEventListener('keydown', function(e){
        app = _app;        
        setKey(e.keyCode);
        x = Girl.WidthGirl();
        if(isKeyDown('up')) { 
//            SetCountCandy( Girl.GetCountCandy() );
            Girl.setJump(true);

        } 
        if (isKeyDown('left')){ 
            if(checkAudio){
                checkAudio = false; 
                Music.Audio_Start(4);
                //SetGirlHealth(Girl.GetHealth());
            } 
            Girl.AnimateGirl(x * (-1)); 
            MoveAll(speed * (-1));
            Jelly.MoveAllAnimals(speed * (-1));
        } 
        else if(isKeyDown('right')){ 
            if(checkAudio) {
                checkAudio = false; 
                Music.Audio_Start(4);
                //SetGirlHealth(Girl.GetHealth());
            } 
            Girl.AnimateGirl(x); 
            MoveAll(speed);
            Jelly.MoveAllAnimals(speed);
        }
        if(isKeyDown('0')) {
            Music.Audio_Start_Stop(5);
            Girl.GirlAttack(); 
            //if(app.countCandy > 0){
            app.countCandy -= 1;
/*                tempCount = Girl.GetCountCandy() - 1;
                Girl.SetCountCandy( tempCount );
                SetCountCandy( tempCount );
*/
            //}
        }
    });
    window.addEventListener('keyup', function(e){
        clearKey(e.keyCode);
        if(isKeyUp('left')){
            if(!checkAudio){
                checkAudio = true;
                Music.Stop_One_Of_Audio(4);
            }
            Girl.AnimateGirl(0);   
        } 
        if(isKeyUp('right')){
            if(!checkAudio){
                checkAudio = true;
                Music.Stop_One_Of_Audio(4);
            }
            Girl.AnimateGirl(0);
        } 
    });
}

function update(delta) {
    Girl.updateGirl(delta);
    updateGUI(delta);
}

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

 

module.exports = (app, window) => {
    Music.Audio_Start(1);    
    BG(app, 2);//First Level
    Jelly.InitJelly(app,  Girl.WidthGirl,  Girl.HeightGirl);
    Girl.InitGirl(app, Jelly.GetAllAnimals(), Jelly.GetAllFreeCandy());
    GUI(app)
//        , Girl.GetCountCandy);
    //Girl.SetHealth(GetGirlHealth());    
    keyboard(window, app); 
    // добавляем функцию апдейт
    app.ticker.add(update);
}


