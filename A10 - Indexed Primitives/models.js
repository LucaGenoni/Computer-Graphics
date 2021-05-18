function buildGeometry() {	
	var data = surface();
	var color2 = [0.0, 0.0, 1.0];
	addMesh(data[0], data[1], color2);
		
	data = halfShere(10,5);
	var color3 = [0.0, 1.0, 0.0];
	addMesh(data[0], data[1], color3);
	
}

function surface(precision,range) {	
	// Draws function y = sin(x) * cos(z) with -3 <= x <= 3 and -3 <= z <= 3.
	// precision represent how many triangle there are for each unit
	if (precision<=0 || precision==undefined) precision = 1;
	if (range<=0 || range==undefined) range = 3;
	var max = 2 * range * precision;

	// Creates vertices
	var vert = [];	var k = 0;
	for(i = 0; i <= max; i++) {
		for(j = 0; j <= max; j++) {
			x = i/precision - range;
			z = j/precision - range;
			y = Math.sin(x) * Math.cos(z);
			vert[k++] = [x, y, z];
		}
	}
	
	// Creates indices
	var ind = [];	k = 0;	max++;
	for(i = 0; i < max-1; i++) {
		for(j = 0; j < max-1; j++) {
			//first face-up triangle 2 point along same x
			ind[k++] = i * max + j;
			ind[k++] = i * max + (j + 1);
			ind[k++] = ((i+1) % max * max) + j;
			//second face-up triangle 2 point along same x+1
			ind[k++] = ((i+1) % max * max) + j;
			ind[k++] = i * max + j + 1;
			ind[k++] = ((i+1) % max * max) + j+1;
			//face-down triangle 2 point along same x
			ind[k++] = i * max + j;
			ind[k++] = ((i+1) % max * max) + j;
			ind[k++] = i * max + (j + 1);
			//face-down triangle 2 point along same x+1
			ind[k++] = ((i+1) % max * max) + j;
			ind[k++] = ((i+1) % max * max) + j+1;
			ind[k++] = i * max + j + 1;
		}
	}
	return [vert,ind];
}

function halfShere(slice,quota){	
	if (quota<=0 || quota==undefined) quota = 1;
	if (slice<=0 || slice==undefined) slice = 3;
	// as for the assignment 1 i use angle section to compute the angle faster, without divisions.
	var anglequota = (Math.PI/2) / quota;
	var angleslice = (2*Math.PI) / slice;

	// Creates vertices
	var vert = [];	k = 0;
	for(j = 1; j <= quota; j++) {
		for(i = 0; i < slice; i++) {
			x = Math.sin(i*angleslice) * Math.sin(j*anglequota);
			y = Math.cos(j*anglequota);
			z = Math.cos(i*angleslice) * Math.sin(j*anglequota);
			vert[k++] = [x, y, z];
		}
	}
	// top and bottom needs to be stored in as a single vertex
	var top = k;	vert[k++] = [0, 1, 0];
	var bottom = k;	vert[k++] = [0, 0, 0];

	// Creates indices
	var ind = [];	k = 0;
	for(i = 0; i < slice; i++) {
		// upper
		ind[k++] = i;
		ind[k++] = (i + 1) % slice;
		ind[k++] = top;
		for(j = 0; j < quota-1; j++) {
			//first face-up triangle 2 point along same x
			ind[k++] = i + (j) * slice;
			ind[k++] = i + (j + 1) * slice;
			ind[k++] = (i + 1) % slice + (j) * slice;
			//second face-up triangle 2 point along same x+1
			ind[k++] = (i + 1) % slice + (j) * slice;
			ind[k++] = i + (j + 1) * slice;
			ind[k++] = (i + 1) % slice + (j + 1)* slice;
		}
		//close bottom
		ind[k++] = i + (j) * slice;
		ind[k++] = bottom;
		ind[k++] = (i + 1) % slice + (j) * slice;
	}
	return [vert,ind];
}
