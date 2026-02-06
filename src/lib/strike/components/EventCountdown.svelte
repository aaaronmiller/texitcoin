<script lang="ts">
    import { onMount } from "svelte";
    import { countdownTo, daysUntil } from "$lib/strike/utils/api";
    import { padZero } from "$lib/strike/utils/formatters";

    interface Props {
        targetDate: string;
        eventName: string;
        showSeconds?: boolean;
    }

    let { targetDate, eventName, showSeconds = false }: Props = $props();

    let countdown = $state({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
    });
    let intervalId: ReturnType<typeof setInterval> | null = null;

    onMount(() => {
        // Initial calculation
        countdown = countdownTo(targetDate);

        // Update every second if showing seconds, else every minute
        const interval = showSeconds ? 1000 : 60000;
        intervalId = setInterval(() => {
            countdown = countdownTo(targetDate);
        }, interval);

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    });

    const isUrgent = $derived(countdown.days < 30);
    const isCritical = $derived(countdown.days < 7);
</script>

<div
    class="countdown-container"
    class:urgent={isUrgent}
    class:critical={isCritical}
>
    <div class="countdown-header">
        <span class="countdown-label">TIME TO {eventName.toUpperCase()}</span>
        {#if isCritical}
            <span class="badge badge-confidential animate-pulse">CRITICAL</span>
        {:else if isUrgent}
            <span class="badge badge-restricted">URGENT</span>
        {/if}
    </div>

    <div class="countdown">
        <div class="countdown-unit">
            <span class="countdown-value">{padZero(countdown.days, 2)}</span>
            <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-separator">:</div>
        <div class="countdown-unit">
            <span class="countdown-value">{padZero(countdown.hours, 2)}</span>
            <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-separator">:</div>
        <div class="countdown-unit">
            <span class="countdown-value">{padZero(countdown.minutes, 2)}</span>
            <span class="countdown-label">Mins</span>
        </div>
        {#if showSeconds}
            <div class="countdown-separator">:</div>
            <div class="countdown-unit">
                <span class="countdown-value"
                    >{padZero(countdown.seconds, 2)}</span
                >
                <span class="countdown-label">Secs</span>
            </div>
        {/if}
    </div>

    <div class="countdown-footer">
        <span class="target-date"
            >{new Date(targetDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            })}</span
        >
    </div>
</div>

<style>
    .countdown-container {
        background: var(--carrion-ash);
        border: var(--border-medium) solid var(--carrion-iron);
        border-radius: var(--radius-md);
        padding: var(--space-6);
        text-align: center;
    }

    .countdown-container.urgent {
        border-color: var(--carrion-warning);
        box-shadow: 0 0 20px rgba(139, 107, 32, 0.2);
    }

    .countdown-container.critical {
        border-color: var(--carrion-blood);
        box-shadow: var(--shadow-glow-blood);
        animation: pulse 2s ease-in-out infinite;
    }

    .countdown-header {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--space-3);
        margin-bottom: var(--space-4);
    }

    .countdown-header .countdown-label {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        font-weight: var(--weight-bold);
        letter-spacing: 0.1em;
        color: var(--carrion-dust);
    }

    .countdown {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--space-2);
    }

    .countdown-unit {
        background: var(--carrion-charcoal);
        border: var(--border-thin) solid var(--carrion-iron);
        border-radius: var(--radius-md);
        padding: var(--space-4) var(--space-5);
        min-width: 80px;
    }

    .countdown-separator {
        font-family: var(--font-mono);
        font-size: var(--text-2xl);
        font-weight: var(--weight-bold);
        color: var(--carrion-shadow);
    }

    .countdown-value {
        display: block;
        font-family: var(--font-mono);
        font-size: var(--text-3xl);
        font-weight: var(--weight-bold);
        color: var(--carrion-gold);
        line-height: 1;
    }

    .countdown-unit .countdown-label {
        display: block;
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--carrion-dust);
        margin-top: var(--space-2);
    }

    .countdown-footer {
        margin-top: var(--space-4);
    }

    .target-date {
        font-size: var(--text-sm);
        color: var(--carrion-shadow);
    }

    .urgent .countdown-value {
        color: var(--carrion-warning-bright);
    }

    .critical .countdown-value {
        color: var(--carrion-blood-bright);
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.85;
        }
    }

    @media (max-width: 640px) {
        .countdown {
            flex-wrap: wrap;
        }

        .countdown-unit {
            min-width: 65px;
            padding: var(--space-3);
        }

        .countdown-value {
            font-size: var(--text-2xl);
        }

        .countdown-separator {
            display: none;
        }
    }
</style>
