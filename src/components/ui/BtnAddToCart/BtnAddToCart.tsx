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

  return (
    <button
      className={styles.buttons__addToCart}
      onClick={handleAddToCartClick}
    >
      Add to Cart
    </button>
  );
};
