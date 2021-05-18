
function buildGeometry() {	
	// Draws a cube -- To do for the assignment.	
	var dataCube = cube();
	var color2 = [0.0, 1.0, 1.0];
	addMesh(dataCube[0], dataCube[1], color2);

	// Draws a pyramid --- To complete for the assignment. This is just the one in Assignment 13, where two 0.1, 0.1 UV components have been added to the vertices definitions. Such number must be replaced (differently for each vertexes), to obtain a proper Egyptian Pyramid
	var dataPyramid = pyramid();
	var color1 = [0.0, 0.0, 1.0];	
	addMesh(dataPyramid[0], dataPyramid[1], color1);	
	
	// Draws a Cylinder --- To do for the assignment
	var dataCylinder = cylinder(50);
	var color3 = [0.0, 1.0, 1.0];
	addMesh(dataCylinder[0], dataCylinder[1], color3);	
}

function pyramid() {
	var vert1 = [
		// back
		[0.0,1.0,0.0, 0.0, 0.4472,-0.8944, 0.625, 0.5],
		[ 1.0,-1.0,-1.0, 0.0, 0.4472,-0.8944, 0.5, 0.25],
		[-1.0,-1.0,-1.0, 0.0, 0.4472,-0.8944, 0.75, 0.25],
		// dx
		[0.0,1.0,0.0, 0.8944, 0.4472,0.0, 0.625, 0.5],
		[ 1.0,-1.0, 1.0, 0.8944, 0.4472,0.0, 0.5, 0.25],
		[ 1.0,-1.0,-1.0, 0.8944, 0.4472,0.0, 0.75, 0.25], 		
		// front
		[0.0,1.0,0.0, 0.0, 0.4472,0.8944, 0.62, 0.25],
		[-1.0,-1.0, 1.0, 0.0, 0.4472,0.8944, 0.5, 0.0],
		[ 1.0,-1.0, 1.0, 0.0, 0.4472,0.8944, 0.74, 0.0], 
		// sx
		[0.0,1.0,0.0, -0.8944, 0.4472,0.0, 0.875, 0.5],
		[-1.0,-1.0,-1.0, -0.8944, 0.4472,0.0, 1.0, 0.25],
		[-1.0,-1.0, 1.0, -0.8944, 0.4472,0.0, 0.75, 0.25],		
		// bottom
		[-1.0,-1.0,-1.0, 0.0,-1.0,0.0, 0.75,0.0],
		[1.0,-1.0,-1.0, 0.0,-1.0,0.0, 1.0,0.0],
		[1.0,-1.0,1.0, 0.0,-1.0,0.0, 1.0,0.25],
		[-1.0,-1.0,1.0, 0.0,-1.0,0.0, 0.75,0.25]
	];
	var ind1 = [0, 1, 2,  3, 4, 5,  6, 7, 8,  9, 10, 11,  12, 13, 14,  12, 14, 15];

	return [vert1,ind1];
}

function cube(){
	// Draws a cube -- To do for the assignment.	
	var vert = [
		//back face
			[-1.0,-1.0,-1.0],[-1.0,1.0,-1.0],[1.0,1.0,-1.0],
			[1.0,1.0,-1.0],[1.0,-1.0,-1.0],[-1.0,-1.0,-1.0],	
		//front face
			[-1.0,-1.0,1.0],[1.0,1.0,1.0],[-1.0,1.0,1.0],
			[1.0,1.0,1.0],[-1.0,-1.0,1.0],[1.0,-1.0,1.0],
		//dx face
			[1.0,1.0,-1.0],[1.0,1.0,1.0], [1.0,-1.0,-1.0],
			[1.0,1.0,1.0], [1.0,-1.0,1.0],[1.0,-1.0,-1.0],
		//sx face
			[-1.0,1.0,-1.0],[-1.0,-1.0,-1.0],[-1.0,1.0,1.0],
			[-1.0,1.0,1.0],[-1.0,-1.0,-1.0],[-1.0,-1.0,1.0],
		//top face
			[-1.0,1.0,-1.0],[1.0,1.0,1.0],[1.0,1.0,-1.0],
			[-1.0,1.0,1.0],[1.0,1.0,1.0],[-1.0,1.0,-1.0],
		//bottom face
			[-1.0,-1.0,-1.0],[1.0,-1.0,-1.0],[1.0,-1.0,1.0],
			[-1.0,-1.0,1.0],[-1.0,-1.0,-1.0],[1.0,-1.0,1.0],
		];	
	var ind = [];
	for(var i=0;i<36;i++) ind.push(i);
	var uv = [
		//back face
			[0.125,0.625],	[0.125,0.75],	[0.25,0.75],
			[0.25,0.75],[0.25,0.625],[0.125,0.625],
		//front face	
			[0.125,1.0],	[0.25,0.875],	[0.125,0.875],
			[0.25,0.875],	[0.125,1.0],	[0.25,1.0],	
		//dx face
			[0.25,0.75],	[0.375,0.75],	[0.25,0.625],
			[0.375,0.75],	[0.375,0.625],	[0.25,0.625],
		//sx face
			[0.125,0.75],	[0.125,0.625],	[0.0,0.75],
			[0.0,0.75], 	[0.125,0.625],	[0.0,0.625],
		//top face
			[0.125,0.75],	[0.25,0.875],	[0.25,0.75],
			[0.125,0.875],	[0.25,0.875],	[0.125,0.75],
		//bottom face
			[0.125,0.625],	[0.25,0.625],	[0.25,0.5],
			[0.125,0.5],	[0.125,0.625],	[0.25,0.5]	
		];	
	return [blend(blend(vert,normalArray(vert,ind)),uv), ind];
}

function cylinder(slices){
	// prepare angles and slices
	var angleslices = (2*Math.PI) /slices;
	var slicesMid = slices+1;

	// Creates vertices
	var vert = [];
	var k = 0;
	// for the mid part
	for(i = 0; i < slicesMid; i++) vert[k++] = [Math.sin(i*angleslices), 1, Math.cos(i*angleslices)];
	for(i = 0; i < slicesMid; i++) vert[k++] = [Math.sin(i*angleslices), -1, Math.cos(i*angleslices)];
	// for the top and bottom part
	for(i = 0; i < slices; i++) vert[k++] = [Math.sin(i*angleslices), 1, Math.cos(i*angleslices)];
	for(i = 0; i < slices; i++) vert[k++] = [Math.sin(i*angleslices), -1, Math.cos(i*angleslices)];
	var top = k; 	vert[k++] = [0, 1, 0];
	var bottom = k; vert[k++] = [0, -1, 0];

	// Creates indices, reset k and increase the slices for the mid part (which are separate)
	var ind = [];	k = 0;	
	for(i = 0; i < slicesMid; i++) {
		//face 1 mid part
		ind[k++] = i;
		ind[k++] = i + slicesMid;
		ind[k++] = (i + 1) % slicesMid;
		//face 2 mid part
		ind[k++] = (i + 1) % slicesMid;
		ind[k++] = i + slicesMid;
		ind[k++] = (i + 1) % slicesMid + slicesMid;
	}	
	// going back to the original number of slices to build top and bottom
	for(i = 0; i < slices; i++) {
		// upper	
		ind[k++] = i + slicesMid*2;
		ind[k++] = (i + 1) % slices + slicesMid*2;
		ind[k++] = top;
		//close bottom		
		ind[k++] = i + slicesMid*2 + slices;
		ind[k++] = bottom;
		ind[k++] = (i + 1) % slices + slicesMid*2 + slices;
	}

	var min = 0.5001;	var max = 1;
	var sliceUV = (max-min)/slices;	var radius = 0.125
	// create uv
	var uv = [];	k = 0;
	for(i = 0; i < slicesMid; i++) uv[k++] = [min+i*sliceUV,0.75]
	for(i = 0; i < slicesMid; i++) uv[k++] = [min+i*sliceUV,0.5]
	// for the top and bottom part
	for(i = 0; i < slices; i++) uv[k++] = [0.625+radius*Math.sin(i*angleslices),0.875+radius*Math.cos(i*angleslices)];
	for(i = 0; i < slices; i++) uv[k++] = [0.875+radius*Math.sin(i*angleslices),0.875+radius*Math.cos(i*angleslices)];
	uv[k++] = [0.625, 0.875]; //top
	uv[k++] = [0.875, 0.875]; //bottom

	return [blend(blend(vert,normalArray(vert,ind)),uv), ind];
}

{

	function normalMode(vert,ind,key) {		
		switch (key) {
			case "quotato":
				return [blend(vert,normalArrayQuotato(vert,ind)), ind];	
			default:
				return [blend(vert,normalArray(vert,ind)), ind];
		}
	}

	function blend(verts_A,verts_B) {
		var i,j,out;
		var lv=verts_A[0].length,ln=verts_B[0].length;		
		out = [];
		for (i = 0; i<verts_A.length;i++){
			out[i] = [];
			for (j = 0; j<lv;j++) out[i].push(verts_A[i][j]);
			for (j = 0; j<ln;j++) out[i].push(verts_B[i][j]);
		}
		return out;
	}

	function normalArray(vertices, indices){
		var normArray = new Array(vertices.length);
		// the normal vector need to keep count of all the normal applied to a vector
		for(var i=0;i<indices.length;i=i+3){
			var norm = normalVector3Points(vertices[indices[i]],vertices[indices[i+1]],vertices[indices[i+2]]);
			for(var k=0;k<3;k++) {
				if (normArray[indices[i+k]]=== undefined) normArray[indices[i+k]] = norm;
				else normArray[indices[i+k]] = addVectors(normArray[indices[i+k]] ,norm);
			}
		}
		for(var i=0;i<normArray.length;i++) normArray[i] = normalizeVector(normArray[i]);
		return normArray;
	}
	
	function normalArrayQuotato(vertices, indices) {
		var normArray = new Array(vertices.length);		
		for(var i=0;i<indices.length;i=i+3){
			// this function require a specific order of the verteces of a triangle
			// b<-a	   c
			// | /	  /|
			// |/	 / |
			// c	a->b
			var norm = normalVector3Points(vertices[indices[i]],vertices[indices[i+1]],vertices[indices[i+2]]);
			var AB = [subVector(vertices[indices[i+1]],vertices[indices[i]]),];		
			AB.push(Math.sqrt(dotProductVector(AB[0],AB[0])));
			var AC = [subVector(vertices[indices[i+2]],vertices[indices[i]]),];
			AC.push(Math.sqrt(dotProductVector(AC[0],AC[0])));
			var BC = [subVector(vertices[indices[i+2]],vertices[indices[i+1]]),];
			BC.push(Math.sqrt(dotProductVector(BC[0],BC[0])));
			var quote = [];
			quote.push(dotProductVector(AB[0],AC[0])/(AB[1]*AC[1]));
			quote.push(dotProductVector(AB[0],BC[0])/(AB[1]*BC[1]));
			quote.push(dotProductVector(BC[0],AC[0])/(BC[1]*AC[1]));
			for(var k=0;k<3;k++) {
				quote[k] = Math.acos(quote[k])
				var normalModified = scalarVector(quote[k],normalizeVector(norm));
				if (normArray[indices[i+k]]=== undefined) normArray[indices[i+k]] = normalModified;
				else normArray[indices[i+k]] = addVectors(normArray[indices[i+k]] ,normalModified);
			}
		}		
		for(var i=0;i<normArray.length;i++) normArray[i] = normalizeVector(normArray[i]);
		return normArray;
	}

	function normalVector3Points(a, b, c){
		//to obtain the normal vector of a plane generated by 3 point:	n = (B-A)×(C-A) 
		return crossProductVector(subVector(b,a),subVector(c,a));
	}

	function crossProductVector(vect_A, vect_B){
		return [
			vect_A[1] * vect_B[2] - vect_A[2] * vect_B[1],
			vect_A[2] * vect_B[0] - vect_A[0] * vect_B[2],
			vect_A[0] * vect_B[1] - vect_A[1] * vect_B[0]
		];
	}
	
	function dotProductVector(vect_A, vect_B){
		return vect_A[0] * vect_B[0]+vect_A[1] * vect_B[1]+vect_A[2] * vect_B[2];
	}
	
	function addVectors(vect_A,vect_B){	
		return [vect_A[0]+vect_B[0], vect_A[1]+vect_B[1], vect_A[2]+vect_B[2]];
	}
	
	function subVector(vect_A,vect_B){	
		return [vect_A[0]-vect_B[0], vect_A[1]-vect_B[1], vect_A[2]-vect_B[2]];
	}
	
	function normalizeVector(vector){
		return scalarVector(1/Math.sqrt(dotProductVector(vector,vector)), vector);
	}
	
	function scalarVector(scalar, vector){
		return [scalar*vector[0],scalar*vector[1],scalar*vector[2]];
	}
}