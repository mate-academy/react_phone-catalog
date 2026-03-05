import type { CartItem } from '@/types/Book';
import { getItemPrice } from '@/helpers/getItemPrice';
import { TYPOGRAPHY } from '@/constants/typography';
import { useCurrency } from '@/context/CurrencyContext';

interface OrderSummaryItemProps {
  item: CartItem;
}

export const OrderSummaryItem = ({ item }: OrderSummaryItemProps) => {
  const { currency, rate } = useCurrency();

  const itemTotal = getItemPrice(item, currency, rate) * item.quantity;
  const symbol = currency === 'USD' ? '$' : '₴';

  return (
    <li className="flex items-center gap-3">
      <div className="relative shrink-0">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-13 h-17 object-cover rounded-sm"
        />
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] font-bold flex items-center justify-center">
          {item.quantity}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`${TYPOGRAPHY.buttons} text-foreground truncate`}>
          {item.name}
        </p>
        <p className={`${TYPOGRAPHY.small} text-muted-foreground`}>
          {item.author}
        </p>
      </div>
      <span
        className={`${TYPOGRAPHY.buttons} font-bold text-foreground whitespace-nowrap`}
      >
        {symbol}
        {itemTotal.toFixed(2)}
      </span>
    </li>
  );
};
