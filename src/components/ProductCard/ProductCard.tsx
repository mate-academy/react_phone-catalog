import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useCartAndFavourites } from '../../utils/hooks/useCartAndFavorites';

type ProductCardProps = {
  product: Product;
  hotPrice?: boolean;
  isLoading: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isLoading,
  hotPrice,
}) => {
  const { pathname } = useLocation();

  const { handleAddToCart, isFavorite, handleToggleFavorite } =
    useCartAndFavourites(product);

  const visibilityClass = useMemo(
    () => (isLoading ? styles['not-visible'] : ''),
    [isLoading],
  );

  const skeletonClass = useMemo(
    () => (isLoading ? styles.skeleton : ''),
    [isLoading],
  );

  const skeletonItemClass = useMemo(
    () => (isLoading ? styles.skeleton__item : ''),
    [isLoading],
  );

  return (
    <div
      key={product.id}
      className={classNames(styles['product-card'], skeletonClass)}
    >
      <Link
        to={`/${product.category}/${product.itemId}`}
        state={{ from: pathname }}
        className={styles['product-card__link']}
      >
        <div
          className={classNames(
            styles['product-card__img-container'],
            skeletonItemClass,
          )}
        >
          <img
            className={classNames(styles['product-card__img'], visibilityClass)}
            src={`/${product.image}`}
            alt={product.name}
          />
        </div>

        <div className={classNames(skeletonItemClass)}>
          <h2
            className={classNames(
              styles['product-card__title'],
              visibilityClass,
            )}
          >
            {product.name}
          </h2>
        </div>
      </Link>

      <div
        className={classNames(
          styles['product-card__prices'],
          skeletonItemClass,
        )}
      >
        <span
          className={classNames(styles['product-card__price'], visibilityClass)}
        >
          ${product.price}
        </span>
        {hotPrice && (
          <span
            className={classNames(
              styles['product-card__hot-price'],
              visibilityClass,
            )}
          >
            ${product.fullPrice}
          </span>
        )}
      </div>

      <div
        className={classNames(
          styles['product-card__description'],
          skeletonItemClass,
        )}
      >
        <div
          className={classNames(
            styles['product-card__description-item'],
            visibilityClass,
          )}
        >
          <p className={styles['product-card__description-title']}>Screen</p>
          <p className={styles['product-card__description-value']}>
            {product.screen}
          </p>
        </div>

        <div
          className={classNames(
            styles['product-card__description-item'],
            visibilityClass,
          )}
        >
          <p className={styles['product-card__description-title']}>Capacity</p>
          <p className={styles['product-card__description-value']}>
            {product.capacity}
          </p>
        </div>

        <div
          className={classNames(
            styles['product-card__description-item'],
            visibilityClass,
          )}
        >
          <p className={styles['product-card__description-title']}>RAM</p>
          <p className={styles['product-card__description-value']}>
            {product.ram}
          </p>
        </div>
      </div>

      <div
        className={classNames(
          styles['product-card__buttons'],
          skeletonItemClass,
        )}
      >
        <button
          onClick={handleAddToCart}
          className={classNames(
            styles['product-card__button-add'],
            visibilityClass,
          )}
        >
          Add to cart
        </button>

        <button
          onClick={handleToggleFavorite}
          className={classNames(
            styles['product-card__button-favourites'],
            { [styles['product-card__button-favourites--active']]: isFavorite },
            visibilityClass,
          )}
        >
          <img
            src="/icons/favourites.svg"
            alt="Favourites icon"
            className={classNames(styles['product-card__button-icon'], {
              [styles['product-card__button-icon--active']]: !isFavorite,
            })}
          />

          <img
            src="/icons/favourites-active.svg"
            alt="Favourites icon"
            className={classNames(styles['product-card__button-icon'], {
              [styles['product-card__button-icon--active']]: isFavorite,
            })}
          />
        </button>
      </div>
    </div>
  );
};
