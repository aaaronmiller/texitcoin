<script>
    import { base } from "$app/paths";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    let mouseX = $state(0);
    let mouseY = $state(0);
    let loaded = $state(false);

    onMount(() => {
        loaded = true;
    });

    function handleMouseMove(e) {
        if (browser) {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        }
    }
</script>

<svelte:head>
    <title>TXC Intelligence Operations | Secure Gateway</title>
    <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&family=JetBrains+Mono&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<div class="gateway-wrapper" onmousemove={handleMouseMove}>
    <!-- Abstract Data Grid Overlay -->
    <div class="data-grid-overlay"></div>

    <!-- Circuit Pattern Overlay -->
    <div class="circuit-overlay"></div>

    <!-- Background Hero with Parallax -->
    <div
        class="hero-bg"
        style="transform: translate({mouseX * 0.5}px, {mouseY *
            0.5}px) scale(1.1);"
    >
        <img src="{base}/gateway_hero.png" alt="Split reality gateway" />
        <div class="vignette"></div>
    </div>

    <!-- Content Container -->
    <div class="content-container" class:loaded>
        <header class="gateway-header">
            <h1 class="glitch-text" data-text="INTELLIGENCE PROTOCOL">
                INTELLIGENCE PROTOCOL
            </h1>
            <p class="subtitle">SELECT YOUR CLEARANCE LEVEL</p>
        </header>

        <div class="cards-wrapper">
            <!-- Left: The Autopsy -->
            <a
                href="{base}/report"
                class="gateway-card report"
                style="--tilt-x: {-mouseX * 0.2}deg; --tilt-y: {mouseY *
                    0.2}deg;"
            >
                <div class="card-glass">
                    <div class="card-line-top"></div>
                    <div class="card-content">
                        <div class="card-header">
                            <span class="card-id">FILE-404</span>
                        </div>
                        <h2>Forensic Autopsy</h2>
                        <div class="stat-row">
                            <span class="label">Classification</span>
                            <span class="value">RESTRICTED</span>
                        </div>
                        <p>
                            Comprehensive legal and financial dismantling of the
                            TEXITcoin ecosystem. Verified insolvency analysis.
                        </p>
                        <span class="cta-button">
                            <span class="cta-text">Access File</span>
                            <span class="cta-arrow">&rarr;</span>
                        </span>
                    </div>
                </div>
            </a>

            <!-- Right: Strategic Strike -->
            <a
                href="{base}/strike"
                class="gateway-card strike"
                style="--tilt-x: {mouseX * 0.2}deg; --tilt-y: {-mouseY *
                    0.2}deg;"
            >
                <div class="card-glass">
                    <div class="card-line-top"></div>
                    <div class="card-content">
                        <div class="card-header">
                            <span class="card-id">OP-66</span>
                        </div>
                        <h2>Strategic Extraction</h2>
                        <div class="stat-row">
                            <span class="label">Classification</span>
                            <span class="value alarm">AGGRESSIVE</span>
                        </div>
                        <p>
                            Tactical short-selling and arbitrage frameworks for
                            distressed assets. High-frequency extraction
                            protocols.
                        </p>
                        <span class="cta-button">
                            <span class="cta-text">Initialize</span>
                            <span class="cta-arrow">&rarr;</span>
                        </span>
                    </div>
                </div>
            </a>
        </div>

        <footer class="gateway-footer">
            <p>SYSTEM STATUS: <span class="status-live">● LIVE</span></p>
        </footer>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background: #000;
        font-family: "Inter", sans-serif;
        overflow-x: hidden;
    }

    .gateway-wrapper {
        position: relative;
        width: 100vw;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%);
    }

    /* Abstract Data Grid */
    .data-grid-overlay {
        position: fixed;
        inset: 0;
        background-image: linear-gradient(
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px
            );
        background-size: 40px 40px;
        z-index: 1;
        pointer-events: none;
        mask-image: radial-gradient(
            circle at center,
            black 40%,
            transparent 90%
        );
    }

    /* Circuit Pattern Overlay */
    .circuit-overlay {
        position: fixed;
        inset: 0;
        z-index: 2;
        opacity: 0.03;
        pointer-events: none;
        background-image: linear-gradient(90deg, #0ea5e9 1px, transparent 1px),
            linear-gradient(0deg, #0ea5e9 1px, transparent 1px);
        background-size: 60px 60px;
        animation: circuitPulse 8s ease-in-out infinite;
    }

    @keyframes circuitPulse {
        0%,
        100% {
            opacity: 0.02;
        }
        50% {
            opacity: 0.05;
        }
    }

    .hero-bg {
        position: absolute;
        inset: -50px;
        z-index: 0;
        transition: transform 0.3s ease-out;
    }

    .hero-bg img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.5;
        filter: blur(2px) saturate(1.2);
    }

    .vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(
            ellipse at center,
            transparent 0%,
            rgba(0, 0, 0, 0.4) 50%,
            #000 100%
        );
        z-index: 1;
    }

    .content-container {
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 1200px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4rem;
    }

    /* Staggered entrance animations */
    .content-container.loaded .gateway-header {
        animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .content-container.loaded .gateway-card.report {
        animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        opacity: 0;
    }

    .content-container.loaded .gateway-card.strike {
        animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
        opacity: 0;
    }

    .content-container.loaded .gateway-footer {
        animation: fadeIn 0.8s ease-out 0.6s forwards;
        opacity: 0;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-80px) rotate(-3deg);
        }
        to {
            opacity: 1;
            transform: translateX(0) rotate(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(80px) rotate(3deg);
        }
        to {
            opacity: 1;
            transform: translateX(0) rotate(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .gateway-header {
        text-align: center;
    }

    h1 {
        font-family: "Space Grotesk", sans-serif;
        font-size: clamp(2rem, 6vw, 4rem);
        font-weight: 700;
        letter-spacing: -2px;
        margin: 0;
        color: #fff;
        text-transform: uppercase;
        text-shadow:
            0 0 20px rgba(255, 255, 255, 0.5),
            0 0 40px rgba(14, 165, 233, 0.3);
        position: relative;
    }

    /* Glitch effect */
    .glitch-text::before,
    .glitch-text::after {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.8;
    }

    .glitch-text::before {
        animation: glitch1 3s infinite;
        color: #0ea5e9;
        z-index: -1;
    }

    .glitch-text::after {
        animation: glitch2 3s infinite;
        color: #ef4444;
        z-index: -2;
    }

    @keyframes glitch1 {
        0%,
        90%,
        100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
        }
        92% {
            clip-path: inset(40% 0 20% 0);
            transform: translate(-3px, 2px);
        }
        94% {
            clip-path: inset(80% 0 5% 0);
            transform: translate(3px, -2px);
        }
        96% {
            clip-path: inset(10% 0 60% 0);
            transform: translate(-2px, 1px);
        }
    }

    @keyframes glitch2 {
        0%,
        90%,
        100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
        }
        91% {
            clip-path: inset(20% 0 50% 0);
            transform: translate(3px, -2px);
        }
        93% {
            clip-path: inset(70% 0 10% 0);
            transform: translate(-3px, 2px);
        }
        95% {
            clip-path: inset(5% 0 80% 0);
            transform: translate(2px, -1px);
        }
    }

    .subtitle {
        color: #94a3b8;
        letter-spacing: 4px;
        font-size: 0.875rem;
        margin-top: 0.5rem;
    }

    .cards-wrapper {
        display: flex;
        gap: 4rem;
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }

    .gateway-card {
        flex: 1;
        min-width: 320px;
        max-width: 450px;
        text-decoration: none;
        position: relative;
        transition: transform 0.3s ease-out;
        transform-style: preserve-3d;
        perspective: 1000px;
    }

    .gateway-card:hover {
        transform: translateY(-5px) rotateX(var(--tilt-y, 0deg))
            rotateY(var(--tilt-x, 0deg));
    }

    .card-glass {
        background: rgba(20, 20, 20, 0.6);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 4px;
        padding: 2.5rem;
        height: 100%;
        position: relative;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
    }

    .card-line-top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transition: all 0.3s ease;
    }

    .report:hover .card-line-top {
        background: #0ea5e9;
        box-shadow: 0 0 10px #0ea5e9;
    }
    .strike:hover .card-line-top {
        background: #ef4444;
        box-shadow: 0 0 10px #ef4444;
    }

    .report:hover .card-glass {
        border-color: rgba(14, 165, 233, 0.3);
        background: rgba(14, 165, 233, 0.02);
    }
    .strike:hover .card-glass {
        border-color: rgba(239, 68, 68, 0.3);
        background: rgba(239, 68, 68, 0.02);
    }

    .card-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
    }

    .card-id {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.7rem;
        color: #555;
        border: 1px solid #333;
        padding: 2px 6px;
        border-radius: 2px;
    }

    .icon {
        font-size: 1.5rem;
        opacity: 0.8;
    }

    h2 {
        font-family: "Space Grotesk", sans-serif;
        font-size: 1.75rem;
        margin: 0;
        font-weight: 500;
        color: #fff;
    }

    .stat-row {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        padding-bottom: 0.5rem;
        font-size: 0.8rem;
    }

    .label {
        color: #888;
        text-transform: uppercase;
    }
    .value {
        font-family: "JetBrains Mono", monospace;
        color: #fff;
    }
    .value.alarm {
        color: #ef4444;
    }

    .gateway-card p {
        color: #cbd5e1;
        line-height: 1.7;
        font-size: 1.05rem;
        margin: 0;
    }

    .cta-button {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease;
        margin-top: 1rem;
        position: relative;
        overflow: hidden;
    }

    .cta-arrow {
        transition: transform 0.3s ease;
    }

    .gateway-card:hover .cta-arrow {
        transform: translateX(5px);
    }

    .report .cta-button {
        background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
        color: #fff;
        box-shadow: 0 4px 20px rgba(14, 165, 233, 0.4);
        animation: pulseBlue 2s ease-in-out infinite;
    }

    .strike .cta-button {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: #fff;
        box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
        animation: pulseRed 2s ease-in-out infinite;
    }

    @keyframes pulseBlue {
        0%,
        100% {
            box-shadow: 0 4px 20px rgba(14, 165, 233, 0.4);
        }
        50% {
            box-shadow:
                0 4px 30px rgba(14, 165, 233, 0.6),
                0 0 60px rgba(14, 165, 233, 0.2);
        }
    }

    @keyframes pulseRed {
        0%,
        100% {
            box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
        }
        50% {
            box-shadow:
                0 4px 30px rgba(239, 68, 68, 0.6),
                0 0 60px rgba(239, 68, 68, 0.2);
        }
    }

    .report:hover .cta-button {
        transform: scale(1.05);
        box-shadow: 0 6px 30px rgba(14, 165, 233, 0.5);
    }

    .strike:hover .cta-button {
        transform: scale(1.05);
        box-shadow: 0 6px 30px rgba(239, 68, 68, 0.5);
    }

    .gateway-footer {
        color: #64748b;
        font-family: "JetBrains Mono", monospace;
        font-size: 0.875rem;
    }

    .status-live {
        color: #10b981;
        animation: statusPulse 1.5s ease-in-out infinite;
    }

    @keyframes statusPulse {
        0%,
        100% {
            opacity: 1;
            text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
        50% {
            opacity: 0.6;
            text-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
        }
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2rem;
            letter-spacing: -1px;
        }

        .cards-wrapper {
            flex-direction: column;
            gap: 2rem;
        }

        .gateway-card {
            max-width: 100%;
        }

        .floating-elements {
            display: none;
        }
    }
</style>
