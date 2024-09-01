const defaultConfig = require('tailwindcss/defaultConfig')
const formsPlugin = require('@tailwindcss/forms')

/** @type {import('tailwindcss/types').Config} */
const config = {
	content: ['index.html', 'src/**/*.tsx'],
	theme: {
		fontFamily: {
			sans: ['Roboto Slab', ...defaultConfig.theme.fontFamily.sans]
		},
		extend: {
			backgroundImage: {
				'quest-counter': "url('src/assets/quest-counter.png')",
				'menu-border': "url('src/assets/menuBorder.png')"
			}
		}
	},
	experimental: { optimizeUniversalDefaults: true },
	plugins: [formsPlugin]
}
module.exports = config
