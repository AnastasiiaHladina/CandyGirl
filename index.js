import $ from "jquery";
import * as PIXI from 'pixi.js';
import * as Screens from './window';  
import {BG}  from './window/bg/ShowBG';  
import removeAll from './window/util/removeAll'; 
import  * as Music from './window/music/Music';


  let buttonIn = document.getElementById('in');
  let token, level;
  buttonIn.addEventListener("click", function(e) {
  	$.ajax({
	  url: 'http://localhost:3000/login',
	  type:"POST",
	  dataType: 'json',
	  data: JSON.stringify({
	  	Name: $('input[type=text]').val(),
	  	Password: $('input[type=password]').val()
	  }),
	  contentType:"application/json; charset=utf-8",
	  dataType:"json",
	  success: function(res){ 
	  	token = res.token;
	  	level = res.Level;
 
	  	document.body.innerHTML = `<div class="loading">
	      <div class="finger finger-1">
	        <div class="finger-item">
	          <span></span><i></i>
	        </div>
	      </div>
	      <div class="finger finger-2">
	        <div class="finger-item">
	          <span></span><i></i>
	        </div>
	      </div>
	      <div class="finger finger-3">
	        <div class="finger-item">
	          <span></span><i></i>
	        </div>
	      </div>
	      <div class="finger finger-4">
	        <div class="finger-item">
	          <span></span><i></i>
	        </div>
	      </div>
	      <div class="last-finger">
	        <div class="last-finger-item"><i></i></div>
	      </div>
	    </div>`;

	    Load();
	  }
	});
  });

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
  GUITextureAtlas, ForestTextureAtlas, DesertTextureAtlas, MountainTextureAtlas,
  JellyTextureAtlas, DogTextureAtlas, BirdTextureAtlas; 
 let app; 

function Load(){
	 if(!Utils.isWebGLSupported()){//проверка на поддержку WebGL
	   type = "canvas"
	 }
	 Utils.sayHello(type);//Выводит информацию о версии и визуализаторе
	 //загрузка картинок
	 Loader
	   .add([ 
	       "images/material/GUI/main/all/BG.png",
           "images/material/other/ob.png"]);
	 Loader
	   .add([
	       "images/material/GUI/main/GUI.json",       
	       "images/material/girl/spriteGirl.json",
	       "images/material/forest/spriteForest.json", 
	       "images/material/cat/spriteCat.json", 
	       "images/material/dog/spriteDog.json",  
	       "images/material/jelly/animals/Forest_Animal.json", 
	       "images/material/wilderness/spriteWilderness.json", 
	       "images/material/mountains/spriteMountains.json", 
	       "images/material/attack/spriteCandy.json",
           "images/material/other/bird.json",
	       "images/material/GUI/main/Figures.json"
	   ])
	   .on("progress", loadProgressHandler)
	   .load(setup);
	 function loadProgressHandler(loader, resource) {
	   console.log("loading: " + resource.url);//Вывод названия ресурса
	   console.log("progress: " + loader.progress + "%");//Вывод прогресса загрузки
	 }
}

 //выполнится после загрузки картинки
 function setup(){ 
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
    app.token = token;
    app.level = level;
    Music.InitAudio(app);
    Music.Audio_Start(0); 
    let loading = document.getElementsByClassName('loading')[0];
    loading.parentNode.removeChild(loading);
    //добавляем канвас(PIXI создал его)
    document.body.appendChild(app.view);  
 
 
    initTexture();
    app.GirlTextureAtlas = GirlTextureAtlas;
    app.FiguresTextureAtlas = FiguresTextureAtlas;
    app.CandyTextureAtlas = CandyTextureAtlas;
    app.GUITextureAtlas = GUITextureAtlas;
    app.ForestTextureAtlas = ForestTextureAtlas;
    app.DesertTextureAtlas = DesertTextureAtlas;
    app.MountainTextureAtlas = MountainTextureAtlas;
    app.JellyTextureAtlas = JellyTextureAtlas;
    app.DogTextureAtlas = DogTextureAtlas; 
    app.BirdTextureAtlas = BirdTextureAtlas;
    showGUI(1);
 }


 function showBackground(whichBG){
    BG(app, whichBG); 
 }

 function showGUI(whichGUI){
    removeAll(app.stage);
    app.showGUI = showGUI;
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
    	showBackground(0);//Main
    	Music.Stop_One_Of_Audio(0); 
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
    JellyTextureAtlas = new ParticleSprites(1500, {
        rotation: false,
        alphaAndtint: false,
        scale: false,
        suvs: false
    });
    DogTextureAtlas = new ParticleSprites(1500, {
        rotation: false,
        alphaAndtint: false,
        scale: false,
        suvs: false
    });
    BirdTextureAtlas = new ParticleSprites(1500, {
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
    JellyTextureAtlas = Loader.resources["images/material/jelly/animals/Forest_Animal.json"].textures;
    DogTextureAtlas = Loader.resources["images/material/dog/spriteDog.json"].textures; 
    BirdTextureAtlas = Loader.resources["images/material/other/bird.json"].textures; 
    
}
 