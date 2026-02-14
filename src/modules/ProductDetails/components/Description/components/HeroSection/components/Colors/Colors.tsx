/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo } from 'react';

import colorNameToHex from '@uiw/react-color-name';

import { ProductsContext } from '../../../../../../../../context/ProductsContext';
import { CurrentProduct } from '../../../../../../../../context/ProductsContext/types/CurrentProduct';
import styles from './Colors.module.scss';
import { Color } from './components/Color';
import { REGEX } from './constants/Regex';
import { UNSUPPORTED_COLORS } from './constants/UnsupportedColors';

export const Colors: React.FC = () => {
  const { products, currentProduct } = useContext(ProductsContext);
  const { id, colorsAvailable } = currentProduct as CurrentProduct;

  const itemId = useMemo(
    () => products.find(product => product.itemId === id)?.id,
    [],
  );

  return (
    <div className={styles.colors}>
      <div className={styles.header}>
        <div className={styles.title}>Available colors</div>
        <div className={styles.id}>ID: {itemId}</div>
      </div>
      <div className={styles['colors-to-pick']}>
        {colorsAvailable.map(_color => {
          const modColor = _color.replace(REGEX, ' ');
          const value = colorNameToHex(_color)
            ? _color
            : UNSUPPORTED_COLORS[_color];

          return (
            <label key={`${id}-${_color}`} style={{ height: '100%' }}>
              <input
                type="radio"
                value={value}
                style={{ display: 'contents' }}
              />
              <Color value={value} colorName={modColor} />
            </label>
          );
        })}
      </div>
    </div>
  );
};
