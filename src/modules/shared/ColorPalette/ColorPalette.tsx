import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { RadioGroup } from '../ui/RadioGroup';
import { COLOR_TO_HEX } from './variables';
import classes from './colorPalette.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  colors: string[];
  currentColor?: string;
  onColorChange?: (color: string) => void;
};

export const ColorPalette: FC<Props> = ({
  className,
  colors,
  currentColor = colors[0],
  onColorChange = () => {},
  ...props
}) => {
  return (
    <div {...props} className={cn(classes.colorPalette, className)}>
      <RadioGroup>
        {colors.map(color => (
          <RadioGroup.Button
            key={color}
            style={{ background: COLOR_TO_HEX[color] }}
            checked={color === currentColor}
            value={color}
            onChange={() => onColorChange(color)}
          />
        ))}
      </RadioGroup>
    </div>
  );
};
