function buildGeometry() {
	// Draws the outline of letter F (replace the vertices and primitive type)
	n1 = 1.0;	backX = -0.4;	floorY = -1.0;	ceilingY = 1.0;	middleX = -0.1;
	var vert1 = [
		[backX,ceilingY,0.0], 	[0.5,ceilingY,0.0],
								[0.5,0.7,0.0],
					[middleX,0.7,0.0], 		
					[middleX,0.4,0.0],
								[0.25,0.4,0.0],
								[0.25,0.1,0.0],
					[middleX,0.1,0.0], 		
					[middleX,floorY,0.0],
		[backX,floorY,0.0],
		[backX,ceilingY,0.0], 
	];
	addMesh(vert1, "P", [1.0, 0.0, 0.0]);
	
	// Draws a filled S-shaped pattern (replace the vertices and primitive type)	
	// 10-------12
	// |  9-----11
	// |  7-----5
	// 8-----6  |
	// 2-----4  |
	// 1--------3
	widtdhHigh = 2.0 / 5;	baseH = -1.0;	widtdhWidth = 0.5;	baseW = -0.75;
	highs = [baseH,	baseH+widtdhHigh,	baseH+widtdhHigh*2,	baseH+widtdhHigh*3,	baseH+widtdhHigh*4,	baseH+widtdhHigh*5];
	cols = [baseW,	baseW+widtdhWidth,	baseW+widtdhWidth*2,baseW+widtdhWidth*3];
	var vert2 = [
		[cols[0],highs[0],0.0], 
		[cols[0],highs[1],0.0], 
		[cols[3],highs[0],0.0],
		[cols[2],highs[1],0.0], 
		[cols[3],highs[3],0.0], 
		[cols[2],highs[2],0.0],
		[cols[1],highs[3],0.0], 
		[cols[0],highs[2],0.0], 
		[cols[1],highs[4],0.0],
		[cols[0],highs[5],0.0], 
		[cols[3],highs[4],0.0], 
		[cols[3],highs[5],0.0],
	];
	addMesh(vert2, "S", [0.0, 0.0, 1.0]);


	// Draws a filled pentacong (replace the vertices and primitive type)
	angle = Math.PI*2/5;	startAngle = Math.PI/2;
	var vert3 = [
		[Math.cos(angle + startAngle),		Math.sin(angle + startAngle),	0.0],
		[Math.cos(2*angle + startAngle),	Math.sin(2*angle + startAngle),	0.0],
 		[Math.cos(3*angle + startAngle),	Math.sin(3*angle + startAngle),	0.0],
		[Math.cos(4*angle + startAngle),	Math.sin(4*angle + startAngle),	0.0],
		[Math.cos(5*angle + startAngle),	Math.sin(5*angle + startAngle),	0.0],
	];
	addMesh(vert3, "F", [0.0, 1.0, 0.0]);
}



