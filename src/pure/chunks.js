export const defaultChunks = {
	'alphamap_fragment':  `alpha *= vProgress * opacity;`,
	// 'alphamap_fragment':  `alpha *= opacity;`,
	'color_pars_fragment':  `
		uniform vec3 color;
		uniform float opacity;
	`,
	'color_fragment':  `
		// diffuseColor = color;
		diffuseColor = vec3(
			color.x,
			color.y * vProgress,
			color.z * vProgress
		);
	`,
};

export const progressChunks = {
	'progress_pars_vertex':  `
		uniform float progress;
		uniform float total;
		in float index;
		out float vProgress;

    // source https://github.com/trinketmage/sword
		float stagger(float duration, float stagger, float total, float index, float progress) {
			float staggers = (total * stagger);
			float maxDuration = duration + staggers;
			float space = duration / maxDuration;
			float offset = (index * stagger) / maxDuration;    
			return smoothstep(offset, offset + space, progress);
		}
	`,
	'progress_vertex':  `
		vProgress = stagger(1.0, 0.1, total, index, progress);
	`,
	'progress_pars_fragment':  `in float vProgress;`,
};

export const negateChunks = {
	'negate_fragment':  `s = vec3(1.0) - s;`
};
