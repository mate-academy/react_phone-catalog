import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../../../types/Product';
import { useCart, useFavorites } from '../../context';
import { Icon } from '../Icon';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const inCart = isInCart(product.itemId);
  const favorite = isFavorite(product.itemId);
  const detailsPath = `/product/${product.itemId}`;

  return (
    <article className={styles.card}>
      <Link to={detailsPath} className={styles.imageLink}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </Link>

      <Link to={detailsPath} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>
        {product.fullPrice > product.price && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <ul className={styles.specs}>
        <li>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </li>
        <li>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </li>
        <li>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </li>
      </ul>

      <div className={styles.actions}>
        <button
          type="button"
          className={classNames(styles.addButton, {
            [styles.added]: inCart,
          })}
          onClick={() => {
            if (!inCart) {
              addToCart(product);
            }
          }}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={classNames(styles.favButton, {
            [styles.favActive]: favorite,
          })}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => toggleFavorite(product)}
        >
          <Icon name={favorite ? 'heart-filled' : 'heart'} />
        </button>
      </div>
    </article>
  );
};
