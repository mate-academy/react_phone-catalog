import React from 'react';

import { Color } from './Color/Color';
import { AvailableProducts } from './AvailableProducts';

type Props = {
  current: string;
  colors: string[];

  namespaceId: string;
  currentCapacity: string;
};

export const Colors: React.FC<Props> = ({
  current,
  colors,
  namespaceId,
  currentCapacity,
}) => {
  return (
    <AvailableProducts title="Select colors">
      {colors.map(color => {
        const itemId = [namespaceId, currentCapacity, ...color.split(' ')]
          .join('-')
          .toLowerCase();

        return (
          <Color
            key={itemId}
            itemId={itemId}
            color={color}
            active={current === color}
          />
        );
      })}
    </AvailableProducts>
  );
};
