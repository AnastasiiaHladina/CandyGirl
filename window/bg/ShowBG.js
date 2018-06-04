import * as PIXI from 'pixi.js';  
import {randomInteger, randomFloat} from '../util/Random';    

let Sprite = PIXI.Sprite; 
let Loader = PIXI.loader;
let TilingSprite = PIXI.extras.TilingSprite;
let BGTextureAtlas, Bg, Floor, EndLevel, Scale, TilingNo;
let elements = [],
    Bush = [],
    Tree = [],
    Rock = [];
let countBush = 32, countTree = 24, countRock = 24 ;  



const gameLoop = (delta) => {
    elements.forEach((el)=>{
        el.rotation += 0.01;
    });
}
const BG = (app, scene) => { 
    EndLevel = app.EndLevel;
    if(scene === 1){
        ShowMainScreen(app);
    }
    if(scene === 2){
        ShowFirstLevel(app);
    }
} 

function MoveAll(x){  
    if((Floor.tilePosition.x - x) < 0 && ((Floor.tilePosition.x * -1) + window.innerWidth/2) < EndLevel){ 
        //<0 потому, ччто мы делаем отнимание и там всегда отриц.ч.
        TilingNo = true;
        for(let i = 0; i < countTree; i++){
            Tree[i].x -= x; 
        }
        for(let i = 0; i < countBush; i++){
            Bush[i].x -= x;
        }
        for(let i = 0; i < countRock; i++){
            Rock[i].x -= x;
        }
        Floor.tilePosition.x -=x;
        Bg.tilePosition.x -=2;
        //console.log(Floor.tilePosition.x * -1, EndLevel);
    }else{
        TilingNo = false;
    }
} 

function ShowFirstLevel(app){ 
    BGTextureAtlas = app.ForestTextureAtlas; 

    Floor = new TilingSprite(BGTextureAtlas["2.png"]);
    Floor.width = window.innerWidth;
    Floor.y = window.innerHeight - Floor.height; 

    Bg = new TilingSprite(BGTextureAtlas["BG.png"]);
    Bg.width = window.innerWidth;
    Bg.height = window.innerHeight;
    
   
    for(let i = 0; i < countTree; i++){ 
        Scale = randomFloat(0.4, 1);
        Tree[i] = new Sprite(BGTextureAtlas["Tree_"+ randomInteger(2, 3) +".png"]);
        Tree[i].x = randomInteger(0, app.EndLevel);
        Tree[i].scale.set(Scale, Scale);        
        Tree[i].y = window.innerHeight - Floor.height - (Tree[i].height); 
    }
    for(let i = 0; i < countBush; i++){
        Scale = randomFloat(0.5, 1);
        Bush[i] = new Sprite(BGTextureAtlas["Bush ("+ randomInteger(1, 4) +").png"]);
        Bush[i].x = randomInteger(0, app.EndLevel);
        Bush[i].scale.set(Scale, Scale);         
        Bush[i].y = window.innerHeight - Floor.height - (Bush[i].height/2); 
        Bush[i].anchor.set(0.5, 0.5);  
    }     
    for(let i = 0; i < countRock; i++){
        Scale = randomFloat(0.3, 1);
        Rock[i] = new Sprite(BGTextureAtlas["Stone.png"]);
        Rock[i].x = randomInteger(0, app.EndLevel);
        Rock[i].scale.set(Scale, Scale);
        Rock[i].y = window.innerHeight - Floor.height - (Rock[i].height/2) + 1; 
        Rock[i].anchor.set(0.5, 0.5); 
    }    
    
    app.stage.addChild(Bg, Floor);
    app.stage.addChild(...Rock, ...Tree, ...Bush); 
}


function ShowMainScreen(app){
    BGTextureAtlas = new Sprite(
        Loader.resources["images/material/GUI/main/all/BG.png"].texture
    ); 
    for(let x = 0; x < 6; x++){
        let temp = x + 12; 
        elements[x] = new Sprite(app.FiguresTextureAtlas[temp + ".png"]);  
        
        elements[x].scale.set(0.5, 0.5);
        elements[x].anchor.set(0.5, 0.5);
    } 
    elements[0].position.set(200, 250);//звезда

    elements[1].position.set(1200, 100);//плюсик

    elements[2].position.set(1100, 500);//кубок

    elements[3].position.set(100, 500);//домик

    elements[4].position.set(500, 100);//сердце

    elements[5].position.set(700, 550);//умножение

    app.stage.addChild(BGTextureAtlas, ...elements);
    app.ticker.add(delta => gameLoop(delta));
}
function setXGirl(x){
    //GirlX = x;
    //console.log(GirlX)
}
const getX = () => {
    return Floor.x;
}
const getY = () => {
    return Floor.y;
}
const getWidth = () => {
    return Floor.width;
}
const getHeight = () => {
    return Floor.height;
}
const Tiling = () => {
    return TilingNo;
}

module.exports = {
    BG, gameLoop, getX, getY, getWidth, getHeight, MoveAll, setXGirl, Tiling
}