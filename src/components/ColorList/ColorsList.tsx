import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { DetailsProduct } from '../../types/DetailsProduct';
import { ColorsType, colors } from '../../types/Color';

import './colorList.scss';

type Props = {
  product: DetailsProduct;
  pathname: string;
};

export const ColorsList: FC<Props> = ({ product, pathname }) => (
  <>
    {product.colorsAvailable.map(color => {
      const isSelected = product.color === color;
      const path = pathname.replace(product.color, color);
      const bgcColor = colors[color as keyof ColorsType];

      return (
        <Link
          to={{
            pathname: `${path}`,
          }}
          title={color}
          key={color}
          style={{ background: `${bgcColor}` }}
          className={classNames(
            'colors-list',
            { 'colors-list--active': isSelected },
          )}
        />
      );
    })}
  </>
);
