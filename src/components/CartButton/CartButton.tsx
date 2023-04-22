import { useContext, useMemo } from 'react';
import cn from 'classnames';
import './CartButton.scss';

import { CartContext } from '../../contexts/CartContext';
import { Product } from '../../types/Product';

type Props = {
  width?: number;
  height?: number;
  product: Product;
};

const CartButton: React.FC<Props> = ({
  width = 176,
  height = 40,
  product: {
    name,
  },
  product,
}) => {
  const { cart, addCard, delCard } = useContext(CartContext);
  const isAddedCard = useMemo(() => {
    return cart.find(currCard => currCard.product.name === name);
  }, [cart, name]);

  const onToggleHandle = () => {
    if (isAddedCard) {
      delCard(name);
    } else {
      addCard(product);
    }
  };

  return (
    <button
      type="button"
      className={cn(
        'cart-button',
        { 'cart-button--active': isAddedCard },
      )}
      style={{ width, height }}
      onClick={onToggleHandle}
    >
      {isAddedCard
        ? 'Added to cart'
        : 'Add to cart'}
    </button>
  );
};

export default CartButton;
