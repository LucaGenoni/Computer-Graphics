function draw() {
	// Draws a line from a point at Normalized screen coordinates x1,y1 to Normalized screen coordinates x2,y2
	line(0.3, 0.3,-0.5,0.3);
	line(-0.5,0.3,-0.5,-0.3);
	line(-0.5,-0.3,0.3,-0.3);
	// center and radius
	x = 0.3; y = 0.0;	r = 0.3;
	// detail to build the curve 
	startingAngle = - Math.PI/2;	anglePath = Math.PI;	lines = 64;
	angleSection = anglePath/lines;

	// starting point 
	// x1 = 0.3; y1 =-0.3;
	x1 = r * Math.cos(startingAngle)+x;
	y1 = r * Math.sin(startingAngle)+y;

	for(i = 0; i <= lines; i++) {
		// determine the next point
		x2 = r * Math.cos(startingAngle+angleSection*i) + x;
		y2 = r * Math.sin(startingAngle+angleSection*i) + y;
		// draw the line 
		line(x1, y1, x2, y2);
		// update the current point
		x1 = x2;
		y1 = y2;
	}
}
