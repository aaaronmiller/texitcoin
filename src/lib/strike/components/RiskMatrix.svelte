<script lang="ts">
    interface Risk {
        id: string;
        name: string;
        description: string;
        severity: number;
        probability: number;
        mitigation: string;
    }

    interface Props {
        risks: Risk[];
        showDetails?: boolean;
    }

    let { risks, showDetails = true }: Props = $props();
    let selectedRisk = $state<Risk | null>(null);

    function getSeverityColor(severity: number): string {
        if (severity >= 8) return "var(--carrion-blood-bright)";
        if (severity >= 5) return "var(--carrion-warning-bright)";
        return "var(--carrion-safe-bright)";
    }

    function getProbabilityColor(probability: number): string {
        if (probability >= 25) return "var(--carrion-blood-bright)";
        if (probability >= 15) return "var(--carrion-warning-bright)";
        return "var(--carrion-safe-bright)";
    }

    function getRiskScore(risk: Risk): number {
        return Math.round((risk.severity * risk.probability) / 10);
    }
</script>

<div class="risk-matrix-container">
    <div class="matrix-header">
        <h4>Risk Assessment Matrix</h4>
        <div class="legend">
            <span class="legend-item"><span class="dot high"></span> High</span>
            <span class="legend-item"
                ><span class="dot medium"></span> Medium</span
            >
            <span class="legend-item"><span class="dot low"></span> Low</span>
        </div>
    </div>

    <div class="matrix-table-wrapper">
        <table class="data-table risk-table">
            <thead>
                <tr>
                    <th>Risk</th>
                    <th>Severity</th>
                    <th>Probability</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {#each risks as risk}
                    <tr
                        class="risk-row"
                        class:selected={selectedRisk?.id === risk.id}
                        onclick={() =>
                            (selectedRisk =
                                selectedRisk?.id === risk.id ? null : risk)}
                    >
                        <td class="risk-name">{risk.name}</td>
                        <td>
                            <span class="severity-bar">
                                <span
                                    class="severity-fill"
                                    style="width: {risk.severity *
                                        10}%; background: {getSeverityColor(
                                        risk.severity,
                                    )};"
                                ></span>
                                <span class="severity-value"
                                    >{risk.severity}/10</span
                                >
                            </span>
                        </td>
                        <td>
                            <span
                                class="probability-badge"
                                style="color: {getProbabilityColor(
                                    risk.probability,
                                )}"
                            >
                                {risk.probability}%
                            </span>
                        </td>
                        <td>
                            <span
                                class="risk-score"
                                style="color: {getSeverityColor(
                                    getRiskScore(risk),
                                )}"
                            >
                                {getRiskScore(risk)}
                            </span>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    {#if showDetails && selectedRisk}
        <div class="risk-details">
            <h5>{selectedRisk.name}</h5>
            <p class="risk-description">{selectedRisk.description}</p>
            <div class="mitigation">
                <span class="mitigation-label">Mitigation:</span>
                {selectedRisk.mitigation}
            </div>
        </div>
    {/if}
</div>

<style>
    .risk-matrix-container {
        background: var(--carrion-ash);
        border: var(--border-thin) solid var(--carrion-iron);
        border-radius: var(--radius-md);
        padding: var(--space-5);
    }

    .matrix-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-4);
        padding-bottom: var(--space-3);
        border-bottom: var(--border-thin) solid var(--carrion-iron);
    }

    .matrix-header h4 {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--carrion-dust);
        margin: 0;
    }

    .legend {
        display: flex;
        gap: var(--space-4);
        font-size: var(--text-xs);
        color: var(--carrion-shadow);
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: var(--space-1);
    }

    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .dot.high {
        background: var(--carrion-blood-bright);
    }
    .dot.medium {
        background: var(--carrion-warning-bright);
    }
    .dot.low {
        background: var(--carrion-safe-bright);
    }

    .matrix-table-wrapper {
        overflow-x: auto;
    }

    .risk-table {
        margin: 0;
    }

    .risk-row {
        cursor: pointer;
        transition: background var(--transition-fast);
    }

    .risk-row:hover {
        background: var(--carrion-charcoal);
    }

    .risk-row.selected {
        background: var(--carrion-charcoal);
        border-left: var(--border-medium) solid var(--carrion-gold);
    }

    .risk-name {
        font-weight: var(--weight-medium);
        color: var(--carrion-cream);
    }

    .severity-bar {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        width: 100%;
        max-width: 120px;
    }

    .severity-fill {
        height: 6px;
        border-radius: 3px;
        transition: width var(--transition-base);
    }

    .severity-value {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        color: var(--carrion-dust);
        white-space: nowrap;
    }

    .probability-badge {
        font-family: var(--font-mono);
        font-weight: var(--weight-semibold);
    }

    .risk-score {
        font-family: var(--font-mono);
        font-size: var(--text-lg);
        font-weight: var(--weight-bold);
    }

    .risk-details {
        margin-top: var(--space-4);
        padding: var(--space-4);
        background: var(--carrion-charcoal);
        border-radius: var(--radius-md);
        border-left: var(--border-thick) solid var(--carrion-gold);
    }

    .risk-details h5 {
        font-family: var(--font-display);
        font-size: var(--text-base);
        margin: 0 0 var(--space-2) 0;
        color: var(--carrion-bone);
    }

    .risk-description {
        font-size: var(--text-sm);
        color: var(--carrion-cream);
        margin-bottom: var(--space-3);
    }

    .mitigation {
        font-size: var(--text-sm);
        color: var(--carrion-cream);
        padding-top: var(--space-3);
        border-top: var(--border-thin) solid var(--carrion-iron);
    }

    .mitigation-label {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--carrion-safe-bright);
        margin-right: var(--space-2);
    }
</style>
