import { useProducts } from '../../../shared/context/ProductsContext';
import { addToCart } from '../../../shared/utils/cart/addToCart';
import { Card } from '../../../shared/types/Card';
import styles from './BtnAddToCart.module.scss';

type Props = {
  card: Card | undefined;
};

export const BtnAddToCart: React.FC<Props> = ({ card }) => {
  const { cartItems, setCartItems } = useProducts();

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (card) {
      addToCart(card, cartItems, setCartItems);
    }
  };

  const isInCart = cartItems.some(item => item.id === card?.id);

  return (
    <button
      className={`${styles.buttons__addToCart} ${isInCart ? styles.active : ''}`}
      onClick={handleAddToCartClick}
      disabled={isInCart}
    >
      {isInCart ? 'In Cart' : 'Add to Cart'}
    </button>
  );
};
