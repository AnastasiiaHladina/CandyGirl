import * as PIXI from 'pixi.js'; 
import {hitRectangle} from '../../util/ContactOfTwoRectangles.js';  
import {randomInteger, randomFloat} from '../../util/Random';    

let Ticker = PIXI.ticker;
let Sprite = PIXI.Sprite; 
let Texture =  PIXI.Texture;
let Loader = PIXI.loader;
let Extras = PIXI.extras;
let TilingSprite = PIXI.extras.TilingSprite;
let TextureCache = PIXI.utils.TextureCache;
let Container = PIXI.Container;
let app;
let Animals = [], FreeCandy = [], DogAnimation = [], JellyTextureAtlas, CandyTextureAtlas, DogTextureAtlas, countJelly = 7;  
let vy, c = 0, z, currentX;  
let GirlWidth, GirlHeight, GirlX, Dog, Dialog, DogContainer;
let direction = -1;


const InitJelly = (_app,  _GirlWidth, _GirlHeight, _GirlX) => {
    app = _app;    
    JellyTextureAtlas = app.JellyTextureAtlas;
    CandyTextureAtlas = app.CandyTextureAtlas; 
    DogTextureAtlas = app.DogTextureAtlas;
    GirlWidth = _GirlWidth;
    GirlHeight = _GirlHeight;
    GirlX = _GirlX;
    DogContainer = new Container();

    for(let i = 0; i < countJelly; i++){  
        Animals[i] = new Sprite(JellyTextureAtlas["Animal "+ (i + 1) +".png"]); 
        Animals[i].x = randomInteger(500, app.EndLevel);
        Animals[i].scale.set(0.4, 0.4);
        Animals[i].y = window.innerHeight - app.FloorHeight - Animals[i].height/3; 
        Animals[i].anchor.set(0.5, 0.5); 
    }
    for(let i = 0; i < 20; i++){
        FreeCandy[i] = new Sprite(CandyTextureAtlas[randomInteger(1, 5)+".png"]);
        FreeCandy[i].x = randomInteger(500, app.EndLevel);
        FreeCandy[i].scale.set(0.4, 0.4);
        FreeCandy[i].y = window.innerHeight - app.FloorHeight * 2.5; 
        FreeCandy[i].anchor.set(0.5, 0.5); 
    }
    app.stage.addChild(...Animals, ...FreeCandy);  
    app.ticker.add(delta => gameLoop(delta));



  
    Dog = new Sprite(DogTextureAtlas["dogIdle (1).png"]);
    Dog.scale.set(0.5, 0.5);    
    Dog.anchor.set(0.5, 0.5);
    vy = window.innerHeight - app.FloorHeight - (Dog.height/2) + 10;
    //Dog.x = app.EndLevel - Dog.width * 2;
    Dog.x = 500;
    currentX =  app.EndLevel/2;
    console.log(app.EndLevel, app.EndLevel - Dog.width * 2, app.EndLevel - Dog.width)
    Dog.y = vy;    

    let t = TextureCache["images/material/other/ob.png"];
    Dialog = new PIXI.Sprite(t); 
    Dialog.scale.set(0.4, 0.4);    
    Dialog.anchor.set(0.5, 0.5);
    Dialog.x = Dog.x - 100;
    Dialog.y = Dog.y - Dog.height/2;     
    app.stage.addChild(Dialog, Dog);

}   

function gameLoop(delta) {
    for(let i = 0; i < Animals.length; i++) { 
        Animals[i].rotation += (delta / 18); 
        
        if(Math.abs(Animals[i].rotation) > (Math.PI / 2)){
            direction *= -1;
        }
    } 

    app.stage.removeChild(Dog);
    DogAnimation = [];
    let dogX = Dog.x;
    Dog = null; 

    let texture = Texture.fromFrame('dogIdle (' + (1 + Math.floor(c++ / 8) % 10) + ').png');
    DogAnimation.push(texture);
    Dog = new Extras.AnimatedSprite(DogAnimation);

    Dog.scale.set(0.5, 0.5); 
    Dog.anchor.set(0.5, 0.5);
    Dog.x = dogX;
    Dog.y = vy;

    app.stage.addChild(Dog);
}

const GetAllAnimals = () => {
    return Animals;
}

const GetAllFreeCandy = () => {
    return FreeCandy;
}

const GetDog = () => {
    return Dog;
}

const AnimalDead = (el) => {
    app.stage.removeChild(el);
}

const MoveAllAnimals = (x, delta) => {
    if(app.Tiling) {
        for(let i = 0; i < Animals.length; i++){
            Animals[i].x -= x * delta;
        }
        for(let i = 0; i < FreeCandy.length; i++){
            FreeCandy[i].x -= x * delta;
        }
        Dog.x -= x * delta;
        Dialog.x -= x * delta;
    }
}

module.exports = { 
    InitJelly,
    MoveAllAnimals,
    GetAllAnimals,
    GetAllFreeCandy,
    GetDog
}