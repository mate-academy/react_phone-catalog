import { useContext } from 'react';
import classNames from 'classnames';
import { CartContext } from '../contexts/CartContextProvider';
import { Product } from '../../types/Product';

type Props = {
  product: Product,
};

export const ButtonCart: React.FC<Props> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const isAdded = cart.find(item => item.product.phoneId === product.phoneId);

  const handleAddToCart = () => {
    if (isAdded) {
      removeFromCart(product.phoneId);
    } else {
      const cartItem = { id: product.phoneId, product, quantity: 1 };

      addToCart(cartItem);
    }
  };

  return (
    <button
      className={classNames('button-cart', {
        'button-cart--added': isAdded,
      })}
      type="button"
      onClick={handleAddToCart}
    >
      {isAdded ? 'Added to cart' : 'Add to cart'}

    </button>
  );
};
