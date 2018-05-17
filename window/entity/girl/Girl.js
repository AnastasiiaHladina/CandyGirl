import * as PIXI from 'pixi.js'; 
import {hitRectangle} from '../../util/ContactOfTwoRectangles.js'; 
import {getX, getY, getWidth, getHeight} from '../../bg/ShowBG.js'; 

const ticker = new PIXI.ticker.Ticker();
let Sprite = PIXI.Sprite; 
let Loader = PIXI.loader;
let TilingSprite = PIXI.extras.TilingSprite;
let girl, girl2;
let vy = window.innerHeight - (window.innerHeight/2);
let check = true;

const AnimateGirl = (app, x, y) => { 
    //console.log(x,y);//317   127
    if(x!== undefined && y!== undefined){
        console.log(girl.x,girl.y); 

        
        if((girl.x + x) > 0 && (girl.x + x) < (window.innerWidth-girl.width*2)){
            girl.x += x;
        } 
        /**/
        girl.y += y;   
        /*
        if(girl.y > (window.innerHeight/5) && girl.y <= vy){
            app.ticker.addOnce(delta => girlJump(delta, 5, app));
        }
        */
    }

    /*
    
    if(y){
        y = !y;
        if(girl.y > (window.innerHeight/5)) 
        app.ticker.addOnce(delta => girlJump(delta, -5));
    } 
*/


    /*
    if(girl.y > (window.innerHeight/5)){
        console.log(girl.y + " 1");
        girl.y += y;
    }
    if(girl.y < (window.innerHeight/5)){
        console.log(girl.y + " 2");
        girl.y -= y;
    } */
    //app.ticker.add(delta => girlJump(delta, -y));
    //app.ticker.add(delta => girlJump(delta, y, 0));


}

function girlJump(delta, y, app){  
    console.log(girl.y);
    if(girl.y >= vy) {
        console.log(1);
        app.ticker.stop();

    }
    girl.y += y;
}



const InitGirl = (app, GirlTextureAtlas) => {
    girl = new Sprite(GirlTextureAtlas["girlWalk (1).png"]);
    girl.x = 0;
    girl.y = vy;
    girl.scale.set(0.5, 0.5);
    
    girl2 = new Sprite(GirlTextureAtlas["girlWalk (1).png"]);
    girl2.x = 200;
    girl2.y = vy;
    girl2.scale.set(0.5, 0.5);

    app.stage.addChild(girl, girl2);
}




const PositionGirlByX = () => {
    return girl.x;
}
const PositionGirlByY = () => {
    return girl.x;
}



module.exports = {
    InitGirl, 
    AnimateGirl,
    PositionGirlByX,
    PositionGirlByY
}