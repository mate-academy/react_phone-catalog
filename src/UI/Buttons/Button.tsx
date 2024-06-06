/* eslint-disable @typescript-eslint/indent */
import { ButtonHTMLAttributes, FC } from 'react';

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
}

const Button: FC<ButtonProps> = ({
  variant = 'default',
  size = '',
  isSelected = false,
  className,
  style,
  ...props
}) => {
  const classes = buttonVariants(variant, isSelected);

  let buttonSize: { width?: string; height?: string } = {};

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
  }

  return (
    <button
      className={`${classes} ${className ?? ''}`}
      style={{ ...buttonSize, ...style }}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
