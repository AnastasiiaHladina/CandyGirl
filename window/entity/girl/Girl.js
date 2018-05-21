import * as PIXI from 'pixi.js'; 
import {hitRectangle} from '../../util/ContactOfTwoRectangles.js';  


const ticker = new PIXI.ticker.Ticker();
let Sprite = PIXI.Sprite; 
let Texture =  PIXI.Texture;
let Loader = PIXI.loader;
let Extras = PIXI.extras;
let TilingSprite = PIXI.extras.TilingSprite;
let girl, GirlTextureAtlas, GirlAnimation = [];
let vy, currentX;
let check = true;

// в прыжке сейчас?
let jump = false;
// может ли прыгнуть?
let canJump = true;
// стоит на земле
let standOnGround = true;
// скорость
let velocity = { x: 0, y: 0 };
// гравитация
let gravity = { x: 0, y: -1 };


const AnimateGirl = (app, x, q) => {
    if(x!== undefined){ 
        if(x!= 0 && q!= 0){
            //girl.x += x;
            app.stage.removeChild(girl);
            GirlAnimation = [];
            girl = null;

            let texture = Texture.fromFrame('girlRun (' + q + ').png');
            GirlAnimation.push(texture);
            girl = new Extras.AnimatedSprite(GirlAnimation);
             
            girl.gotoAndPlay(0);
            
            girl.scale.set(0.5, 0.5);
            if(x * girl.scale.x < 0)girl.scale.x *= -1;  
            girl.anchor.set(0.5, 0.5);
            girl.x = currentX;
            girl.y = vy;  
            
        }else{
            app.stage.removeChild(girl);
            GirlAnimation = [];
            girl = null;
            girl = new Sprite(GirlTextureAtlas["girlIdle (1).png"]);
            girl.scale.set(0.5, 0.5);    
            girl.anchor.set(0.5, 0.5);
            girl.y = vy;    
            girl.x = currentX;
        }
        app.stage.addChild(girl);
    }
}


function girlJump(delta, y, app){
    if(girl.y >= vy) { 
        app.ticker.stop();
    }
    girl.y += y;
}


const InitGirl = (app, getHeight) => {
    GirlTextureAtlas = app.GirlTextureAtlas;
    girl = new Sprite(GirlTextureAtlas["girlIdle (1).png"]);
    girl.scale.set(0.5, 0.5);    
    girl.anchor.set(0.5, 0.5);
    vy = window.innerHeight - getHeight() - (girl.height/2) + 10;    
    girl.x = girl.width;
    currentX = girl.x;
    girl.y = vy;    
    app.stage.addChild(girl);
}


function GirlAttack(){

}



const updateGirl = (delta) => {
    if (!girl) return;

    velocity.x += gravity.x;
    velocity.y += gravity.y;

    if (girl.y >= vy && jump && velocity.y >= 0) {
        standOnGround = true;
    }

    // если прыжок активирован и мы можем прыгнуть
    if (jump && canJump) {
        velocity.y -= 1;

        // отключаем возможность прыжка
        canJump = standOnGround = false;
    } else if (standOnGround) {
        jump = false;
        velocity.y = 0;
        canJump = true;
        girl.y = vy;
    }

    if (velocity.y < -20) {
        velocity.y = 20;
    }

    girl.x += velocity.x * delta;
    girl.y += velocity.y * delta;
}

const setJump = (value) => {
    jump = value;
}

const PositionGirlByX = () => {
    return girl.x;
}
const PositionGirlByY = () => {
    return girl.x;
}
const WidthGirl = () => {
    return girl.width;
}

module.exports = {
    InitGirl, 
    AnimateGirl,
    PositionGirlByX,
    PositionGirlByY,
    WidthGirl,
    updateGirl,
    setJump, 
    
}