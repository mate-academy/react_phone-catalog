import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { TextOptions } from '../../../shared/TextOptions';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { Text } from '../../../shared/ui/Text';
import classes from './availableCapacity.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  capacity: string[];
  isLoaded: boolean;
  productId: string;
};

export const AvailableCapacity: FC<Props> = ({
  className,
  capacity,
  productId,
  isLoaded,
  ...props
}) => {
  const navigate = useNavigate();
  const lowerCaseProductId = productId.toLowerCase();
  const currentCapacity = capacity.find(capacityItem =>
    productId.includes(capacityItem.toLowerCase()),
  );

  const handleCapacityChange = (newCapacity: string) => {
    if (!currentCapacity) {
      return;
    }

    navigate(
      `../${lowerCaseProductId.replace(currentCapacity.toLowerCase(), newCapacity.toLowerCase())}`,
      { preventScrollReset: true },
    );
  };

  return (
    <div {...props} className={cn(classes.availableCapacity, className)}>
      <Text.Small className={classes.availableCapacity__title}>
        Select capacity
      </Text.Small>
      {isLoaded ? (
        <TextOptions
          className={classes.availableCapacity__options}
          options={capacity}
          onOptionChange={handleCapacityChange}
          currentOption={currentCapacity}
        />
      ) : (
        <Skeleton
          className={cn(
            classes.availableCapacity__options,
            classes.availableCapacity__options_skeleton,
          )}
        />
      )}
    </div>
  );
};
