import * as PIXI from 'pixi.js'; 
import {hitRectangle} from '../../util/ContactOfTwoRectangles.js';  
import {randomInteger, randomFloat} from '../../util/Random';    

let Ticker = PIXI.ticker;
let Sprite = PIXI.Sprite; 
let Texture =  PIXI.Texture;
let Loader = PIXI.loader;
let Extras = PIXI.extras;
let TilingSprite = PIXI.extras.TilingSprite;
let Jelly = [], JellyTextureAtlas, Jell, countJelly = 12;  
let vy, c = 0, z, Tiling;  


const InitJelly = (app, getHeight, _Tiling) => {
    /*
    Jell = new Sprite(JellyTextureAtlas["Jelly (1).png"]);
    Jell.scale.set(0.5, 0.5);    
    Jell.anchor.set(0.5, 0.5);    
    Jell.x = 100; 
    Jell.y = window.innerHeight - getHeight() - (Jell.height/2);
    app.stage.addChild(Jell);*/
    JellyTextureAtlas = app.JellyTextureAtlas;
    Tiling = _Tiling;

    for(let i = 0; i < countJelly; i++){ 
        z = 1 + c%6;
        c++;
        Jelly[i] = new Sprite(JellyTextureAtlas["Jelly ("+ z +").png"]); 
        Jelly[i].x = randomInteger(100, app.EndLevel);
        Jelly[i].scale.set(0.3, 0.3);
        Jelly[i].y = window.innerHeight - getHeight() - Jelly[i].height/3; 
        Jelly[i].anchor.set(0.5, 0.5); 
    }    
    app.stage.addChild(...Jelly); 
    
}   

const SetPositionJelly = () => {

}

const GetPositionJelly = () => {
    
}

const MoveAllJelly = (x) => {
//    if(Tiling){
        for(let i = 0; i < countJelly; i++){
            Jelly[i].x -= x; 
        }        
//    }

}

module.exports = { 
    InitJelly,
    GetPositionJelly,
    MoveAllJelly
}