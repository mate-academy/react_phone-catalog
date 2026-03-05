import { CheckCircle, Clock, XCircle, type LucideIcon } from 'lucide-react';
import type { OrderStatus } from '@/types/Order';

export const ORDERS_PREVIEW_COUNT = 3;

interface OrderStatusConfigItem {
  label: string;
  icon: LucideIcon;
  className: string;
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, OrderStatusConfigItem> = {
  paid: {
    label: 'Оплачено',
    icon: CheckCircle,
    className: 'text-[#27ae60] bg-[#27ae60]/10',
  },
  processing: {
    label: 'Обробляється',
    icon: Clock,
    className: 'text-amber-500 bg-amber-500/10',
  },
  pending: {
    label: 'Очікує',
    icon: Clock,
    className: 'text-amber-500 bg-amber-500/10',
  },
  failed: {
    label: 'Помилка',
    icon: XCircle,
    className: 'text-[#eb5757] bg-[#eb5757]/10',
  },
  cancelled: {
    label: 'Скасовано',
    icon: XCircle,
    className: 'text-[#eb5757] bg-[#eb5757]/10',
  },
};
