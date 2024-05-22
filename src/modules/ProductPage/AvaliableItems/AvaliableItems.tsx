import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { COLORS_DEVICES } from '../../constants/COLORS_DEVICES';
import { Device } from '../../../types/Device';

type Props = {
  device: Device;
  colors: boolean;
  discount: boolean;
};

export const AvaliableItems: React.FC<Props> = React.memo(
  ({ device, colors, discount }) => {
    const { capacityAvailable, colorsAvailable, capacity, color, namespaceId } =
      device;

    const property = colors ? colorsAvailable : capacityAvailable;
    const selectedItem = colors ? color : capacity;

    return (
      <div className="container">
        {property.map(item => (
          <Link
            to={
              colors
                ? `../${namespaceId}-${capacity.toLowerCase()}-${item}`
                : `../${namespaceId}-${item.toLowerCase()}-${color}`
            }
            state={discount}
            key={item}
            className={cn('container__item-wrapper', {
              'container__item-wrapper--color': colors,
              'is-active': selectedItem === item,
            })}
          >
            <div
              className={cn('container__item', {
                'container__item--color': colors,
              })}
              style={colors ? { background: COLORS_DEVICES[item] || item } : {}}
            >
              {!colors && item}
            </div>
          </Link>
        ))}
      </div>
    );
  },
);
