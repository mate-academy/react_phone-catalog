import { CartContext } from '../../Contexts/CartContext/CartContext';
import { useContext } from 'react';
import IconButton from '../IconButton/IconButton';

type Props = {
  variant: 'header' | 'mobileMenu';
};

export const CartIconLink: React.FC<Props> = ({ variant }) => {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce(
    (acc, quant) => acc + quant.quantity,
    0,
  );

  return (
    <IconButton
      variant={variant}
      badgeCount={totalQuantity}
      path={'/cart'}
      icon={'./img/icons/shoping-bag-icon.svg'}
      descriptions={'shoping-bag'}
    />
  );
};

export default CartIconLink;
