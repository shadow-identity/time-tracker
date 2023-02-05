import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ mode }) => {
	const config = {
		plugins: [sveltekit()],
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		}
	};

	mode === 'development' && config.plugins.push(basicSsl());
	return config;
});
