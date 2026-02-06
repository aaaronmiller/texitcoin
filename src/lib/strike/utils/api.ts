// API utilities for Carrion Capital
// Reuses CoinGecko integration from sibling project

export interface CoinGeckoPrice {
    texitcoin: {
        usd: number;
        usd_24h_change: number;
        usd_24h_vol: number;
        usd_market_cap: number;
    };
}

export interface PriceData {
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
    lastUpdated: Date;
    isLive: boolean;
}

// Fallback data in case API fails
const FALLBACK_PRICE: PriceData = {
    price: 0.78,
    change24h: -2.1,
    volume24h: 260000,
    marketCap: 46000000,
    lastUpdated: new Date(),
    isLive: false
};

/**
 * Fetch live TXC price from CoinGecko
 */
export async function fetchTxcPrice(): Promise<PriceData> {
    try {
        const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=texitcoin&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true',
            {
                headers: { 'Accept': 'application/json' },
                signal: AbortSignal.timeout(10000)
            }
        );

        if (!response.ok) {
            console.warn('CoinGecko API returned non-OK status:', response.status);
            return FALLBACK_PRICE;
        }

        const data: CoinGeckoPrice = await response.json();

        if (!data.texitcoin) {
            console.warn('No texitcoin data in response');
            return FALLBACK_PRICE;
        }

        return {
            price: data.texitcoin.usd,
            change24h: data.texitcoin.usd_24h_change,
            volume24h: data.texitcoin.usd_24h_vol,
            marketCap: data.texitcoin.usd_market_cap,
            lastUpdated: new Date(),
            isLive: true
        };
    } catch (error) {
        console.error('Error fetching TXC price:', error);
        return FALLBACK_PRICE;
    }
}

/**
 * Calculate days until a future date
 */
export function daysUntil(targetDate: string | Date): number {
    const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Calculate detailed countdown to a date
 */
export function countdownTo(targetDate: string | Date): { days: number; hours: number; minutes: number; seconds: number; total: number } {
    const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        total: diff
    };
}

/**
 * Calculate reality gap between current price and target
 */
export function calculateRealityGap(currentPrice: number, targetPrice: number = 16.00): number {
    return ((currentPrice - targetPrice) / targetPrice) * 100;
}

/**
 * Calculate projected profit for OTC strategy
 */
export function calculateOtcProfit(
    investment: number,
    costBasis: number,
    exitPrice: number
): { coins: number; proceeds: number; profit: number; roi: number } {
    const coins = investment / costBasis;
    const proceeds = coins * exitPrice;
    const profit = proceeds - investment;
    const roi = (profit / investment) * 100;

    return { coins, proceeds, profit, roi };
}
