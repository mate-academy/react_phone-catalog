import React from 'react';
import styles from './QuantityButton.module.scss';
import classNames from 'classnames';
import { useTheme } from '../../context/ThemeContext';

type Props = {
  type: 'plus' | 'minus';
  disabled?: boolean;
  onClick?: () => void;
};

export const QuantityButton: React.FC<Props> = ({
  type,
  disabled,
  onClick = () => {},
}) => {
  const { isDarkTheme } = useTheme();
  const buttonClass = classNames(styles.quantityButton, {
    [styles[`quantityButton--${type}`]]: !isDarkTheme,
    [styles[`quantityButton--${type}-dark`]]: isDarkTheme,
    [styles['quantityButton--disabled']]: disabled,
  });

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    ></button>
  );
};
