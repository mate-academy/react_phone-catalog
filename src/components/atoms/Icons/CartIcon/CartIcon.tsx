import { Icon } from '../Icon';
import { IconWithCounter } from '../IconWithCounter';

import cartIcon from '@/shared/assets/icons/Cart.svg?no-inline';
import cartWithCounterIcon from '@/shared/assets/icons/CartWithCounter.svg?no-inline';

type Props = {
  quantity?: number;
  className?: string;
};

export const CartIcon = ({ quantity = 0, className }: Props) => {
  if (quantity > 0) {
    return (
      <IconWithCounter
        icon={cartWithCounterIcon}
        quantity={quantity}
        className={className}
      />
    );
  }

  return (
    <Icon
      icon={cartIcon}
      className={className}
    />
  );
};
