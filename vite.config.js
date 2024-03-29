import { sveltekit } from '@sveltejs/kit/vite';
import unocss from "unocss/vite"
import { presetUno,presetIcons } from 'unocss';
import { VitePWA } from 'vite-plugin-pwa';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [unocss({
		presets: [
			presetUno(),
			presetIcons()
		]
	}), sveltekit(), VitePWA({
		registerType: 'autoUpdate',
		manifest: {
			name: 'Geta',
			short_name: 'Geta',
			description: 'Bill Splitting Calculator',
			theme_color: '#ffffff',
			background_color: '#ffffff',
		}
	})]
};

export default config;
