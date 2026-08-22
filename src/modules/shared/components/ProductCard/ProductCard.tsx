import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import { useCart } from '../../../../contexts/CartContext';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import { Icon } from '../Icon';
import { ProductImage } from '../ProductImage';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);
  const hasDiscount = product.fullPrice > product.price;

  return (
    <div className={styles.card} data-cy="cardsContainer">
      <Link to={`/product/${product.id}`} className={styles.card__imageLink}>
        <div className={styles.card__image}>
          <ProductImage src={product.image} alt={product.name} />
        </div>
      </Link>

      <Link to={`/product/${product.id}`} className={styles.card__title}>
        {product.name}
      </Link>

      <div className={styles.card__prices}>
        <span className={styles.card__price}>${product.price}</span>
        {hasDiscount && (
          <span className={styles.card__fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.card__divider} />

      <dl className={styles.card__specs}>
        <div className={styles.card__spec}>
          <dt>Screen</dt>
          <dd>{product.screen}</dd>
        </div>
        <div className={styles.card__spec}>
          <dt>Capacity</dt>
          <dd>{product.capacity}</dd>
        </div>
        <div className={styles.card__spec}>
          <dt>RAM</dt>
          <dd>{product.ram}</dd>
        </div>
      </dl>

      <div className={styles.card__actions}>
        <button
          type="button"
          className={`${styles.card__addButton} ${
            inCart ? styles['card__addButton--active'] : ''
          }`}
          onClick={() => addToCart(product)}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          aria-label="Add to favorites"
          className={`${styles.card__favButton} ${
            favorite ? styles['card__favButton--active'] : ''
          }`}
          onClick={() => toggleFavorite(product)}
        >
          <Icon name={favorite ? 'heart-filled' : 'heart'} />
        </button>
      </div>
    </div>
  );
};
