import React from 'react';

import { Capacity } from './Capacity';
import { AvailableProducts } from './AvailableProducts';

type Props = {
  current: string;
  capacities: string[];

  namespaceId: string;
  currentColor: string;
};

export const Capacities: React.FC<Props> = ({
  current,
  capacities,
  namespaceId,
  currentColor,
}) => {
  return (
    <AvailableProducts title="Select capacity" ariaLabel="Available Capacity">
      {capacities.map(capacity => {
        const itemId = [namespaceId, capacity, ...currentColor.split(' ')]
          .join('-')
          .toLowerCase();

        return (
          <Capacity
            key={itemId}
            itemId={itemId}
            capacity={capacity}
            active={current === capacity}
          />
        );
      })}
    </AvailableProducts>
  );
};
