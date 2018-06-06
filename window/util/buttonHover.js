import * as PIXI from 'pixi.js';
let colorMatrix = new PIXI.filters.ColorMatrixFilter();
/*
 let colorMatrix = new PIXI.filters.ColorMatrixFilter;
 container.filters = [colorMatrix];
 colorMatrix.contrast(2);
*/
function Over(element){
	element.filters = [colorMatrix];
	colorMatrix.contrast(-2);
}
function Out(element){
	element.filters = [colorMatrix];
	colorMatrix.contrast(0);
}

module.exports = {
	Over,Out
}



