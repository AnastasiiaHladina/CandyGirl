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
let Animals = [], FreeCandy = [], DogAnimation = [], JellyTextureAtlas, CandyTextureAtlas, DogTextureAtlas, countJelly = 7;  
let vy, c = 0, z, currentX;  
let GirlWidth, GirlHeight, Dog;
let direction = -1;


const InitJelly = (_app,  _GirlWidth, _GirlHeight) => {
    app = _app;    
    JellyTextureAtlas = app.JellyTextureAtlas;
    CandyTextureAtlas = app.CandyTextureAtlas; 
    DogTextureAtlas = app.DogTextureAtlas;
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



  
    Dog = new Sprite(DogTextureAtlas["dogRun (1).png"]);
    Dog.scale.set(0.5, 0.5);    
    Dog.anchor.set(0.5, 0.5);
    vy = window.innerHeight - app.FloorHeight - (Dog.height/2) + 10;
    Dog.x = app.EndLevel/2;
    currentX =  app.EndLevel/2;
    console.log(app.EndLevel/2)
    Dog.y = vy;    
    app.stage.addChild(Dog);

}   

function gameLoop(delta) {
    for(let i = 0; i < Animals.length; i++) { 
        Animals[i].rotation += (delta / 8) * direction; 
        
        if(Math.abs(Animals[i].rotation) > (Math.PI / 2)){
            direction *= -1;
        }
    } 

    app.stage.removeChild(Dog);
    DogAnimation = [];
    let dogX = Dog.x;
    Dog = null; 

    let texture = Texture.fromFrame('dogRun (' + (1 + Math.floor(c++ / 8) % 8) + ').png');
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
    }
}

module.exports = { 
    InitJelly,
    MoveAllAnimals,
    GetAllAnimals,
    GetAllFreeCandy,
    GetDog
}