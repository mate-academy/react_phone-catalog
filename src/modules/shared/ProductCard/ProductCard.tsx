import { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useGlobalState } from '../../../context/store';
import { Product } from '../../../types/Product';
import styles from './ProductCard.module.scss';
import cn from 'classnames';

type Props = {
  product: Product;
  priceType: 'regular' | 'discount';
};

// eslint-disable-next-line react/display-name
export const ProductCard: FC<Props> = memo(({ product, priceType }) => {
  const { image, name, price, fullPrice, screen, capacity, ram } = product;

  const location = useLocation();

  const { isInCart, addToCart, isInFavourites, toggleFavourites } =
    useGlobalState();

  return (
    <article className={styles.productCard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        state={{ fromPath: location.pathname, fromSearch: location.search }}
        className={styles.linkWrapper}
      >
        <div className={styles.imgWrapper}>
          <img src={image} alt={name} className={styles.img} />
        </div>

        <div className={styles.title}>{name}</div>
      </Link>

      {priceType === 'regular' && (
        <div className={styles.priceWrapper}>
          <span className={styles.priceRegular}>{`$${fullPrice}`}</span>
        </div>
      )}

      {priceType === 'discount' && (
        <div className={styles.priceWrapper}>
          <span className={styles.priceRegular}>{`$${fullPrice}`}</span>

          <span className={styles.priceDiscount}>{`$${price}`}</span>
        </div>
      )}

      <div className={styles.specs}>
        <span className={styles.specsItem}>
          <span className={styles.specsItemProp}>Screen</span>

          <span className={styles.specsItemValue}>{screen}</span>
        </span>

        <span className={styles.specsItem}>
          <span className={styles.specsItemProp}>Capacity</span>

          <span className={styles.specsItemValue}>{capacity}</span>
        </span>

        <span className={styles.specsItem}>
          <span className={styles.specsItemProp}>RAM</span>

          <span className={styles.specsItemValue}>{ram}</span>
        </span>
      </div>

      <div className={styles.buttons}>
        <button
          onClick={() => addToCart(product)}
          className={cn(styles.btnAdd, {
            [styles.btnAddActive]: isInCart(product),
          })}
        >
          {isInCart(product) ? 'Added' : 'Add to cart'}
        </button>

        <button
          onClick={() => toggleFavourites(product)}
          className={styles.btnFav}
        >
          <span
            className={cn(styles.iconFav, {
              [styles.iconFavActive]: isInFavourites(product),
            })}
          ></span>
        </button>
      </div>
    </article>
  );
});
