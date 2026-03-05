import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import type { CartCheckoutProps } from '../types';

export const CartCheckout = ({
  total,
  totalItems,
  onCheckout,
}: CartCheckoutProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-6">
      <p className={cn(TYPOGRAPHY.h2, 'text-foreground')}>
        ₴{total.toLocaleString()}
      </p>

      <p className={cn(TYPOGRAPHY.body, 'text-muted-foreground')}>
        {t('cart.totalFor')} {t('items.count', { count: totalItems })}
      </p>

      <div className="w-full border-t border-border" />

      <Button
        onClick={onCheckout}
        className="w-full bg-foreground text-background hover:bg-foreground/90"
        size="lg"
      >
        {t('cart.checkout')}
      </Button>
    </div>
  );
};
