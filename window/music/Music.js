let massCount;
let audioArr = []; 

const Audio_Start_Stop = (url) => {
    let OneAudio = new Audio(); 
    OneAudio.src = url; 
    OneAudio.preload = true;
    OneAudio.type='audio/mp3; codecs=vorbis';
    OneAudio.autoplay = true;
    RemoveAudio(OneAudio);
}
function RemoveAudio(audio){
    audio = null;
}



const Audio_Start = (audioMass) => {
    DeleteAudio();
    massCount = audioMass.length; 
    console.log(audioMass, massCount)
    for(let i = 0; i < audioMass.length; i++){
        audioArr[i] = new Audio(); 
        audioArr[i].src = audioMass[i]; 
        audioArr[i].preload = true; //предзагрузка
        audioArr[i].loop = true; //повтор
        audioArr[i].autoplay = true; // Автоматически запускаем   
        audioArr[i].type='audio/mp3; codecs=vorbis';
    }

}
const Audio_Stop = () => {
    for(let i = 0; i < massCount; i++){ 
        audioArr[i].pause();
    }
}



const Start_One_Of_Audio = (id) => {
    if(massCount >  id){
        audioArr[id].autoplay = true;
    }  
}
const Stop_One_Of_Audio = (id) => {
    if(massCount >  id){
        audioArr[id].pause();
    }
}



function DeleteAudio(){
    audioArr = [];
    massCount = 0;
}




module.exports = {
    Audio_Start, Audio_Stop, Start_One_Of_Audio, Stop_One_Of_Audio, Audio_Start_Stop
}