import type { CartItem } from '@/types/Book';
import { getItemPrice } from '@/helpers/getItemPrice';
import { OrderSummaryItem } from './OrderSummaryItem';
import { TYPOGRAPHY } from '@/constants/typography';
import { useCurrency } from '@/context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { DISCOUNT_PERCENTAGE } from '@/components/RegisterPromo/types/promo-constants';

interface OrderSummaryProps {
  items: CartItem[];
}

export const OrderSummary = ({ items }: OrderSummaryProps) => {
  const { currency, rate } = useCurrency();
  const { t } = useTranslation();
  const { userData } = useAuth();

  const subtotal = items.reduce(
    (sum, item) => sum + getItemPrice(item, currency, rate) * item.quantity,
    0,
  );
  const symbol = currency === 'USD' ? '$' : '₴';

  const discountPercent = userData?.discount ? DISCOUNT_PERCENTAGE : 0;
  const discountAmount =
    discountPercent > 0 ?
      Math.round(subtotal * (discountPercent / 100) * 100) / 100
    : 0;
  const total = subtotal - discountAmount;

  return (
    <div className="bg-card rounded p-8 sticky top-24">
      <h2 className={`${TYPOGRAPHY.h4} text-foreground`}>
        {t('login.orderSummary')}
      </h2>
      <p className={`${TYPOGRAPHY.small} text-muted-foreground mt-1 mb-6`}>
        {t('items.count', { count: items.length })}
      </p>

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <OrderSummaryItem
            key={item.id}
            item={item}
          />
        ))}
      </ul>

      <div className="h-px bg-chart-5 my-5" />

      <div className="flex justify-between mb-2.5">
        <span className={`${TYPOGRAPHY.body} text-foreground`}>
          {t('login.subtotal')}
        </span>
        <span className={`${TYPOGRAPHY.body} text-foreground`}>
          {symbol}
          {subtotal.toFixed(2)}
        </span>
      </div>

      {discountPercent > 0 && (
        <div className="flex justify-between mb-2.5">
          <span className={`${TYPOGRAPHY.body} text-green-600`}>
            {t('login.discount', { percent: discountPercent })}
          </span>
          <span className={`${TYPOGRAPHY.body} text-green-600 font-medium`}>
            -{symbol}
            {discountAmount.toFixed(2)}
          </span>
        </div>
      )}

      <div className="flex justify-between">
        <span className={`${TYPOGRAPHY.body} text-foreground`}>
          {t('login.shipping')}
        </span>
        <span className={`${TYPOGRAPHY.body} text-foreground`}>
          {t('login.calculatedNext')}
        </span>
      </div>

      <div className="h-px bg-chart-5 my-5" />

      <div className="flex justify-between items-baseline">
        <span className={`${TYPOGRAPHY.buttons} font-bold text-foreground`}>
          {t('login.total')}
        </span>
        <span className={`${TYPOGRAPHY.h2} text-foreground tracking-tight`}>
          {symbol}
          {total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
