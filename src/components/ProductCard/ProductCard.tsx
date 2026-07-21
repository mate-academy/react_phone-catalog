import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  hideDiscount?: boolean;
}

export const ProductCard = ({ product, hideDiscount }: Props) => {
  const { items, addToCart, removeFromCart } = useCart();
  const { items: favoriteItems, toggleFavorite } = useFavorites();
  const isFavorite = favoriteItems.some(item => item.itemId === product.itemId);
  const isInCart = items.some(item => item.product.itemId === product.itemId);

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product.itemId);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.priceCurrent}>${product.price}</span>
        {!hideDiscount && product.fullPrice !== product.price && (
          <span className={styles.priceFull}>${product.fullPrice}</span>
        )}
      </div>

      <hr className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.specTitle}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specTitle}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specTitle}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={isInCart ? styles.buttonAdded : styles.buttonAdd}
          onClick={handleCartClick}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={styles.buttonFav}
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={isFavorite ? 'img/favouritesheartlike.svg' : 'img/heart.svg'}
            alt="Favorite"
          />
        </button>
      </div>
    </div>
  );
};
