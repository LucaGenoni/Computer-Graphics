function shaders() {
// The shader can find the required informations in the following variables:

//vec3 fs_pos;		// Position of the point in 3D space
//
//float SpecShine;		// specular coefficient for both Blinn and Phong
//float DToonTh;		// Threshold for diffuse in a toon shader
//float SToonTh;		// Threshold for specular in a toon shader
//
//vec4 diffColor;		// diffuse color
//vec4 ambColor;		// material ambient color
//vec4 specularColor;	// specular color
//vec4 emit;			// emitted color
//	
//vec3 normalVec;		// direction of the normal vecotr to the surface
//vec3 eyedirVec;		// looking direction
//
//
// Lighr directions can be found into:
//vec3 lightDirA;
//vec3 lightDirB;
//vec3 lightDirC;
//
//and intensity is returned into:
//
//vec4 lightColorA;
//vec4 lightColorB;
//vec4 lightColorC;
//
// Ambient light contribution can be found intop
//
// vec4 ambientLight;

// Lambert diffuse and Ambient material. No specular or emisssion.
var S1 = `
	// Lambert diffuse
	vec4 LAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 LBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 LCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	out_color = diffColor * (LAcontr + LBcontr + LCcontr);
	
	// Ambient material
	out_color += ambientLight * ambColor;
	
	// Final
	out_color = clamp(out_color, 0.0, 1.0);
`;

// Lambert diffuse and Blinn specular. No ambient and emission.
var S2 = `
	// Reflection_Intensity 
	float Reflection_A = clamp(dot(lightDirA, normalVec),0.0,1.0);
	float Reflection_B = clamp(dot(lightDirB, normalVec),0.0,1.0);
	float Reflection_C = clamp(dot(lightDirC, normalVec),0.0,1.0);

	// Lambert diffuse
	vec4 LAcontr = Reflection_A * lightColorA;
	vec4 LBcontr = Reflection_B * lightColorB;
	vec4 LCcontr = Reflection_C * lightColorC;
	out_color = diffColor * (LAcontr + LBcontr + LCcontr);

	// Blinn specular
	vec4 BlinnAcontr = pow(clamp(dot(normalVec, normalize(eyedirVec+lightDirA)),0.0,1.0), SpecShine) * lightColorA * (Reflection_A==0.0 ? 0.0:1.0);
	vec4 BlinnBcontr = pow(clamp(dot(normalVec, normalize(eyedirVec+lightDirB)),0.0,1.0), SpecShine) * lightColorB * (Reflection_B==0.0 ? 0.0:1.0);
	vec4 BlinnCcontr = pow(clamp(dot(normalVec, normalize(eyedirVec+lightDirC)),0.0,1.0), SpecShine) * lightColorC * (Reflection_C==0.0 ? 0.0:1.0);
	out_color += specularColor * (BlinnAcontr + BlinnBcontr + BlinnCcontr);

	// Final
	out_color = clamp(out_color, 0.0, 1.0);
`;

// Ambient and Phong specular. No emssion and no diffuse.
var S3 = `
	// Reflection_Intensity 
	float Reflection_A = clamp(dot(lightDirA, normalVec),0.0,1.0);
	float Reflection_B = clamp(dot(lightDirB, normalVec),0.0,1.0);
	float Reflection_C = clamp(dot(lightDirC, normalVec),0.0,1.0);
	
	// Phong specular
	vec4 PhongAcontr = pow(clamp(dot(eyedirVec, -reflect(lightDirA,normalVec)),0.0,1.0), SpecShine) * lightColorA * (Reflection_A==0.0 ? 0.0:1.0);
	vec4 PhongBcontr = pow(clamp(dot(eyedirVec, -reflect(lightDirB,normalVec)),0.0,1.0), SpecShine) * lightColorB * (Reflection_B==0.0 ? 0.0:1.0);
	vec4 PhongCcontr = pow(clamp(dot(eyedirVec, -reflect(lightDirC,normalVec)),0.0,1.0), SpecShine) * lightColorC * (Reflection_C==0.0 ? 0.0:1.0);
	out_color += specularColor * (PhongAcontr + PhongBcontr + PhongCcontr);

	// Ambient material
	out_color += ambientLight * ambColor;

	// Final
	out_color = clamp(out_color, 0.0, 1.0);
`;

// Diffuse, ambient, emission and Phong specular.
var S4 = `
	// Reflection_Intensity 
	float Reflection_A = clamp(dot(lightDirA, normalVec),0.0,1.0);
	float Reflection_B = clamp(dot(lightDirB, normalVec),0.0,1.0);
	float Reflection_C = clamp(dot(lightDirC, normalVec),0.0,1.0);
	
	// Lambert diffuse
	vec4 LAcontr = Reflection_A * lightColorA;
	vec4 LBcontr = Reflection_B * lightColorB;
	vec4 LCcontr = Reflection_C * lightColorC;
	out_color = diffColor * (LAcontr + LBcontr + LCcontr);

	// Phong specular
	vec4 PhongAcontr = pow(clamp(dot(eyedirVec, -reflect(lightDirA,normalVec)),0.0,1.0), SpecShine) * lightColorA * (Reflection_A==0.0 ? 0.0:1.0);
	vec4 PhongBcontr = pow(clamp(dot(eyedirVec, -reflect(lightDirB,normalVec)),0.0,1.0), SpecShine) * lightColorB * (Reflection_B==0.0 ? 0.0:1.0);
	vec4 PhongCcontr = pow(clamp(dot(eyedirVec, -reflect(lightDirC,normalVec)),0.0,1.0), SpecShine) * lightColorC * (Reflection_C==0.0 ? 0.0:1.0);
	out_color += specularColor * (PhongAcontr + PhongBcontr + PhongCcontr);

	// Ambient material
	out_color += ambientLight * ambColor;

	// Emission
	out_color += emit;

	// Final
	out_color = clamp(out_color, 0.0, 1.0);
`;

// Ambient, Toon diffuse and and Toon (Blinn based) specular. No emssion.
var S5 = `
	// Toon - Reflection_Intensity 
	float Reflection_A = dot(lightDirA, normalVec) <= DToonTh ? 0.0:1.0;
	float Reflection_B = dot(lightDirB, normalVec) <= DToonTh ? 0.0:1.0;
	float Reflection_C = dot(lightDirC, normalVec) <= DToonTh ? 0.0:1.0;
	// Toon - Lambert diffuse
	vec4 LAcontr = Reflection_A * lightColorA;
	vec4 LBcontr = Reflection_B * lightColorB;
	vec4 LCcontr = Reflection_C * lightColorC;
	out_color = diffColor * (LAcontr + LBcontr + LCcontr);

	// Toon - Blinn specular - shown only if the LAcontr is not black
	vec4 BlinnAcontr = (clamp(dot(normalVec, normalize(eyedirVec+lightDirA)),0.0,1.0) <= SToonTh) ? LAcontr * 0.0 : LAcontr;
	vec4 BlinnBcontr = (clamp(dot(normalVec, normalize(eyedirVec+lightDirA)),0.0,1.0) <= SToonTh) ? LBcontr * 0.0 : LBcontr;
	vec4 BlinnCcontr = (clamp(dot(normalVec, normalize(eyedirVec+lightDirA)),0.0,1.0) <= SToonTh) ? LCcontr * 0.0 : LCcontr;
	out_color += specularColor * (BlinnAcontr + BlinnBcontr + BlinnCcontr);	

	// Ambient material
	out_color += ambientLight * ambColor;

	// Final
	out_color = clamp(out_color, 0.0, 1.0);
`;

	return [S1, S2, S3, S4, S5];
}

