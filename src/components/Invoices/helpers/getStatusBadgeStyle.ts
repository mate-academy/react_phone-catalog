import type { OrderStatus } from '@/types/Order';
import { invoiceStyles } from '../constants/invoiceStyles';

const STATUS_BADGE_STYLE_MAP = {
  paid: { badge: invoiceStyles.badgePaid, text: invoiceStyles.badgeTextPaid },
  pending: {
    badge: invoiceStyles.badgePending,
    text: invoiceStyles.badgeTextPending,
  },
  processing: {
    badge: invoiceStyles.badgePending,
    text: invoiceStyles.badgeTextPending,
  },
  failed: {
    badge: invoiceStyles.badgeFailed,
    text: invoiceStyles.badgeTextFailed,
  },
  cancelled: {
    badge: invoiceStyles.badgeCancelled,
    text: invoiceStyles.badgeTextCancelled,
  },
};

export const getStatusBadgeStyle = (status: OrderStatus) =>
  STATUS_BADGE_STYLE_MAP[status] ?? STATUS_BADGE_STYLE_MAP.pending;
