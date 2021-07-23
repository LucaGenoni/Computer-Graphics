function shaders() {
// The shader can find the required informations in the following variables:

//vec3 fs_pos;		// Position of the point in 3D space
//
//vec3  Pos;		// Position of first (or single) light
//vec3  Dir;		// Direction of first (or single) light
//float ConeOut;	// Outer cone (in degree) of the light (if spot)
//float ConeIn;		// Inner cone (in percentage of the outher cone) of the light (if spot)
//float Decay;		// Decay factor (0, 1 or 2)
//float Target;		// Target distance
//vec4  lightColor;	// color of the first light
//		
//
//vec4 ambientLightColor;		// Ambient light color. For hemispheric, this is the color on the top
//vec4 ambientLightLowColor;	// For hemispheric ambient, this is the bottom color
//vec3 ADir;					// For hemispheric ambient, this is the up direction
//vec4 SHconstColor;		// For spherical harmonics, constant term
//vec4 SHDeltaLxColor;		// For spherical harmonics, DeltaLx color
//vec4 SHDeltaLyColor;		// For spherical harmonics, DeltaLy color
//vec4 SHDeltaLzColor;		// For spherical harmonics, DeltaLz color
//
//vec3 normalVec;				// direction of the normal vector to the surface
//
//
// Final direction and colors are returned into:
//vec3 OlightDir;
//
//and intensity is returned into:
//
//vec4 OlightColor;
//
// Ambient light contribution is returned into
//
// vec4 ambientColor;

// Single directional light, constant ambient
var pointLight =`
	// Single point light
	OlightDir = normalize(Pos - fs_pos);
	float Reflection = max(dot(OlightDir, normalVec),0.0)==0.0 ? 0.0:1.0;
	OlightColor = lightColor * Reflection;
`
var decay =`
	// with decay
	OlightColor *= pow(Target/length(Pos - fs_pos),Decay);
`

var spotlight =`
	// spotlight
	OlightColor *= clamp( (dot(OlightDir,Dir) - cos(radians(ConeOut/2.0))) / (cos(radians(ConeOut*ConeIn/2.0)) - cos(radians(ConeOut/2.0))) ,0.0,1.0);
`
var S1 = `
	// Single directional light
	OlightDir = Dir;
	float Reflection = max(dot(Dir, normalVec),0.0)==0.0 ? 0.0:1.0;
	OlightColor = lightColor * Reflection;

	// Ambient
	ambientColor = ambientLightColor;
`;

// Single point light without decay
var S2 = pointLight;

// Single spot light (without decay), constant ambient
var S3 = pointLight + spotlight+`
	// Ambient
	ambientColor = ambientLightColor;
`;

// Single point light with decay
var S4 = pointLight + decay;

// Single spot light with decay
var S5 = pointLight+ decay + spotlight;

// Single point light, hemispheric ambient 
var S6 = pointLight+`
	// hemispheric ambient
	float highLight = (dot(normalVec,ADir)+1.0)/2.0;
	ambientColor = ambientLightColor * highLight;
	ambientColor += ambientLightLowColor * (1.0 - highLight);
`;

// Single spot light, spherical harmonics ambient
var S7 = pointLight + spotlight +`
	// Spherical harmonics ambient
	ambientColor = SHconstColor;
	ambientColor += normalVec.x * SHDeltaLxColor;
	ambientColor += normalVec.y * SHDeltaLyColor;
	ambientColor += normalVec.z * SHDeltaLzColor;
`;
	return [S1, S2, S3, S4, S5, S6, S7];
}

