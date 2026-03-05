import { useParams, Link } from 'react-router-dom';
import { TYPOGRAPHY } from '@/constants/typography';
import { Loader } from '@/components/ui/Loader';
import { useCurrency } from '@/context/CurrencyContext';
import { useOrder } from '@/components/Orders/hooks/useOrder';
import { convertPrice, getCurrencySymbol } from './helpers/priceUtils';
import { formatOrderDate } from './helpers/formatOrderDate';
import { StatusBadge } from './components/StatusBadge';
import { OrderSuccessHeader } from './components/OrderSuccessHeader';
import { OrderItemRow } from './components/OrderItemRow';
import { OrderTotals } from './components/OrderTotals';
import { DeliveryInfo } from './components/DeliveryInfo';
import { OrderActions } from './components/OrderActions';

export const OrderSuccess = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { currency, rate } = useCurrency();
  const { data: order, isLoading } = useOrder(orderId);

  if (!order) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-muted-foreground">
        <p className={TYPOGRAPHY.body}>Order not found.</p>
        <Link
          to="/"
          className={`${TYPOGRAPHY.buttons} font-semibold text-foreground hover:underline`}
        >
          Go to home
        </Link>
      </div>
    );
  }

  const total = convertPrice(order.total, currency, rate);
  const subtotal = convertPrice(order.subtotal, currency, rate);
  const symbol = getCurrencySymbol(currency);

  return (
    <Loader isLoading={isLoading}>
      <div className="py-12 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <OrderSuccessHeader />

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
              <div>
                <p
                  className={`${TYPOGRAPHY.uppercase} text-muted-foreground mb-0.5`}
                >
                  Order ID
                </p>
                <p
                  className={`${TYPOGRAPHY.buttons} text-foreground font-mono`}
                >
                  {order.id}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge status={order.status} />
                <p className={`${TYPOGRAPHY.small} text-muted-foreground`}>
                  {formatOrderDate(order.createdAt)}
                </p>
              </div>
            </div>

            <ul className="divide-y divide-border">
              {order.items.map((item) => (
                <OrderItemRow
                  key={item.id}
                  item={item}
                  currency={currency}
                  rate={rate}
                />
              ))}
            </ul>

            <OrderTotals
              subtotal={subtotal.toFixed(2)}
              discount={order.discount}
              total={total.toFixed(2)}
              symbol={symbol}
              paymentMethod={order.paymentMethod}
            />

            <DeliveryInfo customer={order.customer} />
          </div>

          {orderId && (
            <OrderActions
              orderId={orderId}
              order={order}
            />
          )}
        </div>
      </div>
    </Loader>
  );
};
