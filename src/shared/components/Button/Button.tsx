import { forwardRef } from 'react';
import styles from './Button.module.scss';

type Props = {
  icon?: string;
  alt?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  filtered?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { icon, alt, children, style, className, onClick, disabled, filtered },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        style={style}
        disabled={disabled}
        className={`${styles.button} ${filtered ? styles.filtered : ''} ${className || ''}`}
      >
        {icon && <img src={icon} alt={alt} />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
