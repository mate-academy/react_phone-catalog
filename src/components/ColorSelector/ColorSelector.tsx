import React from 'react';
import './ColorSelector.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ProductDetails } from '../../types/ProductDetails';
import { ColorsType, colors } from '../../types/Colors';

type Props = {
  product: ProductDetails;
  pathname: string;
};

export const ColorSelector: React.FC<Props> = ({ product, pathname }) => {
  return (
    <>
      {product.colorsAvailable.map((color) => {
        const isSelected = product.color === color;
        const path = pathname.replace(product.color, color);
        const bgcColor = colors[color as keyof ColorsType];

        return (
          <Link
            to={{ pathname: `${path}` }}
            title={color}
            className={classNames('colors-list', {
              'colors-list--active': isSelected,
            })}
            key={color}
            style={{ background: `${bgcColor}` }}
          />
        );
      })}
    </>
  );
};
