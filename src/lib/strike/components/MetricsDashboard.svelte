<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import {
        fetchTxcPrice,
        calculateRealityGap,
        type PriceData,
    } from "$lib/strike/utils/api";
    import {
        formatCurrency,
        formatPercent,
        formatCompact,
    } from "$lib/strike/utils/formatters";

    let priceData = $state<PriceData | null>(null);
    let loading = $state(true);
    let error = $state<string | null>(null);

    const TARGET_PRICE = 16.0;

    onMount(() => {
        if (!browser) return;

        const loadData = async () => {
            try {
                priceData = await fetchTxcPrice();
            } catch (e) {
                error = "Failed to load price data";
            } finally {
                loading = false;
            }
        };

        loadData();

        // Refresh every 60 seconds
        const interval = setInterval(async () => {
            try {
                priceData = await fetchTxcPrice();
            } catch (e) {
                console.error("Price refresh failed:", e);
            }
        }, 60000);

        return () => clearInterval(interval);
    });

    const realityGap = $derived(
        priceData ? calculateRealityGap(priceData.price, TARGET_PRICE) : -95,
    );
</script>

<div class="metrics-dashboard">
    {#if loading}
        <div class="loading-state">
            <span class="loading-spinner"></span>
            Loading live data...
        </div>
    {:else if error}
        <div class="error-state">{error}</div>
    {:else if priceData}
        <div class="metrics-grid">
            <div class="metric-card primary">
                <span class="metric-label">TXC Price</span>
                <span class="metric-value highlight"
                    >{formatCurrency(priceData.price, 4)}</span
                >
                <span
                    class="metric-delta"
                    class:positive={priceData.change24h >= 0}
                    class:negative={priceData.change24h < 0}
                >
                    {formatPercent(priceData.change24h)} (24h)
                </span>
                {#if !priceData.isLive}
                    <span class="data-warning">⚠ Cached data</span>
                {/if}
            </div>

            <div class="metric-card">
                <span class="metric-label">Target Price</span>
                <span class="metric-value"
                    >{formatCurrency(TARGET_PRICE, 2)}</span
                >
                <span class="metric-note">Founder promise</span>
            </div>

            <div class="metric-card danger-card">
                <span class="metric-label">Reality Gap</span>
                <span class="metric-value danger"
                    >{formatPercent(realityGap)}</span
                >
                <span class="metric-note">vs target</span>
            </div>

            <div class="metric-card">
                <span class="metric-label">Market Cap</span>
                <span class="metric-value"
                    >{formatCompact(priceData.marketCap)}</span
                >
            </div>

            <div class="metric-card">
                <span class="metric-label">24h Volume</span>
                <span class="metric-value"
                    >{formatCompact(priceData.volume24h)}</span
                >
            </div>

            <div class="metric-card">
                <span class="metric-label">Last Updated</span>
                <span class="metric-value small"
                    >{priceData.lastUpdated.toLocaleTimeString()}</span
                >
            </div>
        </div>
    {/if}
</div>

<style>
    .metrics-dashboard {
        margin: var(--space-6) 0;
    }

    .loading-state,
    .error-state {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-3);
        padding: var(--space-8);
        background: var(--carrion-ash);
        border-radius: var(--radius-md);
        color: var(--carrion-dust);
    }

    .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid var(--carrion-iron);
        border-top-color: var(--carrion-gold);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .error-state {
        color: var(--carrion-danger-bright);
    }

    .metric-card.primary {
        background: linear-gradient(
            135deg,
            var(--carrion-ash),
            var(--carrion-charcoal)
        );
        border-color: var(--carrion-gold-dim);
    }

    .metric-card.danger-card {
        background: rgba(107, 45, 45, 0.2);
        border-color: var(--carrion-blood);
    }

    .metric-value.small {
        font-size: var(--text-base);
    }

    .metric-note {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        color: var(--carrion-shadow);
        margin-top: var(--space-1);
    }

    .data-warning {
        display: block;
        font-size: var(--text-xs);
        color: var(--carrion-warning);
        margin-top: var(--space-2);
    }
</style>
