import { useState, useContext } from 'react';
import { CartContext } from '../../../providers/CartProvider';
import { useFavorites } from '../../../providers/FavoritesProvider';
import { Product } from '../../../types/Product';
import styles from './Btns.module.scss';

type Props = {
  product: Product;
};

export const Btns: React.FC<Props> = ({ product }) => {
  const [inCart, setInCart] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    setInCart(true);
    dispatch({ type: 'Add', product: product });
  };

  return (
    <div className={styles.btns}>
      <button
        type="button"
        className={`${styles.btns__add} ${
          inCart ? styles['btns__add--selected'] : ''
        }`}
        onClick={handleAddToCart}
      >
        {inCart ? 'Added' : 'Add to cart'}
      </button>

      <button
        type="button"
        className={`${styles.btns__favorites} ${
          isFavorite(product) ? styles['btns__favorites--selected'] : ''
        }`}
        onClick={() => toggleFavorite(product)}
      />
    </div>
  );
};
