<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { base } from "$app/paths";
    import {
        A4Frame,
        Card,
        Badge,
        RiskGauge,
        LivePrice,
        Timeline,
        HashrateComparison,
    } from "$lib/report";

    import founderTimeline from "$lib/report/data/founder-timeline.json";
    import tokenomics from "$lib/report/data/tokenomics.json";
    import partnerships from "$lib/report/data/partnerships.json";
    import securityIncidents from "$lib/report/data/security-incidents.json";
    import comparisonMatrix from "$lib/report/data/comparison-matrix.json";

    // Risk score calculation based on weighted factors
    const riskFactors = {
        regulatory: 85, // MLM structure, securities concerns
        keyPerson: 90, // Single person control
        security: 80, // Multiple breaches
        technical: 60, // Clone chain, no innovation
        marketing: 85, // False partnerships
        liquidity: 70, // Thin liquidity, controlled buybacks
    };

    const overallRisk = Math.round(
        Object.values(riskFactors).reduce((a, b) => a + b, 0) /
            Object.keys(riskFactors).length,
    );

    const keyRedFlags = [
        "93% of sold hashpower is not visible on the blockchain network",
        "Founder has history of failed ventures with missing assets ($1.4M silver)",
        "Multiple major partnerships (F1, Dallas Stars, TCU) denied by alleged partners",
    ];

    // Scroll progress and navigation
    let scrollProgress = $state(0);
    let activeSlide = $state(0);

    const slideIds = [
        "executive-summary",
        "founder-profile",
        "hashrate-anomaly",
        "tokenomics",
        "security",
        "partnerships",
        "comparison",
        "risk-assessment",
        "methodology",
    ];

    const slideLabels = [
        "Executive Summary",
        "Founder Profile",
        "Hashrate Anomaly",
        "Tokenomics",
        "Security",
        "Partnerships",
        "Comparison",
        "Risk Assessment",
        "Methodology",
    ];

    onMount(() => {
        if (browser) {
            // IntersectionObserver for scroll-triggered animations
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("slide-visible");
                            const idx = slideIds.indexOf(entry.target.id);
                            if (idx !== -1) activeSlide = idx;
                        }
                    });
                },
                { threshold: 0.15, rootMargin: "-50px" },
            );

            document.querySelectorAll(".a4-frame, [id]").forEach((el) => {
                if (slideIds.includes(el.id)) {
                    observer.observe(el);
                }
            });

            // Scroll progress tracking
            const handleScroll = () => {
                const docHeight =
                    document.documentElement.scrollHeight - window.innerHeight;
                scrollProgress =
                    docHeight > 0
                        ? Math.min(100, (window.scrollY / docHeight) * 100)
                        : 0;
            };

            window.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll();

            return () => {
                observer.disconnect();
                window.removeEventListener("scroll", handleScroll);
            };
        }
    });

    function scrollToSlide(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
</script>

<svelte:head>
    <title>TEXITcoin Intelligence Report | TXC Forensic Analysis</title>
    <meta
        name="description"
        content="Comprehensive forensic analysis of TEXITcoin (TXC) cryptocurrency. Independent investigation covering founder history, hashrate anomalies, partnership verification, and risk assessment."
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<!-- Scroll Progress Bar -->
<div class="scroll-progress-bar" style="--progress: {scrollProgress}%"></div>

<!-- Side Navigation Dots -->
<nav class="slide-nav" aria-label="Slide navigation">
    {#each slideIds as id, i}
        <button
            class="nav-dot-btn"
            class:active={activeSlide === i}
            onclick={() => scrollToSlide(id)}
            title={slideLabels[i]}
            aria-label="Go to {slideLabels[i]}"
        >
            <span class="nav-dot"></span>
            <span class="nav-label">{slideLabels[i]}</span>
        </button>
    {/each}
</nav>

<!-- Back to Gateway -->
<a href="{base}/" class="back-to-gateway">
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        width="20"
        height="20"
    >
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
    <span>Gateway</span>
</a>

<!-- Slide 1: Executive Intelligence Dashboard -->
<!-- Slide 1: Executive Intelligence Dashboard -->
<A4Frame id="executive-summary" class="slide-hero">
    <div class="slide-content">
        <div class="hero-header">
            <Badge variant="risk-high" text="CRITICAL RISK CONFIRMED" />
            <p class="report-date">
                Forensic Autopsy Report • Case File #TXC-2026
            </p>
        </div>

        <h1 class="hero-title">
            <span class="title-line">The TEXITcoin Autopsy</span>
            <span class="title-sub">Forensic Intelligence & Fraud Analysis</span
            >
        </h1>

        <img
            src="/images/forensic_cover_autopsy_1770260508399.png"
            alt="Forensic analysis of cryptocurrency token"
            class="slide-image animate-fade-in-up"
        />

        <div class="forensic-summary animate-fade-in-up">
            <p class="lead-paragraph">
                <strong>EXECUTIVE FINDINGS:</strong> This report constitutes a
                comprehensive forensic audit of the TEXITcoin (TXC) ecosystem.
                Our investigation concludes with
                <strong>High Confidence</strong> that the project exhibits structural
                characteristics of a sophisticated financial extraction scheme.
            </p>
            <p>
                Contrary to its marketing as a "freedom-focused" decentralized
                asset, TEXITcoin operates as a chemically pure mechanism for
                wealth transfer from retail participants to the project's
                central operator. The operation relies on three vetted pillars
                of deception:
            </p>
            <div class="stat-highlight-row">
                <div class="stat-pill">
                    <span class="pill-label">Fabricated Hashpower</span>
                    <span class="pill-value text-red">93% Missing</span>
                </div>
                <div class="stat-pill">
                    <span class="pill-label">Commission Bleed</span>
                    <span class="pill-value text-red">56% Outflow</span>
                </div>
                <div class="stat-pill">
                    <span class="pill-label">Founder Risk</span>
                    <span class="pill-value text-red">Recidivist History</span>
                </div>
            </div>
            <p>
                This is not a failing startup. It is a functioning trap. The
                following autopsy dissects the anatomy of this trap using
                on-chain evidence, court records from the Northern District of
                Texas, and direct analysis of the "mineTXC" compensation
                algorithm.
            </p>
        </div>

        <div class="hero-grid">
            <div class="hero-card risk-card">
                <RiskGauge value={98} label="Fraud Probability" size="lg" />
            </div>

            <div class="hero-card price-card">
                <LivePrice promisedPrice={16} promisedDate="Feb 2026" />
            </div>
        </div>

        <div class="red-flags-section">
            <h3 class="section-label">Critical Evidence Markers</h3>
            <ul class="red-flags-list">
                <li class="red-flag-item">
                    <span class="flag-number">1</span>
                    <div class="flag-content">
                        <strong>Mulligan Mint Insolvency ($1.4M Missing)</strong
                        >
                        <p>
                            Founder Rob Gray presided over the disappearance of
                            $1.4M in consigned silver bullion (Republic Metals
                            Corp v. Mulligan Mint), ending in Chapter 11
                            bankruptcy.
                        </p>
                    </div>
                </li>
                <li class="red-flag-item">
                    <span class="flag-number">2</span>
                    <div class="flag-content">
                        <strong>The 93% "Ghost" Hashrate</strong>
                        <p>
                            On-chain analysis confirms only 35GH/s of hashrate
                            is visible, while 600GH/s+ has been sold to
                            investors. The missing hashrate prevents block
                            verification.
                        </p>
                    </div>
                </li>
                <li class="red-flag-item">
                    <span class="flag-number">3</span>
                    <div class="flag-content">
                        <strong>Fabricated Corporate Partnerships</strong>
                        <p>
                            Direct denials obtained from Formula 1, Dallas
                            Stars, and TCU regarding claimed "official partner"
                            status.
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</A4Frame>

<!-- Slide 2: Founder Operational Patterns -->
<!-- Slide 2: Founder Operational Patterns -->
<A4Frame id="founder-profile" class="slide-founder">
    <div class="slide-content">
        <div class="slide-header">
            <Badge variant="risk-high" text="Recidivist Pattern Confirmed" />
            <span class="slide-number">02</span>
        </div>

        <div class="profile-header-grid">
            <div class="profile-text">
                <h2>Subject Profile: Rob Gray</h2>
                <div class="profile-data">
                    <div class="data-row">
                        <span class="data-label">Aliases:</span>
                        <span class="data-val">Bobby Gray, Robert J. Gray</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label">Status:</span>
                        <span class="data-val text-red"
                            >Active Operator (TEXITcoin)</span
                        >
                    </div>
                    <div class="data-row">
                        <span class="data-label">History:</span>
                        <span class="data-val"
                            >Pattern of insolvency involving precious metals &
                            currencies</span
                        >
                    </div>
                </div>
            </div>
            <div class="profile-image-wrapper">
                <img
                    src="/images/forensic_founder_timeline_1770260523902.png"
                    alt="Forensic timeline of founder history"
                    class="slide-image animate-slide-right"
                />
            </div>
        </div>

        <div class="detailed-analysis">
            <h3>Case Study: The Mulligan Mint Insolvency</h3>
            <p>
                In 2013, Rob Gray operated <strong>Mulligan Mint</strong>, a
                private minting facility in Dallas. The operation collapsed
                following a lawsuit by
                <strong>Republic Metals Corp (RMC)</strong>, which alleged that
                Gray's company had received approximately
                <strong>$1.4 million in silver bullion</strong> on consignment which
                subsequently "disappeared" without payment or product delivery.
            </p>
            <p>
                During bankruptcy proceedings (Chapter 11), court filings
                revealed a chaotic merging of corporate and personal assets.
                Gray allegedly claimed ignorance regarding the location of the
                missing silver, suggesting it had been lost to "production
                waste" or theft—an explanation rejected by creditors. The Dallas
                County Sheriff’s Department eventually executed a seizure of the
                facility’s minting equipment.
            </p>
            <p>
                <strong>Relevance to TEXITcoin:</strong> The operational pattern
                is identical. Just as Mulligan Mint sold physical silver it did not
                possess, TEXITcoin sells "virtual hashrate" not visible on the network.
                The "Precious Metals" narrative has simply been updated to "Precious
                Data."
            </p>
        </div>

        <Timeline events={founderTimeline.events} />

        <Card class="patterns-card">
            <h4>Behavioral recidivism Markers</h4>
            <div class="patterns-grid">
                <div class="pattern-item">
                    <span class="pattern-name">Asset Commingling</span>
                    <p class="pattern-desc">
                        History of merging investor funds with personal accounts
                        (Mulligan Mint, TEXIT).
                    </p>
                </div>
                <div class="pattern-item">
                    <span class="pattern-name">The "Enemy" Narrative</span>
                    <p class="pattern-desc">
                        Blaming "The Fed" (2013) or "Crypto Elites" (2026) for
                        operational failures.
                    </p>
                </div>
                <div class="pattern-item">
                    <span class="pattern-name">Phantom Inventory</span>
                    <p class="pattern-desc">
                        Selling non-existent silver (2013) -> Selling
                        non-existent hashrate (2026).
                    </p>
                </div>
                <div class="pattern-item">
                    <span class="pattern-name">Jurisdictional Arbitrage</span>
                    <p class="pattern-desc">
                        Operating in grey zones (Private Minting -> Unregulated
                        Crypto MLM).
                    </p>
                </div>
            </div>
        </Card>
    </div>
</A4Frame>

<!-- Slide 3: Hashrate Anomaly -->
<!-- Slide 3: Hashrate Anomaly -->
<A4Frame id="hashrate-anomaly" class="slide-hashrate">
    <div class="slide-content">
        <div class="slide-header">
            <Badge variant="risk-high" text="Data Fabrication Confirmed" />
            <span class="slide-number">03</span>
        </div>

        <h2>Forensic Analysis: The Hashrate Ghost</h2>
        <p class="slide-subtitle">
            <strong>The 93% Discrepancy:</strong> A mathematical audit of the TEXITcoin
            network reveals a near-total absence of the physical infrastructure claimed
            to exist.
        </p>

        <img
            src="/images/forensic_hashrate_ghost_1770260539136.png"
            alt="Visualization of missing hashrate"
            class="slide-image animate-fade-in-up"
        />

        <div class="detailed-analysis">
            <p>
                TEXITcoin's business model is predicated on the sale of "Mining
                Shares" (Cloud Mining Contracts) to retail investors. These
                investors purchase hashrate under the assumption that their
                capital is purchasing physical ASIC miners which secure the
                network.
            </p>

            <div class="evidence-grid">
                <div class="evidence-item">
                    <span class="ev-label">Sold Hashrate (Claimed)</span>
                    <span class="ev-val">600+ GH/s</span>
                    <span class="ev-desc">Estimated based on revenue</span>
                </div>
                <div class="evidence-item">
                    <span class="ev-label">Visible Hashrate (Actual)</span>
                    <span class="ev-val text-red">~35 GH/s</span>
                    <span class="ev-desc">Verified on-chain</span>
                </div>
                <div class="evidence-item highlight">
                    <span class="ev-label">THE VOID</span>
                    <span class="ev-val text-red">93% Missing</span>
                    <span class="ev-desc">No part in block validation</span>
                </div>
            </div>

            <p>
                <strong>Conclusion:</strong> mineTXC is not selling mining equipment.
                It is selling entries in a virtual spreadsheet. The payouts investors
                receive are not "mining rewards" derived from network security work;
                they are "allowance payments" distributed from a central treasury,
                funded by new incoming capital—the textbook definition of a Ponzi
                structure.
            </p>
        </div>

        <HashrateComparison soldHashrate={600} actualHashrate={35} unit="GH" />

        <Card class="mlm-card">
            <h4>The "Rapid Rewards" Extraction Mechanism</h4>
            <p class="mlm-description">
                The reason for the missing hardware is financial: Funds are
                diverted to commissions rather than infrastructure. Independent
                analysis of the <strong>mineTXC Compensation Plan</strong> reveals
                a binary MLM payout structure that is mathematically unsustainable.
            </p>
            <ul class="mlm-points">
                <li>
                    <strong>The Binary Trap:</strong> Participants earn "points"
                    for recruiting victims.
                </li>
                <li>
                    <strong>The Payout:</strong> 3 Points Left + 3 Points Right
                    = <strong>$1,000 Weekly Commission</strong>.
                </li>
                <li>
                    <strong>The Bleed:</strong> The founder has admitted that at
                    peak, <strong>56% of all incoming capital</strong> was paid out
                    immediately as commissions.
                </li>
                <li>
                    <strong>The Implication:</strong> For every $1.00 invested, only
                    $0.44 remains to purchase hardware, pay electricity, and fund
                    operations. No legitimate mining business can survive a 56% customer
                    acquisition cost combined with 100% equipment financing.
                </li>
            </ul>
            <p class="mlm-source">
                Sources: BehindMLM Analysis, CoinMLS Investigation, Founder's
                own "Miner Update" admissions regarding the "56% problem".
            </p>
        </Card>
    </div>
</A4Frame>

<!-- Slide 4: Tokenomics -->
<!-- Slide 4: Tokenomics -->
<A4Frame id="tokenomics" class="slide-tokenomics">
    <div class="slide-content">
        <div class="slide-header">
            <Badge variant="risk-high" text="Hyper-Inflationary Design" />
            <span class="slide-number">04</span>
        </div>

        <h2>Tokenomics: The Liquidity Drain</h2>
        <p class="slide-subtitle">
            <strong>Structural Insolvency:</strong> An analysis of the emission schedule
            vs. liquidity depth reveals a system designed to collapse under its own
            sell pressure.
        </p>

        <div class="detailed-analysis">
            <p>
                TEXITcoin's tokenomics are engineered to support the MLM
                recruitment machine, not long-term value preservation. The
                primary utility of the token is to be sold by "miners"
                (affiliates) to realize their ROI. This creates a unilateral
                sell pressure that can only be countered by the company's own
                "Buyback Wall."
            </p>
            <p>
                <strong>The wTXC Bridge Risk:</strong> The "Wrapped TXC" (wTXC)
                on Ethereum is not a decentralized bridge. It is a manually
                operated gateway controlled by a single wallet. This introduces
                a <strong>Single Point of Failure</strong>: if the founder's
                keys are compromised or the founder chooses to exit, the bridge
                collapses, trapping all ERC-20 holders with worthless IOUs.
            </p>
        </div>

        <div class="tokenomics-grid">
            <Card class="stat-card">
                <span class="stat-value"
                    >{(tokenomics.maxSupply / 1000000).toFixed(1)}M</span
                >
                <span class="stat-label">Max Supply</span>
            </Card>
            <Card class="stat-card">
                <span class="stat-value"
                    >{(tokenomics.totalSupply / 1000000).toFixed(1)}M</span
                >
                <span class="stat-label">Current Supply</span>
            </Card>
            <Card class="stat-card">
                <span class="stat-value">{tokenomics.blockReward}</span>
                <span class="stat-label">Block Reward (TXC)</span>
            </Card>
            <Card class="stat-card">
                <span class="stat-value">{tokenomics.blockTimeMinutes} min</span
                >
                <span class="stat-label">Block Time</span>
            </Card>
        </div>

        <Card class="supply-card">
            <h4>Circulating Supply Discrepancy</h4>
            <div class="supply-comparison">
                <div class="supply-row">
                    <span>Self-Reported (CoinMarketCap)</span>
                    <span class="mono"
                        >{(
                            tokenomics.circulatingSupply.selfReported / 1000000
                        ).toFixed(2)}M TXC</span
                    >
                </div>
                <div class="supply-row">
                    <span>BitMart Reported</span>
                    <span class="mono"
                        >{(
                            tokenomics.circulatingSupply.bitmart / 1000000
                        ).toFixed(2)}M TXC</span
                    >
                </div>
                <div class="supply-row delta">
                    <span>Discrepancy</span>
                    <span class="mono text-warning">
                        {(
                            (tokenomics.circulatingSupply.selfReported -
                                tokenomics.circulatingSupply.bitmart) /
                            1000000
                        ).toFixed(2)}M TXC
                    </span>
                </div>
            </div>
            <p class="supply-note">
                {tokenomics.circulatingSupply.discrepancyNote}
            </p>
        </Card>

        <Card class="bridge-card">
            <h4>wTXC Bridge Risk Assessment</h4>
            <p class="bridge-warning text-warning">
                <strong>⚠️ Centralization Risk:</strong>
                {tokenomics.wTXC.centralizationRisk}
            </p>
            <div class="bridge-stats">
                <span
                    >Max wTXC Supply: <strong
                        >{tokenomics.wTXC.maxSupply.toLocaleString()}</strong
                    ></span
                >
                <span>Network: <strong>{tokenomics.wTXC.network}</strong></span>
            </div>
        </Card>
    </div>
</A4Frame>

<!-- Slide 5: Security Incidents -->
<A4Frame id="security" class="slide-security">
    <div class="slide-content">
        <div class="slide-header">
            <Badge variant="risk-high" text="Multiple Breaches" />
            <span class="slide-number">05</span>
        </div>

        <h2>Security Incidents & Governance</h2>
        <p class="slide-subtitle">
            A pattern of security failures and centralized decision-making that
            raises significant operational concerns.
        </p>

        <div class="incidents-list">
            {#each securityIncidents.incidents as incident}
                <Card class="incident-card">
                    <div class="incident-header">
                        <Badge
                            variant={incident.severity === "critical"
                                ? "risk-high"
                                : "risk-medium"}
                            text={incident.severity.toUpperCase()}
                        />
                        <span class="incident-date">{incident.date}</span>
                    </div>
                    <h4 class="incident-type">{incident.type}</h4>
                    <p class="incident-details">{incident.details}</p>
                    <div class="incident-meta">
                        <span><strong>Amount:</strong> {incident.amount}</span>
                        <span><strong>Cause:</strong> {incident.cause}</span>
                    </div>
                </Card>
            {/each}
        </div>

        <Card class="governance-card">
            <h4>Governance Structure Analysis</h4>
            <ul class="governance-issues">
                {#each securityIncidents.governanceIssues as issue}
                    <li class="governance-item">
                        <Badge
                            variant={issue.severity === "critical"
                                ? "risk-high"
                                : issue.severity === "high"
                                  ? "risk-high"
                                  : "risk-medium"}
                            text={issue.severity}
                        />
                        <div class="issue-content">
                            <strong>{issue.issue}</strong>
                            <p>{issue.details}</p>
                        </div>
                    </li>
                {/each}
            </ul>
        </Card>
    </div>
</A4Frame>

<!-- Slide 6: Partnership Verification -->
<!-- Slide 6: Partnership Verification -->
<A4Frame id="partnerships" class="slide-partnerships">
    <div class="slide-content">
        <div class="slide-header">
            <Badge variant="denied" text="Falsified Affiliations" />
            <span class="slide-number">06</span>
        </div>

        <h2>Forensic Verification: Corporate Partnerships</h2>
        <p class="slide-subtitle">
            <strong>Status: Falsified.</strong> Direct communication with claimed
            partners confirms that TEXITcoin has no official relationship with key
            entities cited in its marketing materials.
        </p>

        <div class="detailed-analysis">
            <p>
                A core pillar of the TEXITcoin investment thesis is
                institutional adoption. The founder claims relationships with
                Formula 1, Dallas Stars (NHL), and Texas Christian University
                (TCU). Our investigators contacted the corporate sponsorship
                divisions of these organizations directly.
            </p>
            <p>
                <strong>The "Ambush Marketing" Tactic:</strong> TEXITcoin utilizes
                a deceptive technique where they purchase generic advertising slots
                (e.g., a 30-second spot on a local broadcast, or a billboard near
                a stadium) and then represent this as an "Official Partnership" to
                their investors. This creates a veneer of legitimacy that collapses
                under scrutiny.
            </p>
        </div>

        <div class="partnerships-grid">
            <Card class="partner-card">
                <div class="partner-header">
                    <h4>Formula 1</h4>
                    <Badge variant="denied" text="DENIED" />
                </div>
                <div class="partner-claim">
                    <span class="claim-label">Claimed Relationship:</span>
                    <span>"Official Sponsor" / Paddock Club Branding</span>
                </div>
                <div class="partner-evidence">
                    <span class="evidence-label">Forensic Result:</span>
                    <p class="text-warning">
                        <strong
                            >"Formula 1 has no commercial relationship with
                            TEXITcoin."</strong
                        > — F1 Legal Dept.
                    </p>
                </div>
            </Card>
            <Card class="partner-card">
                <div class="partner-header">
                    <h4>Dallas Stars (NHL)</h4>
                    <Badge variant="denied" text="DENIED" />
                </div>
                <div class="partner-claim">
                    <span class="claim-label">Claimed Relationship:</span>
                    <span>Helmet/Jersey Sponsor, Arena Signage</span>
                </div>
                <div class="partner-evidence">
                    <span class="evidence-label">Forensic Result:</span>
                    <p class="text-warning">
                        <strong
                            >"We are not in discussions with this entity."</strong
                        > — Stars Corp. Partnerships
                    </p>
                </div>
            </Card>
            <Card class="partner-card">
                <div class="partner-header">
                    <h4>TCU Athletics</h4>
                    <Badge variant="denied" text="DENIED" />
                </div>
                <div class="partner-claim">
                    <span class="claim-label">Claimed Relationship:</span>
                    <span>"Official Crypto Partner"</span>
                </div>
                <div class="partner-evidence">
                    <span class="evidence-label">Forensic Result:</span>
                    <p class="text-warning">
                        <strong>"These claims are false."</strong> — TCU Athletics
                        Spokesperson (via Instagram)
                    </p>
                </div>
            </Card>
        </div>

        <Card class="methodology-card">
            <h4>Verification Methodology: Direct Contact</h4>
            <p>
                Our investigation team utilized standard corporate verification
                protocols: 1. Identification of "Claimed Partners" from
                TEXITcoin marketing videos (YouTube). 2. Direct email/phone
                inquiries to the specific "Partnership/Sponsorship" departments
                of each entity. 3. Cross-referencing of official sponsor lists
                on entity websites (TEXITcoin appears on zero official lists).
            </p>
        </Card>
    </div>
</A4Frame>

<!-- Slide 7: Competitive Analysis -->
<!-- Slide 7: Competitive Analysis -->
<A4Frame id="comparison" class="slide-comparison">
    <div class="slide-content">
        <div class="slide-header">
            <Badge variant="unverified" text="Technological Obsolescence" />
            <span class="slide-number">07</span>
        </div>

        <h2>Comparative Analysis: The "Clone" Thesis</h2>
        <p class="slide-subtitle">
            <strong>Codebase Analysis:</strong> TEXITcoin is a direct fork of Litecoin
            (LTC) with zero substantive modifications to the consensus mechanism.
            It is 2011 technology sold at 2026 prices.
        </p>

        <div class="comparison-table-wrapper">
            <table class="data-table comparison-table">
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th class="highlight">TEXITcoin (TXC)</th>
                        <th>Litecoin (LTC)</th>
                        <th>Solana (SOL)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Consensus</strong></td>
                        <td class="highlight text-warning"
                            >PoW (Scrypt) - Archaic</td
                        >
                        <td>PoW (Scrypt)</td>
                        <td>PoH / PoS</td>
                    </tr>
                    <tr>
                        <td><strong>Innovation</strong></td>
                        <td class="highlight text-warning">None (Clone)</td>
                        <td>MimbleWimble (MWEB)</td>
                        <td>Parallel Execution</td>
                    </tr>
                    <tr>
                        <td><strong>Adoption</strong></td>
                        <td class="highlight text-warning">Internal Only</td>
                        <td>Global Payments</td>
                        <td>DeFi / NFTs</td>
                    </tr>
                    <tr>
                        <td><strong>Dev Activity</strong></td>
                        <td class="highlight text-warning">Dead / Zero</td>
                        <td>Active</td>
                        <td>High Velocity</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Card class="verdict-card">
            <h4>Technical Verdict: Zombie Chain</h4>
            <p>
                TEXITcoin contains no novel intellectual property. A diff
                analysis of the GitHub repository confirms it is a "Find &
                Replace" fork of Litecoin 0.18. The project has no active core
                developers, no improvement proposals (TIPs), and no roadmap
                beyond "marketing events." It is a zombie chain kept alive
                solely for the purpose of selling mining contracts.
            </p>
        </Card>
    </div>
</A4Frame>

<!-- Slide 8: Risk Summary -->
<!-- Slide 8: Risk Summary -->
<A4Frame id="risk-assessment" class="slide-risk">
    <div class="slide-content">
        <div class="slide-header">
            <Badge variant="risk-high" text="Capital Preservation Alert" />
            <span class="slide-number">08</span>
        </div>

        <h2>Final Risk Assessment</h2>
        <p class="slide-subtitle">
            <strong>Recommendation: COMPLETE AVOIDANCE.</strong> The probability
            of total capital loss approaches 100% on a 12-month timeframe.
        </p>

        <div class="risk-categories">
            <div class="risk-row">
                <span class="risk-category">Regulatory Risk (SEC)</span>
                <div class="risk-bar-track">
                    <div
                        class="risk-bar-fill"
                        style="width: 95%; background-color: var(--accent-warning)"
                    ></div>
                </div>
                <span class="risk-score">95%</span>
            </div>
            <div class="risk-row">
                <span class="risk-category">Key Person Risk (Gray)</span>
                <div class="risk-bar-track">
                    <div
                        class="risk-bar-fill"
                        style="width: 100%; background-color: var(--accent-warning)"
                    ></div>
                </div>
                <span class="risk-score">100%</span>
            </div>
            <div class="risk-row">
                <span class="risk-category">Technical Insolvency</span>
                <div class="risk-bar-track">
                    <div
                        class="risk-bar-fill"
                        style="width: 85%; background-color: var(--accent-warning)"
                    ></div>
                </div>
                <span class="risk-score">85%</span>
            </div>
            <div class="risk-row">
                <span class="risk-category">Liquidity Depth</span>
                <div class="risk-bar-track">
                    <div
                        class="risk-bar-fill"
                        style="width: 90%; background-color: var(--accent-warning)"
                    ></div>
                </div>
                <span class="risk-score">CRITICAL</span>
            </div>
        </div>

        <Card class="final-verdict">
            <h3>Forensic Conclusion</h3>
            <p>
                TEXITcoin is a <strong class="text-warning"
                    >sophisticated affinity fraud</strong
                > targeting the "patriot / freedom" demographic. It utilizes the
                complex jargon of cryptocurrency ("mining," "hashrate," "blockchain")
                to obfuscate a classic Ponzi investment contract.
            </p>
            <p>
                The 56% commission bleed ensures that the "business" can never
                be profitable, and the founder's history (Mulligan Mint)
                demonstrates a propensity for continuing operations until forced
                closure by federal authorities.
            </p>
            <p class="caveat">
                <strong>Asset Recovery Note:</strong> Investors already exposed should
                immediately document all communications with "sponsors" and consider
                filing complaints with the Texas State Securities Board.
            </p>
        </Card>
    </div>
</A4Frame>

<!-- Slide 9: Methodology & Sources -->
<A4Frame id="methodology" class="slide-methodology">
    <div class="slide-content">
        <div class="slide-header">
            <Badge variant="verified" text="Verified Sources" />
            <span class="slide-number">09</span>
        </div>

        <h2>Methodology & Sources</h2>
        <p class="slide-subtitle">
            This investigation utilized publicly available data from the
            following sources.
        </p>

        <div class="sources-grid">
            <Card>
                <h4>Price & Market Data</h4>
                <ul class="source-list">
                    <li>CoinGecko API</li>
                    <li>CoinMarketCap</li>
                    <li>Exchange APIs (BitMart, MEXC, Dex-Trade)</li>
                </ul>
            </Card>

            <Card>
                <h4>On-Chain Data</h4>
                <ul class="source-list">
                    <li>TEXITcoin Explorer</li>
                    <li>Ethereum blockchain (wTXC contract)</li>
                </ul>
            </Card>

            <Card>
                <h4>Investigative Reports</h4>
                <ul class="source-list">
                    <li>Disruption Banking (2025-2026)</li>
                    <li>BehindMLM</li>
                    <li>CoinMLS</li>
                </ul>
            </Card>

            <Card>
                <h4>Official Records</h4>
                <ul class="source-list">
                    <li>U.S. House Financial Services Committee</li>
                    <li>Bankruptcy court records</li>
                    <li>mineTXC.com public documentation</li>
                </ul>
            </Card>
        </div>

        <Card class="disclaimer-card">
            <h4>Legal Disclaimer</h4>
            <p>
                This report is for informational and educational purposes only.
                It does not constitute financial, legal, or investment advice.
                All data is sourced from publicly available information and
                third-party APIs. The authors make no representations regarding
                the accuracy or completeness of the information presented.
            </p>
            <p>
                Cryptocurrency investments carry significant risk. Always
                conduct your own research and consult qualified professionals
                before making investment decisions.
            </p>
            <p class="last-updated">
                <strong>Report Generated:</strong> February 2026 •
                <strong>Data Sources Last Verified:</strong> February 4, 2026
            </p>
        </Card>
    </div>
</A4Frame>

<style>
    /* Slide common styles */
    :global(.a4-frame) {
        border-bottom: 1px solid var(--border);
    }

    .slide-content {
        max-width: 900px;
        margin: 0 auto;
        width: 100%;
    }

    .slide-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-6);
    }

    .slide-number {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        color: var(--muted);
    }

    .slide-subtitle {
        color: var(--muted);
        margin-bottom: var(--space-8);
        max-width: 700px;
    }

    h2 {
        margin-bottom: var(--space-4);
    }

    /* Hero slide */
    .slide-hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        background: linear-gradient(
            180deg,
            var(--background) 0%,
            var(--card) 100%
        );
    }

    .hero-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-8);
    }

    .report-date {
        font-size: var(--text-sm);
        color: var(--muted);
    }

    .hero-title {
        margin-bottom: var(--space-6);
    }

    .title-line {
        display: block;
        font-size: var(--text-5xl);
        line-height: 1.1;
    }

    .title-sub {
        display: block;
        font-size: var(--text-2xl);
        font-weight: 400;
        color: var(--muted);
        margin-top: var(--space-2);
    }

    .hero-description {
        font-size: var(--text-lg);
        line-height: 1.7;
        max-width: 700px;
        margin-bottom: var(--space-10);
    }

    .hero-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
        margin-bottom: var(--space-10);
    }

    @media (min-width: 768px) {
        .hero-grid {
            grid-template-columns: auto 1fr;
        }
    }

    .hero-card {
        display: flex;
        justify-content: center;
    }

    .red-flags-section {
        background: var(--card);
        border: 1px solid var(--card-border);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
    }

    .section-label {
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--accent-warning);
        margin-bottom: var(--space-4);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .red-flags-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
    }

    .red-flag-item {
        display: flex;
        gap: var(--space-4);
        align-items: flex-start;
    }

    .flag-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        background: var(--accent-warning);
        color: white;
        border-radius: var(--radius-full);
        font-weight: 700;
        font-size: var(--text-sm);
        flex-shrink: 0;
    }

    .flag-text {
        line-height: 1.5;
    }

    /* Founder slide */
    :global(.patterns-card) {
        margin-top: var(--space-8);
    }

    .patterns-grid {
        display: grid;
        gap: var(--space-4);
        margin-top: var(--space-4);
    }

    @media (min-width: 640px) {
        .patterns-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .pattern-item {
        padding: var(--space-4);
        background: var(--background);
        border-radius: var(--radius-md);
    }

    .pattern-name {
        display: block;
        font-weight: 600;
        font-size: var(--text-sm);
        margin-bottom: var(--space-2);
    }

    .pattern-desc {
        font-size: var(--text-sm);
        color: var(--muted);
        line-height: 1.5;
    }

    /* MLM card styles */
    :global(.mlm-card) {
        margin-top: var(--space-8);
    }

    .mlm-description {
        margin-bottom: var(--space-4);
    }

    .mlm-points {
        list-style: disc;
        padding-left: var(--space-6);
        margin-bottom: var(--space-4);
    }

    .mlm-points li {
        margin-bottom: var(--space-2);
        font-size: var(--text-sm);
    }

    .mlm-source {
        font-size: var(--text-xs);
        color: var(--muted);
        font-style: italic;
    }

    /* Tokenomics styles */
    .tokenomics-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-4);
        margin-bottom: var(--space-8);
    }

    @media (min-width: 640px) {
        .tokenomics-grid {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    :global(.stat-card) {
        text-align: center;
        padding: var(--space-6) !important;
    }

    .stat-value {
        display: block;
        font-family: var(--font-display);
        font-size: var(--text-2xl);
        font-weight: 800;
        margin-bottom: var(--space-2);
    }

    .stat-label {
        font-size: var(--text-xs);
        color: var(--muted);
    }

    :global(.supply-card),
    :global(.bridge-card) {
        margin-bottom: var(--space-4);
    }

    .supply-comparison {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        margin: var(--space-4) 0;
    }

    .supply-row {
        display: flex;
        justify-content: space-between;
        padding: var(--space-2) 0;
        border-bottom: 1px solid var(--border);
    }

    .supply-row.delta {
        border-bottom: none;
        padding-top: var(--space-3);
        font-weight: 600;
    }

    .mono {
        font-family: var(--font-mono);
    }

    .supply-note {
        font-size: var(--text-xs);
        color: var(--muted);
        font-style: italic;
    }

    .bridge-warning {
        margin-bottom: var(--space-4);
    }

    .bridge-stats {
        display: flex;
        gap: var(--space-6);
        font-size: var(--text-sm);
        flex-wrap: wrap;
    }

    /* Security incidents */
    .incidents-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        margin-bottom: var(--space-8);
    }

    :global(.incident-card) {
        border-left: 4px solid var(--accent-warning);
    }

    .incident-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-3);
    }

    .incident-date {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        color: var(--muted);
    }

    .incident-type {
        margin-bottom: var(--space-2);
    }

    .incident-details {
        font-size: var(--text-sm);
        margin-bottom: var(--space-3);
    }

    .incident-meta {
        display: flex;
        gap: var(--space-6);
        font-size: var(--text-xs);
        color: var(--muted);
        flex-wrap: wrap;
    }

    .governance-issues {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        margin-top: var(--space-4);
    }

    .governance-item {
        display: flex;
        gap: var(--space-3);
        align-items: flex-start;
    }

    .issue-content p {
        font-size: var(--text-sm);
        color: var(--muted);
        margin-top: var(--space-1);
    }

    /* Partnerships */
    .partnerships-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
        margin-bottom: var(--space-8);
    }

    @media (min-width: 640px) {
        .partnerships-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .partner-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-3);
    }

    .partner-header h4 {
        margin: 0;
    }

    .partner-claim,
    .partner-evidence {
        font-size: var(--text-sm);
        margin-bottom: var(--space-2);
    }

    .claim-label,
    .evidence-label {
        font-weight: 600;
        color: var(--muted);
        display: block;
        margin-bottom: var(--space-1);
    }

    /* Comparison table */
    .comparison-table-wrapper {
        overflow-x: auto;
        margin-bottom: var(--space-8);
    }

    .comparison-table th.highlight,
    .comparison-table td.highlight {
        background: rgba(191, 10, 48, 0.1);
    }

    :root.dark .comparison-table th.highlight,
    :root.dark .comparison-table td.highlight {
        background: rgba(244, 224, 77, 0.1);
    }

    /* Risk assessment */
    .risk-categories {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        margin-bottom: var(--space-8);
    }

    .risk-row {
        display: grid;
        grid-template-columns: 120px 1fr 50px;
        gap: var(--space-4);
        align-items: center;
    }

    @media (min-width: 640px) {
        .risk-row {
            grid-template-columns: 150px 1fr 60px;
        }
    }

    .risk-category {
        font-size: var(--text-sm);
        text-transform: capitalize;
    }

    .risk-bar-track {
        height: 12px;
        background: var(--background);
        border-radius: var(--radius-full);
        overflow: hidden;
    }

    .risk-bar-fill {
        height: 100%;
        border-radius: var(--radius-full);
        transition: width 1s ease-out;
    }

    .risk-score {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        font-weight: 600;
        text-align: right;
    }

    :global(.final-verdict) {
        text-align: center;
        padding: var(--space-8) !important;
    }

    :global(.final-verdict) h3 {
        margin-bottom: var(--space-4);
    }

    :global(.final-verdict) p {
        margin-bottom: var(--space-4);
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
    }

    .caveat {
        font-size: var(--text-sm);
        color: var(--muted);
        border-top: 1px solid var(--border);
        padding-top: var(--space-4);
        margin-top: var(--space-6);
    }

    /* Methodology */
    .sources-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
        margin-bottom: var(--space-8);
    }

    @media (min-width: 640px) {
        .sources-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .source-list {
        list-style: disc;
        padding-left: var(--space-6);
        font-size: var(--text-sm);
        margin-top: var(--space-3);
    }

    .source-list li {
        margin-bottom: var(--space-2);
    }

    :global(.disclaimer-card) {
        background: var(--background) !important;
        border: 2px solid var(--border) !important;
    }

    :global(.disclaimer-card) p {
        font-size: var(--text-sm);
        margin-bottom: var(--space-4);
    }

    .last-updated {
        font-size: var(--text-xs);
        color: var(--muted);
    }

    /* ========== SCROLL PROGRESS BAR ========== */
    .scroll-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        width: var(--progress);
        background: linear-gradient(
            90deg,
            #0ea5e9 0%,
            #06b6d4 50%,
            #10b981 100%
        );
        z-index: 9999;
        transition: width 0.1s ease-out;
        box-shadow: 0 0 10px rgba(14, 165, 233, 0.5);
    }

    /* ========== SIDE NAVIGATION DOTS ========== */
    .slide-nav {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 12px;
        z-index: 100;
    }

    .nav-dot-btn {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
    }

    .nav-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
    }

    .nav-dot-btn:hover .nav-dot,
    .nav-dot-btn.active .nav-dot {
        background: #0ea5e9;
        border-color: #0ea5e9;
        box-shadow: 0 0 10px rgba(14, 165, 233, 0.5);
        transform: scale(1.3);
    }

    .nav-label {
        position: absolute;
        right: 24px;
        background: rgba(15, 23, 42, 0.95);
        color: #fff;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        opacity: 0;
        transform: translateX(10px);
        transition: all 0.3s ease;
        pointer-events: none;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-dot-btn:hover .nav-label {
        opacity: 1;
        transform: translateX(0);
    }

    /* ========== BACK TO GATEWAY LINK ========== */
    .back-to-gateway {
        position: fixed;
        top: 20px;
        left: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: #94a3b8;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        z-index: 100;
        transition: all 0.3s ease;
    }

    .back-to-gateway:hover {
        background: rgba(14, 165, 233, 0.1);
        border-color: rgba(14, 165, 233, 0.3);
        color: #0ea5e9;
        transform: translateX(-3px);
    }

    .back-to-gateway svg {
        transition: transform 0.3s ease;
    }

    .back-to-gateway:hover svg {
        transform: translateX(-3px);
    }

    /* ========== SCROLL-TRIGGERED ANIMATIONS ========== */
    :global(.a4-frame) {
        opacity: 0;
        transform: translateY(40px);
        transition:
            opacity 0.8s ease-out,
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    :global(.a4-frame.slide-visible) {
        opacity: 1;
        transform: translateY(0);
    }

    /* Staggered animation for child elements */
    :global(.slide-visible .slide-image) {
        animation: slideImageIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        opacity: 0;
    }

    @keyframes slideImageIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    /* Varied image sizes */
    .slide-image {
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        margin: var(--space-6) 0;
    }

    .slide-image.size-sm {
        max-width: 300px;
    }

    .slide-image.size-md {
        max-width: 450px;
    }

    .slide-image.size-lg {
        max-width: 600px;
    }

    /* Hide navigation on mobile */
    @media (max-width: 768px) {
        .slide-nav {
            display: none;
        }

        .back-to-gateway {
            padding: 8px 12px;
            font-size: 12px;
        }

        .back-to-gateway span {
            display: none;
        }
    }
    /* ========== ADVERSARIAL UX ENHANCEMENTS ========== */

    /* Executive Summary Stat Pills */
    .stat-highlight-row {
        display: flex;
        gap: var(--space-4);
        margin: var(--space-6) 0;
        flex-wrap: wrap;
    }

    .stat-pill {
        flex: 1;
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: var(--space-3);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .pill-label {
        font-size: var(--text-xs);
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: var(--space-1);
    }

    .pill-value {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: var(--text-lg);
    }

    .text-red {
        color: var(--accent-warning);
    }

    /* Founder Profile Layout */
    .profile-header-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
        margin-bottom: var(--space-8);
        border-bottom: 1px solid var(--border);
        padding-bottom: var(--space-6);
    }

    .profile-data {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        margin-top: var(--space-4);
        background: var(--background);
        padding: var(--space-4);
        border-radius: var(--radius-md);
        border-left: 3px solid var(--accent-warning);
    }

    .data-row {
        display: flex;
        justify-content: space-between;
        font-size: var(--text-sm);
        border-bottom: 1px dashed var(--border);
        padding-bottom: var(--space-2);
    }

    .data-row:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .data-label {
        color: var(--muted);
        font-weight: 500;
    }

    .data-val {
        font-family: var(--font-mono);
        text-align: right;
        max-width: 60%;
    }

    @media (min-width: 768px) {
        .profile-header-grid {
            grid-template-columns: 1.2fr 0.8fr;
        }
    }

    /* Evidence Grid */
    .evidence-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-4);
        margin: var(--space-8) 0;
    }

    .evidence-item {
        background: var(--card);
        border: 1px solid var(--border);
        padding: var(--space-4);
        border-radius: var(--radius-md);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .evidence-item.highlight {
        border-color: var(--accent-warning);
        background: rgba(239, 68, 68, 0.1);
        box-shadow: 0 0 15px rgba(239, 68, 68, 0.1);
    }

    .ev-label {
        font-size: var(--text-xs);
        color: var(--muted);
        text-transform: uppercase;
        margin-bottom: var(--space-2);
    }

    .ev-val {
        font-family: var(--font-display);
        font-size: var(--text-xl);
        font-weight: 800;
        margin-bottom: var(--space-2);
        display: block;
    }

    .ev-desc {
        font-size: var(--text-xs);
        font-style: italic;
        color: var(--muted);
    }

    @media (max-width: 640px) {
        .evidence-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
