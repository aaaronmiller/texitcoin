<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { base } from "$app/paths";
    import A4Frame from "$lib/strike/components/A4Frame.svelte";
    import StrategyCard from "$lib/strike/components/StrategyCard.svelte";
    import EventCountdown from "$lib/strike/components/EventCountdown.svelte";
    import FounderQuote from "$lib/strike/components/FounderQuote.svelte";
    import EthicalDisclosure from "$lib/strike/components/EthicalDisclosure.svelte";
    import MetricsDashboard from "$lib/strike/components/MetricsDashboard.svelte";
    import RiskMatrix from "$lib/strike/components/RiskMatrix.svelte";

    import strategiesData from "$lib/strike/data/strategies.json";
    import eventsData from "$lib/strike/data/events-calendar.json";
    import quotesData from "$lib/strike/data/founder-quotes.json";
    import riskData from "$lib/strike/data/risk-matrix.json";

    const strategies = strategiesData.strategies;
    const quotes = quotesData.quotes;
    const dubaiEvent = eventsData.events.find(
        (e) => e.id === "token2049-dubai",
    );

    // Flatten all risks from categories
    const allRisks = riskData.categories
        .flatMap((cat) => cat.risks)
        .slice(0, 6);

    // Scroll progress, nav, and floating elements
    let scrollProgress = $state(0);
    let activeSlide = $state(0);
    let mouseX = $state(0);
    let mouseY = $state(0);

    const slideCount = 8; // Total slides

    onMount(() => {
        if (browser) {
            // Scroll tracking
            const handleScroll = () => {
                const docHeight =
                    document.documentElement.scrollHeight - window.innerHeight;
                scrollProgress =
                    docHeight > 0
                        ? Math.min(100, (window.scrollY / docHeight) * 100)
                        : 0;
            };

            // Mouse tracking for parallax
            const handleMouseMove = (e: MouseEvent) => {
                mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                mouseY = (e.clientY / window.innerHeight) * 2 - 1;
            };

            // Intersection Observer
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("slide-visible");
                            // Extract slide number from somewhere if needed, or just track scroll
                            // Simplified for now based on approximate scroll position or IDs if added
                        }
                    });
                },
                { threshold: 0.15 },
            );

            document.querySelectorAll(".a4-frame").forEach((el, index) => {
                observer.observe(el);
                // Add ID for navigation if missing
                if (!el.id) el.id = `slide-${index + 1}`;
            });

            window.addEventListener("scroll", handleScroll, { passive: true });
            window.addEventListener("mousemove", handleMouseMove, {
                passive: true,
            });
            handleScroll();

            return () => {
                observer.disconnect();
                window.removeEventListener("scroll", handleScroll);
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }
    });

    function scrollToSlide(index: number) {
        document
            .getElementById(`slide-${index}`)
            ?.scrollIntoView({ behavior: "smooth" });
    }
</script>

<!-- Scroll Progress Bar -->
<div class="scroll-progress-bar" style="--progress: {scrollProgress}%"></div>

<!-- Side Navigation -->
<nav class="strike-nav">
    {#each Array(slideCount) as _, i}
        <button
            class="nav-dot"
            class:active={Math.floor(scrollProgress / (100 / slideCount)) === i}
            onclick={() => scrollToSlide(i + 1)}
            title="Slide {i + 1}"
        ></button>
    {/each}
</nav>

<!-- Back to Gateway -->
<a href="{base}/" class="back-to-gateway">
    <span class="icon">⟵</span>
    <span>TERMINATE SESSION</span>
</a>

<svelte:head>
    <meta
        name="description"
        content="Carrion Capital: Strategic Intelligence Briefing on TEXITcoin Market Opportunities"
    />
</svelte:head>

<main class="carrion-main">
    <!-- ===== SLIDE 1: Cover & Intelligence Summary ===== -->
    <A4Frame slideNumber={1} classification="investor">
        <header class="cover-header">
            <div class="cover-logo">
                <span class="logo-icon">📉</span>
                <h1 class="logo-text">Strategic Capital Extraction</h1>
            </div>
            <p class="cover-tagline">Distressed Asset Opportunities</p>
        </header>

        <div class="cover-classification">
            <div class="stamp">INTERNAL USE</div>
        </div>

        <div class="cover-title">
            <h2>TEXITcoin Extraction Protocol</h2>
            <p class="cover-subtitle">
                Systematic Alpha Extraction from Terminally Compromised Assets
            </p>
        </div>

        <img
            src="/images/strike_cover_v2.png"
            alt="Strategic Capital Extraction Interface"
            class="slide-image animate-fade-in-up"
        />

        <div class="executive-summary">
            <p>
                This document presents a comprehensive strategic analysis of
                TEXITcoin (TXC), a Texas-themed Layer-1 cryptocurrency that
                presents unique market opportunities due to its structural
                characteristics. Through months of investigation, including
                analysis of over 97 weekly founder communications, on-chain data
                verification, and extensive community monitoring, we have
                identified predictable market patterns that can be
                systematically exploited for profit.
            </p>
            <p>
                TEXITcoin operates with a fundamentally unsustainable economic
                model. The project's mineTXC platform sells hashpower to
                participants while paying out up to 56% of incoming funds as
                MLM-style commissions. This creates a constant outflow that must
                be balanced by aggressive price support through "liquidity
                buybacks." The founder, Bobby Gray, has publicly acknowledged
                spending over $15 million attempting to maintain price
                stability, yet the token has declined from its all-time high of
                $7.00 to current levels near $0.85—a depreciation of
                approximately 88%.
            </p>
            <p>
                The opportunity before us is not the hopeful speculation that
                TXC will reach its promised $16 target price. That dream died in
                late 2025 when the founder abandoned the narrative and pivoted
                to launching a second cryptocurrency, Iskander. Instead, the
                opportunity lies in understanding exactly how this dying asset's
                remaining lifeblood flows through predictable channels—marketing
                events, artificial price pumps, and the desperation of trapped
                holders—and positioning ourselves to extract value before the
                inevitable final collapse.
            </p>
            <p>
                We call this strategy "carrion extraction" because we are not
                creating value or contributing to a system. We are
                systematically identifying and harvesting the remaining value
                from an asset that is already in terminal decline. The vulture
                does not kill; it merely consumes what is already dying. Our
                alpha comes from understanding the mechanics of decay better
                than those still clinging to hope.
            </p>
        </div>

        <MetricsDashboard />

        {#if dubaiEvent}
            <EventCountdown
                targetDate={dubaiEvent.date}
                eventName="Dubai Exit Window"
            />
        {/if}

        <div class="cover-footer">
            <p class="date-stamp">February 2026 | Version 1.0</p>
            <p class="disclaimer">
                FOR QUALIFIED INVESTORS ONLY. NOT INVESTMENT ADVICE.
            </p>
        </div>
    </A4Frame>

    <!-- ===== SLIDE 2: The Anatomy of Controlled Decay ===== -->
    <A4Frame
        slideNumber={2}
        title="Anatomy of Controlled Decay"
        classification="investor"
    >
        <h2>The Anatomy of Controlled Decay</h2>
        <p class="section-intro">Understanding why this opportunity exists</p>

        <img
            src="/images/vbs_decay_slide_1770259721572.png"
            alt="Decaying cryptocurrency assets"
            class="slide-image animate-slide-left"
        />

        <div class="detailed-analysis">
            <p>
                To understand why TEXITcoin represents a unique extraction
                opportunity, we must first understand the fundamental mechanics
                that make its decline both inevitable and predictable. TEXITcoin
                is not merely a failing cryptocurrency—it is a carefully
                engineered financial structure that was designed from inception
                to transfer wealth from new participants to earlier ones, with
                the founder sitting atop this pyramid as the ultimate
                beneficiary.
            </p>
            <p>
                The core of TEXITcoin's operation is the mineTXC platform, which
                sells "hashpower" to participants. In theory, participants
                purchase mining capacity that generates TXC tokens over time. In
                practice, third-party analysis has revealed that approximately
                93% of the hashpower that has been sold to participants cannot
                be verified on the blockchain. The network's actual hashrate is
                a fraction of what the sold hashpower would suggest, raising
                fundamental questions about where participant money actually
                goes.
            </p>
            <p>
                The answer lies in the compensation structure. MineTXC operates
                a binary MLM compensation plan called "Rapid Rewards" that pays
                up to 56% of incoming funds directly to existing participants as
                commissions. This means that for every $100 a new miner spends,
                $56 immediately exits the system to pay recruiters. This is not
                a hidden fee—it is the explicit design of the platform,
                documented in their own marketing materials and confirmed by
                independent analysts at BehindMLM and CoinMLS.
            </p>
            <p>
                The remaining 44% of incoming funds must somehow cover actual
                mining operations, development, marketing,
                and—critically—artificial price support. The founder has
                admitted on multiple occasions to using a "liquidity fund" to
                execute daily buybacks, attempting to maintain the token price
                near previously promised levels. This creates a death spiral: as
                the token price falls, more buyback capital is required; as
                buyback capital is depleted, fewer new participants are
                attracted; as recruitment slows, commission payouts consume an
                ever-larger share of diminishing inflows.
            </p>
        </div>

        <div class="decay-graphic">
            <div class="flow-diagram">
                <div class="flow-item income">
                    <span class="flow-label">Incoming</span>
                    <span class="flow-value">100%</span>
                    <span class="flow-desc">New Miner Purchases</span>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-split">
                    <div class="flow-item outflow commission">
                        <span class="flow-value">56%</span>
                        <span class="flow-desc">Commissions</span>
                    </div>
                    <div class="flow-item outflow buyback">
                        <span class="flow-value">30%+</span>
                        <span class="flow-desc">Liquidity Buybacks</span>
                    </div>
                    <div class="flow-item remaining">
                        <span class="flow-value">~14%</span>
                        <span class="flow-desc">Operations</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="key-stats">
            <div class="stat-card danger">
                <span class="stat-value">$15M+</span>
                <span class="stat-label">Burned on buybacks</span>
            </div>
            <div class="stat-card warning">
                <span class="stat-value">56%</span>
                <span class="stat-label">Commission rate</span>
            </div>
            <div class="stat-card danger">
                <span class="stat-value">1%</span>
                <span class="stat-label">Hashrate operational</span>
            </div>
            <div class="stat-card danger">
                <span class="stat-value">$16 Path</span>
                <span class="stat-label">ABANDONED</span>
            </div>
        </div>

        <FounderQuote
            quote={{
                text: "We've been using part of the liquidity fund to help maintain that, you know, keep the price propped up as near to that as we can on a daily basis.",
                source: "Bobby Gray, Miner Update Week 97",
                date: "January 28, 2026",
                significance: "Admits to artificial price support",
            }}
        />

        <div class="insight-box">
            <p>
                When 86% of incoming capital exits immediately through
                commissions and buybacks, price is entirely dependent on
                continued recruitment. This creates predictable decay with
                artificial support floors—a textbook extraction opportunity. The
                founder has effectively revealed his entire playbook through
                weekly video updates, allowing sophisticated observers to
                anticipate market movements with unusual precision.
            </p>
        </div>
    </A4Frame>

    <!-- ===== SLIDE 3: Strategy Matrix Overview ===== -->
    <A4Frame slideNumber={3} title="Strategy Matrix" classification="investor">
        <h2>The Carrion Portfolio</h2>
        <p class="section-intro">
            Six Extraction Vectors Ranked by Risk/Reward
        </p>

        <div class="detailed-analysis">
            <p>
                The strategies presented in this portfolio are not mutually
                exclusive; rather, they represent complementary approaches that
                can be deployed in parallel or sequence depending on market
                conditions, capital availability, and risk tolerance. Each
                strategy exploits a specific structural weakness in TEXITcoin's
                ecosystem, and together they form a comprehensive extraction
                framework.
            </p>
            <p>
                What distinguishes this opportunity from typical cryptocurrency
                speculation is the degree to which market mechanics are knowable
                in advance. Because TEXITcoin is controlled by a single
                individual who broadcasts his intentions weekly, and because the
                token trades on illiquid exchanges where order flow is visible,
                we can predict market movements with unusual confidence. The
                founder's need to continuously recruit new participants creates
                predictable marketing cycles. His limited capital reserves
                create identifiable price floors. His announced event calendar
                creates foreseeable pump-and-dump windows.
            </p>
            <p>
                The strategies below are ordered by their risk-adjusted expected
                return, with OTC Bag Acquisition representing the
                highest-conviction play and Regulatory Catalyst representing a
                speculative option position. A disciplined carrion investor
                would allocate the majority of capital to Strategies 1-3, with
                smaller opportunistic positions in Strategies 4-6 as conditions
                warrant. Capital preservation through strict position sizing is
                essential—even with high-probability setups, the ultimate
                collapse of TEXITcoin could happen faster than anticipated,
                leaving insufficient exit liquidity for latecomers.
            </p>
        </div>

        <div class="strategy-grid">
            {#each strategies as strategy}
                <StrategyCard
                    name={strategy.name}
                    shortName={strategy.shortName}
                    risk={strategy.risk}
                    expectedRoi={strategy.expectedRoi}
                    capitalRequired={strategy.capitalRequired}
                    timeHorizon={strategy.timeHorizon}
                    summary={strategy.summary}
                />
            {/each}
        </div>

        <div class="warning-box">
            <p>
                <strong>Strategy Excluded - Shorting:</strong> Order book control
                makes shorts suicidal. The founder can and will pump to liquidate.
                Do not short TXC under any circumstances. The founder has explicitly
                stated that he monitors short positions and has the capital reserves
                to execute squeeze operations. Multiple traders have been liquidated
                after attempting to short ahead of marketing events. The asymmetry
                of information and control makes shorting a negative expected value
                play regardless of how compelling the fundamental short thesis may
                appear.
            </p>
        </div>
    </A4Frame>

    <!-- ===== SLIDE 4: Strategy #1 - OTC Acquisition ===== -->
    <A4Frame
        slideNumber={4}
        title="OTC Bag Acquisition"
        classification="confidential"
    >
        <h2>Strategy #1: OTC Bag Acquisition</h2>
        <p class="section-intro">The Primary Extraction - Buying the Bones</p>

        <img
            src="/images/vbs_otc_distress_1770259785111.png"
            alt="Distressed sellers releasing assets"
            class="slide-image animate-slide-right"
        />

        <div class="detailed-analysis">
            <p>
                OTC (Over-The-Counter) Bag Acquisition represents our
                highest-conviction strategy because it exploits the most
                predictable dynamic in failing cryptocurrency projects: the
                desperation of trapped holders. When a token's price has
                declined 88% from its all-time high, and the founder has
                publicly abandoned the promised price target, a significant
                portion of the holder base enters a psychological state that
                creates extraordinary buying opportunities.
            </p>
            <p>
                These distressed sellers face a painful choice: hold their
                tokens and watch the value continue to erode, or sell at a
                massive loss to recover whatever capital remains. For many, the
                emotional burden of watching their investment decline day after
                day becomes unbearable—they simply want out at any price. This
                is where we enter as counterparty. By offering immediate
                liquidity at 40-50% below the already-depressed market price, we
                provide distressed sellers with certainty and closure while
                acquiring a position at a basis that offers substantial upside
                even in modest recovery scenarios.
            </p>
            <p>
                The execution of this strategy requires cultivation of multiple
                seller channels. The TEXITcoin community is fragmented across
                Telegram groups, Facebook investor communities, Twitter/X, and
                proprietary Discord servers. Each channel contains holders with
                varying degrees of desperation and sophistication. The most
                distressed sellers—those who invested money they couldn't afford
                to lose, or who bought at the all-time high—are often the most
                eager to accept discounted OTC offers because they prioritize
                certainty over optimizing exit price.
            </p>
            <p>
                Timing is critical. We accumulate positions during periods of
                despair (typically immediately following failed marketing events
                or negative news), then exit during the artificially-pumped
                windows that precede major events like Token 2049 Dubai. The
                founder's need to recruit new participants at these events
                virtually guarantees aggressive price support in the weeks
                leading up to them, creating our exit opportunity.
            </p>
        </div>

        <div class="funnel-diagram">
            <div class="funnel-step">
                <span class="funnel-icon">😰</span>
                <span class="funnel-label">Distressed Sellers</span>
                <span class="funnel-desc">Telegram, Facebook, X</span>
            </div>
            <div class="funnel-arrow">↓</div>
            <div class="funnel-step">
                <span class="funnel-icon">🤝</span>
                <span class="funnel-label">OTC Deal @ $0.40-0.50</span>
                <span class="funnel-desc">50% discount to market</span>
            </div>
            <div class="funnel-arrow">↓</div>
            <div class="funnel-step">
                <span class="funnel-icon">⏳</span>
                <span class="funnel-label">Hold Until Dubai</span>
                <span class="funnel-desc">April 25-30, 2026</span>
            </div>
            <div class="funnel-arrow">↓</div>
            <div class="funnel-step highlight">
                <span class="funnel-icon">💰</span>
                <span class="funnel-label">Exit @ $1.20-2.00</span>
                <span class="funnel-desc">100-300% ROI</span>
            </div>
        </div>

        <h3>Projected Returns</h3>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Scenario</th>
                    <th>Investment</th>
                    <th>Cost Basis</th>
                    <th>Exit Price</th>
                    <th>Profit</th>
                    <th>ROI</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Base Case</td>
                    <td class="mono">$50,000</td>
                    <td class="mono">$0.45</td>
                    <td class="mono">$1.20</td>
                    <td class="mono text-success">+$83,333</td>
                    <td class="mono text-success">+166%</td>
                </tr>
                <tr>
                    <td>Bull Case</td>
                    <td class="mono">$250,000</td>
                    <td class="mono">$0.45</td>
                    <td class="mono">$1.80</td>
                    <td class="mono text-success">+$750,000</td>
                    <td class="mono text-success">+300%</td>
                </tr>
                <tr>
                    <td>Bear Case</td>
                    <td class="mono">$50,000</td>
                    <td class="mono">$0.45</td>
                    <td class="mono">$0.30</td>
                    <td class="mono text-danger">-$16,667</td>
                    <td class="mono text-danger">-33%</td>
                </tr>
            </tbody>
        </table>

        <FounderQuote
            quote={{
                text: "We need new blood. The Dubai events are where we find the next wave of believers.",
                source: "Bobby Gray, Strategy Session",
                date: "January 21, 2026",
                significance: "Greater fool strategy explicit",
            }}
        />
    </A4Frame>

    <!-- ===== SLIDE 5: Strategy #2 - Event Arbitrage ===== -->
    <A4Frame slideNumber={5} title="Event Arbitrage" classification="investor">
        <h2>Strategy #2: Event-Driven Arbitrage</h2>
        <p class="section-intro">Riding the Marketing Machine</p>

        <div class="detailed-analysis">
            <p>
                Event-Driven Arbitrage exploits the most reliable pattern in
                TEXITcoin's market behavior: the predictable pump-and-dump cycle
                that surrounds major marketing events. Unlike traditional
                cryptocurrency markets where event outcomes are uncertain,
                TEXITcoin's events follow a nearly identical playbook each time,
                creating exceptional trading opportunities for those who
                recognize the pattern.
            </p>
            <p>
                The founder's entire recruitment model depends on creating
                periodic spectacles of legitimacy. Events like Token 2049, polo
                matches at luxury resorts, yacht parties in Monaco, and private
                conferences in Dubai serve a singular purpose: to provide
                photographic evidence that TEXITcoin is a real project with real
                momentum, used to recruit the next wave of hashpower purchasers.
                This recruitment necessity creates a powerful incentive for the
                founder to support the price aggressively in the weeks before
                and during these events.
            </p>
            <p>
                The pattern is remarkably consistent. Approximately three to
                four weeks before a major event, social media activity increases
                dramatically. The founder and top affiliates begin posting
                teasers, partnership hints, and "something big is coming"
                messages. This generates community excitement and buying
                pressure. Simultaneously, the founder increases buyback activity
                to ensure the price chart looks healthy for newcomers
                researching the project. This combination of organic buying and
                artificial support typically drives prices 100-200% above their
                baseline levels.
            </p>
            <p>
                The peak occurs during the event itself, when photographs of the
                founder meeting important-seeming people and attending exclusive
                venues flood social media. This is the exit window. Within days
                of the event concluding, the marketing machine goes quiet,
                buyback activity decreases to conserve capital, and the price
                begins its inexorable decline back toward baseline. Those who
                bought during the hype phase discover they are now exit
                liquidity for earlier entrants.
            </p>
        </div>

        <div class="pattern-card">
            <h3>The Pattern</h3>
            <div class="timeline-steps">
                <div class="timeline-step">
                    <span class="step-number">1</span>
                    <span class="step-content"
                        >Event announced (3-4 weeks prior)</span
                    >
                </div>
                <div class="timeline-step">
                    <span class="step-number">2</span>
                    <span class="step-content"
                        >Social media campaign intensifies</span
                    >
                </div>
                <div class="timeline-step">
                    <span class="step-number">3</span>
                    <span class="step-content"
                        >Community buying creates pump</span
                    >
                </div>
                <div class="timeline-step highlight">
                    <span class="step-number">4</span>
                    <span class="step-content"
                        >Event occurs → PEAK (EXIT HERE)</span
                    >
                </div>
                <div class="timeline-step danger">
                    <span class="step-number">5</span>
                    <span class="step-content"
                        >Post-event dump (2-3 weeks after)</span
                    >
                </div>
            </div>
        </div>

        <div class="historical-box">
            <h4>Historical Precedent: Token 2049 Singapore (Sept 2025)</h4>
            <div class="historical-stats">
                <div class="hist-stat">
                    <span class="hist-label">Pre-Event</span>
                    <span class="hist-value">$2.50</span>
                </div>
                <div class="hist-arrow">→</div>
                <div class="hist-stat highlight">
                    <span class="hist-label">Peak</span>
                    <span class="hist-value">$7.00</span>
                </div>
                <div class="hist-arrow">→</div>
                <div class="hist-stat danger">
                    <span class="hist-label">Post-Dump</span>
                    <span class="hist-value">$0.85</span>
                </div>
            </div>
            <p class="hist-note">
                2.8x pump followed by -88% dump. Pattern repeats.
            </p>
        </div>

        <h3>Execution Timeline</h3>
        <div class="execution-timeline">
            <div class="exec-item">
                <span class="exec-date">March 25</span>
                <span class="exec-action">ENTRY</span>
                <span class="exec-note">1 month before Dubai</span>
            </div>
            <div class="exec-item">
                <span class="exec-date">April 20-25</span>
                <span class="exec-action">PARTIAL EXIT</span>
                <span class="exec-note">Polo/Yacht events</span>
            </div>
            <div class="exec-item highlight">
                <span class="exec-date">April 28-30</span>
                <span class="exec-action">FULL EXIT</span>
                <span class="exec-note">Token 2049 peak</span>
            </div>
        </div>
    </A4Frame>

    <!-- ===== SLIDE 6: Strategy #3 - Information Arbitrage ===== -->
    <A4Frame
        slideNumber={6}
        title="Information Arbitrage"
        classification="investor"
    >
        <h2>Strategy #3: Information Arbitrage</h2>
        <p class="section-intro">The Weekly Alpha Factory</p>

        <img
            src="/images/vbs_intel_slide_1770259841058.png"
            alt="Intelligence surveillance and market monitoring"
            class="slide-image animate-fade-in-up"
        />

        <div class="detailed-analysis">
            <p>
                Information Arbitrage represents a unique edge available in the
                TEXITcoin ecosystem that simply does not exist in most
                cryptocurrency investments. The founder, Bobby Gray, conducts
                weekly YouTube live streams called "Miner Updates" where he
                discusses the project's financial status, upcoming plans,
                operational challenges, and market strategy in remarkable
                detail. Over 97 episodes have been recorded, creating an
                extensive intelligence archive that few investors bother to
                systematically analyze.
            </p>
            <p>
                The information disclosed in these calls would be considered
                material non-public information in any regulated security. The
                founder discusses upcoming marketing spend, planned buyback
                levels, internal staffing changes, partnership negotiations, and
                candid assessments of the project's financial health. Because
                TEXITcoin is not registered as a security and trades on
                unregulated exchanges, this information asymmetry is entirely
                legal to exploit—and the vast majority of TXC holders never
                watch these updates or fail to extract their strategic
                implications.
            </p>
            <p>
                The trading edge comes from recognizing leading indicators
                before they translate into price movements. When the founder
                mentions laying off staff, this indicates cash flow stress and
                portends reduced buyback activity—a signal to reduce position
                size. When he announces major marketing expenditures or new
                event sponsorships, this signals an upcoming recruitment push
                with associated price support—a signal to accumulate. Each
                weekly update provides real-time intelligence that allows
                systematic traders to position ahead of the crowd.
            </p>
        </div>

        <div class="info-source">
            <h3>Primary Intelligence Source</h3>
            <p><strong>Bobby Gray's "Miner Update" Calls</strong></p>
            <ul>
                <li>Platform: YouTube Live</li>
                <li>Schedule: Every Tuesday</li>
                <li>Current Episode: Week 97+</li>
                <li>Duration: 30-60 minutes</li>
            </ul>
        </div>

        <h3>Extraction Points & Trading Signals</h3>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Signal</th>
                    <th>Interpretation</th>
                    <th>Trade</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>High commission rate</td>
                    <td>Cash flow stress</td>
                    <td class="text-danger">Expect price support to weaken</td>
                </tr>
                <tr>
                    <td>Large event spend</td>
                    <td>Marketing push coming</td>
                    <td class="text-success">Position for short-term pump</td>
                </tr>
                <tr>
                    <td>Layoffs announced</td>
                    <td>Cost-cutting</td>
                    <td class="text-danger">Reduced operations, lower floor</td>
                </tr>
                <tr>
                    <td>New coin launch</td>
                    <td>Capital diversion</td>
                    <td class="text-gold">Mixed - initial pump, then fade</td>
                </tr>
            </tbody>
        </table>

        <FounderQuote
            quote={{
                text: "Most of the staff got laid off last month... we're operating with a skeleton crew.",
                source: "Bobby Gray, Miner Update Week 95",
                date: "January 14, 2026",
                significance: "Cash flow crisis indicator",
            }}
        />

        <div class="insight-box">
            <p>
                Competitive edge: Most TXC holders don't systematically analyze
                weekly calls. You will capture alpha from their information
                disadvantage.
            </p>
        </div>
    </A4Frame>

    <!-- ===== SLIDE 7: Strategies #4-6 Condensed ===== -->
    <A4Frame
        slideNumber={7}
        title="Additional Strategies"
        classification="investor"
    >
        <h2>Additional Strategies</h2>

        <div class="detailed-analysis">
            <p>
                The following three strategies offer supplementary opportunities
                for those with capital, expertise, or risk tolerance beyond the
                primary plays. While each presents compelling risk-adjusted
                returns in isolation, they also serve as hedges and
                diversification tools within the broader carrion portfolio. The
                Cross-Mining Fade exploits the founder's divided attention as he
                attempts to launch a second cryptocurrency, Iskander, using the
                same infrastructure. The Distressed LP Provision captures spread
                income from TEXITcoin's dysfunctional market structure. The
                Regulatory Catalyst is essentially a binary option on
                enforcement action.
            </p>
            <p>
                The launch of Iskander in February 2026 represents a fundamental
                strategic error by the founder. Rather than concentrating
                resources on stabilizing TEXITcoin, he has chosen to dilute his
                attention, capital, and community across two projects. The
                mineTXC infrastructure—100 million MH/s of hashpower that cannot
                be verified on-chain—must now somehow support mining rewards for
                both tokens. The laws of mathematics ensure this ends in
                disappointment for someone; our job is to ensure we exit before
                that disappointment is priced in.
            </p>
        </div>

        <div class="mini-strategies">
            <div class="mini-strategy">
                <div class="mini-header">
                    <span class="mini-number">4</span>
                    <h3>Cross-Mining Fade</h3>
                    <span class="badge risk-medium">MEDIUM</span>
                </div>
                <p class="mini-thesis">
                    <strong>Thesis:</strong> Iskander launch (Feb 3) dilutes attention
                    and capital from TXC. Initial hype fades as 100M MH/s mine proves
                    insufficient for two coins.
                </p>
                <p class="mini-play">
                    <strong>Play:</strong> Enter TXC on Iskander-related pumps, exit
                    as technical reality sets in.
                </p>
                <p class="mini-roi"><strong>Expected ROI:</strong> 50-150%</p>
            </div>

            <div class="mini-strategy">
                <div class="mini-header">
                    <span class="mini-number">5</span>
                    <h3>Distressed LP Provision</h3>
                    <span class="badge risk-high">MEDIUM-HIGH</span>
                </div>
                <p class="mini-thesis">
                    <strong>Thesis:</strong> Thin order books on Dex-Trade/BitMart
                    offer LP opportunities with wide spreads (2-5%).
                </p>
                <p class="mini-play">
                    <strong>Play:</strong> Provide liquidity as market maker, harvest
                    fees from inefficient market.
                </p>
                <p class="mini-roi">
                    <strong>Expected ROI:</strong> 20-40% APY
                </p>
            </div>

            <div class="mini-strategy">
                <div class="mini-header">
                    <span class="mini-number">6</span>
                    <h3>Regulatory Catalyst</h3>
                    <span class="badge risk-high">HIGH</span>
                </div>
                <p class="mini-thesis">
                    <strong>Thesis:</strong> SEC/CFTC action creates binary outcome.
                    Currently not registered as security, rejected by CoinMarketCap.
                </p>
                <p class="mini-play">
                    <strong>Play:</strong> Maintain monitoring position. Scale on
                    regulatory clarity.
                </p>
                <p class="mini-roi">
                    <strong>Expected ROI:</strong> 200%+ or total loss
                </p>
            </div>
        </div>

        <FounderQuote
            quote={{
                text: "I've got the buy wall set up on Dex-Trade... nobody's getting liquidated on my watch. I control the order book.",
                source: "Bobby Gray, Trading Update",
                date: "January 7, 2026",
                significance: "Confirms market manipulation",
            }}
        />
    </A4Frame>

    <!-- ===== SLIDE 8: Risk Assessment & Ethical Disclosure ===== -->
    <A4Frame
        slideNumber={8}
        title="Risk Assessment"
        classification="confidential"
    >
        <h2>Risk Assessment</h2>

        <div class="detailed-analysis">
            <p>
                Any investment in TEXITcoin carries substantial risks that must
                be understood and accepted before deployment of capital. The
                strategies outlined in this document are not risk-free arbitrage
                opportunities—they are calculated bets that exploit structural
                inefficiencies while accepting non-trivial downside scenarios.
                The difference between speculation and informed speculation is
                the degree to which risks are identified, quantified, and
                managed through position sizing and exit discipline.
            </p>
            <p>
                The most immediate risk is liquidity evaporation. TEXITcoin
                trades on small, relatively illiquid exchanges where the founder
                controls the order book. Should he decide to abandon price
                support—whether due to depleted capital, regulatory pressure, or
                strategic pivot—there may be insufficient buyers at any price to
                exit accumulated positions. The thin order books that create our
                spread income opportunity are the same order books that could
                trap us in a death spiral. Position sizing must reflect the
                possibility of total loss.
            </p>
            <p>
                Regulatory action presents a binary and largely unforeseeable
                risk. Multiple analysts have flagged TEXITcoin's compensation
                structure as a potential unregistered securities offering. If
                the SEC, CFTC, or state regulators pursue enforcement action,
                exchanges may delist the token and all strategies become
                instantly worthless. While regulatory action would also validate
                our thesis about the project's problematic structure, validation
                provides cold comfort when capital is locked in a frozen asset.
            </p>
            <p>
                Finally, there is the ethical dimension. The strategies
                described in this document profit from the financial distress of
                other market participants—many of whom were deceived into
                believing TEXITcoin was a legitimate investment. While we are
                not the cause of their losses, we are certainly benefiting from
                them. Each investor must reconcile this reality with their own
                ethical framework before proceeding.
            </p>
        </div>

        <RiskMatrix risks={allRisks} />

        <h3>Ethical Framework</h3>
        <EthicalDisclosure />

        <div class="legal-disclaimer">
            <h4>Legal Disclaimer</h4>
            <p>
                This document is for informational purposes only and does not
                constitute investment advice. Cryptocurrency investments carry
                significant risk including total loss of principal. Past
                performance is not indicative of future results. The strategies
                described involve speculation on assets with concentrated
                ownership and artificial price support, which may constitute
                securities law violations in certain jurisdictions. Always
                consult a licensed financial and legal advisor before making
                investment decisions.
            </p>
        </div>
    </A4Frame>

    <!-- ===== SLIDE 9: Methodology & Sources ===== -->
    <A4Frame slideNumber={9} title="Methodology" classification="investor">
        <h2>Methodology & Sources</h2>

        <div class="detailed-analysis">
            <p>
                The intelligence presented in this document is the product of
                over six months of systematic investigation, combining
                open-source intelligence gathering, on-chain data analysis,
                community infiltration, and primary source review. Our
                methodology was designed to minimize bias and maximize
                evidentiary rigor—every claim in this document is supported by
                independently verifiable sources, and readers are encouraged to
                conduct their own due diligence on the claims presented.
            </p>
            <p>
                Our primary intelligence source is the founder's own weekly
                video updates, which constitute an unprecedented archive of
                self-incriminating material. Between January 2024 and February
                2026, Bobby Gray has published over 97 episodes of "Miner
                Update" content totaling approximately 80 hours of video. These
                sessions have been systematically transcribed and analyzed for
                financial disclosures, strategic intentions, and statements that
                contradict the project's official marketing. The founder's
                informal communication style and apparent disregard for
                corporate legal guidance has resulted in admissions that would
                normally require subpoena power to obtain.
            </p>
            <p>
                Secondary sources include investigative journalism from
                established financial media outlets (Disruption Banking's
                multi-part series published December 2025 through February
                2026), MLM watchdog analysis from BehindMLM and CoinMLS,
                official project materials from mineTXC.com and texitcoin.com,
                on-chain data from the TEXITcoin blockchain explorer, and market
                data from CoinGecko and exchange order books. All claims
                involving numerical assertions have been cross-referenced
                against at least two independent sources.
            </p>
            <p>
                Community intelligence was gathered through persistent
                monitoring of public Telegram groups, Facebook investor
                communities, and Twitter/X discussions. Pseudonymous engagement
                was employed where necessary to gain access to private groups
                and verify insider sentiment. While this method raises ethical
                questions, it is consistent with legitimate investigative
                journalism practices and no deception was employed regarding
                material facts.
            </p>
        </div>

        <div class="sources-grid">
            <div class="source-category">
                <h4>Price & Market Data</h4>
                <ul>
                    <li>
                        <a
                            href="https://www.coingecko.com/en/coins/texitcoin"
                            target="_blank"
                            rel="noopener">CoinGecko API</a
                        > (live price, volume)
                    </li>
                    <li>
                        <a
                            href="https://coinmarketcap.com/currencies/texitcoin/"
                            target="_blank"
                            rel="noopener">CoinMarketCap</a
                        > (market cap, historical)
                    </li>
                    <li>Dex-Trade order book (depth analysis)</li>
                    <li>BitMart trading data</li>
                </ul>
            </div>

            <div class="source-category">
                <h4>Investigative Research</h4>
                <ul>
                    <li>
                        <a
                            href="https://disruptionbanking.com"
                            target="_blank"
                            rel="noopener">Disruption Banking</a
                        > (Dec 2025-Feb 2026 series)
                    </li>
                    <li>
                        <a
                            href="https://behindmlm.com"
                            target="_blank"
                            rel="noopener">BehindMLM</a
                        > investigation
                    </li>
                    <li>Gate.io Research Note</li>
                    <li>TEXITcoin Explorer (on-chain data)</li>
                </ul>
            </div>

            <div class="source-category">
                <h4>Primary Sources</h4>
                <ul>
                    <li>Bobby Gray YouTube "Miner Update" series</li>
                    <li>TEXITcoin Facebook community</li>
                    <li>Telegram investor groups</li>
                    <li>mineTXC.com official materials</li>
                </ul>
            </div>

            <div class="source-category">
                <h4>Verification Methodology</h4>
                <ul>
                    <li>
                        All claims cross-referenced with 2+ independent sources
                    </li>
                    <li>On-chain data verified via explorer APIs</li>
                    <li>Founder statements timestamped to video recordings</li>
                    <li>Adversarial validation through multiple personas</li>
                </ul>
            </div>
        </div>

        <div class="update-schedule">
            <p><strong>Last Updated:</strong> February 4, 2026</p>
            <p>
                <strong>Next Scheduled Update:</strong> Pre-Dubai (April 15, 2026)
            </p>
        </div>

        <footer class="document-footer">
            <div class="footer-brand">
                <span class="logo-icon">🦅</span>
                <span>Carrion Capital Research</span>
            </div>
            <p class="footer-quote">
                "We didn't kill the asset. We're just here for what's left."
            </p>
            <p class="footer-link">
                <a href="/">← TEXITcoin Forensic Platform</a>
            </p>
        </footer>
    </A4Frame>
</main>

<style>
    .carrion-main {
        max-width: 100%;
        padding: var(--space-4);
    }

    /* Cover Slide Styles */
    .cover-header {
        text-align: center;
        margin-bottom: var(--space-8);
    }

    .cover-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-4);
        margin-bottom: var(--space-2);
    }

    .logo-icon {
        font-size: var(--text-5xl);
    }

    .logo-text {
        font-family: var(--font-display);
        font-size: var(--text-4xl);
        font-weight: var(--weight-bold);
        letter-spacing: 0.05em;
        background: linear-gradient(
            135deg,
            var(--carrion-gold),
            var(--carrion-rust)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .cover-tagline {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--carrion-dust);
    }

    .cover-classification {
        display: flex;
        justify-content: center;
        margin: var(--space-8) 0;
    }

    .cover-title {
        text-align: center;
        margin-bottom: var(--space-8);
    }

    .cover-title h2 {
        font-size: var(--text-3xl);
        margin-bottom: var(--space-3);
    }

    .cover-subtitle {
        font-size: var(--text-lg);
        color: var(--carrion-cream);
        font-style: italic;
    }

    .cover-footer {
        text-align: center;
        margin-top: var(--space-8);
        padding-top: var(--space-6);
        border-top: var(--border-thin) solid var(--carrion-iron);
    }

    .date-stamp {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        color: var(--carrion-dust);
    }

    .disclaimer {
        font-size: var(--text-xs);
        color: var(--carrion-shadow);
        margin-top: var(--space-2);
    }

    /* Section Styles */
    .section-intro {
        font-size: var(--text-lg);
        color: var(--carrion-cream);
        margin-bottom: var(--space-6);
        font-style: italic;
    }

    /* Decay Flow Diagram */
    .flow-diagram {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-4);
        padding: var(--space-6);
        background: var(--carrion-ash);
        border-radius: var(--radius-md);
        margin-bottom: var(--space-6);
        flex-wrap: wrap;
    }

    .flow-item {
        text-align: center;
        padding: var(--space-4);
        border-radius: var(--radius-md);
        min-width: 120px;
    }

    .flow-item.income {
        background: var(--carrion-safe);
    }

    .flow-item.outflow {
        background: var(--carrion-blood);
    }

    .flow-item.commission {
        background: var(--carrion-blood);
    }

    .flow-item.buyback {
        background: var(--carrion-warning);
    }

    .flow-item.remaining {
        background: var(--carrion-iron);
    }

    .flow-label {
        display: block;
        font-size: var(--text-xs);
        text-transform: uppercase;
        margin-bottom: var(--space-1);
    }

    .flow-value {
        display: block;
        font-family: var(--font-mono);
        font-size: var(--text-2xl);
        font-weight: var(--weight-bold);
    }

    .flow-desc {
        display: block;
        font-size: var(--text-xs);
        color: var(--carrion-cream);
    }

    .flow-arrow {
        font-size: var(--text-2xl);
        color: var(--carrion-dust);
    }

    .flow-split {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
    }

    /* Key Stats */
    .key-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: var(--space-4);
        margin-bottom: var(--space-6);
    }

    .stat-card {
        text-align: center;
        padding: var(--space-4);
        background: var(--carrion-ash);
        border-radius: var(--radius-md);
        border: var(--border-thin) solid var(--carrion-iron);
    }

    .stat-card.danger {
        border-color: var(--carrion-blood);
        background: rgba(107, 45, 45, 0.2);
    }

    .stat-card.warning {
        border-color: var(--carrion-warning);
        background: rgba(139, 107, 32, 0.2);
    }

    .stat-value {
        display: block;
        font-family: var(--font-mono);
        font-size: var(--text-xl);
        font-weight: var(--weight-bold);
        color: var(--carrion-bone);
    }

    .stat-label {
        display: block;
        font-size: var(--text-xs);
        color: var(--carrion-dust);
        margin-top: var(--space-1);
    }

    /* Funnel Diagram */
    .funnel-diagram {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-6);
        background: var(--carrion-ash);
        border-radius: var(--radius-md);
        margin-bottom: var(--space-6);
    }

    .funnel-step {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        padding: var(--space-4);
        background: var(--carrion-charcoal);
        border-radius: var(--radius-md);
        width: 100%;
        max-width: 400px;
        border: var(--border-thin) solid var(--carrion-iron);
    }

    .funnel-step.highlight {
        border-color: var(--carrion-gold);
        background: rgba(201, 162, 39, 0.1);
    }

    .funnel-icon {
        font-size: var(--text-2xl);
    }

    .funnel-label {
        font-weight: var(--weight-semibold);
        color: var(--carrion-bone);
    }

    .funnel-desc {
        font-size: var(--text-sm);
        color: var(--carrion-dust);
        margin-left: auto;
    }

    .funnel-arrow {
        font-size: var(--text-xl);
        color: var(--carrion-gold-dim);
    }

    /* Pattern Card */
    .pattern-card {
        background: var(--carrion-ash);
        border-radius: var(--radius-md);
        padding: var(--space-5);
        margin-bottom: var(--space-6);
    }

    .timeline-steps {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
    }

    .timeline-step {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-3);
        border-radius: var(--radius-sm);
        background: var(--carrion-charcoal);
    }

    .timeline-step.highlight {
        background: rgba(201, 162, 39, 0.2);
        border: var(--border-thin) solid var(--carrion-gold);
    }

    .timeline-step.danger {
        background: rgba(107, 45, 45, 0.2);
    }

    .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        background: var(--carrion-gold-dim);
        color: var(--carrion-black);
        border-radius: 50%;
        font-family: var(--font-mono);
        font-weight: var(--weight-bold);
        font-size: var(--text-sm);
    }

    /* Historical Box */
    .historical-box {
        background: var(--carrion-ash);
        border: var(--border-thin) solid var(--carrion-iron);
        border-radius: var(--radius-md);
        padding: var(--space-5);
        margin-bottom: var(--space-6);
    }

    .historical-stats {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-4);
        margin: var(--space-4) 0;
        flex-wrap: wrap;
    }

    .hist-stat {
        text-align: center;
        padding: var(--space-3);
        background: var(--carrion-charcoal);
        border-radius: var(--radius-sm);
        min-width: 100px;
    }

    .hist-stat.highlight {
        background: rgba(201, 162, 39, 0.2);
        border: var(--border-thin) solid var(--carrion-gold);
    }

    .hist-stat.danger {
        background: rgba(107, 45, 45, 0.2);
    }

    .hist-label {
        display: block;
        font-size: var(--text-xs);
        color: var(--carrion-dust);
        margin-bottom: var(--space-1);
    }

    .hist-value {
        font-family: var(--font-mono);
        font-size: var(--text-xl);
        font-weight: var(--weight-bold);
    }

    .hist-arrow {
        font-size: var(--text-xl);
        color: var(--carrion-shadow);
    }

    .hist-note {
        text-align: center;
        font-size: var(--text-sm);
        color: var(--carrion-dust);
        margin: 0;
    }

    /* Execution Timeline */
    .execution-timeline {
        display: flex;
        gap: var(--space-4);
        flex-wrap: wrap;
        margin-top: var(--space-4);
    }

    .exec-item {
        flex: 1;
        min-width: 150px;
        padding: var(--space-4);
        background: var(--carrion-ash);
        border-radius: var(--radius-md);
        text-align: center;
        border: var(--border-thin) solid var(--carrion-iron);
    }

    .exec-item.highlight {
        border-color: var(--carrion-gold);
        background: rgba(201, 162, 39, 0.1);
    }

    .exec-date {
        display: block;
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        color: var(--carrion-dust);
        margin-bottom: var(--space-2);
    }

    .exec-action {
        display: block;
        font-weight: var(--weight-bold);
        color: var(--carrion-gold);
        margin-bottom: var(--space-1);
    }

    .exec-note {
        font-size: var(--text-xs);
        color: var(--carrion-shadow);
    }

    /* Info Source */
    .info-source {
        background: var(--carrion-ash);
        border-radius: var(--radius-md);
        padding: var(--space-5);
        margin-bottom: var(--space-6);
    }

    .info-source ul {
        list-style: none;
        padding: 0;
        margin: var(--space-3) 0 0 0;
    }

    .info-source li {
        padding: var(--space-2) 0;
        border-bottom: var(--border-thin) solid var(--carrion-iron);
        font-size: var(--text-sm);
    }

    .info-source li:last-child {
        border-bottom: none;
    }

    /* Mini Strategies */
    .mini-strategies {
        display: flex;
        flex-direction: column;
        gap: var(--space-5);
        margin-bottom: var(--space-6);
    }

    .mini-strategy {
        background: var(--carrion-ash);
        border: var(--border-thin) solid var(--carrion-iron);
        border-radius: var(--radius-md);
        padding: var(--space-5);
    }

    .mini-header {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        margin-bottom: var(--space-3);
    }

    .mini-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: var(--carrion-gold-dim);
        color: var(--carrion-black);
        border-radius: 50%;
        font-family: var(--font-mono);
        font-weight: var(--weight-bold);
    }

    .mini-header h3 {
        margin: 0;
        font-size: var(--text-lg);
    }

    .mini-thesis,
    .mini-play,
    .mini-roi {
        font-size: var(--text-sm);
        margin-bottom: var(--space-2);
    }

    .mini-roi {
        color: var(--carrion-gold);
        font-weight: var(--weight-semibold);
        margin-bottom: 0;
    }

    /* Legal Disclaimer */
    .legal-disclaimer {
        margin-top: var(--space-6);
        padding: var(--space-5);
        background: var(--carrion-charcoal);
        border: var(--border-thin) solid var(--carrion-iron);
        border-radius: var(--radius-md);
    }

    .legal-disclaimer h4 {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        text-transform: uppercase;
        color: var(--carrion-dust);
        margin-bottom: var(--space-3);
    }

    .legal-disclaimer p {
        font-size: var(--text-xs);
        color: var(--carrion-shadow);
        line-height: var(--leading-relaxed);
    }

    /* Sources Grid */
    .sources-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-5);
        margin-bottom: var(--space-6);
    }

    .source-category {
        background: var(--carrion-ash);
        border-radius: var(--radius-md);
        padding: var(--space-4);
    }

    .source-category h4 {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        text-transform: uppercase;
        color: var(--carrion-gold-dim);
        margin-bottom: var(--space-3);
        padding-bottom: var(--space-2);
        border-bottom: var(--border-thin) solid var(--carrion-iron);
    }

    .source-category ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .source-category li {
        padding: var(--space-2) 0;
        font-size: var(--text-sm);
        color: var(--carrion-cream);
    }

    /* Update Schedule */
    .update-schedule {
        background: var(--carrion-ash);
        border-radius: var(--radius-md);
        padding: var(--space-4);
        text-align: center;
        margin-bottom: var(--space-6);
    }

    .update-schedule p {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        color: var(--carrion-dust);
        margin: var(--space-1) 0;
    }

    /* Document Footer */
    .document-footer {
        text-align: center;
        padding-top: var(--space-6);
        border-top: var(--border-thin) solid var(--carrion-iron);
        margin-top: var(--space-8);
    }

    .footer-brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
        font-family: var(--font-display);
        font-size: var(--text-lg);
        color: var(--carrion-gold);
        margin-bottom: var(--space-3);
    }

    .footer-quote {
        font-style: italic;
        color: var(--carrion-dust);
        font-size: var(--text-sm);
    }

    .footer-link {
        margin-top: var(--space-6);
    }

    .footer-link a {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
    }

    /* Table text colors */
    .text-gold {
        color: var(--carrion-gold) !important;
    }

    /* Responsive */
    /* ========== RESPONSIVE ADJUSTMENTS ========== */
    @media (max-width: 640px) {
        .cover-logo {
            flex-direction: column;
            gap: var(--space-2);
        }

        .logo-text {
            font-size: var(--text-3xl);
        }

        .flow-diagram {
            flex-direction: column;
        }

        .historical-stats {
            flex-direction: column;
        }

        .hist-arrow {
            transform: rotate(90deg);
        }
    }

    /* ========== STRIKE SCROLL PROGRESS ========== */
    .scroll-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        width: var(--progress, 0%);
        background: linear-gradient(
            90deg,
            #7f1d1d 0%,
            #ef4444 50%,
            #b91c1c 100%
        );
        box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
        z-index: 9999;
        transition: width 0.1s ease-out;
    }

    /* ========== SIDE NAVIGATION ========== */
    .strike-nav {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 12px;
        z-index: 100;
    }

    .nav-dot {
        width: 12px;
        height: 12px;
        background: rgba(20, 20, 20, 0.8);
        border: 1px solid rgba(239, 68, 68, 0.3);
        transform: rotate(45deg); /* Diamond shape for strike */
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .nav-dot:hover,
    .nav-dot.active {
        background: #ef4444;
        border-color: #ef4444;
        box-shadow: 0 0 12px rgba(239, 68, 68, 0.5);
    }

    /* ========== BACK TO GATEWAY ========== */
    .back-to-gateway {
        position: fixed;
        top: 24px;
        left: 24px;
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--carrion-blood);
        text-decoration: none;
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        letter-spacing: 2px;
        padding: 0.75rem 1.5rem;
        border: 1px solid rgba(239, 68, 68, 0.2);
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        z-index: 100;
        transition: all 0.3s ease;
        clip-path: polygon(
            10px 0,
            100% 0,
            100% calc(100% - 10px),
            calc(100% - 10px) 100%,
            0 100%,
            0 10px
        );
    }

    .back-to-gateway:hover {
        background: rgba(239, 68, 68, 0.1);
        border-color: var(--carrion-blood);
        box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
        transform: translateY(-2px);
    }

    /* ========== SCROLL ANIMATIONS ========== */
    :global(.a4-frame) {
        opacity: 0;
        transform: scale(0.95);
        filter: blur(5px);
        transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
    }

    :global(.a4-frame.slide-visible) {
        opacity: 1;
        transform: scale(1);
        filter: blur(0);
    }

    /* Target direct children (h2, p, img) for staggered reveal */
    :global(.slide-visible h2),
    :global(.slide-visible .slide-image),
    :global(.slide-visible .detailed-analysis) {
        animation: strikeReveal 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
    }

    :global(.slide-visible .slide-image) {
        animation-delay: 0.2s;
    }

    :global(.slide-visible .detailed-analysis) {
        animation-delay: 0.4s;
    }

    @keyframes strikeReveal {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 640px) {
        .strike-nav {
            display: none;
        }
        .back-to-gateway span:last-child {
            display: none;
        }
    }

    /* ========== ADVERSARIAL UX ENHANCEMENTS ========== */

    /* Slide 2: Decay Dashboard */
    .key-stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-4);
        margin: var(--space-8) 0;
        background: rgba(10, 10, 10, 0.8);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: var(--space-4);
        position: relative;
        overflow: hidden;
    }

    .key-stats::before {
        content: "LIVE MONITORING";
        position: absolute;
        top: 0;
        left: 0;
        background: var(--carrion-blood);
        color: #000;
        font-size: 10px;
        padding: 2px 6px;
        font-family: var(--font-mono);
        font-weight: bold;
    }

    .stat-card {
        text-align: center;
        padding: var(--space-4);
        background: rgba(0, 0, 0, 0.5);
        border-radius: var(--radius-sm);
        border: 1px solid transparent;
        transition: all 0.3s ease;
    }

    .stat-card.danger {
        border-bottom: 2px solid var(--carrion-blood);
    }

    .stat-card.warning {
        border-bottom: 2px solid var(--carrion-gold);
    }

    .stat-value {
        font-family: var(--font-display);
        font-size: var(--text-2xl);
        font-weight: 700;
        display: block;
        margin-bottom: var(--space-1);
    }

    .stat-label {
        font-family: var(--font-mono);
        color: var(--carrion-dust);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    /* Slide 4: Funnel and Table */
    .funnel-diagram {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-4);
        margin: var(--space-8) 0;
    }

    .funnel-step {
        width: 100%;
        max-width: 400px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(50, 50, 50, 0.3),
            transparent
        );
        border: 1px solid var(--border);
        padding: var(--space-3);
        display: flex;
        align-items: center;
        gap: var(--space-4);
        border-radius: var(--radius-md);
    }

    .funnel-step.highlight {
        border-color: var(--carrion-green);
        background: linear-gradient(
            90deg,
            transparent,
            rgba(34, 197, 94, 0.1),
            transparent
        );
    }

    .funnel-label {
        font-weight: 700;
        font-family: var(--font-display);
        flex: 1;
    }

    .funnel-desc {
        font-size: var(--text-xs);
        font-family: var(--font-mono);
        color: var(--carrion-dust);
    }

    .text-success {
        color: var(--carrion-green);
    }
    .text-danger {
        color: var(--carrion-blood);
    }

    /* Tables */
    .data-table {
        width: 100%;
        border-collapse: collapse;
        margin: var(--space-6) 0;
        font-size: var(--text-sm);
    }

    .data-table th {
        text-align: left;
        color: var(--carrion-dust);
        font-family: var(--font-mono);
        font-weight: normal;
        border-bottom: 1px solid var(--border);
        padding: var(--space-2);
        font-size: 11px;
        text-transform: uppercase;
    }

    .data-table td {
        padding: var(--space-3) var(--space-2);
        border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
    }

    .data-table .mono {
        font-family: var(--font-mono);
    }

    /* Slide 5: Historical Timeline */
    .historical-box {
        background: rgba(20, 20, 20, 0.6);
        border: 1px solid var(--border);
        border-left: 4px solid var(--carrion-blood);
        padding: var(--space-6);
        margin: var(--space-8) 0;
    }

    .historical-stats {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: var(--space-4);
    }

    .hist-stat {
        text-align: center;
    }

    .hist-value {
        font-family: var(--font-display);
        font-size: var(--text-3xl);
        font-weight: 700;
        display: block;
    }

    .hist-label {
        font-size: 10px;
        color: var(--carrion-dust);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .hist-arrow {
        color: var(--border);
        font-size: var(--text-2xl);
    }

    .hist-stat.highlight .hist-value {
        color: var(--carrion-green);
        text-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
    }
    .hist-stat.danger .hist-value {
        color: var(--carrion-blood);
        text-shadow: 0 0 10px rgba(220, 38, 38, 0.4);
    }

    @media (max-width: 768px) {
        .key-stats {
            grid-template-columns: 1fr 1fr;
        }
        .historical-stats {
            flex-direction: column;
            gap: var(--space-4);
        }
        .hist-arrow {
            transform: rotate(90deg);
        }
    }
</style>
