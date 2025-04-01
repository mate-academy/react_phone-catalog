import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { ToggleButton } from '../ToggleButton/ToggleButton';
import styles from './ProductControls.module.scss';

import products from '../../../public/api/products.json';

import { Phones } from '../../types/Phones';
import { Tablets } from '../../types/Tablets';
import { Accessories } from '../../types/Accessories';
import { colorMap } from '../../types/colorMap';

type ProductType = Phones | Tablets | Accessories;

interface ProductControlsProps {
  product: ProductType;
  selectedColor: string;
  selectedCapacity: string;
  isInCart: boolean;
  isInFavorites: boolean;
  handleColorChange: (color: string) => void;
  handleCapacityChange: (capacity: string) => void;
}

export const ProductControls: React.FC<ProductControlsProps> = ({
  product,
  selectedColor,
  selectedCapacity,
  isInCart,
  isInFavorites,
  handleColorChange,
  handleCapacityChange,
}) => {
  const { id } = useParams<{ id: string }>();
  const realProduct = products.find(prod => prod.itemId === id);

  return (
    <div className={styles.controls}>
      <div className={styles.controls_colors}>
        <p className={styles.controls_colors_title}>Available colors</p>
        <div className={styles.controls_colors_buttons}>
          {product.colorsAvailable.map(color => (
            <button
              key={color}
              type="button"
              className={classNames(styles.controls_colors_button, {
                [styles.active]: selectedColor === color,
              })}
              style={{ backgroundColor: colorMap[color] }}
              onClick={() => handleColorChange(color)}
              disabled={color === selectedColor}
            ></button>
          ))}
        </div>
      </div>
      <div className={styles.controls_line}></div>
      <div className={styles.controls_capacity}>
        <p className={styles.controls_capacity_title}>Select capacity</p>
        <div className={styles.controls_capacity_buttons}>
          {product.capacityAvailable.map(capacity => (
            <button
              key={capacity}
              type="button"
              className={classNames(styles.controls_capacity_button, {
                [styles.active]: selectedCapacity === capacity,
              })}
              onClick={() => handleCapacityChange(capacity)}
              disabled={capacity === selectedCapacity}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.controls_line}></div>

      <div className={styles.controls_group}>
        <div className={styles.controls_group_prices}>
          <h3 className={styles.controls_group_prices_discount}>
            ${product.priceDiscount}
          </h3>
          <p className={styles.controls_group_prices_regular}>
            ${product.priceRegular}
          </p>
        </div>
        <div className={styles.controls_group_buttons}>
          {realProduct && (
            <ToggleButton
              product={realProduct}
              type="cart"
              isActive={isInCart}
            />
          )}
          {realProduct && (
            <ToggleButton
              product={realProduct}
              type="favorites"
              isActive={isInFavorites}
            />
          )}
        </div>
      </div>
      <div className={styles.controls_specifications}>
        <div className={styles.controls_specification}>
          <p className={styles.controls_specificationName}>Screen</p>
          <p className={styles.controls_specificationValue}>{product.screen}</p>
        </div>
        <div className={styles.controls_specification}>
          <p className={styles.controls_specificationName}>Resolution</p>
          <p className={styles.controls_specificationValue}>
            {product.resolution}
          </p>
        </div>
        <div className={styles.controls_specification}>
          <p className={styles.controls_specificationName}>Proccessor</p>
          <p className={styles.controls_specificationValue}>
            {product.processor}
          </p>
        </div>
        <div className={styles.controls_specification}>
          <p className={styles.controls_specificationName}>RAM</p>
          <p className={styles.controls_specificationValue}>{product.ram}</p>
        </div>
      </div>
    </div>
  );
};
