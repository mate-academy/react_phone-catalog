import React from 'react';
import cn from 'classnames';
import { COLORS_PHONES } from '../../constants/COLORS_PHONES';

type Props = {
  property: string[];
  colors: boolean;
  selectedItem: string;
  select: (params: string) => void;
};

export const AvaliableItems: React.FC<Props> = React.memo(
  ({ property, colors, selectedItem, select }) => {
    return (
      <div className="container">
        {property.map(item => (
          <button
            type="button"
            key={item}
            className={cn('container__item-wrapper', {
              'container__item-wrapper--color': colors,
              'is-active': selectedItem === item,
            })}
            onClick={() => select(item)}
          >
            <div
              className={cn('container__item', {
                'container__item--color': colors,
              })}
              style={colors ? { background: COLORS_PHONES[item] || item } : {}}
            >
              {!colors && item}
            </div>
          </button>
        ))}
      </div>
    );
  },
);
