import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { roundCurrency } from '../helpers/roundCurrency';
import type { CartSummaryProps } from '../types';

export const CartSummary = ({
  totalPrice,
  totalQuantity,
  symbol,
  discountPercent,
}: CartSummaryProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const discountAmount =
    discountPercent ? roundCurrency(totalPrice * (discountPercent / 100)) : 0;
  const finalPrice = roundCurrency(totalPrice - discountAmount);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div
      className={cn(
        'w-full lg:max-w-92 rounded-2xl border border-border bg-card p-6',
        'flex flex-col lg:flex-shrink-0 gap-4 items-center text-center',
      )}
    >
      <p className={cn(TYPOGRAPHY.h2, 'text-foreground')}>
        {symbol}
        {finalPrice}
      </p>
      <p className={cn(TYPOGRAPHY.body, 'text-muted-foreground')}>
        {t('cart.totalFor')} {t('items.count', { count: totalQuantity })}
      </p>

      {discountPercent && (
        <>
          <div className="w-full border-t border-border" />
          <div className="w-full flex justify-between text-sm">
            <span className="text-muted-foreground">
              {t('cart.discount', { percent: discountPercent })}
            </span>
            <span className="text-green-600 font-medium">
              -{symbol}
              {discountAmount.toFixed(2)}
            </span>
          </div>
        </>
      )}

      <div className="w-full border-t border-border" />
      <Button
        onClick={handleCheckout}
        className="w-full bg-foreground text-background hover:bg-popover-foreground"
        size="lg"
      >
        {t('cart.checkout')}
      </Button>
    </div>
  );
};
