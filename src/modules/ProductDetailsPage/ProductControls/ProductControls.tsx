import React from 'react';
import cl from 'classnames';

import { ProductDetail } from '../../../types/Product';
import { FavouritesIcon } from '../../../components/Icons/FavouritesIcon';
import { COLORS_MAP } from '../../../utils/colors';

import styles from './ProductControls.module.scss';

type Props = {
  device: ProductDetail;
  productId: number | null;
  isInCart: boolean | null;
  isLiked: boolean | null;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
  onAddToCart: () => void;
  onAddToFav: () => void;
};

export const ProductControls: React.FC<Props> = ({
  device,
  productId,
  isInCart,
  isLiked,
  onColorChange,
  onCapacityChange,
  onAddToCart,
  onAddToFav,
}) => {
  return (
    <div className={styles.controls}>
      <div className={styles.colorsBlock}>
        <div className={styles.colorsHeader}>
          <p className={styles.colorsTitle}>Available colors</p>
          <p className={styles.productId}>{`ID: ${productId}`}</p>
        </div>

        <div className={styles.colorsList}>
          {device.colorsAvailable.map(itemColor => (
            <div
              key={itemColor}
              className={cl(styles.colorCircleWrapper, {
                [styles.colorActive]: device.color === itemColor,
              })}
              onClick={() => onColorChange(itemColor)}
            >
              <div
                className={styles.colorCircle}
                style={{
                  backgroundColor: COLORS_MAP[itemColor] || itemColor,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <hr className={styles.line} />

      <div className={styles.capacityBlock}>
        <p className={styles.capacityTitle}>Select capacity</p>
      </div>

      <div className={styles.variantsCapacity}>
        {device.capacityAvailable.map(capacity => (
          <button
            key={capacity}
            className={cl(styles.variant, {
              [styles.variantActive]: device.capacity === capacity,
            })}
            onClick={() => onCapacityChange(capacity)}
          >
            {capacity}
          </button>
        ))}
      </div>

      <hr className={styles.line} />

      <div className={styles.priceBlock}>
        <h2 className={styles.priceDiscount}>${device.priceDiscount}</h2>
        <span className={styles.priceRegular}>${device.priceRegular}</span>
      </div>

      <div className={styles.actionButtons}>
        <button
          className={cl(styles.cartButton, {
            [styles.cartButtonAdded]: isInCart,
          })}
          onClick={onAddToCart}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={cl(styles.favButton, { [styles.liked]: isLiked })}
          onClick={onAddToFav}
        >
          <FavouritesIcon isFilled={isLiked || false} />
        </button>
      </div>

      <div className={styles.miniSpecs}>
        <div className={styles.specRow}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{device.screen}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>Resolution</span>
          <span className={styles.specValue}>{device.resolution}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>Processor</span>
          <span className={styles.specValue}>{device.processor}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>{device.ram}</span>
        </div>
      </div>
    </div>
  );
};
