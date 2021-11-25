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
		extend: {},
	},
	variants: {
		container: [],
	},
	plugins: [],
}
