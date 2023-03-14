import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { DetailsProduct } from '../../types/DetailsProduct';
import './colors-list.scss';

type Props = {
  product: DetailsProduct;
  pathname: string;
};

export const ColorsList: FC<Props> = ({ product, pathname }) => {
  return (
    <>
      {product.colorsAvailable.map((color) => {
        const isSelected = product.color === color;
        const path = pathname.replace(product.color, color);

        return (
          <Link
            to={{ pathname: `${path}` }}
            aria-label="colors-list"
            title={color}
            className={classNames('colors-list', {
              'colors-list--active': isSelected,
            })}
            type="button"
            key={color}
            style={{ background: `${color}` }}
          />
        );
      })}
    </>
  );
};
