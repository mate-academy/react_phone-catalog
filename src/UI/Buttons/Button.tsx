/* eslint-disable @typescript-eslint/indent */
import { ButtonHTMLAttributes, forwardRef } from 'react';

import styles from './Button.module.css';

const buttonVariants = (variant = 'default', isSelected = false) => {
  const baseClass = styles.button;
  const variantClass =
    styles[`button-variant--${variant}${isSelected ? '--selected' : ''}`];

  return `${baseClass} ${variantClass}`;
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'color-selector'
    | 'ghost'
    | 'icon'
    | 'pagination';
  isSelected?: boolean;
  size?: string | [number, number];
  color?: string;
}

const unsupportedColorsHexMapping: { [key: string]: string } = {
  spacegray: '#A0A0A0',
  midnightgreen: '#004953',
  rosegold: '#B76E79',
  midnight: '#191970',
  spaceblack: '#1B1B1B',
  graphite: '#383838',
  sierrablue: '#A3C1DA',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      size = '',
      isSelected = false,
      color,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const classes = buttonVariants(variant, isSelected);

    const buttonColor: { backgroundColor?: string } = {};
    let buttonSize: { width?: string; height?: string } = {};

    function setColor(colorToCheck: string) {
      if (colorToCheck in unsupportedColorsHexMapping) {
        buttonColor.backgroundColor = unsupportedColorsHexMapping[colorToCheck];
      } else {
        buttonColor.backgroundColor = colorToCheck;
      }
    }

    if (typeof size === 'string') {
      const [width, height] = size.split(' ');

      buttonSize = { width, height };
    } else if (Array.isArray(size)) {
      const [width, height] = size;

      buttonSize = { width: `${width}px`, height: `${height}px` };
    }

    if (variant === 'color-selector') {
      const widthValue = parseInt(buttonSize.width ?? '0') - 3;
      const heightValue = parseInt(buttonSize.height ?? '0') - 3;

      buttonSize = { width: `${widthValue}px`, height: `${heightValue}px` };

      if (color !== undefined) {
        setColor(color);
      }
    }

    return (
      <button
        ref={ref}
        className={`${classes} ${className ?? ''}`}
        style={{ ...buttonSize, ...buttonColor, ...style }}
        {...props}
      >
        {props.children}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
