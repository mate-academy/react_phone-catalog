import React from 'react';
import capitalize from 'lodash/capitalize';
import s from './ProductSpecs.module.scss';
import cl from 'classnames';
import { Item } from '../../../types/Item';

interface Props {
  specs: readonly (keyof Item)[];
  product: Item;
  bigger?: boolean;
}

export const ProductSpecs: React.FC<Props> = ({
  specs,
  product,
  bigger = false,
}) => {
  return (
    <ul className={s.ProductSpecs}>
      {specs.map(key => {
        const value = product[key];

        if (!value) {
          return null;
        }

        return (
          <li
            key={key}
            className={cl(s.ProductSpecs__infoItem, {
              [s.ProductSpecs__infoItemBigger]: bigger,
            })}
          >
            {capitalize(key)}
            <span className={s.ProductSpecs__span}>
              {Array.isArray(value) ? value.join(', ') : value}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
