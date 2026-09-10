import { useCartState } from '@/shared/hooks/useCartState';
import { HeaderLink } from '../HeaderLink';

interface Props {
  className?: string;
}

export const CartButton = ({ className }: Props) => {
  const cartState = useCartState();

  return (
    <HeaderLink
      to={'/cart'}
      iconURL={'img/icons/cart.svg'}
      className={className}
      amount={cartState.length}
    />
  );
};
