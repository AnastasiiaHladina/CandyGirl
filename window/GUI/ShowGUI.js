import * as PIXI from 'pixi.js';   

let Sprite = PIXI.Sprite; 
let Loader = PIXI.loader;
let Graphics = PIXI.Graphics;
let Container = PIXI.Container;
let Text = PIXI.Text;
let TextStyle = PIXI.TextStyle;
let TilingSprite = PIXI.extras.TilingSprite;
let guiCandy, guiHealth, rectHealth, GirlHealth, Plus, Candy;
let GUIContainer, HealthContainer, CandyContainer, GUITextureAtlas;
let style = new TextStyle({
    fontFamily: "Buxton Sketch",
    fontSize: 26,
    fill: "white",
    stroke: '#f96d4a',
    strokeThickness: 4,
    dropShadow: false, 
});


const gameLoop = (delta)=>{
    elements.forEach((el)=>{
        el.rotation += 0.01;
    })
}
const GUI = (app) => {
    GUITextureAtlas = app.GUITextureAtlas;
    guiCandy = new Sprite(GUITextureAtlas['2.png']);
    guiCandy.x = window.innerWidth/10;
    guiCandy.y = 0;
    guiCandy.scale.set(0.5, 0.5);

    guiHealth = new Sprite(GUITextureAtlas['2.png']);
    guiHealth.x = window.innerWidth/3;
    guiHealth.y = 0;
    guiHealth.scale.set(0.5, 0.5);

    GirlHealth = guiHealth.width/1.2 - 13;

    rectHealth = new Graphics();  
    rectHealth.beginFill(0x1df26b);
    rectHealth.drawRoundedRect((guiHealth.x + guiHealth.width/6), (guiHealth.y + guiHealth.height/6), GirlHealth, guiHealth.height/2, 5);
    rectHealth.endFill(); 

    Plus = new Sprite(GUITextureAtlas['5.png']);
    Plus.x = guiHealth.x + 5;
    Plus.y = 7;
    Plus.scale.set(0.2, 0.2);

    Candy = new Sprite(
        Loader.resources["images/material/attack/allCandy/3.png"].texture
    );
    Candy.x = guiCandy.x + 5;
    Candy.y = 7;
    Candy.scale.set(0.2, 0.2);

    let countCandy = new Text("0", style);
    countCandy.x = guiCandy.x + guiCandy.width/2;
    countCandy.y = 5;

    GUIContainer = new Container();
    HealthContainer = new Container();
    CandyContainer = new Container();

    HealthContainer.addChild(guiHealth, Plus, rectHealth);
    CandyContainer.addChild(guiCandy, Candy, countCandy);
    GUIContainer.addChild(HealthContainer, CandyContainer);

    app.stage.addChild(GUIContainer);
}
 
const GetGirlHealth = () => {
    return GirlHealth;
}

const SetGirlHealth = (newGirlHealth) => {
    GirlHealth = newGirlHealth;
}

module.exports = {
    GUI, gameLoop, GetGirlHealth, SetGirlHealth
}