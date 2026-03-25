import React from 'react';
import styles from './ProductInfo.module.scss';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { CapacityPicker } from '../CapacityPicker';

interface Props {
  product: {
    namespaceId: string;
    colorsAvailable?: string[];
    color?: string;
    capacityAvailable?: string[];
    capacity?: string;
    priceDiscount: number;
    priceRegular?: number;
    screen?: string;
    resolution?: string;
    processor?: string;
    ram?: string;
  };
  isInCart: boolean;
  selectedColor: string;
  selectedCapacity: string;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
  onAddToCart: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
}

export const ProductInfo: React.FC<Props> = ({
  product,
  isInCart,
  selectedColor,
  selectedCapacity,
  onColorChange,
  onCapacityChange,
  onAddToCart,
  onFavorite,
  isFavorite,
}) => {
  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
  ];

  return (
    <div className={styles.info}>
      {product.colorsAvailable && (
        <ColorPicker
          colors={product.colorsAvailable}
          selected={selectedColor}
          productId={product.namespaceId}
          onChange={onColorChange}
        />
      )}

      <div className={styles.info__divider} />

      {product.capacityAvailable && (
        <CapacityPicker
          capacities={product.capacityAvailable}
          selected={selectedCapacity}
          onChange={onCapacityChange}
        />
      )}

      <div className={styles.info__divider} />

      <div className={styles.info__prices}>
        <span className={styles.info__priceNew}>${product.priceDiscount}</span>
        {product.priceRegular && (
          <span className={styles.info__priceOld}>${product.priceRegular}</span>
        )}
      </div>
      <div className={styles.info__actions}>
        <button
          type="button"
          className={`${styles.info__addToCart} ${
            isInCart ? styles['info__addToCart--active'] : ''
          }`}
          onClick={onAddToCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={`${styles.info__favorite} ${
            isFavorite ? styles['info__favorite--active'] : ''
          }`}
          onClick={onFavorite}
          aria-label="Add to favourites"
        >
          <img
            src={
              isFavorite
                ? './img/icons/favourites-Filled.svg'
                : './img/icons/heart.svg'
            }
            alt=""
          />
        </button>
      </div>

      <div className={styles.info__specs}>
        {specs.map(({ label, value }) =>
          value ? (
            <div key={label} className={styles.info__specRow}>
              <span className={styles.info__specLabel}>{label}</span>
              <span className={styles.info__specValue}>{value}</span>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};
