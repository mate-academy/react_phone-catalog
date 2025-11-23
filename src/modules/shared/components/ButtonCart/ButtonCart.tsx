import { useContext } from 'react';
import scss from './ButtonCart.module.scss';
import { DataContext } from '../../../../context/ContextProvider';
import classNames from 'classnames';

interface Props {
  productId: number;
  className?: string;
}

export const ButtonCart: React.FC<Props> = ({ productId, className }) => {
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
      className={classNames(scss.buttonCart, className)}
      onClick={() => toggleCart(productId)}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
