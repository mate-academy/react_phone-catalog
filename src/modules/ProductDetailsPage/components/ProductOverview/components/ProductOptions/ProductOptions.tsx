import React from 'react';

import styles from './ProductOptions.module.scss';

import { Product } from '../../../../../../shared/types/Product/Product';

type Props = {
  product: Product;
};

export const ProductOptions: React.FC<Props> = ({ product }) => {
  return (
    <section className={styles.productOverview__options}>
      <div className={styles.productOverview__optionsWrapper}>
        <div className={styles.productOverview__colors}>
          <p className={styles.productOverview__colorTitle}>Available colors</p>
          <div className={styles.productOverview__colorWrapper}>
            {product.colorsAvailable.map((color, index) => (
              <div key={index} className={styles.productOverview__colorOption}>
                <span
                  className={`${styles[`productOverview__${color.replace(' ', '')}`]}`}
                  style={{ width: '100%', height: '100%' }}
                ></span>
              </div>
            ))}
          </div>
        </div>
        <p className={styles.productOverview__productId}>ID: 802390</p>
      </div>

      <hr className={styles.productOverview__line} />

      <div className={styles.productOverview__capacity}>
        <p className={styles.productOverview__capacityTitle}>Select capacity</p>
        <div className={styles.productOverview__capacityButtons}>
          {product.capacityAvailable.map(capacity => (
            <button
              className={styles.productOverview__capacityOption}
              key={capacity}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>

      <hr className={styles.productOverview__line} />

      <div className={styles.productOverview__cta}>
        <div className={styles.productOverview__price}>
          <h2 className={styles.productOverview__currentPrice}>
            ${product.priceDiscount}
          </h2>
          <p className={styles.productOverview__discountPrice}>
            ${product.priceRegular}
          </p>
        </div>

        <div className={styles.productOverview__addToCart}>
          <button className={styles.productOverview__addButton}>
            Add to Cart
          </button>
          <div className={styles.productOverview__iconWrapper}>
            <img
              className={styles.productOverview__addIcon}
              src="src/assets/icons/product-details/favorites-icon.svg"
              alt="Add to cart"
            />
          </div>
        </div>
      </div>

      <div className={styles.details__specifications}>
        <ul className={styles.details__specList}>
          <li className={styles.details__specItem}>
            <p className={styles.details__specDesc}>Screen</p>
            <p className={styles.details__specCh}>
              {product.screen ? product.screen : '-'}
            </p>
          </li>
          <li className={styles.details__specItem}>
            <p className={styles.details__specDesc}>Resolution</p>
            <p className={styles.details__specCh}>
              {product.resolution ? product.resolution : '-'}
            </p>
          </li>
          <li className={styles.details__specItem}>
            <p className={styles.details__specDesc}>Processor</p>
            <p className={styles.details__specCh}>
              {product.processor ? product.processor : '-'}
            </p>
          </li>
          <li className={styles.details__specItem}>
            <p className={styles.details__specDesc}>RAM</p>
            <p className={styles.details__specCh}>
              {product.ram ? product.ram : '-'}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
