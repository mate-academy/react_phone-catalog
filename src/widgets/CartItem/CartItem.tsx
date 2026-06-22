import Image from 'next/image';
import Link from 'next/link';

import { useCartStore } from '@/entities/Cart';
import { Product } from '@/entities/Product';
import { BASE_URL } from '@/shared/constants/constant';
import { formatPrice } from '@/shared/lib';
import { useSettingsStore } from '@/shared/store';
import { Button } from '@/shared/ui/Button';
import { CloseIcon, MinusIcon, PlusIcon } from '@/shared/ui/Icons';
import { BodyText, H3 } from '@/shared/ui/Typography';

interface CartItemProps {
  item: Product;
  quantity: number;
}

export const CartItem = ({ item, quantity }: CartItemProps) => {
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const currency = useSettingsStore((state) => state.currency);
  const currencyRates = useSettingsStore((state) => state.currencyRates);
  const language = useSettingsStore((state) => state.language);

  return (
    <div className="min-w-[288px] p-4 sm:p-6 bg-brand-surface-1 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      <div className="flex items-center gap-4 sm:gap-6 sm:flex-1">
        <Button variant="close" onClick={() => removeItem(item.itemId)}>
          <CloseIcon />
        </Button>
        <Link
          href={`/${item.category}/${item.itemId}`}
          className="flex items-center gap-4 sm:gap-6 group"
        >
          <div className="size-20 shrink-0 flex items-center justify-center">
            <Image
              src={`${BASE_URL}/${item.image}`}
              alt={item.name}
              width={66}
              height={66}
              loading="eager"
              className="object-contain w-16.5 h-16.5"
            />
          </div>
          <BodyText className="text-brand-white group-hover:text-brand-accent transition-colors duration-400">
            {item.name}
          </BodyText>
        </Link>
      </div>
      <div className="flex items-center justify-between sm:justify-end sm:gap-6">
        <div className="flex items-center">
          <Button
            variant="control"
            disabled={quantity <= 1}
            onClick={() => decreaseQuantity(item.itemId)}
          >
            <MinusIcon />
          </Button>
          <BodyText className="w-8 text-center">{quantity}</BodyText>
          <Button
            variant="control"
            onClick={() => increaseQuantity(item.itemId)}
          >
            <PlusIcon />
          </Button>
        </div>
        <H3 className="font-extrabold shrink-0 w-20 text-right">
          {formatPrice(
            item.price * quantity,
            currency,
            currencyRates,
            language,
          )}
        </H3>
      </div>
    </div>
  );
};
