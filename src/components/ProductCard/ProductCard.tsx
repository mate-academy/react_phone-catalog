import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useCart, useFavorites } from '../../context';
import { Product } from '../../types';
import { Button } from '../Button';
import { Icon } from '../Icon';
import styles from './ProductCard.module.scss';

export const ProductCard = ({ product }: { product: Product }) => {
  const { isInCart, addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const productLink = `/product/${product.itemId}`;
  const isAdded = isInCart(product.id);
  const isLiked = isFavorite(product.id);
  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Capacity', value: product.capacity },
    { label: 'RAM', value: product.ram },
  ];

  return (
    <article className={styles['product-card']}>
      <Link to={productLink} className={styles['product-card__image-link']}>
        <img
          src={product.image}
          alt={product.name}
          className={styles['product-card__image']}
        />
      </Link>

      <Link to={productLink} className={styles['product-card__title']}>
        {product.name}
      </Link>

      <p className={styles['product-card__prices']}>
        <span className={styles['product-card__price']}>${product.price}</span>
        <span className={styles['product-card__full-price']}>
          ${product.fullPrice}
        </span>
      </p>

      <dl className={styles['product-card__specs']}>
        {specs.map(({ label, value }) => (
          <div key={label} className={styles['product-card__spec']}>
            <dt className={styles['product-card__spec-name']}>{label}</dt>
            <dd className={styles['product-card__spec-value']}>{value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles['product-card__actions']}>
        <Button
          className={styles['product-card__cart-button']}
          isSelected={isAdded}
          onClick={() => !isAdded && addToCart(product)}
        >
          {isAdded ? 'Added to cart' : 'Add to cart'}
        </Button>

        <button
          type="button"
          className={classNames(styles['product-card__favorite'], {
            [styles['product-card__favorite--active']]: isLiked,
          })}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => toggleFavorite(product.id)}
        >
          <Icon name="heart" isFilled={isLiked} />
        </button>
      </div>
    </article>
  );
};
