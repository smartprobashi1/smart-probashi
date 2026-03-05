import type { CurrencyCode } from '@/types/finance';

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  SAR: '﷼',
  USD: '$',
  EUR: '€',
  BDT: '৳',
  INR: '₹',
  PKR: '₨',
};

export function getCurrencySymbol(code: CurrencyCode): string {
  return CURRENCY_SYMBOLS[code] ?? code;
}

export function formatCurrency(amount: number, code: CurrencyCode): string {
  const symbol = getCurrencySymbol(code);
  const formatter =
    typeof Intl !== 'undefined'
      ? new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: code,
          maximumFractionDigits: 2,
        })
      : null;

  if (formatter) {
    try {
      return formatter.format(amount);
    } catch {
      // fall through to manual formatting if Intl doesn't support the currency
    }
  }

  return `${symbol} ${amount.toFixed(2)}`;
}

