<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { base } from "$app/paths";

    let scrollProgress = $state(0);
    let activeSlide = $state(0);
    
    const slideIds = [
        'executive-summary',
        'founder-profile', 
        'hashrate-anomaly',
        'tokenomics',
        'security',
        'partnerships',
        'comparison',
        'risk-assessment',
        'methodology'
    ];

    onMount(() => {
        if (browser) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('slide-visible');
                            const idx = slideIds.indexOf(entry.target.id);
                            if (idx !== -1) activeSlide = idx;
                        }
                    });
                },
                { threshold: 0.2 }
            );

            document.querySelectorAll('.a4-frame').forEach(el => observer.observe(el));

            const handleScroll = () => {
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                scrollProgress = Math.min(100, (window.scrollY / docHeight) * 100);
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => {
                observer.disconnect();
                window.removeEventListener('scroll', handleScroll);
            };
        }
    });

    function scrollToSlide(id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
</script>

<svelte:head>
    <title>TEXITcoin Intelligence Report | TXC Forensic Analysis</title>
    <meta
        name="description"
        content="Comprehensive forensic analysis of TEXITcoin (TXC) cryptocurrency. Independent investigation covering founder history, hashrate anomalies, partnership verification, and risk assessment."
    />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

<!-- Scroll Progress Bar -->
<div class="scroll-progress" style="width: {scrollProgress}%"></div>

<!-- Side Navigation -->
<nav class="slide-nav">
    {#each slideIds as id, i}
        <button 
            class="nav-dot" 
            class:active={activeSlide === i}
            onclick={() => scrollToSlide(id)}
            title="Slide {i + 1}"
        >
            <span class="dot"></span>
        </button>
    {/each}
</nav>

<!-- Back to Gateway -->
<a href="{base}/" class="back-link">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
    Gateway
</a>

<main class="report-main">
