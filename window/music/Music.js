let letSound = 1, letMusic = 1, app;
let audioArr = [
    'effect/kevin-macleod.mp3',   //0
    'effect/forest.mp3',        //1
    'effect/night.mp3',         //2
    'effect/wind.mp3',          //3
    'effect/ShortRun.mp3',      //4
    'effect/ShortQuit.mp3',     //5
    'effect/ShortHrum.mp3',     //6
    'effect/ShortCry.mp3',      //7
    'effect/ShortMoney.mp3',    //8
    'effect/ShortDethNote.mp3', //9
]; 
let ActiveAudio = []; 

const InitAudio = (_app) => {
    app = _app;
}
//Проигрывается 1 раз
const Audio_Start_Stop = (id) => {
    let OneAudio = new Audio(); 
    OneAudio.src = audioArr[id]; 
    OneAudio.preload = true;
    OneAudio.type='audio/mp3; codecs=vorbis';
    OneAudio.autoplay = true;
    RemoveAudio(OneAudio);        
}
function RemoveAudio(audio){
    audio = null;
}


//Проигрывается постоянно
const Audio_Start = (i) => { 
    ActiveAudio[i] = new Audio();  
    ActiveAudio[i].src = audioArr[i];
    ActiveAudio[i].preload = true; //предзагрузка
    ActiveAudio[i].loop = true; //повтор
    ActiveAudio[i].autoplay = true; // Автоматически запускаем   
    ActiveAudio[i].type='audio/mp3; codecs=vorbis'; 
}
//Пауза для 1 песни из множества
const Stop_One_Of_Audio = (i) => { 
    ActiveAudio[i].pause();
}
 

//ВЫКЛЮЧАЕМ МУЗЫКУ
const Button_Sound_Stop = () => {
    console.log('letSound', letSound)
    letSound *= -1;
    console.log('letSound', letSound) 
}
const Button_Music_Stop = () => {
    console.log('letMusic', letMusic)
    letMusic *= -1;
    console.log('letMusic', letMusic) 
}


//Пауза для всего
const Audio_Stop = () => {
    for(let i = 0; i < ActiveAudio.length; i++){ 
        ActiveAudio[i].pause();
    }
}

module.exports = {
    Audio_Start, Audio_Stop, Stop_One_Of_Audio, Audio_Start_Stop, InitAudio,
    Button_Sound_Stop, Button_Music_Stop
}