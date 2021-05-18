// these global variables are used to contain the current angles of the world
// HERE YOU WILL HAVE TO ADD ONE OR MORE GLOBAL VARIABLES TO CONTAIN THE ORIENTATION
// OF THE OBJECT

// this function returns the world matrix with the updated rotations.
// parameters rvx, rvy and rvz contains a value in the degree that how much the object rotates in the given direction.

var state = [1,0,0,0];
function updateWorld(rvx, rvy, rvz) {
	// order -> ROLL, PITCH, YAW in case of y-up look assignment 07 for details
	state = Quaternion.fromEuler(utils.degToRad(rvz),utils.degToRad(rvx),utils.degToRad(rvy)).mul(state);
	return state.toMatrix4();
}

