import { Link } from 'react-router-dom';
import type { Order } from '@/types/Order';
import { TYPOGRAPHY } from '@/constants/typography';
import { StatusBadge } from './StatusBadge';
import { OrderItemThumbnails } from './OrderItemThumbnails';
import { formatOrderDate } from '../helpers/formatOrderDate';
import {
  convertPrice,
  getCurrencySymbol,
  applyDiscount,
} from '../helpers/priceUtils';
import { useCurrency } from '@/context/CurrencyContext';

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const { currency, rate } = useCurrency();
  const subtotal = convertPrice(order.subtotal, currency, rate);
  const { total } = applyDiscount(subtotal, order.discount);
  const symbol = getCurrencySymbol(currency);
  const totalItemQuantity = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const itemNames = order.items.map((item) => item.name).join(', ');

  return (
    <li>
      <Link
        to={`/order-success/${order.id}`}
        className="block border border-border rounded-lg overflow-hidden hover:border-ring transition-colors group"
      >
        <div className="flex items-center justify-between px-5 py-4 bg-card border-b border-border">
          <div className="flex flex-col gap-0.5">
            <p className={`${TYPOGRAPHY.uppercase} text-muted-foreground`}>
              Order ID
            </p>
            <p className={`${TYPOGRAPHY.buttons} text-foreground font-mono`}>
              {order.id}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2">
              {order.discount != null && order.discount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  -{order.discount}%
                </span>
              )}
              <StatusBadge status={order.status} />
            </div>
            <p className={`${TYPOGRAPHY.small} text-muted-foreground`}>
              {formatOrderDate(order.createdAt)}
            </p>
          </div>
        </div>

        <div className="px-5 py-4 flex items-center gap-4">
          <OrderItemThumbnails items={order.items} />

          <div className="flex-1 min-w-0">
            <p
              className={`${TYPOGRAPHY.body} font-medium text-foreground truncate`}
            >
              {itemNames}
            </p>
            <p
              className={`${TYPOGRAPHY.small} text-muted-foreground mt-0.5 capitalize`}
            >
              {order.paymentMethod} · {totalItemQuantity} items
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className={`${TYPOGRAPHY.h5} font-extrabold text-foreground`}>
              {symbol}
              {total.toFixed(2)}
            </span>
            <svg
              width="7"
              height="11"
              viewBox="0 0 7 11"
              fill="none"
              className="rotate-180 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path
                d="M6 1L1 5.5L6 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Link>
    </li>
  );
};
