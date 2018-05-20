
const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}
const randomFloat = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min); 
    return rand;
}

module.exports = {
    randomInteger, randomFloat
}