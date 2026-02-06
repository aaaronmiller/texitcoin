<script lang="ts">
    interface Props {
        slideNumber?: number;
        title?: string;
        classification?: "confidential" | "investor" | "restricted";
    }

    let { slideNumber, title, classification = "investor" }: Props = $props();
</script>

<section class="a4-frame" aria-label={title || `Slide ${slideNumber}`}>
    {#if classification}
        <div class="frame-classification">
            <span class="badge badge-{classification}">
                {classification === "investor"
                    ? "🔒 INVESTOR ONLY"
                    : classification === "confidential"
                      ? "⚠ CONFIDENTIAL"
                      : "⚡ RESTRICTED"}
            </span>
        </div>
    {/if}

    <div class="frame-content">
        <slot />
    </div>

    {#if slideNumber}
        <div class="slide-number">{slideNumber}</div>
    {/if}
</section>

<style>
    .a4-frame {
        position: relative;
    }

    .frame-classification {
        position: absolute;
        top: var(--space-4);
        right: var(--space-4);
        z-index: 10;
    }

    .frame-content {
        min-height: calc(var(--page-height) - var(--page-padding) * 3);
    }
</style>
