import React from 'react';
import style from './AvailableColors.module.scss';
import { ProductDetails } from '../../../../types/ProductDetails';
import cn from 'classnames';
import { OutlineBottom } from '../OutlineBottom';

type Props = {
  product: ProductDetails;
  handleVariable: (color: string) => void;
};

export const AvailableColors: React.FC<Props> = ({
  product,
  handleVariable,
}) => {
  return (
    <div className={style['available-colors']}>
      <div className={style['available-colors__block']}>
        <p className={style['available-colors__text']}>Available colors</p>
        <p className={style['available-colors__id']}>ID: 802390</p>
      </div>
      <div className={style['available-colors__colors']}>
        {product.colorsAvailable.map(color => (
          <div
            className={cn(style['available-colors__color'], {
              [style['available-colors__color--active']]:
                product.color === color,
            })}
            key={color}
            style={{ backgroundColor: color }}
            onClick={() => handleVariable(color)}
          ></div>
        ))}
      </div>
      <OutlineBottom />
    </div>
  );
};
