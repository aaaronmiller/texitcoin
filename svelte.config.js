import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// GitHub Pages serves from the build directory
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		// Base path for GitHub Pages (will be set via environment variable for repo name)
		paths: {
			base: process.env.BASE_PATH || ''
		},
		prerender: {
			entries: ['/', '/report', '/strike'],
			origin: 'http://localhost'
		}
	}
};

export default config;
