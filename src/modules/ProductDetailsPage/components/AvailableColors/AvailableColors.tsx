import React from 'react';
import style from './AvailableColors.module.scss';
import { ProductDetails } from '../../../../types/ProductDetails';
import cn from 'classnames';
import { OutlineBottom } from '../OutlineBottom';

type Props = {
  product: ProductDetails;
  handleVariable: (color: string) => void;
};

type ColorMap = {
  [key: string]: string;
};

export const AvailableColors: React.FC<Props> = ({
  product,
  handleVariable,
}) => {
  const normalizeColor: ColorMap = {
    midnightgreen: '#004953',
    spacegray: '#6E6E73',
    skyblue: '#87CEEB',
    rosegold: '#B76E79',
    spaceblack: '#1C1C1E',
    graphite: '#3A3A3A',
    sierrablue: '#9BB7D4',
    midnight: '#0A0F2C',
    starlight: '#f5f1e8',
  };

  const normalize = (color: string) => {
    const colorKey = color.replace(' ', '');

    if (colorKey in normalizeColor) {
      return normalizeColor[colorKey] ?? color;
    }

    return color;
  };

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
            style={{ backgroundColor: normalize(color) }}
            onClick={() => handleVariable(color)}
          ></div>
        ))}
      </div>
      <OutlineBottom />
    </div>
  );
};
