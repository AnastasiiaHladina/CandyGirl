import * as PIXI from 'pixi.js'; 
 
let Sprite = PIXI.Sprite; 
let Loader = PIXI.loader;
let TilingSprite = PIXI.extras.TilingSprite;
let BGTextureAtlas, Bg, Floor; 
let elements = []; 

const gameLoop = (delta)=>{
    elements.forEach((el)=>{
        el.rotation += 0.01;
    })
}
const BG = (app, scene) => {
    if(scene === 1){
        BGTextureAtlas = new Sprite(
            Loader.resources["images/material/GUI/main/all/BG.png"].texture
        ); 
        for(let x = 0; x < 6; x++){
            console.log("images/material/GUI/main/all/"+ (x + 12) +".png");
            elements[x] = new Sprite(
                Loader.resources["images/material/GUI/main/all/"+ (x + 12) +".png"].texture
            );
            
            elements[x].scale.set(0.5, 0.5);
            elements[x].anchor.set(0.5, 0.5);
        } 
        elements[0].position.set(200, 250);//звезда

        elements[1].position.set(1200, 100);//плюсик

        elements[2].position.set(1100, 500);//кубок

        elements[3].position.set(100, 500);//домик

        elements[4].position.set(500, 100);//сердце

        elements[5].position.set(700, 550);//умножение

        app.stage.addChild(BGTextureAtlas, elements[0], elements[1], elements[2], elements[3], elements[4], elements[5]); 
        app.ticker.add(delta => gameLoop(delta));
    }
    if(scene === 2){
        BGTextureAtlas = Loader.resources["images/material/forest/spriteForest.json"].textures; 
        Floor = new TilingSprite(BGTextureAtlas["2.png"]);
        Floor.width = window.innerWidth;
        Floor.y = window.innerHeight - Floor.height; 
        Bg = new Sprite(BGTextureAtlas["BG.png"]);
        Bg.scale.set(1.4, 1);
        app.stage.addChild(Bg, Floor);
    }
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

module.exports = {
    BG, gameLoop, getX, getY, getWidth, getHeight 
}