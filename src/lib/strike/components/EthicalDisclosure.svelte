<script lang="ts">
    type FramingType = "neutral" | "acknowledged" | "exposure";

    interface Props {
        initialTab?: FramingType;
    }

    let { initialTab = "neutral" }: Props = $props();

    let activeTab = $state<FramingType>(initialTab);

    const framings = {
        neutral: {
            title: "Market Opportunity",
            icon: "📊",
            content:
                "These are market opportunities arising from structural inefficiencies. Price discovery in illiquid markets with concentrated ownership creates exploitable gaps between stated value and realized value. Risk-adjusted returns compensate for the non-trivial probability of total loss.",
        },
        acknowledged: {
            title: "Ethical Complexity",
            icon: "⚖️",
            content:
                "Profiting from these strategies requires accepting the ethical weight of the position. You are extracting value from a system designed to transfer wealth from new participants to earlier ones. Your profit comes at the expense of those who arrive after you—the new recruits in Dubai, the distressed sellers, the believers in the $16 promise. This is the nature of carrion: we consume what's already dying.",
        },
        exposure: {
            title: "Exposing Mechanics",
            icon: "🔍",
            content:
                "By documenting these mechanics, we illuminate manipulation for regulators, journalists, and potential victims. This analysis serves as a warning about how artificial price support, concentrated ownership, and recruitment-dependent economics function in practice. The strategies described herein demonstrate exactly how insiders can extract value—knowledge that empowers victims to recognize similar patterns.",
        },
    };
</script>

<div class="ethical-disclosure">
    <div class="ethical-tabs" role="tablist">
        {#each Object.entries(framings) as [key, framing]}
            <button
                role="tab"
                class="ethical-tab"
                class:active={activeTab === key}
                aria-selected={activeTab === key}
                onclick={() => (activeTab = key as FramingType)}
            >
                <span class="tab-icon">{framing.icon}</span>
                <span class="tab-title">{framing.title}</span>
            </button>
        {/each}
    </div>

    <div class="ethical-content" role="tabpanel">
        <p>{framings[activeTab].content}</p>
    </div>
</div>

<style>
    .ethical-disclosure {
        margin: var(--space-6) 0;
    }

    .ethical-tabs {
        display: flex;
        gap: var(--space-2);
        border-bottom: var(--border-thin) solid var(--carrion-iron);
        padding-bottom: var(--space-2);
        flex-wrap: wrap;
    }

    .ethical-tab {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-4);
        background: transparent;
        border: none;
        color: var(--carrion-dust);
        cursor: pointer;
        transition: all var(--transition-base);
        border-radius: var(--radius-sm) var(--radius-sm) 0 0;
        font-family: var(--font-body);
        font-size: var(--text-sm);
    }

    .ethical-tab:hover {
        color: var(--carrion-cream);
        background: var(--carrion-ash);
    }

    .ethical-tab.active {
        color: var(--carrion-gold);
        background: var(--carrion-ash);
        border-bottom: var(--border-medium) solid var(--carrion-gold);
    }

    .tab-icon {
        font-size: var(--text-base);
    }

    .tab-title {
        font-weight: var(--weight-medium);
    }

    .ethical-content {
        padding: var(--space-5);
        background: var(--carrion-ash);
        border-radius: 0 var(--radius-md) var(--radius-md) var(--radius-md);
        font-size: var(--text-sm);
        line-height: var(--leading-relaxed);
        color: var(--carrion-cream);
    }

    .ethical-content p {
        margin: 0;
    }

    @media (max-width: 640px) {
        .ethical-tabs {
            flex-direction: column;
        }

        .ethical-tab {
            width: 100%;
            justify-content: flex-start;
            border-radius: var(--radius-sm);
        }

        .ethical-tab.active {
            border-bottom: none;
            border-left: var(--border-medium) solid var(--carrion-gold);
        }

        .ethical-content {
            border-radius: var(--radius-md);
        }
    }
</style>
