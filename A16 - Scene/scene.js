function drawSceneTree(S) {
	var i,localmatrix = [];
	// Compute the local matrix for each object
	for(i = 0; i < S.length; i++) 
		localmatrix[i] = utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
			utils.MakeTranslateMatrix(S[i][0], S[i][1], S[i][2]),
			utils.MakeRotateZMatrix(S[i][5])),
			utils.MakeRotateXMatrix(S[i][3])),
			utils.MakeRotateYMatrix(S[i][4]));
	// Then compute their world matrix
	for (i = 0; i < S.length; i++) for (j=S[i][6];j<=S[i][7] && j>=0;j++)
		localmatrix[j] = utils.multiplyMatrices(localmatrix[i],localmatrix[j]);
	// At last draw them all.
	for (i = 0; i < S.length; i++) draw(i, localmatrix[i]);	
}