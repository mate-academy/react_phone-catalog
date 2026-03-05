import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils.ts';
import { Loader } from '@/components/ui/Loader';
import { useUserOrders } from '@/hooks/useUserOrders';
import { EmptyOrdersState } from './components/EmptyOrdersState';
import { OrderCard } from './components/OrderCard';

export const OrdersList = () => {
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useUserOrders();

  const handleGoBack = () => navigate(-1);

  const orderCountLabel =
    orders.length === 0 ?
      'No orders yet'
    : `${orders.length} ${orders.length === 1 ? 'order' : 'orders'}`;

  return (
    <Loader isLoading={isLoading}>
      <div className="py-10 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <button
            onClick={handleGoBack}
            className={cn(
              TYPOGRAPHY.small,
              'mb-7 inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors',
            )}
          >
            <ChevronLeft className="size-4" />
            Back
          </button>

          <div className="mb-10">
            <h1 className={`${TYPOGRAPHY.h1} text-foreground mb-1`}>
              My Orders
            </h1>
            <p className={`${TYPOGRAPHY.body} text-muted-foreground`}>
              {orderCountLabel}
            </p>
          </div>

          {orders.length === 0 && <EmptyOrdersState />}

          {orders.length > 0 && (
            <ul className="flex flex-col gap-4">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </Loader>
  );
};
