import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { COLOR_MAP, DISCOUNT_THRESHOLD } from '../../../../constants';
import { Category, DetailedProduct } from '../../../../types';
import { normalizeString } from '../../../../utils';

import { AddToFavoritesButton, AddToCartButton } from '../../../../components';

import styles from './Controls.module.scss';

type Props = {
  className?: string;
  product: DetailedProduct;
  productsCategory: Category;
  detailedProductsSameModel: DetailedProduct[];
};

export const Controls: React.FC<Props> = ({
  className = '',
  product,
  productsCategory,
  detailedProductsSameModel,
}) => {
  const navigate = useNavigate();
  const { colorsAvailable, capacityAvailable, priceRegular, priceDiscount } =
    product;

  const hasBigDiscount =
    ((priceRegular - priceDiscount) * 100) / priceRegular >= DISCOUNT_THRESHOLD;

  const handleColorChange = (newColor: string) => {
    const normalizedNewColor = normalizeString(newColor);
    const normalizedCapacity = normalizeString(product.capacity);

    const newProduct = detailedProductsSameModel.find(
      p =>
        normalizeString(p.color) === normalizedNewColor &&
        normalizeString(p.capacity) === normalizedCapacity,
    );

    if (newProduct) {
      navigate(`/${productsCategory}/${newProduct.id}`);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    const normalizedNewCapacity = normalizeString(newCapacity);
    const normalizedColor = normalizeString(product.color);

    const newProduct = detailedProductsSameModel.find(
      p =>
        normalizeString(p.capacity) === normalizedNewCapacity &&
        normalizeString(p.color) === normalizedColor,
    );

    if (newProduct) {
      navigate(`/${productsCategory}/${newProduct.id}`);
    }
  };

  return (
    <div className={classNames(styles.controls, className)}>
      <div className={classNames(styles.controls__colors, styles.colors)}>
        <span className={styles['controls__sub-title']}>Available colors</span>
        <ul className={styles.colors__list}>
          {[...colorsAvailable].sort().map((color, index) => (
            <li
              key={color + index}
              className={classNames(styles.colors__item, {
                [styles['colors__item--active']]: color === product.color,
              })}
              onClick={() => handleColorChange(color)}
            >
              <div
                className={styles.colors__circle}
                style={{ backgroundColor: COLOR_MAP[color] || '#000' }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div
        className={classNames(styles.controls__capacities, styles.capacities)}
      >
        <span className={styles['controls__sub-title']}>Select capacity</span>
        <ul className={styles.capacities__list}>
          {capacityAvailable.map((capacity, index) => (
            <li
              key={capacity + index}
              className={classNames(styles.capacities__item, {
                [styles['capacities__item--active']]:
                  capacity === product.capacity,
              })}
              onClick={() => handleCapacityChange(capacity)}
            >
              {capacity}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.controls__prices}>
        <strong className={styles.controls__price}>
          {`$${hasBigDiscount ? priceDiscount : priceRegular}`}
        </strong>
        {hasBigDiscount && (
          <span
            className={classNames(
              styles.controls__price,
              styles['controls__price--discount'],
            )}
          >
            {`$${priceRegular}`}
          </span>
        )}
      </div>

      <div className={styles.controls__buttons}>
        <AddToCartButton
          productId={product.id}
          className={styles['controls__cart-btn']}
        />
        <AddToFavoritesButton productId={product.id} />
      </div>

      <div className={classNames(styles.controls__info, styles.info)}>
        <ul className={styles.info__list}>
          <li className={styles.info__item}>
            <span className={styles.info__property}>Screen</span>
            <span className={styles.info__value}>{product.screen}</span>
          </li>
          <li className={styles.info__item}>
            <span className={styles.info__property}>Resolution</span>
            <span className={styles.info__value}>{product.resolution}</span>
          </li>
          <li className={styles.info__item}>
            <span className={styles.info__property}>Processor</span>
            <span className={styles.info__value}>{product.processor}</span>
          </li>
          <li className={styles.info__item}>
            <span className={styles.info__property}>RAM</span>
            <span className={styles.info__value}>{product.ram}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
