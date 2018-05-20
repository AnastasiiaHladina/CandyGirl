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
 let MainBG, GirlTextureAtlas, BGTextureAtlas, GUITextureAtlas, state; 
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
       "images/material/attack/allCandy/6.png",
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
        app.EndLevel = 10000;
        //добавляем канвас(PIXI автоматически создал его)
        document.body.appendChild(app.view); 
    } 
 }
 /*
       "images/material/cat/spriteCat.json", 
       "images/material/dog/spriteDog.json",        
       "images/material/forest/spriteForest.json", 
       "images/material/wilderness/spriteWilderness.json", 
       "images/material/mountains/spriteMountains.json", 
       "images/material/jelly/allJellyMonster.json"
 */
 
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
    if(whichGUI === 4){
        Screens.Game(app, GirlTextureAtlas, GUITextureAtlas, window);
        //showBackground(2);//First Level
        //Girl.InitGirl(app, GirlTextureAtlas);
        //GUI(app, GUITextureAtlas);
        /*window.addEventListener('keydown', function(e){
            setKey(e.keyCode);
            if(isKeyDown('up') && isKeyDown('left')){
                Girl.AnimateGirl(app, -5, -5); 
                MoveAll(-5);
            } 
            if(isKeyDown('up') && isKeyDown('right')){
                Girl.AnimateGirl(app, 5, -5); 
                MoveAll(5);
            } 
            if(isKeyDown('up')){
               // Girl.AnimateGirl(app, 0, -20);  
               Girl.setJump(true);
            } 
            if(isKeyDown('left')){
                Girl.AnimateGirl(app, -20, 0); 
                MoveAll(-5);
            } 
            if(isKeyDown('right')){
                Girl.AnimateGirl(app, 20, 0); 
                MoveAll(5);
            }
            if(isKeyDown('0')){
                Girl.AnimateGirl(app, 20, 0); 
                MoveAll(5);
            }
        });
        */  /*
        window.addEventListener('keyup', function(e){
            clearKey(e.keyCode);
        });
        */
    }
 }




