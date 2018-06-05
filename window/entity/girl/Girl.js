import * as PIXI from 'pixi.js'; 
import {hitRectangle} from '../../util/ContactOfTwoRectangles.js';  
import {randomInteger} from '../../util/Random';    
import  * as Music from '../../music/Music'; 


const ticker = new PIXI.ticker.Ticker();
let Sprite = PIXI.Sprite; 
let Texture =  PIXI.Texture;
let Loader = PIXI.loader;
let Extras = PIXI.extras;
let TilingSprite = PIXI.extras.TilingSprite;
let app, Animals, FreeCandy;
let girl, GirlTextureAtlas, CandyTextureAtlas, GirlAnimation = [];
let vy, currentX, Candy = [], countCandy = 2, c = 0, Health;
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
let gravity = { x: 0, y: -2 };


const AnimateGirl = (x) => {
    if (x!== undefined) { 
        if (x != 0) {
            //girl.x += x;
            app.stage.removeChild(girl);
            GirlAnimation = [];
            girl = null;
 
            let texture = Texture.fromFrame('girlRun (' + (1 + (c++) % 20) + ').png');
            GirlAnimation.push(texture);
            girl = new Extras.AnimatedSprite(GirlAnimation);
             
            girl.gotoAndPlay(0);
            
            girl.scale.set(0.5, 0.5);
            if(x * girl.scale.x < 0)girl.scale.x *= -1;  
            girl.anchor.set(0.5, 0.5);
            girl.x = currentX;
            girl.y = vy;  
            
        } else {
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


function girlJump(delta, y){
    if(girl.y >= vy) { 
        app.ticker.stop();
    }
    girl.y += y;
}


const InitGirl = (_app, _Animals, _FreeCandy) => {
    app = _app;    
    Animals = _Animals; 
    FreeCandy = _FreeCandy;
    GirlTextureAtlas = app.GirlTextureAtlas; 
    girl = new Sprite(GirlTextureAtlas["girlIdle (1).png"]);
    girl.scale.set(0.5, 0.5);    
    girl.anchor.set(0.5, 0.5);
    vy = window.innerHeight - app.FloorHeight - (girl.height/2) + 10;    
    girl.x = girl.width;
    currentX = girl.x;
    girl.y = vy;    
    app.stage.addChild(girl); 
}


function GirlAttack(){
    if(app.countCandy > 0){
        CandyTextureAtlas = app.CandyTextureAtlas;
        let candy = new Sprite(CandyTextureAtlas[randomInteger(1, 5)+".png"]);
        candy.x = WidthGirl();
        candy.y = vy;
        candy.width = WidthGirl() - WidthGirl()/1.5;
        candy.height = WidthGirl() - WidthGirl()/1.5;
        app.stage.addChild(candy);
        Candy.push(candy); 
    }
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




/*   ATTACK   */
let i = 0;
let j, t;
    for(let candy of Candy){
            if(candy.y > window.innerHeight - app.FloorHeight){
                Candy.splice(i, 1);
                app.stage.removeChild(candy);
                i--;
            }
            j = 0; 
            for(let animal of Animals){
                if(hitRectangle(candy, animal)){
                    Animals.splice(j, 1);
                    Candy.splice(i, 1);
                    app.stage.removeChild(animal);
                    app.stage.removeChild(candy);
                    j--; i--;
                    Music.Audio_Start_Stop(6);
                }
                j++;
            }
            candy.x += 5;
            candy.y *= 1.001;
            i++;
    }


/*   MOBS   */
    j = 0;
    for(let animal of Animals){
        if(hitRectangle(girl, animal)){  
            app.Health -= 2;
            j--;
            Music.Audio_Start_Stop(7);
        }
        j++;
    }


/*  FREE_CANDY   */
    t = 0;
    for(let FreeC of FreeCandy){
        if(hitRectangle(girl, FreeC)){ 
            FreeCandy.splice(t, 1);
            app.stage.removeChild(FreeC); 
            countCandy += 1;
            console.log(countCandy)
            t--;
        }
        t++;
    }


/*   DEATH   */


    app.countCandy = countCandy;
    
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
const HeightGirl = () => {
    return girl.height;
}/*
const GetCountCandy = () =>{
    return countCandy;
}

const SetCountCandy = (_countCandy) =>{
    countCandy = _countCandy;
}

const SetHealth = (newHealth) =>{
    Health = newHealth;
}
const GetHealth = () =>{
    return Health;
}
*/
module.exports = {
    InitGirl, 
    AnimateGirl,
    PositionGirlByX,
    PositionGirlByY,
    WidthGirl,
    HeightGirl,
    updateGirl,
    setJump, 
//   GetCountCandy,
    GirlAttack,
    //SetCountCandy,
//    SetHealth,
//    GetHealth
}