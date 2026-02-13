import React from 'react';
import { IconButton } from '../../../../../shared/components/IconButton';
import cn from 'classnames';
import style from './featuresCapacity.module.scss';

interface Props {
  capacity: string;
  currentCapacity: string;
  handleRedirect: (currentParam: string, newParam: string) => Promise<void>;
}

export const FeaturesCapacity: React.FC<Props> = React.memo(
  ({ capacity, currentCapacity, handleRedirect }) => {
    return (
      <div
        onClick={() => handleRedirect(currentCapacity, capacity)}
        className={cn(style['features-capacity'])}
      >
        <IconButton
          filling={capacity}
          isActive={capacity === currentCapacity}
          variable={'capacity'}
        />
      </div>
    );
  },
);

FeaturesCapacity.displayName = 'FeaturesCapacity';
