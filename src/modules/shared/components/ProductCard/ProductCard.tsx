import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from '../../../../types/Product';
import { useProductsContext } from '../../../../hook/useProductsContext';

type Props = {
  product: Product;
  showFullPrice?: boolean;
  isFullWidth?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showFullPrice,
  isFullWidth,
}) => {
  const { cartProducts, favouriteProducts, addToCart, toggleFavourite } =
    useProductsContext();

  const isAddedCart = cartProducts.some(
    cartProduct => cartProduct.product.id === product.id,
  );

  const isAddedFavourite = favouriteProducts.some(
    favouriteProduct => favouriteProduct.id === product.id,
  );

  return (
    <div
      className={`${styles.product} ${isFullWidth ? styles['product--catalog'] : ''}`}
    >
      <div className={styles.product__image}>
        <Link
          to={`/product/${product.itemId}`}
          className={styles.product__link}
        >
          <img src={product.image} alt="" className={styles.product__img} />
        </Link>
      </div>

      <Link to={`/product/${product.itemId}`} className={styles.product__link}>
        <p className={styles.product__title}>{product.name}</p>
      </Link>

      {showFullPrice ? (
        <div className={styles.product__allPrice}>
          <p className={styles.product__price}>{`$${product.price}`}</p>
          <p className={styles.product__fullPrice}>{`$${product.fullPrice}`}</p>
        </div>
      ) : (
        <p className={styles.product__price}>{`$${product.price}`}</p>
      )}

      <hr className={styles.product__divider} />

      <div className={styles['product__info-screen']}>
        <p className={styles['product__info-label']}>Screen</p>
        <p className={styles['product__info-value']}>{product.screen}</p>
      </div>

      <div className={styles['product__info-capacity']}>
        <p className={styles['product__info-label']}>Capacity</p>
        <p className={styles['product__info-value']}>{product.capacity}</p>
      </div>

      <div className={styles['product__info-ram']}>
        <p className={styles['product__info-label']}>ram</p>
        <p className={styles['product__info-value']}>{product.ram}</p>
      </div>

      <div className={styles.product__actions}>
        <button
          type="button"
          className={`${styles['product__action-btn']} ${
            isAddedCart ? styles['product__action-btn--active'] : ''
          }`}
          onClick={() => addToCart(product)}
        >
          {isAddedCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles['product__action-btn-favourite']} ${
            isAddedFavourite
              ? styles['product__action-btn-favourite--active']
              : ''
          }`}
          onClick={() => toggleFavourite(product)}
        >
          <img
            src={
              isAddedFavourite
                ? './img/favourites-active.png'
                : './img/favourites.png'
            }
            alt=""
            className={styles['product__action-img']}
          />
        </button>
      </div>
    </div>
  );
};
