import React from 'react';
import cn from 'classnames';
import { COLORS_PHONES } from '../../constants/COLORS_PHONES';

type Props = {
  property: string[];
  colors: boolean;
};

export const AvaliableContainer: React.FC<Props> = React.memo(
  ({ property, colors }) => {
    return (
      <div className="container">
        {property.map(item => (
          <div
            key={item}
            className={cn('container__item-wrapper', {
              'container__item-wrapper--color': colors,
            })}
          >
            <div
              className={cn('container__item', {
                'container__item--color': colors,
              })}
              style={colors ? { background: COLORS_PHONES[item] || item } : {}}
            >
              {!colors && item}
            </div>
          </div>
        ))}
      </div>
    );
  },
);
