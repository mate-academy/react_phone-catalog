import type { CustomerData } from '@/types/Order';
import { TYPOGRAPHY } from '@/constants/typography';

interface DeliveryInfoProps {
  customer: CustomerData;
}

export const DeliveryInfo = ({ customer }: DeliveryInfoProps) => (
  <div className="px-6 py-4 border-t border-border">
    <p className={`${TYPOGRAPHY.uppercase} text-muted-foreground mb-3`}>
      Delivery to
    </p>
    <p className={`${TYPOGRAPHY.buttons} text-foreground`}>
      {customer.firstName} {customer.lastName}
    </p>
    <p className={`${TYPOGRAPHY.body} text-muted-foreground`}>
      {customer.address}
    </p>
    <p className={`${TYPOGRAPHY.body} text-muted-foreground`}>
      {customer.city}, {customer.zip}, {customer.country}
    </p>
    <p className={`${TYPOGRAPHY.body} text-muted-foreground mt-1`}>
      {customer.email}
    </p>
  </div>
);
