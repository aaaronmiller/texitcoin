<script lang="ts">
    import {
        formatCurrency,
        formatPercent,
        formatCompact,
        getRiskClass,
    } from "$lib/strike/utils/formatters";

    interface Props {
        name: string;
        shortName: string;
        risk: string;
        expectedRoi: string;
        capitalRequired: string;
        timeHorizon: string;
        summary: string;
        onClick?: () => void;
    }

    let {
        name,
        shortName,
        risk,
        expectedRoi,
        capitalRequired,
        timeHorizon,
        summary,
        onClick,
    }: Props = $props();
</script>

<button
    class="strategy-card"
    onclick={onClick}
    type="button"
    aria-label={`Strategy: ${name}`}
>
    <div class="strategy-header">
        <span class="strategy-number">{shortName}</span>
        <span class="badge {getRiskClass(risk)}">{risk.toUpperCase()}</span>
    </div>

    <h3 class="strategy-name">{name}</h3>

    <div class="strategy-meta">
        <div class="meta-item">
            <span class="meta-label">Expected ROI</span>
            <span class="meta-value highlight">{expectedRoi}</span>
        </div>
        <div class="meta-item">
            <span class="meta-label">Capital</span>
            <span class="meta-value">{capitalRequired}</span>
        </div>
        <div class="meta-item">
            <span class="meta-label">Horizon</span>
            <span class="meta-value">{timeHorizon}</span>
        </div>
    </div>

    <p class="strategy-summary">{summary}</p>

    <div class="strategy-cta">
        <span class="cta-text">View Details →</span>
    </div>
</button>

<style>
    .strategy-card {
        display: flex;
        flex-direction: column;
        text-align: left;
        width: 100%;
        font-family: inherit;
    }

    .strategy-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-3);
    }

    .strategy-number {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--carrion-gold-dim);
    }

    .strategy-name {
        font-family: var(--font-display);
        font-size: var(--text-lg);
        font-weight: var(--weight-semibold);
        margin-bottom: var(--space-4);
        color: var(--carrion-bone);
    }

    .strategy-meta {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-2);
        margin-bottom: var(--space-4);
        padding-bottom: var(--space-4);
        border-bottom: var(--border-thin) solid var(--carrion-iron);
    }

    .meta-item {
        text-align: center;
    }

    .meta-label {
        display: block;
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--carrion-shadow);
        margin-bottom: var(--space-1);
    }

    .meta-value {
        display: block;
        font-size: var(--text-sm);
        font-weight: var(--weight-semibold);
        color: var(--carrion-cream);
    }

    .meta-value.highlight {
        color: var(--carrion-gold);
    }

    .strategy-summary {
        font-size: var(--text-sm);
        color: var(--carrion-cream);
        line-height: var(--leading-relaxed);
        flex: 1;
        margin-bottom: var(--space-4);
    }

    .strategy-cta {
        margin-top: auto;
    }

    .cta-text {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        color: var(--carrion-gold-dim);
        transition: color var(--transition-base);
    }

    .strategy-card:hover .cta-text {
        color: var(--carrion-gold);
    }
</style>
