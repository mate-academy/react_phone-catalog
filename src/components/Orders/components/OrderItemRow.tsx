import type { CartItem } from '@/types/Book';
import type { Currency } from '@/types/Currency';
import { TYPOGRAPHY } from '@/constants/typography';
import { getItemPrice, getCurrencySymbol } from '../helpers/priceUtils';

interface OrderItemRowProps {
  item: CartItem;
  currency: Currency;
  rate: number;
}

export const OrderItemRow = ({ item, currency, rate }: OrderItemRowProps) => {
  const symbol = getCurrencySymbol(currency);
  const lineTotal = getItemPrice(item, currency, rate) * item.quantity;

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    (event.target as HTMLImageElement).style.display = 'none';
  };

  return (
    <li className="flex items-center gap-4 px-6 py-4">
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-12 h-16 object-cover rounded-sm flex-shrink-0"
        onError={handleImageError}
      />
      <div className="flex-1 min-w-0">
        <p className={`${TYPOGRAPHY.buttons} text-foreground truncate`}>
          {item.name}
        </p>
        <p className={`${TYPOGRAPHY.small} text-muted-foreground`}>
          {item.author}
        </p>
        <p className={`${TYPOGRAPHY.small} text-muted-foreground mt-0.5`}>
          Qty: {item.quantity}
        </p>
      </div>
      <span
        className={`${TYPOGRAPHY.buttons} font-bold text-foreground whitespace-nowrap`}
      >
        {symbol}
        {lineTotal.toFixed(2)}
      </span>
    </li>
  );
};
