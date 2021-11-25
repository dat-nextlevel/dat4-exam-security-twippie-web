const colors = require('tailwindcss/colors');

module.exports = {
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	},
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors,
		container: {
			center: true
		},
		extend: {},
	},
	variants: {
		container: [],
	},
	plugins: [],
}
