import { useContext } from 'react';
import scss from './ButtonCart.module.scss';
import { DataContext } from '../../../../context/ContextProvider';

interface Props {
  productId: number;
}

export const ButtonCart: React.FC<Props> = ({ productId }) => {
  const { cartItems, setCartItems } = useContext(DataContext);

  const isInCart = cartItems.some(item => item.productId === productId);

  const toggleCart = (id: number) => {
    setCartItems(prev => {
      const next = prev.some(item => item.productId === id)
        ? prev.filter(item => item.productId !== id)
        : [...prev, { id: id, quantity: 1, productId: id }];

      return next;
    });
  };

  return (
    <button
      type="button"
      aria-pressed={isInCart}
      aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
      className={scss.buttonCart}
      onClick={() => toggleCart(productId)}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
