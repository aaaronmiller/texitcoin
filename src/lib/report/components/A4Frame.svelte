<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    id?: string;
    class?: string;
  }

  let { children, id = '', class: className = '' }: Props = $props();
</script>

<section {id} class="a4-frame {className}">
  {@render children()}
</section>
