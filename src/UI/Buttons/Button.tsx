import { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.css';

const buttonVariants = (variant = 'default', isSelected = false) => {
  const baseClass = styles.button;
  const variantClass =
    styles[`button-variant--${variant}${isSelected ? '--selected' : ''}`];

  return `${baseClass} ${variantClass}`;
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: // eslint-disable-next-line
    | 'default' // eslint-disable-next-line
    | 'primary' // eslint-disable-next-line
    | 'color-selector' // eslint-disable-next-line
    | 'ghost' // eslint-disable-next-line
    | 'icon' // eslint-disable-next-line
    | 'pagination';
  isSelected?: boolean;
  size?: string | [number, number];
}

// eslint-disable-next-line
const Button: FC<ButtonProps> = ({ variant = 'default', size = 'default', isSelected = false, className, style, ...props }) => {
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
