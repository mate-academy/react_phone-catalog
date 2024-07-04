import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { RadioGroup } from '../ui/RadioGroup';
import classes from './textOptions.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  options: string[];
  currentOption?: string;
  onOptionChange?: (option: string) => void;
};

export const TextOptions: FC<Props> = ({
  options,
  currentOption = options[0],
  onOptionChange = () => {},
  className,
  ...props
}) => {
  return (
    <div {...props} className={cn(classes.textOptions, className)}>
      <RadioGroup>
        {options.map(option => (
          <RadioGroup.ButtonSquareWithText
            key={option}
            value={option}
            checked={option === currentOption}
            onChange={() => onOptionChange(option)}
          >
            {option}
          </RadioGroup.ButtonSquareWithText>
        ))}
      </RadioGroup>
    </div>
  );
};
