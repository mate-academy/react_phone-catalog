import React from 'react';
import styles from './ArrowButton.module.scss';
import classNames from 'classnames';
import { ArrowType } from '../../utils/types';
import { useTheme } from '../../context/ThemeContext';

type Props = {
  type: ArrowType;
  size?: 'default' | 'wide';
  disabled?: boolean;
  onClick?: () => void;
};

export const ArrowButton: React.FC<Props> = ({
  type,
  size = 'default',
  disabled = false,
  onClick = () => {},
}) => {
  const { isDarkTheme } = useTheme();

  const buttonClass = classNames(styles.arrowButton, {
    [styles[`arrowButton--${type}`]]: !isDarkTheme,
    [styles[`arrowButton--${type}-dark`]]: isDarkTheme,
    [styles['arrowButton--wide']]: size === 'wide',
    [styles['arrowButton--disabled']]: disabled,
  });

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    ></button>
  );
};
