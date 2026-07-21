import type { Product } from '../../../../types/Product';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const inCart = isInCart(product.itemId);

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.favorite}
        aria-label="Toggle favorite"
        aria-pressed={isFavorite(product.itemId)}
        onClick={() => toggleFavorite(product)}
      >
        {isFavorite(product.itemId) ? '♥' : '♡'}
      </button>
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img
          src={`${import.meta.env.BASE_URL}${product.image}`}
          alt={product.name}
        />
      </Link>

      <h2>
        <Link to={`/product/${product.itemId}`}>{product.name}</Link>
      </h2>

      <p>
        <strong>${product.price}</strong>
        {product.fullPrice !== product.price && <del>${product.fullPrice}</del>}
      </p>

      <button
        type="button"
        disabled={inCart}
        onClick={() => addToCart(product)}
      >
        {inCart ? 'Added to cart' : 'Add to cart'}
      </button>
    </article>
  );
};
