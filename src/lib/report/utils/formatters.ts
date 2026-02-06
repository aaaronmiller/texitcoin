/**
 * Format a number as USD currency
 */
export function formatCurrency(value: number, decimals: number = 2): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
}

/**
 * Format a large number with abbreviations (K, M, B)
 */
export function formatCompact(value: number): string {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 2
    }).format(value);
}

/**
 * Format a number with commas
 */
export function formatNumber(value: number, decimals: number = 0): string {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
}

/**
 * Format a percentage
 */
export function formatPercent(value: number, decimals: number = 2): string {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Format a date/time string
 */
export function formatDate(dateString: string): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(dateString));
}

/**
 * Format a timestamp to relative time
 */
export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return formatDate(dateString);
}

/**
 * Calculate percentage deviation from target
 */
export function calculateDeviation(actual: number, target: number): number {
    return ((actual - target) / target) * 100;
}

/**
 * Get color class based on value sentiment
 */
export function getValueColor(value: number, inverse: boolean = false): string {
    if (inverse) {
        return value >= 0 ? 'text-warning' : 'text-safe';
    }
    return value >= 0 ? 'text-safe' : 'text-warning';
}
