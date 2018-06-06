import * as PIXI from 'pixi.js';   

let Sprite = PIXI.Sprite; 
let Loader = PIXI.loader;
let Graphics = PIXI.Graphics;
let Container = PIXI.Container;
let Text = PIXI.Text;
let TextStyle = PIXI.TextStyle;
let TilingSprite = PIXI.extras.TilingSprite;
let guiCandy, guiHealth, rectHealth, GirlHealth, Plus, Candy, CountCandy;
let GUIContainer, HealthContainer, CandyContainer, GUITextureAtlas;
let app, TextcountCandy;
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
const GUI = (_app) => { 
    app = _app;
    GUITextureAtlas = app.GUITextureAtlas;
    CountCandy = app.countCandy;
    guiCandy = new Sprite(GUITextureAtlas['2.png']);
    guiCandy.x = window.innerWidth/10;
    guiCandy.y = 0;
    guiCandy.scale.set(0.5, 0.5);

    guiHealth = new Sprite(GUITextureAtlas['2.png']);
    guiHealth.x = window.innerWidth/3;
    guiHealth.y = 0;
    guiHealth.scale.set(0.5, 0.5);

    GirlHealth = guiHealth.width/1.2 - 13;
    app.Health = GirlHealth;
    
    rectHealth = new Graphics();  
    rectHealth.beginFill(0x1df26b);
    rectHealth.drawRoundedRect((guiHealth.x + guiHealth.width/6), (guiHealth.y + guiHealth.height/6), GirlHealth, guiHealth.height/2, 5);
    rectHealth.endFill(); 

    Plus = new Sprite(GUITextureAtlas['5.png']);
    Plus.x = guiHealth.x + 5;
    Plus.y = 7;
    Plus.scale.set(0.2, 0.2); 

    Candy = new Sprite(app.CandyTextureAtlas["3.png"]);  
    Candy.x = guiCandy.x + 5;
    Candy.y = 7;
    Candy.scale.set(0.2, 0.2);

    TextcountCandy = new Text(CountCandy, style);
    TextcountCandy.x = guiCandy.x + guiCandy.width/2;
    TextcountCandy.y = 5;

    GUIContainer = new Container();
    HealthContainer = new Container();
    CandyContainer = new Container();

    HealthContainer.addChild(guiHealth, Plus);
    CandyContainer.addChild(guiCandy, Candy);
    GUIContainer.addChild(HealthContainer, CandyContainer);

    app.stage.addChild(GUIContainer);
    app.stage.addChild(TextcountCandy, rectHealth);
}
 
const updateGUI = (delta) =>{ 
    if(app.Health >= -1){
        app.stage.removeChild(rectHealth);
        rectHealth = new Graphics();  
        rectHealth.beginFill(0xd15276);
        rectHealth.drawRoundedRect((guiHealth.x + guiHealth.width/6), (guiHealth.y + guiHealth.height/6), app.Health, guiHealth.height/2, 5);
        rectHealth.endFill();
        app.stage.addChild(rectHealth);        
    }


    app.stage.removeChild(TextcountCandy);
    TextcountCandy = new Text(app.countCandy, style);
    TextcountCandy.x = guiCandy.x + guiCandy.width/2;
    TextcountCandy.y = 5;
    app.stage.addChild(TextcountCandy);
}

/*
const GetGirlHealth = () => {
    return GirlHealth;
}

const SetGirlHealth = (newGirlHealth) => {
    GirlHealth = newGirlHealth;

}

const SetCountCandy = (newCountCandy) => { 
    
}
*/
module.exports = {
    GUI, gameLoop, updateGUI
    //SetGirlHealth, SetCountCandy, 
}