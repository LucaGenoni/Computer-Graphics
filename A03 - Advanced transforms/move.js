function move() {
	// Rotate 60 degrees around an arbitrary axis passing through (0,1,-1). The x-axis can be aligned to the arbitrary axis after a rotation of 45 degrees around the z-axis, and then 15 degrees around the y-axis.
	var R1 = utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
		utils.MakeTranslateMatrix(0,1,-1),
		utils.MakeRotateYMatrix(15)),
		utils.MakeRotateZMatrix(45)),
		// apply transformation	
		utils.MakeRotateXMatrix(60)),
		// return back	
		utils.MakeRotateZMatrix(-45)),
		utils.MakeRotateYMatrix(-15)),
		utils.MakeTranslateMatrix(0,-1,+1));

	// Half the size of the object along a line that bisects the positive x and y axes on the xy-plane. 
	var S1 = utils.multiplyMatrices(utils.multiplyMatrices(
		utils.MakeRotateZMatrix(45),
		// apply transformation	
		utils.MakeScaleNuMatrix(1/2,1,1)),
		// return back
		utils.MakeRotateZMatrix(-45));

	// Mirror the starship along a plane passing through (1,1,1), and obtained rotating 15 degree around the x axis the xz plane
	var S2 = utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
		utils.MakeTranslateMatrix(1,1,1),
		utils.MakeRotateXMatrix(15)),
		// apply transformation
		utils.MakeScaleNuMatrix(1, -1, 1)),
		// return back 
		utils.MakeRotateXMatrix(-15)),
		utils.MakeTranslateMatrix(-1,-1,-1));

	// Apply the inverse of the following sequence of transforms: rotation of 30 degree around the Y axis then Translation of (0, 0, 5), and finally a uniform scaling of a factor of 3.
	var I1 = utils.multiplyMatrices(utils.multiplyMatrices(
		utils.MakeRotateYMatrix(-30),
		utils.MakeTranslateMatrix(0,0,-5)),
		utils.MakeScaleMatrix(1/3));

	return [R1, S1, S2, I1];
}

