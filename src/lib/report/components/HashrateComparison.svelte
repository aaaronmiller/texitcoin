<script lang="ts">
    import { formatNumber, formatPercent } from "$lib/report/utils/formatters";

    interface Props {
        soldHashrate: number;
        actualHashrate: number;
        unit?: string;
    }

    let { soldHashrate, actualHashrate, unit = "GH" }: Props = $props();

    let missingPercent = $derived(
        ((soldHashrate - actualHashrate) / soldHashrate) * 100,
    );
    let operationalPercent = $derived((actualHashrate / soldHashrate) * 100);
</script>

<div class="hashrate-comparison">
    <h4 class="comparison-title">Hashrate Anomaly Analysis</h4>

    <div class="bars-container">
        <div class="bar-group">
            <div class="bar-header">
                <span class="bar-label">Sold Hashpower</span>
                <span class="bar-value"
                    >{formatNumber(soldHashrate)} {unit}</span
                >
            </div>
            <div class="bar-track">
                <div
                    class="bar-fill sold"
                    style="width: 100%"
                    role="progressbar"
                    aria-valuenow={soldHashrate}
                    aria-valuemin={0}
                    aria-valuemax={soldHashrate}
                ></div>
            </div>
            <span class="bar-note">Based on mineTXC sales data</span>
        </div>

        <div class="bar-group">
            <div class="bar-header">
                <span class="bar-label">Actual Network Hashrate</span>
                <span class="bar-value"
                    >{formatNumber(actualHashrate)} {unit}</span
                >
            </div>
            <div class="bar-track">
                <div
                    class="bar-fill actual"
                    style="width: {operationalPercent}%"
                    role="progressbar"
                    aria-valuenow={actualHashrate}
                    aria-valuemin={0}
                    aria-valuemax={soldHashrate}
                ></div>
            </div>
            <span class="bar-note">From blockchain explorer data</span>
        </div>
    </div>

    <div class="gap-analysis">
        <div class="gap-stat">
            <span class="gap-value text-warning"
                >{formatPercent(missingPercent, 1)}</span
            >
            <span class="gap-label">Missing Hashpower</span>
        </div>
        <div class="gap-description">
            <p>
                <strong
                    >{formatNumber(soldHashrate - actualHashrate)}
                    {unit}</strong
                > of sold hashpower is not visible on the network, suggesting that
                the majority of hashpower sold to users is either not deployed or
                does not exist.
            </p>
        </div>
    </div>

    <!-- Accessibility: Pattern overlay for color-blind users -->
    <div class="legend">
        <div class="legend-item">
            <span class="legend-color sold" aria-hidden="true"></span>
            <span>Sold (claimed)</span>
        </div>
        <div class="legend-item">
            <span class="legend-color actual" aria-hidden="true"></span>
            <span>Actual (verified)</span>
        </div>
    </div>
</div>

<style>
    .hashrate-comparison {
        background: var(--card);
        border: 1px solid var(--card-border);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
    }

    .comparison-title {
        font-size: var(--text-lg);
        font-weight: 600;
        margin-bottom: var(--space-6);
    }

    .bars-container {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
        margin-bottom: var(--space-6);
    }

    .bar-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
    }

    .bar-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    .bar-label {
        font-size: var(--text-sm);
        font-weight: 500;
    }

    .bar-value {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        font-weight: 600;
    }

    .bar-track {
        height: 24px;
        background: var(--background);
        border-radius: var(--radius-md);
        overflow: hidden;
        position: relative;
    }

    .bar-fill {
        height: 100%;
        border-radius: var(--radius-md);
        transition: width 1s ease-out;
    }

    .bar-fill.sold {
        background: linear-gradient(
            90deg,
            var(--accent-warning) 0%,
            #e11d48 100%
        );
        /* Stripe pattern for accessibility */
        background-image: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255, 255, 255, 0.1) 10px,
                rgba(255, 255, 255, 0.1) 20px
            ),
            linear-gradient(90deg, var(--accent-warning) 0%, #e11d48 100%);
    }

    .bar-fill.actual {
        background: var(--accent-safe);
        /* Dot pattern for accessibility */
        background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.2) 1px,
            transparent 1px
        );
        background-size: 8px 8px;
        background-color: var(--accent-safe);
    }

    .bar-note {
        font-size: var(--text-xs);
        color: var(--muted);
    }

    .gap-analysis {
        display: flex;
        gap: var(--space-6);
        padding: var(--space-4);
        background: var(--background);
        border-radius: var(--radius-md);
        margin-bottom: var(--space-4);
    }

    @media (max-width: 640px) {
        .gap-analysis {
            flex-direction: column;
            gap: var(--space-4);
        }
    }

    .gap-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        min-width: 100px;
    }

    .gap-value {
        font-family: var(--font-display);
        font-size: var(--text-3xl);
        font-weight: 800;
        line-height: 1;
    }

    .gap-label {
        font-size: var(--text-xs);
        color: var(--muted);
        margin-top: var(--space-1);
    }

    .gap-description {
        font-size: var(--text-sm);
        line-height: 1.6;
    }

    .gap-description p {
        margin: 0;
    }

    .legend {
        display: flex;
        gap: var(--space-6);
        justify-content: center;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--text-xs);
        color: var(--muted);
    }

    .legend-color {
        width: 16px;
        height: 16px;
        border-radius: var(--radius-sm);
    }

    .legend-color.sold {
        background: var(--accent-warning);
        background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 3px,
            rgba(255, 255, 255, 0.3) 3px,
            rgba(255, 255, 255, 0.3) 6px
        );
    }

    .legend-color.actual {
        background: var(--accent-safe);
        background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.3) 1px,
            transparent 1px
        );
        background-size: 4px 4px;
    }
</style>
