import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		paths: {
			base: dev ? '' : '/time-tracker'
		},
		adapter: adapter({
			pages: 'docs',
			assets: 'docs'
		})
	}
};

export default config;
