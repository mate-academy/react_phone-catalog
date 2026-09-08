import './cartButton.scss';
import { useCart } from '../cartContext/cartContext';

export const CartButton = ({
  itemId: itemId,
  size = 40,
}: {
  itemId: string;
  size?: number;
}) => {
  const { cart, toggleCart } = useCart();
  const isCart = cart.some(item => item.itemId === itemId);

  return (
    <button
      className={`cart__button ${isCart ? 'active' : ''}`}
      onClick={() => toggleCart(itemId)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {`${isCart ? 'Added' : 'Add to cart'}`}
    </button>
  );
};
