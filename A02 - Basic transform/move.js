function move() {
	// Translate of +1 on the x axis, and -2 on the y axis
	var t_xyz = [1.0,-2.0,0.0];

	var T1 =  [1.0,		0.0,		0.0,		t_xyz[0],
			   0.0,		1.0,		0.0,		t_xyz[1],
			   0.0,		0.0,		1.0,		t_xyz[2],
			   0.0,		0.0,		0.0,		1.0];
			   
	// Rotate of 30 degrees on the x axis
	var angle = Math.PI/6;
	var R1 =  [ 1.0,		0.0,		0.0,		0.0,
				0.0,		Math.cos(angle),		-Math.sin(angle),		0.0,
				0.0,		Math.sin(angle),		Math.cos(angle),		0.0,
				0.0,		0.0,		0.0,		1.0];
					   
	// Make the object 2 times bigger
	var scale = 2.0;
	var S1 =  [scale,	0.0,		0.0,		0.0,
			   0.0,		scale,		0.0,		0.0,
			   0.0,		0.0,		scale,		0.0,
			   0.0,		0.0,		0.0,		1.0];
			   
	// Make the object 2 times longer on the z axis, and half on the other axis
	var S2 =  [1.0/scale,	0.0,		0.0,		0.0,
			   0.0,			1.0/scale,	0.0,		0.0,
			   0.0,			0.0,		1.0*scale,	0.0,
			   0.0,			0.0,		0.0,		1.0];

	// Mirror over the y axis
	mirror = -1.0;
	var S3 =  [mirror,	0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		mirror,		0.0,
			   0.0,		0.0,		0.0,		1.0];
			   
	// Flatten over the x axis
	flat = 0.0;
	var S4 =  [flat,	0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	// Make a shear along the Y axis, with a factor of 1 along the z axis
	ySheerOnZ = 1.0;
	var H1 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		ySheerOnZ,	1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	return [T1, R1, S1, S2, S3, S4, H1];
}

