import styles from './SwiperProductCard.module.scss';
import { Product } from '../../types/Product';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  product: Product;
};

export const SwiperProductCard: React.FC<Props> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, isCart } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = product.category;
  const modelId = product.itemId;

  return (
    <div className={styles.card}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.image}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          navigate(`/${category}/${modelId}`, {
            state: { pathname },
          });
        }}
      />

      <h3
        className={styles.title}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          navigate(`/${category}/${modelId}`, {
            state: { pathname },
          });
        }}
      >
        {product.name}
      </h3>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>
        <span className={styles.fullPrice}>${product.fullPrice}</span>
      </div>

      <ul className={styles.details}>
        <li>
          <strong>Screen:</strong> {product.screen}
        </li>
        <li>
          <strong>Capacity:</strong> {product.capacity}
        </li>
        <li>
          <strong>RAM:</strong> {product.ram}
        </li>
      </ul>

      <div className={styles.actions}>
        <button
          className={`${styles.addToCart} ${isCart(product.id) ? styles.addToCartActive : ''}`}
          onClick={() => addToCart(product)}
        >
          {isCart(product.id) ? 'Added to cart' : 'Add to cart'}
        </button>
        <div
          className={`${styles.fav} ${isFavorite(product.id) ? styles.favActive : ''}`}
          onClick={() => toggleFavorite(product)}
        ></div>
      </div>
    </div>
  );
};
