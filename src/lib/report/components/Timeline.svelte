<script lang="ts">
    import { browser } from "$app/environment";

    interface TimelineEvent {
        id: string;
        era: string;
        startYear: number;
        endYear: number | null;
        role: string;
        organization: string;
        outcome: string;
        pattern: string;
        details: string;
        source: string;
        sourceUrl?: string;
        riskIndicator: string;
    }

    interface Props {
        events: TimelineEvent[];
    }

    let { events }: Props = $props();
    let expandedId = $state<string | null>(null);

    function toggleExpand(id: string) {
        expandedId = expandedId === id ? null : id;
    }

    function getRiskColor(risk: string): string {
        switch (risk) {
            case "high":
                return "var(--accent-warning)";
            case "medium":
                return "#F59E0B";
            case "low":
                return "var(--accent-safe)";
            default:
                return "var(--muted)";
        }
    }

    function formatYearRange(start: number, end: number | null): string {
        return end ? `${start} - ${end}` : `${start} - Present`;
    }
</script>

<div class="timeline" role="list" aria-label="Founder operational timeline">
    {#each events as event, index (event.id)}
        <div
            class="timeline-item"
            class:expanded={expandedId === event.id}
            role="listitem"
        >
            <div class="timeline-connector">
                <div
                    class="timeline-dot"
                    style="background-color: {getRiskColor(
                        event.riskIndicator,
                    )}"
                    aria-hidden="true"
                ></div>
                {#if index < events.length - 1}
                    <div class="timeline-line" aria-hidden="true"></div>
                {/if}
            </div>

            <div class="timeline-content">
                <button
                    class="timeline-header"
                    onclick={() => toggleExpand(event.id)}
                    aria-expanded={expandedId === event.id}
                >
                    <div class="timeline-era">
                        <span class="era-name">{event.era}</span>
                        <span class="era-years"
                            >{formatYearRange(
                                event.startYear,
                                event.endYear,
                            )}</span
                        >
                    </div>
                    <div class="timeline-summary">
                        <span class="org-name">{event.organization}</span>
                        <span class="role">{event.role}</span>
                    </div>
                    <div
                        class="outcome-badge"
                        style="background-color: {getRiskColor(
                            event.riskIndicator,
                        )}20; color: {getRiskColor(
                            event.riskIndicator,
                        )}; border: 1px solid {getRiskColor(
                            event.riskIndicator,
                        )}40"
                    >
                        {event.outcome.split(",")[0]}
                    </div>
                    <svg
                        class="expand-icon"
                        class:rotated={expandedId === event.id}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>

                {#if expandedId === event.id}
                    <div class="timeline-details">
                        <p class="details-text">{event.details}</p>
                        <div class="details-meta">
                            <div class="meta-row">
                                <span class="meta-label"
                                    >Pattern Identified:</span
                                >
                                <span class="meta-value">{event.pattern}</span>
                            </div>
                            <div class="meta-row">
                                <span class="meta-label">Source:</span>
                                {#if event.sourceUrl}
                                    <a
                                        href={event.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="meta-link"
                                    >
                                        {event.source}
                                    </a>
                                {:else}
                                    <span class="meta-value"
                                        >{event.source}</span
                                    >
                                {/if}
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    {/each}
</div>

<style>
    .timeline {
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
    }

    .timeline-item {
        display: flex;
        gap: var(--space-4);
        position: relative;
    }

    .timeline-connector {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        width: 20px;
    }

    .timeline-dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        flex-shrink: 0;
        z-index: 1;
        box-shadow: 0 0 0 4px var(--background);
    }

    .timeline-line {
        width: 2px;
        flex-grow: 1;
        background: var(--border);
        margin-top: var(--space-2);
    }

    .timeline-content {
        flex-grow: 1;
        padding-bottom: var(--space-6);
    }

    .timeline-header {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: var(--space-3);
        align-items: start;
        width: 100%;
        padding: var(--space-4);
        background: var(--card);
        border: 1px solid var(--card-border);
        border-radius: var(--radius-lg);
        cursor: pointer;
        text-align: left;
        transition: all var(--transition-base);
    }

    .timeline-header:hover {
        border-color: var(--muted);
    }

    @media (max-width: 640px) {
        .timeline-header {
            grid-template-columns: 1fr;
            gap: var(--space-2);
        }

        .outcome-badge {
            justify-self: start;
        }

        .expand-icon {
            position: absolute;
            right: var(--space-4);
            top: var(--space-4);
        }
    }

    .timeline-era {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
    }

    .era-name {
        font-family: var(--font-display);
        font-weight: 600;
        font-size: var(--text-base);
    }

    .era-years {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        color: var(--muted);
    }

    .timeline-summary {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
    }

    .org-name {
        font-weight: 500;
        font-size: var(--text-sm);
    }

    .role {
        font-size: var(--text-xs);
        color: var(--muted);
    }

    .outcome-badge {
        padding: var(--space-1) var(--space-3);
        border-radius: var(--radius-full);
        font-size: var(--text-xs);
        font-weight: 600;
        white-space: nowrap;
    }

    .expand-icon {
        color: var(--muted);
        transition: transform var(--transition-base);
        flex-shrink: 0;
    }

    .expand-icon.rotated {
        transform: rotate(180deg);
    }

    .timeline-details {
        margin-top: var(--space-3);
        padding: var(--space-4);
        background: var(--background);
        border-radius: var(--radius-md);
        border: 1px solid var(--border);
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .details-text {
        font-size: var(--text-sm);
        line-height: 1.7;
        margin-bottom: var(--space-4);
    }

    .details-meta {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
    }

    .meta-row {
        display: flex;
        gap: var(--space-2);
        font-size: var(--text-xs);
    }

    .meta-label {
        color: var(--muted);
        flex-shrink: 0;
    }

    .meta-value {
        color: var(--foreground);
    }

    .meta-link {
        color: var(--accent-info);
        text-decoration: none;
    }

    .meta-link:hover {
        text-decoration: underline;
    }
</style>
