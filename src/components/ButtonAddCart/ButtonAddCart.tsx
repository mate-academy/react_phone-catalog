import { useContext } from 'react';
import classNames from 'classnames';
import { CartContext } from '../../store/CartContext';
import { Phone } from '../../types/Phone';
import './style.scss';

type Props = {
  product: Phone;
  isInCart: boolean;
};

export const ButtonAddCart: React.FC<Props> = ({ product, isInCart }) => {
  const { addToCart, deleteFromCart } = useContext(CartContext);

  const handleClick = (item: Phone) => {
    if (isInCart) {
      deleteFromCart(item.id);
    } else {
      addToCart(item);
    }
  };

  return (
    <button
      aria-label="Add to cart button"
      type="button"
      className={classNames('button-cartAdd', {
        'button-cartAdd--added': isInCart,
      })}
      onClick={() => handleClick(product)}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>

  );
};
