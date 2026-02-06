<script lang="ts">
  interface Quote {
    text: string;
    source: string;
    date?: string;
    significance?: string;
  }

  interface Props {
    quote: Quote;
    showSignificance?: boolean;
  }

  let { quote, showSignificance = true }: Props = $props();
</script>

<blockquote class="quote-block">
  <p class="quote-text">"{quote.text}"</p>
  <footer class="quote-source">
    — {quote.source}
    {#if quote.date}
      <span class="quote-date">({quote.date})</span>
    {/if}
  </footer>
  {#if showSignificance && quote.significance}
    <div class="quote-significance">
      <span class="significance-label">Significance:</span>
      {quote.significance}
    </div>
  {/if}
</blockquote>

<style>
  .quote-block {
    position: relative;
    padding: var(--space-6);
    padding-left: var(--space-8);
    margin: var(--space-6) 0;
    background: linear-gradient(135deg, var(--carrion-ash), transparent);
    border-left: var(--border-thick) solid var(--carrion-gold-dim);
  }

  .quote-block::before {
    content: "\201C";
    position: absolute;
    top: var(--space-2);
    left: var(--space-3);
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    color: var(--carrion-gold-dim);
    line-height: 1;
  }

  .quote-text {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-style: italic;
    line-height: var(--leading-relaxed);
    color: var(--carrion-cream);
    margin-bottom: var(--space-4);
  }

  .quote-source {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--carrion-dust);
  }

  .quote-date {
    color: var(--carrion-shadow);
  }

  .quote-significance {
    margin-top: var(--space-3);
    padding-top: var(--space-3);
    border-top: var(--border-thin) solid var(--carrion-iron);
    font-size: var(--text-sm);
    color: var(--carrion-cream);
  }

  .significance-label {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--carrion-warning-bright);
    margin-right: var(--space-2);
  }
</style>
