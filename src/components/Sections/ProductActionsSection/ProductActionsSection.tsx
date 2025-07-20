import { type FC, useCallback, useMemo } from 'react';
import type { DetailedProduct } from '../../../types/detailedProduct';

import { generateDisplayId } from '../../../utils/generateDisplayId';
import { COLOR_MAP } from '../../../constants/colorMap';

import styles from './ProductActionsSection.module.scss';
import { AddToCartButton } from '../../Product/AddToCartButton';
import { FavoritesButton } from '../../Product/FavoritesButton/FavoritesButton';
import { useCartActionsStore } from '../../../hooks/useCartAndFavorites';
import { useServerSync } from '../../../hooks/useServerSync';

interface ProductActionsSectionProps {
  product: DetailedProduct;
  selectedColor: string | null;
  selectedCapacity: string | null;
  onOptionChange: (newColor: string, newCapacity: string) => void;
}

export const ProductActionsSection: FC<ProductActionsSectionProps> = ({
  product,
  selectedColor,
  selectedCapacity,
  onOptionChange,
}) => {
  const { addToCart, addToFavorites, cartValues, favoritesValues } =
    useCartActionsStore();
  const { syncCartToServer, syncFavoritesToServer } = useServerSync();

  const displayId = useMemo(() => generateDisplayId(product), [product]);

  const handleOptionChange = useCallback(
    (optionType: 'color' | 'capacity', value: string) => {
      const newColor = optionType === 'color' ? value : selectedColor || '';
      const newCapacity =
        optionType === 'capacity' ? value : selectedCapacity || '';

      const finalNewCapacity =
        (
          newCapacity.toLowerCase() === '0gb' ||
          newCapacity.toLowerCase().trim() === ''
        ) ?
          ''
        : newCapacity;

      const finalNewColor =
        newColor.toLowerCase().trim() === '' ? '' : newColor;

      onOptionChange(finalNewColor, finalNewCapacity);
    },
    [onOptionChange, selectedColor, selectedCapacity],
  );

  const handleAddToCart = useCallback(async () => {
    addToCart(product.id);
    await syncCartToServer();
  }, [addToCart, product.id, syncCartToServer]);

  const handleAddToFavorites = useCallback(async () => {
    addToFavorites(product.id);
    await syncFavoritesToServer();
  }, [addToFavorites, product.id, syncFavoritesToServer]);

  const {
    priceRegular,
    priceDiscount,
    capacityAvailable,
    colorsAvailable,
    screen,
    resolution,
    processor,
    ram,
  } = product;

  const inCart = !!cartValues[product.id];
  const isFavorited = favoritesValues.includes(product.id);

  return (
    <section className={styles.productActions}>
      <div className={styles.availableColors}>
        <div className={styles.subtitleBox}>
          <p className={styles.secondaryText}>Available colors</p>
          <p className={styles.secondaryText}>ID: {displayId}</p>
        </div>
        <div className={styles.colorOptions}>
          {colorsAvailable.map((availableColor) => {
            const colorValue =
              COLOR_MAP[availableColor.toLowerCase()] || availableColor;

            const isActive =
              availableColor.toLowerCase() ===
              (selectedColor || '').toLowerCase();
            return (
              <button
                key={availableColor}
                style={{ backgroundColor: colorValue }}
                className={`${styles.colorSwatch} ${isActive ? styles.activeColor : ''}`}
                onClick={() => handleOptionChange('color', availableColor)}
                title={availableColor}
                aria-label={`Select color ${availableColor}`}
                disabled={isActive}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.line}></div>

      <div className={styles.selectCapacity}>
        <p className={styles.secondaryText}>Select capacity</p>
        <div className={styles.capacityOptions}>
          {capacityAvailable.map((availableCapacity) => {
            const isActive =
              availableCapacity.toLowerCase() ===
              (selectedCapacity || '').toLowerCase();
            return (
              <button
                key={availableCapacity}
                className={`${styles.capacityButton} ${isActive ? styles.activeCapacity : ''}`}
                onClick={() =>
                  handleOptionChange('capacity', availableCapacity)
                }
                disabled={isActive}
              >
                {availableCapacity}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.line}></div>

      <div className={styles.prices}>
        {priceDiscount < priceRegular && (
          <p className={styles.priceDiscount}>${priceDiscount}</p>
        )}
        <p
          className={
            priceDiscount < priceRegular ?
              styles.priceRegular
            : styles.priceCurrent
          }
        >
          ${priceRegular}
        </p>
      </div>

      <div className={styles.buttons}>
        <AddToCartButton
          onClick={handleAddToCart}
          inCart={inCart}
        />
        <FavoritesButton
          onClick={handleAddToFavorites}
          isActive={isFavorited}
        />
      </div>

      <div className={styles.shortInfo}>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Screen</p>
          <p className={styles.text}>{screen}</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Resolution</p>
          <p className={styles.text}>{resolution}</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Processor</p>
          <p className={styles.text}>{processor}</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>RAM</p>
          <p className={styles.text}>{ram}</p>
        </div>
      </div>
    </section>
  );
};
