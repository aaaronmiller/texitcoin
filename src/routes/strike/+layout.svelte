<script lang="ts">
	import "$lib/strike/styles.css";
    let { children } = $props();
</script>

<svelte:head>
	<title>Carrion Capital | Strategic Intelligence Briefing</title>
</svelte:head>

<div class="theme-strike">
    <div id="main-content">
        {@render children()}
    </div>
</div>

<style>
    .theme-strike {
        min-height: 100vh;
        background-color: var(--background);
        color: var(--foreground);
    }
	#main-content {
		width: 100%;
		min-height: 100vh;
	}
</style>
