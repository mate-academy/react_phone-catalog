import React from 'react';
import classNames from 'classnames';
import styles from './SliderButton.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  isActive?: boolean;
};

export const SliderButton: React.FC<Props> = ({
  children,
  className,
  disabled = false,
  onClick = () => {},
  isActive,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(
        styles.button,
        className,
        isActive && styles.active,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
