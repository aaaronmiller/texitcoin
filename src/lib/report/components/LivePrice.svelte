<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { getLivePrice, type PriceData } from "$lib/report/utils/api";
  import {
    formatCurrency,
    formatPercent,
    formatRelativeTime,
  } from "$lib/report/utils/formatters";

  interface Props {
    promisedPrice?: number;
    promisedDate?: string;
  }

  let { promisedPrice = 16, promisedDate = "Feb 2026" }: Props = $props();

  let priceData = $state<PriceData | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);

  $effect(() => {
    if (priceData) {
      const deviation =
        ((priceData.price - promisedPrice) / promisedPrice) * 100;
      console.log(`Price deviation from promised: ${deviation.toFixed(2)}%`);
    }
  });

  onMount(async () => {
    if (browser) {
      try {
        priceData = await getLivePrice();
        loading = false;
      } catch (e) {
        error = "Failed to fetch live price";
        loading = false;
      }
    }
  });

  function getChangeColor(change: number): string {
    return change >= 0 ? "var(--accent-safe)" : "var(--accent-warning)";
  }
</script>

<div class="live-price-card">
  <div class="price-header">
    <div class="coin-info">
      <span class="coin-symbol">TXC</span>
      <span class="coin-name">TEXITcoin</span>
    </div>
    {#if priceData}
      <span class="data-source">
        {priceData.source === "coingecko" ? "🟢 Live" : "🟡 Cached"}
      </span>
    {/if}
  </div>

  {#if loading}
    <div class="price-loading">
      <div class="loading-spinner"></div>
      <span>Loading price data...</span>
    </div>
  {:else if error}
    <div class="price-error">
      <span>⚠️ {error}</span>
    </div>
  {:else if priceData}
    <div class="price-main">
      <span class="current-price">{formatCurrency(priceData.price, 4)}</span>
      <span
        class="price-change"
        style="color: {getChangeColor(priceData.priceChange24h)}"
      >
        {formatPercent(priceData.priceChange24h)} (24h)
      </span>
    </div>

    <div class="price-comparison">
      <div class="comparison-row">
        <span class="comparison-label">Promised Price ({promisedDate})</span>
        <span class="comparison-value">{formatCurrency(promisedPrice)}</span>
      </div>
      <div class="comparison-row actual">
        <span class="comparison-label">Reality Gap</span>
        <span class="comparison-value deviation">
          {formatPercent(
            ((priceData.price - promisedPrice) / promisedPrice) * 100,
          )}
        </span>
      </div>
    </div>

    <div class="price-meta">
      <div class="meta-item">
        <span class="meta-label">Market Cap</span>
        <span class="meta-value">{formatCurrency(priceData.marketCap, 0)}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">24h Volume</span>
        <span class="meta-value">{formatCurrency(priceData.volume24h, 0)}</span>
      </div>
    </div>

    <div class="last-updated">
      Updated {formatRelativeTime(priceData.lastUpdated)}
    </div>
  {/if}
</div>

<style>
  .live-price-card {
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    width: 100%;
    max-width: 400px;
  }

  .price-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
  }

  .coin-info {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
  }

  .coin-symbol {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--accent-warning);
  }

  .coin-name {
    font-size: var(--text-sm);
    color: var(--muted);
  }

  .data-source {
    font-size: var(--text-xs);
    padding: var(--space-1) var(--space-2);
    background: var(--background);
    border-radius: var(--radius-full);
  }

  .price-loading,
  .price-error {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-8);
    color: var(--muted);
  }

  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--border);
    border-top-color: var(--accent-info);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .price-main {
    text-align: center;
    margin-bottom: var(--space-6);
  }

  .current-price {
    display: block;
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: 800;
    line-height: 1.2;
  }

  .price-change {
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .price-comparison {
    background: var(--background);
    border-radius: var(--radius-md);
    padding: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .comparison-row {
    display: flex;
    justify-content: space-between;
    padding: var(--space-2) 0;
  }

  .comparison-row.actual {
    border-top: 1px solid var(--border);
    margin-top: var(--space-2);
    padding-top: var(--space-3);
  }

  .comparison-label {
    color: var(--muted);
    font-size: var(--text-sm);
  }

  .comparison-value {
    font-family: var(--font-mono);
    font-weight: 600;
  }

  .deviation {
    color: var(--accent-warning);
  }

  .price-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .meta-item {
    text-align: center;
  }

  .meta-label {
    display: block;
    font-size: var(--text-xs);
    color: var(--muted);
    margin-bottom: var(--space-1);
  }

  .meta-value {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
  }

  .last-updated {
    text-align: center;
    font-size: var(--text-xs);
    color: var(--muted);
  }
</style>
