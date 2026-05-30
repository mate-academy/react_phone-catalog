import React from 'react';
import cl from 'classnames';
import s from './ProductSelectors.module.scss';
import { COLORS } from '../../../constants';
import { Item } from '../../../types/Item';

interface Props {
  product: Item | null;
  onChange: (type: 'color' | 'capacity', value: string) => void;
}

export const ProductSelectors: React.FC<Props> = ({ product, onChange }) => {
  if (!product) {
    return;
  }

  return (
    <>
      <div className={s.ProductSelectors}>
        <p className={s.ProductSelectors__chooseName}>Available colors</p>
        <ul className={s.ProductSelectors__selectList}>
          {product.colorsAvailable.map(e => (
            <li
              key={e}
              className={cl(s.ProductSelectors__color, {
                [s.ProductSelectors__colorActive]: e === product.color,
              })}
              style={{ backgroundColor: COLORS[e as keyof typeof COLORS] }}
              onClick={() => onChange('color', e)}
            ></li>
          ))}
        </ul>
      </div>

      <div className={s.ProductSelectors}>
        <p className={s.ProductSelectors__chooseName}>Select capacity</p>
        <ul className={s.ProductSelectors__selectList}>
          {product.capacityAvailable.map(e => (
            <li
              key={e}
              className={cl(s.ProductSelectors__capacity, {
                [s.ProductSelectors__capacityActive]: e === product.capacity,
              })}
              onClick={() => onChange('capacity', e)}
            >
              {e}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
