module.exports = (stage) => {
    while(stage.children[0]){ 
        stage.removeChild(stage.children[0]); 
    }
}