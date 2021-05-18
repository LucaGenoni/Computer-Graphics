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
	b = 1-a;

	return utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
		utils.MakeTranslateMatrix(tx1*b+tx2*a,ty1*b+ty2*a,tz1*b+tz2*a),
		utils.MakeRotateZMatrix(rz1*b+rz2*a)),
		utils.MakeRotateXMatrix(rx1*b+rx2*a)),
		utils.MakeRotateYMatrix(ry1*b+ry2*a));	
}