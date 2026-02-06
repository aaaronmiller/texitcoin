<script lang="ts">
	import "$lib/report/styles.css";
	import { ThemeToggle } from "$lib/report";
	import { themeStore } from "$lib/report/stores/theme";
	import { base } from "$app/paths";

	let { children } = $props();
</script>

<svelte:head>
	<title>TEXITcoin Intelligence Platform</title>
</svelte:head>

<div class="theme-report {$themeStore}">
	<header class="header no-print">
		<nav class="container header-nav">
			<a href="{base}/report" class="logo">
				<span class="logo-text">TXC</span>
				<span class="logo-suffix">Intel</span>
			</a>
			<div class="header-actions">
				<button
					class="btn btn-secondary export-btn"
					onclick={() => window.print()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
						<polyline points="7 10 12 15 17 10" />
						<line x1="12" y1="15" x2="12" y2="3" />
					</svg>
					Export PDF
				</button>
				<ThemeToggle />
			</div>
		</nav>
	</header>

	<main id="main-content">
		{@render children()}
	</main>

	<footer class="footer no-print">
		<div class="container">
			<p class="text-muted">
				TEXITcoin Forensic Intelligence Platform • Last Updated:
				February 2026 •
				<a href="#methodology" class="footer-link"
					>Methodology & Sources</a
				>
			</p>
			<p class="disclaimer text-muted">
				<strong>Disclaimer:</strong> This report is for informational and
				educational purposes only. It does not constitute financial, legal,
				or investment advice. Always conduct your own research.
			</p>
		</div>
	</footer>
</div>

<style>
	.theme-report {
		min-height: 100vh;
		background-color: var(--background);
		color: var(--foreground);
	}
	.header {
		position: sticky;
		top: 0;
		z-index: var(--z-sticky);
		background: var(--background);
		border-bottom: 1px solid var(--border);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.header-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 64px;
	}

	.logo {
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
		text-decoration: none;
		font-family: var(--font-display);
	}

	.logo-text {
		font-size: var(--text-xl);
		font-weight: 800;
		color: var(--accent-warning);
	}

	.logo-suffix {
		font-size: var(--text-lg);
		font-weight: 500;
		color: var(--muted);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.export-btn {
		display: none;
	}

	@media (min-width: 640px) {
		.export-btn {
			display: inline-flex;
		}
	}

	.footer {
		padding: var(--space-8) 0;
		border-top: 1px solid var(--border);
		text-align: center;
	}

	.footer p {
		font-size: var(--text-sm);
		margin-bottom: var(--space-2);
	}

	.footer-link {
		color: var(--accent-info);
		text-decoration: none;
	}

	.footer-link:hover {
		text-decoration: underline;
	}

	.disclaimer {
		max-width: 600px;
		margin: var(--space-4) auto 0;
		font-size: var(--text-xs);
		line-height: 1.5;
	}

	main {
		min-height: calc(100vh - 64px - 200px);
	}
</style>
