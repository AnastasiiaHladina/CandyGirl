import * as PIXI from 'pixi.js'; 
import {hitRectangle} from '../../util/ContactOfTwoRectangles.js';  
import {randomInteger, randomFloat} from '../../util/Random';    

let Ticker = PIXI.ticker;
let Sprite = PIXI.Sprite; 
let Texture =  PIXI.Texture;
let Loader = PIXI.loader;
let Extras = PIXI.extras;
let TilingSprite = PIXI.extras.TilingSprite;
let app;
let Animals = [], FreeCandy = [], JellyTextureAtlas, CandyTextureAtlas, countJelly = 7;  
let vy, c = 0, z;  
let GirlWidth, GirlHeight

const InitJelly = (_app,  _GirlWidth, _GirlHeight) => {
    app = _app;    
    JellyTextureAtlas = app.JellyTextureAtlas;
    CandyTextureAtlas = app.CandyTextureAtlas; 
    GirlWidth = _GirlWidth;
    GirlHeight = _GirlHeight;

    for(let i = 0; i < countJelly; i++){  
        Animals[i] = new Sprite(JellyTextureAtlas["Animal "+ (i + 1) +".png"]); 
        Animals[i].x = randomInteger(500, app.EndLevel);
        Animals[i].scale.set(0.4, 0.4);
        Animals[i].y = window.innerHeight - app.FloorHeight - Animals[i].height/3; 
        Animals[i].anchor.set(0.5, 0.5); 
    }
    for(let i = 0; i < 10; i++){
        FreeCandy[i] = new Sprite(CandyTextureAtlas[randomInteger(1, 5)+".png"]);
        FreeCandy[i].x = randomInteger(500, app.EndLevel);
        FreeCandy[i].scale.set(0.4, 0.4);
        FreeCandy[i].y = window.innerHeight - app.FloorHeight * 3.5; 
        FreeCandy[i].anchor.set(0.5, 0.5); 
    }
    app.stage.addChild(...Animals, ...FreeCandy); 
    app.ticker.add(delta => gameLoop(delta));
}   

let direction = -1;
function gameLoop(delta){
    for(let i = 0; i < Animals.length; i++){ 
        Animals[i].rotation += (delta / 8) * direction; 
        
        if(Math.abs(Animals[i].rotation) > (Math.PI / 2)){
            direction *= -1;
        }
    } 
}

const GetAllAnimals = () =>{
    return Animals;
}
const GetAllFreeCandy = () =>{
    return FreeCandy;
}

const AnimalDead = (el) =>{
    app.stage.removeChild(el);
}

const MoveAllAnimals = (x) => {
    if(app.Tiling){
        for(let i = 0; i < Animals.length; i++){
            Animals[i].x -= x; 
        }  
        for(let i = 0; i < FreeCandy.length; i++){
            FreeCandy[i].x -= x; 
        }         
    }
}

module.exports = { 
    InitJelly,
    MoveAllAnimals,
    GetAllAnimals,
    GetAllFreeCandy
}