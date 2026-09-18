import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { useStore } from '../../context/StoreContext';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { cart, favorites, addToCart, toggleFavorite } = useStore();

  const isFavorite = favorites.some(item => item.id === product.id);
  const inCart = cart.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!inCart) {
      addToCart(product);
    }
  };

  return (
    <div className={styles['product-card']} data-cy="ProductCard">
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles['product-card__image-link']}
      >
        <img
          src={product.image}
          alt={product.name}
          className={styles['product-card__image']}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles['product-card__title']}
      >
        {product.name}
      </Link>

      <div className={styles['product-card__prices']}>
        <span className={styles['product-card__price']}>${product.price}</span>
        {product.fullPrice > product.price && (
          <span className={styles['product-card__full-price']}>
            ${product.fullPrice}
          </span>
        )}
      </div>

      <div className={styles['product-card__divider']} />

      <div className={styles['product-card__specs']}>
        <div className={styles['product-card__spec']}>
          <span className={styles['product-card__spec-name']}>Screen</span>
          <span className={styles['product-card__spec-value']}>
            {product.screen}
          </span>
        </div>
        <div className={styles['product-card__spec']}>
          <span className={styles['product-card__spec-name']}>Capacity</span>
          <span className={styles['product-card__spec-value']}>
            {product.capacity}
          </span>
        </div>
        <div className={styles['product-card__spec']}>
          <span className={styles['product-card__spec-name']}>RAM</span>
          <span className={styles['product-card__spec-value']}>
            {product.ram}
          </span>
        </div>
      </div>

      <div className={styles['product-card__actions']}>
        <button
          className={classNames(styles['product-card__add-to-cart'], {
            [styles['product-card__add-to-cart--added']]: inCart,
          })}
          onClick={handleAddToCart}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={classNames(styles['product-card__favorite'], {
            [styles['product-card__favorite--active']]: isFavorite,
          })}
          onClick={() => toggleFavorite(product)}
        >
          <i className={isFavorite ? 'fas fa-heart' : 'far fa-heart'}></i>
        </button>
      </div>
    </div>
  );
};
