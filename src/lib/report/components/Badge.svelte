<script lang="ts">
  interface Props {
    variant: 'verified' | 'denied' | 'unverified' | 'risk-high' | 'risk-medium' | 'risk-low';
    text: string;
  }

  let { variant, text }: Props = $props();

  const variantClass = `badge-${variant}`;
</script>

<span class="badge {variantClass}">
  {text}
</span>
