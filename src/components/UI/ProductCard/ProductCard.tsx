import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '@/types/product';

import FavouritesIcon from '@/assets/icons/FavouritesIcon.svg?react';

type Props = {
  product: Product;
  isShowFullPrice: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, isShowFullPrice }) => {
  const characteristics: { key: keyof Product; name: string }[] = [
    { key: 'screen', name: 'Screen' },
    { key: 'capacity', name: 'Capacity' },
    { key: 'ram', name: 'RAM' },
  ];

  return (
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.productImage}
      />
      <p className={styles.productName}>{product.name}</p>
      <div className={styles.productPrices}>
        <p className={styles.productPrice}>${product.price}</p>
        {isShowFullPrice && (
          <p className={styles.productFullPrice}>${product.fullPrice}</p>
        )}
      </div>

      <div className={styles.productCharacteristics}>
        {characteristics.map(({ key, name }) =>
          product[key] ? (
            <div key={key} className={styles.productCharacteristicsItem}>
              <p className={styles.productCharacteristicsName}>{name}</p>
              <p className={styles.productCharacteristicsValue}>
                {product[key]}
              </p>
            </div>
          ) : null,
        )}
      </div>

      <div className={styles.productButtons}>
        <button
          className={styles.productCartBtn}
          onClick={() => console.log('Added to cart')}
          aria-label="Add to cart"
        >
          <span className={styles.productCartSpan}>Add to cart</span>
        </button>
        <button
          className={styles.productFavoriteBtn}
          onClick={() => console.log('Added to favorites')}
          aria-label="Add to favorites"
        >
          <FavouritesIcon className={styles.productFavoriteIcon} />
        </button>
      </div>
    </div>
  );
};
