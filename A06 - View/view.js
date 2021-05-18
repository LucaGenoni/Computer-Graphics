function view() {
	// Make a Look-In-Direction matrix centered at (5,2.5,0), looking west and aiming 30 degrees down.
	var A1 =  makeViewInDirection([5,2.5,0],90,-30,0);
			   
	// Make a Look-In-Direction matrix centered at (0,-1,-5), angled 170 degrees, with an elevation of 15 degrees, and a roll of 45 degrees.
	var A2 =  makeViewInDirection([0,-1,-5],170,15,45);
			   
	// Make a Look-At-Matrix, centered at (-4, 2, -4), aiming at (0,0.5,0.5) and with up-vector (0,1,0).	
	var A3= makeViewLookAt([-4, 2, -4], [0,0.5,0.5], [0,1,0]);
			   
	// Make a Look-At-Matrix, centered at (2.57, 0, 0), aiming at (2.8,0,-1) and with up-vector (1,0,0).
	var A4= makeViewLookAt([2.57, 0, 0], [2.8, 0, -1], [1,0,0]);

	return [A1, A2, A3, A4];
}

function makeViewInDirection(target,alphaY,betaX,gammaZ){
	// alphaY is north=0, west=90, south=180, east=270
	// bethaX look up with >0, look down with <0
	// gammaZ turns counter clockwise >0, turns clockwise <0
	return utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
		utils.MakeRotateZMatrix(-gammaZ),
		utils.MakeRotateXMatrix(-betaX)),
		utils.MakeRotateYMatrix(-alphaY)),
		utils.MakeTranslateMatrix(-target[0],-target[1],-target[2]));
}

function makeViewLookAt(cam,target,up_vector){
	var Vz= [];
	for(var i = 0; i < cam.length; i++) Vz.push(cam[i] - target[i]);
	Vz = utils.normalizeVector3(Vz);
	var Vx = utils.normalizeVector3(utils.crossVector(up_vector,Vz));
	var Vy = utils.crossVector(Vz,Vx);

	//OrthonormalMatrix transposed (R_c)^T that store the rotations
	var out = [Vx[0], Vx[1], Vx[2], 0.0,
		   Vy[0], Vy[1], Vy[2], 0.0,
		   Vz[0], Vz[1], Vz[2], 0.0,
		    0.0,   0.0,   0.0,  1.0 ];
	// calculate the last column  - (R_c)^T * c
	cam.push(0.0);
	var position = utils.multiplyMatrixVector(out, cam);

	// apply the translation
	for (i=3, j=0; j<cam.length-1; i+=4, j++) out[i] = -position[j];
	return out;
}