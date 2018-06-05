let massCount;
let audioArr = [
    'effect/c418 sweden.mp3',   //0
    'effect/forest.mp3',        //1
    'effect/night.mp3',         //2
    'effect/wind.mp3',          //3
    'effect/ShortRun.mp3',      //4
    'effect/ShortQuit.mp3',     //5
    'effect/ShortHrum.mp3',     //6
    'effect/ShortCry.mp3',      //7
]; 
let ActiveAudio = []; 
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


//Пауза для всего
const Audio_Stop = () => {
    for(let i = 0; i < audioArr.length; i++){ 
        //audioArr[i].pause();
    }
}


//Пауза для 1 песни из множества
const Stop_One_Of_Audio = (i) => { 
    ActiveAudio[i].pause();
}
 
 
module.exports = {
    Audio_Start, Audio_Stop, Stop_One_Of_Audio, Audio_Start_Stop
}