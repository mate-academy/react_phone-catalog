import React from 'react';
import cn from 'classnames';
import { iPhoneColorMap } from '@mocks/Data/colors';

interface ColorAvailableProps {
  gadget: Gadget;
  onChange: (color: string) => void;
}

export const ColorsAvailable: React.FC<ColorAvailableProps> = ({
  gadget,
  onChange,
}) => {
  return gadget?.colorsAvailable.map(color => {
    return (
      <button
        key={color}
        className="productPage__colorContainer"
        onClick={() => onChange(color)}
      >
        <span
          className={cn('productPage__color', {
            'productPage__color--active': color.trim() === gadget.color,
          })}
          style={{ backgroundColor: iPhoneColorMap[color] }}
        ></span>
      </button>
    );
  });
};
