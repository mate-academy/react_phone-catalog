import React from 'react';
import styles from './ColorSelector.module.scss';
import { Goods } from '../../../../../../types/Goods';

type Props = {
  product: Goods;
  handleChangeParam: (value: string, key: string) => void;
  color: string;
};

const COLOR_MAP: Record<string, string> = {
  spacegray: '#5f5f60',
  spaceblack: '#1c1c1e',
  silver: '#c0c0c0',
  gold: '#ffd700',
  midnight: '#191970',
  graphite: '#383838',
  sierrablue: '#7393B3',
  white: '#F0F0F0',
};

export const ColorSelector: React.FC<Props> = ({
  product,
  handleChangeParam,
  color,
}) => {
  return (
    <div className={`${styles['product-info__colors']} ${styles.colors}`}>
      <div className={styles.colors__title}>Available colors</div>
      <div className={styles.colors__items}>
        {product.colorsAvailable.map(colorItem => (
          <div
            key={colorItem}
            className={`${styles.colors__wrapper} ${color === colorItem ? styles.active : ''}`}
            onClick={() => handleChangeParam(colorItem, 'color')}
          >
            <div
              className={styles.colors__item}
              style={{
                backgroundColor: COLOR_MAP[colorItem] || colorItem,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
