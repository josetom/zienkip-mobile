// cross verify with node_modules/@ionic/app-scripts/config/copy.config.js
//
// Existing copy configs
// ---------------------
// copyAssets
// copyIndexContent
// copyFonts
// copyPolyfills
// copySwToolbox

module.exports = {

	copyMomentTimezone: {
		src: ['{{ROOT}}/node_modules/moment-timezone/data/meta/latest.json'],
		dest: '{{WWW}}/node_modules/moment-timezone/data/meta'
	}

};