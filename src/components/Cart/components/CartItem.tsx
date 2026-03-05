import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useCartFavorites } from '@/context/CartFavoritesContext.tsx';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { showInfo, showSuccess } from '@/lib/toast';
import { getItemPrice } from '@/helpers/getItemPrice';
import { roundCurrency } from '../helpers/roundCurrency';
import type { CartItemProps } from '../types';
import { useCurrency } from '@/context/CurrencyContext';

export const CartItem = ({ book }: CartItemProps) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useCartFavorites();
  const { t } = useTranslation();
  const { currency, rate } = useCurrency();

  const price = getItemPrice(book, currency, rate);
  const total = roundCurrency(price * book.quantity);
  const symbol = currency === 'USD' ? '$' : '₴';

  const handleRemoveItem = () => {
    removeFromCart(book.id);
    showInfo(t('toast.removedFromCart', { name: book.name }));
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity(book.id);
    showInfo(t('toast.removedFromCart', { name: book.name }));
  };

  const handleIncreaseQuantity = () => {
    increaseQuantity(book.id);
    showSuccess(t('toast.addedToCart', { name: book.name }));
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-lg border border-border bg-card p-4',
        'sm:flex-row sm:items-center sm:justify-between',
      )}
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={handleRemoveItem}
          className="flex shrink-0 items-center justify-center text-ring hover:text-muted-foreground transition-colors"
          aria-label="Remove item"
        >
          <X className="size-4" />
        </button>

        <Link
          to={`/item/${book.type}/${book.slug}`}
          className="flex items-center gap-4 h-20 sm:gap-6"
        >
          <img
            src={book.images[0]}
            alt={book.name}
            className="h-full object-contain"
          />
          <div className="min-w-0">
            <p className={cn(TYPOGRAPHY.body, 'font-semibold text-foreground')}>
              {book.name}
            </p>
            <p className={cn(TYPOGRAPHY.small, 'text-muted-foreground')}>
              {book.author}
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            disabled={book.quantity === 1}
            onClick={handleDecreaseQuantity}
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </Button>

          <span
            className={cn(
              TYPOGRAPHY.body,
              'w-5 text-center font-semibold text-foreground',
            )}
          >
            {book.quantity}
          </span>

          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            onClick={handleIncreaseQuantity}
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <p className={cn(TYPOGRAPHY.h3, 'text-foreground sm:w-20 sm:text-end')}>
          {symbol}
          {total}
        </p>
      </div>
    </div>
  );
};
