// Returns the transform matrix obtained interpolating the given positions and angles
var state = [1,0,0,0];
function InterpMat(
				tx1, ty1, tz1, rx1, ry1, rz1,
			    tx2, ty2, tz2, rx2, ry2, rz2,
			    a) {
	// tx1, ty1, tz1	-> Initial position
	// rx1, ry1, rz1	-> Initial rotation (in Euler angles)
	// tx2, ty2, tz2	-> Final position
	// rx2, ry2, rz2	-> Final rotation (in Euler angles)
	// a (in 0..1 range)	-> Interpolation coefficient
	//
	// return the interpolated transform matrix with the given position and rotation
	b = 1-a	

	return utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
		utils.MakeTranslateMatrix(tx1*a+tx2*b,ty1*a+ty2*b,tz1*a+tz2*b),
		utils.MakeRotateZMatrix(rz1*a+rz2*b)),
		utils.MakeRotateXMatrix(rx1*a+rx2*b)),
		utils.MakeRotateYMatrix(ry1*a+ry2*b));
}