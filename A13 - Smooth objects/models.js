function buildGeometry() {
	// Draws a pyramid --- Already done, just for inspiration
	var vert = [[0.0,1.0,0.0, 0.0, 0.4472,-0.8944],[ 1.0,-1.0,-1.0, 0.0, 0.4472,-0.8944],[-1.0,-1.0,-1.0, 0.0, 0.4472,-0.8944],
				 [0.0,1.0,0.0, 0.8944, 0.4472,0.0],[ 1.0,-1.0, 1.0, 0.8944, 0.4472,0.0],[ 1.0,-1.0,-1.0, 0.8944, 0.4472,0.0], 
				 [0.0,1.0,0.0, 0.0, 0.4472,0.8944],[-1.0,-1.0, 1.0, 0.0, 0.4472,0.8944],[ 1.0,-1.0, 1.0, 0.0, 0.4472,0.8944], 
				 [0.0,1.0,0.0, -0.8944, 0.4472,0.0],[-1.0,-1.0,-1.0, -0.8944, 0.4472,0.0],[-1.0,-1.0, 1.0, -0.8944, 0.4472,0.0], 
				 [-1.0,-1.0,-1.0, 0.0,-1.0,0.0],[1.0,-1.0,-1.0, 0.0,-1.0,0.0], [1.0,-1.0,1.0, 0.0,-1.0,0.0], [-1.0,-1.0,1.0, 0.0,-1.0,0.0],
				];
	var ind = [0, 1, 2,  3, 4, 5,  6, 7, 8,  9, 10, 11,  12, 13, 14,  12, 14, 15];
	var color1 = [0.0, 0.0, 1.0];
	addMesh(vert, ind, color1);
	
	// Draws a cube -- To do for the assignment.
	var dataCube = cube()
	var color2 = [0.0, 1.0, 1.0];
	addMesh(dataCube[0], dataCube[1], color2);
	
	// // Draws function y = sin(x) * cos(z) with -3 <= x <= 3 and -3 <= z <= 3 -- To do for the assignment.	
	// // I write 3 different method to obtain the normals
	// // 1) add all normals of triangles of a vertex 
	// // 		-> High error in low poli
	// var dataSurface = surface(2,6)
	// var color3 = [0.0, 1.0, 1.0];
	// addMesh(dataSurface[0], dataSurface[1], color3);

	// // 2) add all normals of triangles of a vertex by means of a weight (the angle)
	// // 		-> Require a specific order of vertex 
	// // 		-> High error only at the border
	// var dataSurface = surface(2,6,"quotato")
	// var color3 = [0.0, 1.0, 1.0];
	// addMesh(dataSurface[0], dataSurface[1], color3);
	
	// // 3) computing the partial derivative of the point.
	// var dataSurface = surface(2,6,"derivate")
	// var color3 = [0.0, 1.0, 1.0];
	// addMesh(dataSurface[0], dataSurface[1], color3);

	// In High poli the 3 methods give the same result 
	// this is possible due to the fact that more triangles means less error
	// and more like a limit therefore derivative.
	var dataSurface = surface(10,3,"derivate")
	var color3 = [0.0, 1.0, 1.0];
	addMesh(dataSurface[0], dataSurface[1], color3);

	// Draws a Cylinder --- To do for the assignment	
	// var dataCylinder = cylinder(5)
	// var color4 = [1.0, 1.0, 0.0];
	// addMesh(dataCylinder[0], dataCylinder[1], color4);	
	// var dataCylinder = cylinder(5,"quotato")
	// var color4 = [1.0, 1.0, 0.0];
	// addMesh(dataCylinder[0], dataCylinder[1], color4);
	var dataCylinder = cylinder(50)
	var color4 = [1.0, 1.0, 0.0];
	addMesh(dataCylinder[0], dataCylinder[1], color4);

	// Draws a Sphere --- To do for the assignment.		
	// var dataSphere = sphere(5,3,"quotato")
	// var color5 = [1.0, 0.0, 0.0];
	// addMesh(dataSphere[0], dataSphere[1], color5);
	var dataSphere = sphere(50,30)
	var color5 = [1.0, 0.0, 0.0];
	addMesh(dataSphere[0], dataSphere[1], color5);
}

function surface(precision,range,key) {	
	if (precision<=0 || precision==undefined) precision = 1;
	if (range<=0 || range==undefined) range = 3;
	var max = 2 * range * precision;

	// Creates vertices
	var vert = [];
	var k = 0;
	for(i = 0; i <= max; i++) {
		for(j = 0; j <= max; j++) {
			x = i/precision - range;
			z = j/precision - range;
			y = Math.sin(x) * Math.cos(z)
			vert[k++] = [x, y, z];			
		}
	}
	
	// Creates indices
	var ind = [];	k = 0;
	max+=1
	for(i = 0; i < max-1; i++) {
		for(j = 0; j < max-1; j++) {
			//first face-up triangle 2 point along same x
			ind[k++] = ((i+1) % max * max) + j;
			ind[k++] = i * max + j;
			ind[k++] = i * max + (j + 1);	
			//second face-up triangle 2 point along same x+1
			ind[k++] = i * max + j + 1;
			ind[k++] = ((i+1) % max * max) + j+1;	
			ind[k++] = ((i+1) % max * max) + j;		
		}
	}

	return normalMode(vert,ind,key);
}

function cube(key){
	var vert = [
		//front
			[-1.0,-1.0,-1.0],[-1.0,1.0,-1.0],[1.0,1.0,-1.0],
			[1.0,1.0,-1.0],[1.0,-1.0,-1.0],[-1.0,-1.0,-1.0],	
		//back
			[-1.0,-1.0,1.0],[1.0,1.0,1.0],[-1.0,1.0,1.0],
			[1.0,1.0,1.0],[-1.0,-1.0,1.0],[1.0,-1.0,1.0],
		//dx face
			[1.0,1.0,-1.0],[1.0,1.0,1.0],[1.0,-1.0,-1.0],
			[1.0,1.0,1.0],[1.0,-1.0,1.0],[1.0,-1.0,-1.0],
		//sx face
			[-1.0,1.0,-1.0],[-1.0,-1.0,-1.0],[-1.0,1.0,1.0],
			[-1.0,1.0,1.0],[-1.0,-1.0,-1.0],[-1.0,-1.0,1.0],
		//top face
			[-1.0,1.0,-1.0],[1.0,1.0,1.0],[1.0,1.0,-1.0],
			[-1.0,1.0,1.0],[1.0,1.0,1.0],[-1.0,1.0,-1.0],
		//bottom face
			[-1.0,-1.0,-1.0],[1.0,-1.0,-1.0],[1.0,-1.0,1.0],
			[-1.0,-1.0,1.0],[-1.0,-1.0,-1.0],[1.0,-1.0,1.0]	
		];			

	var ind = [];
	for(var i=0;i<36;i++) ind.push(i);

	return normalMode(vert,ind,key);
}

function sphere(slices,quotes,key){
	var quota = quotes;
	var anglequota = (Math.PI) /quota;
	var angleslice = (2*Math.PI) /slices;
	// Creates vertices
	var k = 0;
	var vert = [];
	for(j = 1; j < quota; j++) {
		for(i = 0; i < slices; i++) {
			x = Math.sin(i*angleslice) * Math.sin(j*anglequota);
			y = Math.cos(j*anglequota);
			z = Math.cos(i*angleslice) * Math.sin(j*anglequota);
			vert[k++] = [x, y, z];
		}
	}
	var top = k;	vert[k++] = [0, 1, 0];
	var bottom = k;	vert[k++] = [0, -1, 0];

	// Creates indices
	var ind = [];
	k = 0;
	for(i = 0; i < slices; i++) {
		// upper	
		ind[k++] = top;	
		ind[k++] = i ;
		ind[k++] = (i + 1) % slices ;
		for(j = 0; j < quota-2; j++) {
			
			ind[k++] = (i + 1) % slices + (j) * slices;
			ind[k++] = i + (j) * slices ;
			ind[k++] = i + (j + 1) * slices ;
			
			ind[k++] = (i + 1) % slices + (j + 1)* slices ;
			ind[k++] = (i + 1) % slices + (j) * slices ;
			ind[k++] = i + (j + 1) * slices ;
		}
		//close bottom		
		ind[k++] = i + (j) * slices ;
		ind[k++] = bottom;
		ind[k++] = (i + 1) % slices + (j) * slices;
	}
	
	return normalMode(vert,ind,key);
}

function cylinder(slices,key){
	var angleslice = (2*Math.PI) /slices;

	// Creates vertices	
	var vert = [];	var k = 0;
	// for the mid part
	for(i = 0; i < slices; i++) vert[k++] = [Math.sin(i*angleslice), 1, Math.cos(i*angleslice)];
	for(i = 0; i < slices; i++) vert[k++] = [Math.sin(i*angleslice), -1, Math.cos(i*angleslice)];
	// for the top and bottom part
	for(i = 0; i < slices; i++) vert[k++] = [Math.sin(i*angleslice), 1, Math.cos(i*angleslice)];
	for(i = 0; i < slices; i++) vert[k++] = [Math.sin(i*angleslice), -1, Math.cos(i*angleslice)];
	var top = k;	vert[k++] = [0, 1, 0];
	var bottom = k;	vert[k++] = [0, -1, 0];

	// Creates indices
	var ind = [];	k = 0;
	for(i = 0; i < slices; i++) {
		//face 1 mid part
		ind[k++] = (i + 1) % slices;
		ind[k++] = i;
		ind[k++] = i + slices;
		//face 2 mid part
		ind[k++] = i + slices;
		ind[k++] = (i + 1) % slices + slices;
		ind[k++] = (i + 1) % slices;
		// upper	
		ind[k++] = i + slices*2;
		ind[k++] = (i + 1) % slices + slices*2;
		ind[k++] = top;
		//close bottom		
		ind[k++] = i + slices*3;
		ind[k++] = bottom;
		ind[k++] = (i + 1) % slices + slices*3;
	}
		
	return normalMode(vert,ind,key);
}

{

	function normalMode(vert,ind,key) {		
		switch (key) {
			case "derivate":
				return [blend(vert,normalArrayDerivate(vert)), ind];	
			case "quotato":
				// Here the vertex normal is formed by adding to a vertex
				// all the weighted normal of the triangles connected to the vertex.
				// the weighting is done using the angle of the triangle of the of the vertex
				return [blend(vert,normalArrayQuotato(vert,ind)), ind];	
			default:
				// Here the vertex normal is formed by adding to a vertex
				// all the normal of the triangles connected to the vertex.
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

	function normalArrayDerivate(vert) {
		var normArray = new Array(vert.length);		
		for(var i=0;i<vert.length;i++){
			normArray[i] = [
				-Math.cos(vert[i][0])*Math.cos(vert[i][2]),
				1,
				Math.sin(vert[i][0])*Math.sin(vert[i][2])
			]
		}
		for(var i=0;i<normArray.length;i++) normArray[i] = normalizeVector(normArray[i]);
		return normArray
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