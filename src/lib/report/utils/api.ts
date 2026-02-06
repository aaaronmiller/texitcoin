// CoinGecko API utilities for live price data
// Note: Using free tier - rate limited to 10-30 calls/minute

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const COIN_ID = 'texitcoin';

export interface PriceData {
    price: number;
    priceChange24h: number;
    marketCap: number;
    volume24h: number;
    lastUpdated: string;
    source: string;
}

export interface HistoricalPrice {
    timestamp: number;
    price: number;
}

export interface MarketChartData {
    prices: HistoricalPrice[];
    marketCaps: HistoricalPrice[];
    volumes: HistoricalPrice[];
}

// Fallback data from transcript (Feb 4, 2026 snapshot)
const FALLBACK_PRICE_DATA: PriceData = {
    price: 0.81,
    priceChange24h: -10.57,
    marketCap: 46200000,
    volume24h: 260000,
    lastUpdated: '2026-02-04T00:00:00Z',
    source: 'fallback'
};

/**
 * Fetch current TXC price from CoinGecko
 */
export async function getLivePrice(): Promise<PriceData> {
    try {
        const response = await fetch(
            `${COINGECKO_API}/simple/price?ids=${COIN_ID}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`
        );

        if (!response.ok) {
            console.warn('CoinGecko API returned non-OK status, using fallback data');
            return FALLBACK_PRICE_DATA;
        }

        const data = await response.json();

        if (!data[COIN_ID]) {
            console.warn('TXC not found in CoinGecko response, using fallback data');
            return FALLBACK_PRICE_DATA;
        }

        const coinData = data[COIN_ID];

        return {
            price: coinData.usd || FALLBACK_PRICE_DATA.price,
            priceChange24h: coinData.usd_24h_change || 0,
            marketCap: coinData.usd_market_cap || FALLBACK_PRICE_DATA.marketCap,
            volume24h: coinData.usd_24h_vol || FALLBACK_PRICE_DATA.volume24h,
            lastUpdated: new Date().toISOString(),
            source: 'coingecko'
        };
    } catch (error) {
        console.error('Failed to fetch live price:', error);
        return FALLBACK_PRICE_DATA;
    }
}

/**
 * Fetch historical price data for charts
 */
export async function getHistoricalData(days: number = 365): Promise<MarketChartData | null> {
    try {
        const response = await fetch(
            `${COINGECKO_API}/coins/${COIN_ID}/market_chart?vs_currency=usd&days=${days}`
        );

        if (!response.ok) {
            console.warn('Failed to fetch historical data');
            return null;
        }

        const data = await response.json();

        return {
            prices: data.prices?.map(([timestamp, price]: [number, number]) => ({
                timestamp,
                price
            })) || [],
            marketCaps: data.market_caps?.map(([timestamp, cap]: [number, number]) => ({
                timestamp,
                price: cap
            })) || [],
            volumes: data.total_volumes?.map(([timestamp, vol]: [number, number]) => ({
                timestamp,
                price: vol
            })) || []
        };
    } catch (error) {
        console.error('Failed to fetch historical data:', error);
        return null;
    }
}

/**
 * Fetch coin info for additional metadata
 */
export async function getCoinInfo(): Promise<Record<string, unknown> | null> {
    try {
        const response = await fetch(
            `${COINGECKO_API}/coins/${COIN_ID}?localization=false&tickers=false&community_data=false&developer_data=false`
        );

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch coin info:', error);
        return null;
    }
}
