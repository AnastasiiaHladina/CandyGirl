
import * as PIXI from 'pixi.js';
import * as Screens from './window';  
import {BG, GetFloorParam}  from './window/bg/ShowBG';  
import removeAll from './window/util/removeAll';  
import Girl from './window/entity/girl/Girl';  


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
 let MainBG, GUI, GirlTextureAtlas, BGTextureAtlas, GUITextureAtlas, state; 
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
       "images/material/GUI/main/GUI.json",       
       "images/material/girl/spriteGirl.json", 
       "images/material/forest/spriteForest.json", 

   ])
   .on("progress", loadProgressHandler)
   .load(setup);

 function loadProgressHandler(loader, resource) {
    
   console.log("loading: " + resource.url);//Вывод названия ресурса
   console.log("progress: " + loader.progress + "%");//Вывод прогресса загрузки
 
    if(loader.progress === 100){
        
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
        //добавляем канвас(PIXI автоматически создал его)
        document.body.appendChild(app.view); 
    } 
 }
 
 //выполнится после загрузки картинки
 function setup(){
   state = choice; //Задаём статус игры
   showGUI(1);

   GirlTextureAtlas =  new ParticleSprites(1500, {
     rotation: true,
     alphaAndtint: true,
     scale: true,
     suvs: true
   });
   GirlTextureAtlas = Loader.resources["images/material/girl/spriteGirl.json"].textures;  
   //app.ticker.add(delta => GirlAnimate(delta));
 }

 function play(delta) {
     
/* Girl.x += Girl.vx;
   Girl.y += Girl.vy
*/
 }
 function choice(delta) {
    /* Girl.x += Girl.vx;
       Girl.y += Girl.vy*/
}


 function showBackground(whichBG){
    BG(app, whichBG); 
 }

 function showGUI(whichGUI){
    GUITextureAtlas = Loader.resources["images/material/GUI/main/GUI.json"].textures;
    removeAll(app.stage);
    
    if(whichGUI === 1){
        showBackground(1);//Main
        Screens.Welcome(app, GUITextureAtlas, showGUI);
    }
    if(whichGUI === 2){
        showBackground(1);//Main
        Screens.Settings(app, GUITextureAtlas, showGUI);
    }
    if(whichGUI === 3){
        showBackground(1);//Main
        Screens.SetLevel(app, GUITextureAtlas, showGUI);
    }
    //let left = keyboard(37), up = keyboard(38), right = keyboard(39), down = keyboard(40);
    if(whichGUI === 4){
        showBackground(2);//First Level
        Girl.InitGirl(app, GirlTextureAtlas);
        window.addEventListener('keydown', function(e){
            //37  left
            //38  up
            //39  right
            //console.log(e);
          /*if(e.keyCode === 37 && e.keyCode === 38) Girl.AnimateGirl(app, -5, true); 
          else if(e.keyCode === 39 && e.keyCode === 38) Girl.AnimateGirl(app, 5, true);             
          else if(e.keyCode === 37) Girl.AnimateGirl(app, -5, 0); 
          else if(e.keyCode === 38) Girl.AnimateGirl(app, 0, true); 
          else if(e.keyCode === 39) Girl.AnimateGirl(app, 5, 0); 
*/
            setKey(e.keyCode);
            if(isKeyDown('up'))console.log(1);
        });
        window.addEventListener('keyup', function(e){

            clearKey(e.keyCode);

        });
    }
 }

 let keys = {
    'left' : 37,    
    'up'   : 38,
    'right': 39,
    'down' : 40,
    '0'    : 96
}; 
let keyDown = {};

function setKey(keyCode){//38,96
    //38:TRUE   
    console.log(keyCode + ' 1')
    keyDown[keyCode] = true;
    //console.log(keyDown)
}

function isKeyDown(keyName){
    console.log(keyName+ " " + keys[keyName] + "  " + keyDown[keys[keyName]]) 

    return keyDown[keys[keyName]] == true;
}

function clearKey(keyCode){
    console.log(keyCode + ' 2')
    keyDown[keyCode] = false;
}


