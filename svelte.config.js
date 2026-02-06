import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// GitHub Pages serves from the docs directory
			pages: 'docs',
			assets: 'docs',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		// Base path for GitHub Pages (will be set via environment variable for repo name)
		paths: {
			base: process.env.BASE_PATH || '/texitcoin'
		},
		prerender: {
			entries: ['/', '/report', '/strike'],
			origin: 'http://localhost',
			handleHttpError: ({ status, path }) => {
				if (status === 404) return; // ignore 404s during prerender
				throw new Error(`${status} ${path}`);
			}
		}
	}
};

export default config;
