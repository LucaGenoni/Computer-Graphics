function world() {
	// Positioned in 0,0,-3. Yaw=90, Pitch and Roll = 0
	var A1 = makeWorld([0,0,-3],90,0,0,[1,1,1],"y-up");

	// Positioned in 0,2,0. Yaw=0, Pitch = 60, Roll = 0, 1/10th of size
	var A2 = makeWorld([0,2,0],0,60,0,[0.1,0.1,0.1],"y-up");
	   
	// Positioned in 0,0,0. Yaw=30, Pitch = 0 Roll = 45	
	var A3 = makeWorld([0,0,0],30,0,45,[1,1,1],"y-up");

	// Positioned in 2,0,2. Yaw=180, Pitch and Roll = 0, two times wider
	var A4 = makeWorld([2,0,2],180,0,0,[2,1,1],"y-up");

	// Positioned in 1,-1,2.5. Yaw=-30, Pitch = 45 Roll = -15, Scaled with the following factors: 0.8 (x), 0.75 (y), 1.2 (z)
	var A5 = makeWorld([1,-1,2.5],-30,45,-15,[0.8,0.75,1.2],"y-up");

	return [A1, A2, A3, A4, A5];
}

function makeWorld(transaltion,yaw,pitch,roll,scale,system){
	var R_Roll_face,R_Pitch_side,R_Yaw_vertical;
	switch (system) {
		case "x-up":
			R_Yaw_vertical = utils.MakeRotateXMatrix(yaw);
			R_Pitch_side = utils.MakeRotateZMatrix(pitch);
			R_Roll_face = utils.MakeRotateYMatrix(roll);
			break;
		case "y-up":
			R_Yaw_vertical = utils.MakeRotateYMatrix(yaw);
			R_Pitch_side = utils.MakeRotateXMatrix(pitch);
			R_Roll_face = utils.MakeRotateZMatrix(roll);
			break;
		case "z-up":	
			R_Yaw_vertical = utils.MakeRotateZMatrix(yaw);
			R_Pitch_side = utils.MakeRotateYMatrix(pitch);
			R_Roll_face = utils.MakeRotateXMatrix(roll);
			break;
		default:
			alert("Error system in input of makeWorld");
			break;
	}
	var world = utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
		utils.MakeTranslateMatrix(transaltion[0],transaltion[1],transaltion[2]),
		R_Yaw_vertical),
		R_Pitch_side),
		R_Roll_face),
		utils.MakeScaleNuMatrix(scale[0], scale[1], scale[2]));
	return world;
}