function Anim1(t) {
	// moving car
	return utils.multiplyMatrices(
		// just a translation
		utils.MakeTranslateMatrix(t/4,.5,0),
		utils.MakeScaleNuMatrix(.25,.25,1));
}
function Anim2(t) {
	// bumping code
	t = t<0.5?t*2:(t-0.5)*2;
	// y = .625+Math.cos(2*Math.PI*t)/8
	y = .5+Math.abs(t*2-1)/4;
	return utils.multiplyMatrices(
		utils.MakeTranslateMatrix(.75,y,0),
		utils.MakeScaleNuMatrix(.25,.25,1));
}

function Anim3(t) {
	// rotating fan
	var center = [.625,.875];	var radius = .125;
	return utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
		// rotation around the center of the fan
		utils.MakeTranslateMatrix(center[0],center[1],0),
		utils.MakeRotateZMatrix(t*360)),
		utils.MakeTranslateMatrix(-center[0],-center[1],0)),
		// position of the texture then scaling
		utils.MakeTranslateMatrix(center[0]-radius,center[1]-radius,0)),
		utils.MakeScaleNuMatrix(.25,.25,1));
}

function Anim4(t) {
	// buring flame
	var dimention = 1/12;	
	// I need have 6 row for each range 0,1
	var imageN = t*6;	var row = Math.floor(imageN);
	// I need to split each row into 12 columns
	var column = Math.floor((imageN-row) * 12);
	// now the transformations. I use 5-row to go through the rows from top to bottom 
	return utils.multiplyMatrices(
		utils.MakeTranslateMatrix(column*dimention,(5-row)*dimention,0),
		utils.MakeScaleNuMatrix(dimention,dimention,1));

}