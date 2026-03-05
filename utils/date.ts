import { format, parseISO } from 'date-fns';

export function formatDisplayDate(value: string | Date): string {
  if (!value) return '';
  const date = typeof value === 'string' ? parseISO(value) : value;
  if (Number.isNaN(date.getTime())) return '';
  return format(date, 'dd MMM yyyy');
}

export function getMonthKey(value: string | Date): string {
  const date = typeof value === 'string' ? parseISO(value) : value;
  if (Number.isNaN(date.getTime())) return '';
  return format(date, 'yyyy-MM');
}

export function getLastMonths(count: number): string[] {
  const now = new Date();
  const months: string[] = [];
  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setMonth(now.getMonth() - i);
    months.push(format(d, 'yyyy-MM'));
  }
  return months;
}

