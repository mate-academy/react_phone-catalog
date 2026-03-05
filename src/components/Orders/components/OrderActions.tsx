import { Link } from 'react-router-dom';
import type { Order } from '@/types/Order';
import { TYPOGRAPHY } from '@/constants/typography';
import { Button } from '@/components/ui/button';
import { DownloadInvoiceButton } from '@/components/Invoices';
import { TelegramConnectButton } from './TelegramConnectButton';

interface OrderActionsProps {
  orderId: string;
  order: Order;
}

export const OrderActions = ({ orderId, order }: OrderActionsProps) => (
  <div className="flex flex-col gap-3 mt-8">
    <Button
      asChild
      className={`h-14 ${TYPOGRAPHY.uppercase}`}
    >
      <Link to="/">Continue shopping</Link>
    </Button>

    <TelegramConnectButton orderId={orderId} />

    <DownloadInvoiceButton order={order} />

    <Button
      asChild
      variant="outline"
      className={`h-14 ${TYPOGRAPHY.buttons}`}
    >
      <Link to="/orders">View all orders</Link>
    </Button>
  </div>
);
