// Formatting utilities for Carrion Capital

/**
 * Format number as USD currency
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
 * Format number with compact notation (K, M, B)
 */
export function formatCompact(value: number): string {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1
    }).format(value);
}

/**
 * Format percentage with sign
 */
export function formatPercent(value: number, decimals: number = 1): string {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date, style: 'short' | 'medium' | 'long' = 'medium'): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    const options: Intl.DateTimeFormatOptions = {
        short: { month: 'short', day: 'numeric' },
        medium: { month: 'short', day: 'numeric', year: 'numeric' },
        long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    }[style];

    return new Intl.DateTimeFormat('en-US', options).format(d);
}

/**
 * Format relative time (in X days, X hours ago, etc.)
 */
export function formatRelativeTime(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = d.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDays > 1) return `in ${diffDays} days`;
    if (diffDays === 1) return 'tomorrow';
    if (diffDays === 0 && diffHours > 0) return `in ${diffHours} hours`;
    if (diffDays === 0 && diffHours === 0) return 'now';
    if (diffDays === -1) return 'yesterday';
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
    return formatDate(d, 'short');
}

/**
 * Get risk level class name
 */
export function getRiskClass(risk: string): string {
    switch (risk.toLowerCase()) {
        case 'low': return 'risk-low';
        case 'medium': return 'risk-medium';
        case 'medium-high': return 'risk-high';
        case 'high': return 'risk-high';
        default: return 'risk-medium';
    }
}

/**
 * Format ROI with color indicator
 */
export function formatRoi(roi: number): { text: string; class: string } {
    const text = formatPercent(roi);
    const className = roi >= 0 ? 'text-success' : 'text-danger';
    return { text, class: className };
}

/**
 * Pad number with leading zeros
 */
export function padZero(num: number, length: number = 2): string {
    return String(num).padStart(length, '0');
}
