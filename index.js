import * as PIXI from 'pixi.js';
import * as Screens from './window';  
import {BG}  from './window/bg/ShowBG';  
import removeAll from './window/util/removeAll'; 

 //Создание псевдонимов
 let type = "WebGL";
 let Utils = PIXI.utils;
 let Application = PIXI.Application;
 let Loader = PIXI.loader;
 let Sprite = PIXI.Sprite;
 let Rectangle = PIXI.Rectangle;
 let TextureCache = PIXI.utils.TextureCache;
 let ParticleSprites = PIXI.particles.ParticleContainer;
 let Container = PIXI.Container;
 let Graphics = PIXI.Graphics;
 //let outlineFilterRed = new PIXI.filters.GlowFilter(15, 2, 1, 0xff9999, 0.5);
 let MainBG, GirlTextureAtlas, BGTextureAtlas, FiguresTextureAtlas, CandyTextureAtlas,
  GUITextureAtlas, ForestTextureAtlas, DesertTextureAtlas, MountainTextureAtlas; 
 let app; 

 if(!Utils.isWebGLSupported()){
   type = "canvas"
 }

 Utils.sayHello(type);

 //загрузка картинок
 Loader
   .add([ 
       "images/material/GUI/main/all/BG.png", 
       "images/material/GUI/main/all/12.png",
       "images/material/GUI/main/all/13.png",
       "images/material/GUI/main/all/14.png",
       "images/material/GUI/main/all/15.png",
       "images/material/GUI/main/all/16.png",
       "images/material/GUI/main/all/17.png", 
       "images/material/attack/allCandy/1.png",
       "images/material/attack/allCandy/2.png",
       "images/material/attack/allCandy/3.png",
       "images/material/attack/allCandy/4.png",
       "images/material/attack/allCandy/5.png",
       "images/material/attack/allCandy/6.png",]);
 Loader
   .add([
       "images/material/GUI/main/GUI.json",       
       "images/material/girl/spriteGirl.json",
       "images/material/forest/spriteForest.json", 
       "images/material/cat/spriteCat.json", 
       "images/material/dog/spriteDog.json",  
       "images/material/jelly/allJellyMonster.json", 
       "images/material/wilderness/spriteWilderness.json", 
       "images/material/mountains/spriteMountains.json", 
       "images/material/attack/spriteCandy.json",
       "images/material/GUI/main/Figures.json"
   ])
   .on("progress", loadProgressHandler)
   .load(setup);

 function loadProgressHandler(loader, resource) {
   console.log("loading: " + resource.url);//Вывод названия ресурса
   console.log("progress: " + loader.progress + "%");//Вывод прогресса загрузки
 }

 //выполнится после загрузки картинки
 function setup(){
{
     //параметры приложения
     app = new Application({
        width: 256, 
        height: 256,                       
        antialias: true, 
        transparent: false, 
        resolution: 1
    });
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.EndLevel = 10000;
    //добавляем канвас(PIXI автоматически создал его)
    document.body.appendChild(app.view);  
}
 
    initTexture();
    app.GirlTextureAtlas = GirlTextureAtlas;
    app.FiguresTextureAtlas = FiguresTextureAtlas;
    app.CandyTextureAtlas = CandyTextureAtlas;
    app.GUITextureAtlas = GUITextureAtlas;
    app.ForestTextureAtlas = ForestTextureAtlas;
    app.DesertTextureAtlas = DesertTextureAtlas;
    app.MountainTextureAtlas = MountainTextureAtlas;
    showGUI(1);
 }


 function showBackground(whichBG){
    BG(app, whichBG); 
 }

 function showGUI(whichGUI){
    removeAll(app.stage);
    
    if(whichGUI === 1){
        showBackground(1);//Main
        Screens.Welcome(app, showGUI);
    }
    if(whichGUI === 2){
        showBackground(1);//Main
        Screens.Settings(app, showGUI);
    }
    if(whichGUI === 3){
        showBackground(1);//Main
        Screens.SetLevel(app, showGUI);
    }
    if(whichGUI === 4){
        Screens.Game(app, window);
    }
 }

 function initTexture(){
    GirlTextureAtlas =  new ParticleSprites(1500, {
        rotation: true,
        alphaAndtint: false,
        scale: false,
        suvs: false
    });
    FiguresTextureAtlas =  new ParticleSprites(1500, {
        rotation: false,
        alphaAndtint: false,
        scale: false,
        suvs: false
    });
    CandyTextureAtlas =  new ParticleSprites(1500, {
        rotation: false,
        alphaAndtint: false,
        scale: false,
        suvs: false
    });
    GUITextureAtlas =  new ParticleSprites(1500, {
        rotation: false,
        alphaAndtint: false,
        scale: false,
        suvs: false
    });
    ForestTextureAtlas =  new ParticleSprites(1500, {
        rotation: false,
        alphaAndtint: false,
        scale: false,
        suvs: false
    });
    GirlTextureAtlas = Loader.resources["images/material/girl/spriteGirl.json"].textures;  
    FiguresTextureAtlas = Loader.resources["images/material/GUI/main/Figures.json"].textures;
    CandyTextureAtlas = Loader.resources["images/material/attack/spriteCandy.json"].textures;
    GUITextureAtlas = Loader.resources["images/material/GUI/main/GUI.json"].textures;
    ForestTextureAtlas = Loader.resources["images/material/forest/spriteForest.json"].textures;
    DesertTextureAtlas = Loader.resources["images/material/wilderness/spriteWilderness.json"].textures;
    MountainTextureAtlas = Loader.resources["images/material/mountains/spriteMountains.json"].textures;
}


