import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { TextOptions } from '../../../shared/TextOptions';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { Text } from '../../../shared/ui/Text';
import classes from './availableOptions.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  options: string[];
  isLoaded: boolean;
  productId: string;
  title: string;
};

export const AvailableOptions: FC<Props> = ({
  className,
  options,
  productId,
  isLoaded,
  title,
  ...props
}) => {
  const navigate = useNavigate();
  const lowerCaseProductId = productId.toLowerCase();
  const currentOption = options.find(option =>
    productId.includes(option.toLowerCase()),
  );

  const handleOptionChange = (newOption: string) => {
    if (!currentOption) {
      return;
    }

    navigate(
      `../${lowerCaseProductId.replace(currentOption.toLowerCase(), newOption.toLowerCase())}`,
      { preventScrollReset: true },
    );
  };

  return (
    <div {...props} className={cn(classes.availableOptions, className)}>
      <Text.Small className={classes.availableOptions__title}>
        {title}
      </Text.Small>
      {isLoaded ? (
        <TextOptions
          className={classes.availableOptions__options}
          options={options}
          onOptionChange={handleOptionChange}
          currentOption={currentOption}
        />
      ) : (
        <Skeleton
          className={cn(
            classes.availableOptions__options,
            classes.availableOptions__options_skeleton,
          )}
        />
      )}
    </div>
  );
};
