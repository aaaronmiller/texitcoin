<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  interface Props {
    value: number; // 0-100
    label?: string;
    size?: 'sm' | 'md' | 'lg';
  }

  let { value, label = 'Risk Score', size = 'md' }: Props = $props();

  let animatedValue = $state(0);

  const sizeConfig = {
    sm: { width: 120, strokeWidth: 8, fontSize: 24 },
    md: { width: 180, strokeWidth: 12, fontSize: 36 },
    lg: { width: 240, strokeWidth: 16, fontSize: 48 }
  };

  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke offset based on value (0-100 maps to full-empty)
  $effect(() => {
    const offset = circumference - (animatedValue / 100) * circumference;
    return offset;
  });

  function getColor(val: number): string {
    if (val >= 70) return 'var(--accent-warning)';
    if (val >= 40) return '#F59E0B';
    return 'var(--accent-safe)';
  }

  function getRiskLevel(val: number): string {
    if (val >= 70) return 'HIGH RISK';
    if (val >= 40) return 'MEDIUM RISK';
    return 'LOW RISK';
  }

  onMount(() => {
    if (browser) {
      // Animate the gauge filling up
      const duration = 1500;
      const startTime = performance.now();
      
      function animate(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3);
        animatedValue = Math.round(eased * value);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }
      
      requestAnimationFrame(animate);
    }
  });
</script>

<div class="risk-gauge" style="--gauge-width: {config.width}px">
  <svg 
    width={config.width} 
    height={config.width} 
    viewBox="0 0 {config.width} {config.width}"
    role="img"
    aria-label="{label}: {value} out of 100"
  >
    <!-- Background circle -->
    <circle
      cx={config.width / 2}
      cy={config.width / 2}
      r={radius}
      fill="none"
      stroke="var(--border)"
      stroke-width={config.strokeWidth}
    />
    
    <!-- Progress arc -->
    <circle
      class="progress-ring"
      cx={config.width / 2}
      cy={config.width / 2}
      r={radius}
      fill="none"
      stroke={getColor(animatedValue)}
      stroke-width={config.strokeWidth}
      stroke-linecap="round"
      stroke-dasharray={circumference}
      stroke-dashoffset={circumference - (animatedValue / 100) * circumference}
      transform="rotate(-90 {config.width / 2} {config.width / 2})"
    />
  </svg>
  
  <div class="gauge-content">
    <span class="gauge-value" style="font-size: {config.fontSize}px; color: {getColor(animatedValue)}">
      {animatedValue}
    </span>
    <span class="gauge-label">{label}</span>
    <span class="gauge-level" style="color: {getColor(animatedValue)}">
      {getRiskLevel(animatedValue)}
    </span>
  </div>
</div>

<style>
  .risk-gauge {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--gauge-width);
    height: var(--gauge-width);
  }

  .progress-ring {
    transition: stroke-dashoffset 0.3s ease;
  }

  .gauge-content {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .gauge-value {
    font-family: var(--font-display);
    font-weight: 800;
    line-height: 1;
  }

  .gauge-label {
    font-size: var(--text-xs);
    color: var(--muted);
    margin-top: var(--space-1);
  }

  .gauge-level {
    font-size: var(--text-xs);
    font-weight: 700;
    margin-top: var(--space-1);
    letter-spacing: 0.05em;
  }
</style>
