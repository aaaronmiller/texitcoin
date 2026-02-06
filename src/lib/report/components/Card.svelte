<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    variant?: 'default' | 'glass';
    class?: string;
  }

  let { children, variant = 'default', class: className = '' }: Props = $props();

  const variantClass = variant === 'glass' ? 'card-glass' : '';
</script>

<div class="card {variantClass} {className}">
  {@render children()}
</div>
