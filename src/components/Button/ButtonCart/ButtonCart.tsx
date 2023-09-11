import { useContext } from 'react';

import classNames from 'classnames';
import './ButtonCart.scss';

import { Product } from '../../../types/Product';
import { CartContext } from '../../../contexts/CartContextProvider';

type Props = {
  product: Product,
};

export const ButtonCart: React.FC<Props> = ({ product }) => {
  const {
    cart,
    addToCart,
    removeFromCart,
  } = useContext(CartContext);

  const isAdded = cart.find(currentItem => (
    currentItem.product.phoneId === product.phoneId));

  const handleAddCart = () => {
    if (isAdded) {
      removeFromCart(product.phoneId);
    } else {
      const cartItem = {
        id: product.phoneId,
        quantity: 1,
        product,
      };

      addToCart(cartItem);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAddCart}
      className={classNames(
        'button-cart',
        { 'button-cart--added': isAdded },
      )}
    >
      {isAdded ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
