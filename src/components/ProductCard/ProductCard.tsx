import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import icons from '../../assets/icons/icons.svg';
import { Product } from '../../types/Product';
import { Button } from '../UI/Button';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  showRegularPrice?: boolean;
  imageWrapperSize?: 'small' | 'large';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showRegularPrice,
  imageWrapperSize,
}) => {
  const imageWrapperClass = cn(styles.imageWrapper, {
    [styles.wrapperSmall]: imageWrapperSize === 'small',
    [styles.wrapperLarge]: imageWrapperSize === 'large',
  });

  return (
    <div className={styles.productCard}>
      <div className={styles.productDetails}>
        <Link to={{}} className={imageWrapperClass}>
          <img
            src={product.images[0]}
            alt={product.name}
            className={styles.productImage}
            loading="lazy"
          />
        </Link>

        <p className={styles.productName}>{product.name}</p>
        <h3 className={styles.productPriceDiscount}>
          ${product.priceDiscount}
          {showRegularPrice && (
            <del className={styles.productStrikePrice}>
              ${product.priceRegular}
            </del>
          )}
        </h3>

        <div className={styles.textWrapper}>
          <p className={styles.productCharacteristicsWrapper}>
            Screen{' '}
            <span className={styles.characteristics}>{product.screen}</span>
          </p>
          <p className={styles.productCharacteristicsWrapper}>
            Capacity{' '}
            <span className={styles.characteristics}>{product.capacity}</span>
          </p>
          <p className={styles.productCharacteristicsWrapper}>
            RAM <span className={styles.characteristics}>{product.ram}</span>
          </p>
        </div>

        <div className={styles.productCardButtons}>
          <Button />
          <button className={styles.addToFavouriteBtn}>
            <svg className={styles.icon}>
              <use href={`${icons}#heart-icon`}></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
