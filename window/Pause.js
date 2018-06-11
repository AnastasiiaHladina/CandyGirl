import * as PIXI from 'pixi.js';
import buttonHover from './util/buttonHover';
import removeAll from './util/removeAll'; 

let GUI, ButtonStart, ButtonSettings;
let Container = PIXI.Container;
let Sprite = PIXI.Sprite;
let EndContainer, EndWindow, EndTextureAtlas;
let TextStyle = PIXI.TextStyle;
let app;
 


const ShowEnd = (_app, star) => {
	app = _app;
	EndTextureAtlas = _app.GUITextureAtlas; 
	EndContainer = new Container();




	if(star === 0){
		EndWindow = new Sprite(EndTextureAtlas["1.png"]);
		EndWindow.scale.set(0.5, 0.5);
    	EndWindow.position.set((window.innerWidth/2) - (EndWindow.width/2), (window.innerHeight/2) - (EndWindow.height/2));

 
	}
	if(star === 1){
		EndWindow = new Sprite(EndTextureAtlas["1.1.png"]);
	}
	if(star === 2){
		EndWindow = new Sprite(EndTextureAtlas["1.2.png"]);
	}
	if(star === 3){
		EndWindow = new Sprite(EndTextureAtlas["1.3.png"]);
	} 
	EndContainer.addChild(EndWindow);
    app.stage.addChild(EndContainer); 
}


module.exports = {
	ShowEnd
}