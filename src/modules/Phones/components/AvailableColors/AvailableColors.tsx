import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Skeleton } from '../../../shared/ui/Skeleton';
import { Text } from '../../../shared/ui/Text';
import { ColorPalette } from '../../../shared/ColorPalette';
import classes from './availableColors.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  colors: string[];
  productId: string;
  isLoaded: boolean;
};

export const AvailableColors: FC<Props> = ({
  colors = [],
  productId = '',
  isLoaded,
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const lowerCaseProductId = productId.toLowerCase();
  const currentColor = colors.find(color => productId.includes(color));

  const handleColorChange = (color: string) => {
    if (!currentColor) {
      return;
    }

    navigate(`../${lowerCaseProductId.replace(currentColor, color)}`, {
      preventScrollReset: true,
    });
  };

  return (
    <div {...props} className={cn(classes.availableColors, className)}>
      <Text.Small className={classes.availableColors__title}>
        Available colours
      </Text.Small>
      {isLoaded ? (
        <ColorPalette
          className={classes.availableColors__palette}
          currentColor={currentColor}
          onColorChange={handleColorChange}
          colors={colors}
        />
      ) : (
        <Skeleton
          className={cn(
            classes.availableColors__palette,
            classes.availableColors__palette_skeleton,
          )}
        />
      )}
    </div>
  );
};
