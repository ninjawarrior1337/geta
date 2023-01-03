import { sveltekit } from '@sveltejs/kit/vite';
import unocss from "unocss/vite"
import {extractorSvelte} from "@unocss/core"
import { presetUno,presetIcons } from 'unocss';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [unocss({
		extractors: [extractorSvelte],
		presets: [
			presetUno(),
			presetIcons()
		]
	}), sveltekit()]
};

export default config;
