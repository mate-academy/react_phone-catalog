import classNames from 'classnames';
import { useContext } from 'react';
import { createCartItem } from '../../helpers/calc/helper';
import { Product } from '../../types/Product';
import { CartContext } from '../contexts/CartContextProvider';

type CartButtonProps = {
  product: Product,
  width: number,
  height: number,
};

export const CartButton: React.FC<CartButtonProps> = ({
  product,
  width,
  height,
}) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const isInCart = cart
    .find(cartItem => cartItem.product.id === product.id);

  const handleCartToggle = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      const cartItem = createCartItem(product);

      addToCart(cartItem);
    }
  };

  return (
    <button
      style={{ width, height }}
      type="button"
      className={classNames(
        'button',
        'button--primary',
        {
          'button--selected': isInCart,
        },
      )}
      onClick={handleCartToggle}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
