import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductSummary } from '../../types/catalog';
import { formatPrice, getProductImagePath } from '../../utils/catalog';
import styles from './ProductCard.module.scss';

interface Props {
  product: ProductSummary;
}

export const ProductCard = ({ product }: Props) => {
  const { addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const inCart = isInCart(product.itemId);
  const favorite = isFavorite(product.itemId);

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img
          src={getProductImagePath(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.titleLink}>
        <h3 className={styles.title}>{product.name}</h3>
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>{formatPrice(product.price)}</span>
        <span className={styles.fullPrice}>
          {formatPrice(product.fullPrice)}
        </span>
      </div>

      <dl className={styles.specs}>
        <div className={styles.spec}>
          <dt>Screen</dt>
          <dd>{product.screen}</dd>
        </div>
        <div className={styles.spec}>
          <dt>Capacity</dt>
          <dd>{product.capacity}</dd>
        </div>
        <div className={styles.spec}>
          <dt>RAM</dt>
          <dd>{product.ram}</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <button
          type="button"
          className={classNames(styles.cartButton, {
            [styles.cartButtonActive]: inCart,
          })}
          onClick={() => addToCart(product)}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={classNames(styles.favoriteButton, {
            [styles.favoriteButtonActive]: favorite,
          })}
          onClick={() => toggleFavorite(product.itemId)}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <i
            className={favorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
          />
        </button>
      </div>
    </article>
  );
};
