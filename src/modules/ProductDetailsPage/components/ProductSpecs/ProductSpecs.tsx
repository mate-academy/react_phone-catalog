/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import React from 'react';
import { useCartFavoritesContext } from '../../../../shared/hooks/useCartFavoritesContext';
import { FullProductDetails } from '../../../../types/Product/FullProductDetails';
import { ICON_PATHS } from '../../../../shared/constants/IconPaths';

import styles from './ProductSpecs.module.scss';

type Props = {
  product: FullProductDetails;
  productNumericId: number;
  colors: string[];
  capacities: string[];
  camera?: string;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
};

export const ProductSpecs: React.FC<Props> = ({
  product,
  productNumericId,
  colors,
  capacities,
  camera,
  onColorChange,
  onCapacityChange,
}) => {
  const {
    addToCart,
    removeFromCart,
    addToFavorites,
    removeFromFavorites,
    isInCart,
    isInFavorites,
  } = useCartFavoritesContext();

  const productForButtons = {
    id: productNumericId,
    itemId: product.id,
    category: product.category,
    name: product.name,
    fullPrice: product.priceRegular,
    price: product.priceDiscount || product.priceRegular,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: new Date().getFullYear(),
    image: product.images[0] || '',
  };

  const isProductInCart = isInCart(productNumericId);
  const isProductInFavorites = isInFavorites(productNumericId);

  const handleToggleCart = () => {
    if (isProductInCart) {
      removeFromCart(productNumericId);
    } else {
      addToCart(productForButtons);
    }
  };

  const handleToggleFavorites = () => {
    if (isProductInFavorites) {
      removeFromFavorites(productNumericId);
    } else {
      addToFavorites(productForButtons);
    }
  };

  return (
    <div className={styles.productSpecs}>
      <div className={styles.productSpecs__header}>
        <div className={styles.productSpecs__titleIdContainer}>
          <h4 className={styles.productSpecs__colorsTitle}>Available colors</h4>

          <p className={styles.productSpecs__id}>ID: {productNumericId}</p>
        </div>

        <div className={styles.productSpecs__colorOptions}>
          {colors.map(color => (
            <div
              key={color}
              className={`${styles.productSpecs__colorOption} ${
                product.color === color
                  ? styles.productSpecs__colorOptionActive
                  : ''
              }`}
              onClick={() => onColorChange(color)}
              title={color}
            >
              <div
                className={styles.productSpecs__colorCircle}
                style={{ backgroundColor: color.toLowerCase() }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.productSpecs__divider} />

      <div className={styles.productSpecs__capacity}>
        <h4 className={styles.productSpecs__sectionTitle}>Select capacity</h4>

        <div className={styles.productSpecs__capacityOptions}>
          {capacities.map(capacity => (
            <div
              key={capacity}
              className={`${styles.productSpecs__capacityOption} ${
                product.capacity === capacity
                  ? styles.productSpecs__capacityOptionActive
                  : ''
              }`}
              onClick={() => onCapacityChange(capacity)}
            >
              {capacity}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.productSpecs__divider} />

      <div className={styles.productSpecs__price}>
        {product.priceDiscount &&
          product.priceDiscount < product.priceRegular && (
            <span className={styles.productSpecs__discountPrice}>
              ${product.priceDiscount}
            </span>
          )}

        <span className={styles.productSpecs__regularPrice}>
          ${product.priceRegular}
        </span>
      </div>

      <div className={styles.productSpecs__actions}>
        <button
          className={`${styles.productSpecs__addToCart} ${
            isProductInCart ? styles.productSpecs__addToCartAdded : ''
          }`}
          onClick={handleToggleCart}
        >
          {isProductInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={`${styles.productSpecs__favoritesButton} ${
            isProductInFavorites
              ? styles.productSpecs__favoritesButtonActive
              : ''
          }`}
          onClick={handleToggleFavorites}
        >
          <img
            src={
              isProductInFavorites ? ICON_PATHS.heartFilled : ICON_PATHS.heart
            }
            alt="Add to favorites"
            className={styles.productSpecs__favoritesIcon}
          />
        </button>
      </div>

      <div className={styles.productSpecs__specs}>
        <div className={styles.productSpecs__specsRow}>
          <span className={styles.productSpecs__specLabel}>Screen</span>
          <span className={styles.productSpecs__specValue}>
            {product.screen}
          </span>
        </div>

        <div className={styles.productSpecs__specsRow}>
          <span className={styles.productSpecs__specLabel}>Resolution</span>
          <span className={styles.productSpecs__specValue}>
            {product.resolution}
          </span>
        </div>

        <div className={styles.productSpecs__specsRow}>
          <span className={styles.productSpecs__specLabel}>Processor</span>
          <span className={styles.productSpecs__specValue}>
            {product.processor}
          </span>
        </div>

        <div className={styles.productSpecs__specsRow}>
          <span className={styles.productSpecs__specLabel}>RAM</span>
          <span className={styles.productSpecs__specValue}>{product.ram}</span>
        </div>

        {camera && (
          <div className={styles.productSpecs__specsRow}>
            <span className={styles.productSpecs__specLabel}>Camera</span>
            <span className={styles.productSpecs__specValue}>
              {product.camera}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
