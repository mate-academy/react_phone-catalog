import type { OrderStatus } from '@/types/Order';
import { TYPOGRAPHY } from '@/constants/typography';
import { STATUS_BADGE_CONFIG } from '../constants/statusBadgeConfig';

interface StatusBadgeProps {
  status: OrderStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { label, className } =
    STATUS_BADGE_CONFIG[status] ?? STATUS_BADGE_CONFIG.pending;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded ${TYPOGRAPHY.small} ${className}`}
    >
      {label}
    </span>
  );
};
