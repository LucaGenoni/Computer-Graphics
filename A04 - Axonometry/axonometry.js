function axonometry() {
	// Make an isometric view, w = 50, a = 16/9, n = 1, f = 101.
	var isometricX = Math.asin(Math.tan(Math.PI/6)) * 180/Math.PI;
	var A1 = utils.multiplyMatrices(utils.multiplyMatrices(
		parallel(50,16/9,1,101),
		utils.MakeRotateXMatrix(isometricX)),
		utils.MakeRotateYMatrix(45));

	// Make a dimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis	
	var A2 = utils.multiplyMatrices(utils.multiplyMatrices(
		parallel(50,16/9,1,101),
		utils.MakeRotateXMatrix(20)),
		utils.MakeRotateYMatrix(45));

	// Make a trimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated -30 around the x-axis and 30 around the y-axis	
	var A3 = utils.multiplyMatrices(utils.multiplyMatrices(
		parallel(50,16/9,1,101),
		utils.MakeRotateXMatrix(-30)),
		utils.MakeRotateYMatrix(30));

	// Make an cavalier projection view, w = 50, a = 16/9, n = 1, f = 101, at 45 degrees
	var radiants45degree = Math.PI/4
	var O1 = utils.multiplyMatrices(
		parallel(50,16/9,1,101),
		utils.MakeShearZMatrix(-Math.cos(radiants45degree),-Math.sin(radiants45degree)));

	// Make a cabinet projection view, w = 50, a = 16/9, n = 1, f = 101, at 60 degrees	
	var radiants60degree = Math.PI/3
	var O2 = utils.multiplyMatrices(utils.multiplyMatrices(
		parallel(50,16/9,1,101),
		utils.MakeShearZMatrix(-Math.cos(radiants60degree),-Math.sin(radiants60degree))),
		utils.MakeScaleNuMatrix(1,1,0.5));

	return [A1, A2, A3, O1, O2];
}

function parallel(w,a,n,f){
	return [1/w,		0.0,		0.0,		0.0,
			0.0,		a/w,		0.0,		0.0,
			0.0,		0.0,		-2/(f-n),	-(f+n)/(f-n),
			0.0,		0.0,		0.0,		1.0];
}