import type { OrderStatus } from '@/types/Order';

interface StatusBadgeEntry {
  label: string;
  className: string;
}

export const STATUS_BADGE_CONFIG: Record<OrderStatus, StatusBadgeEntry> = {
  paid: {
    label: 'Paid',
    className:
      'bg-green-600/10 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  },
  pending: {
    label: 'Pending',
    className:
      'bg-yellow-600/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
  },
  processing: {
    label: 'Processing',
    className:
      'bg-blue-600/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
  },
  failed: {
    label: 'Failed',
    className: 'bg-destructive/10 text-destructive',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-muted text-muted-foreground',
  },
};
