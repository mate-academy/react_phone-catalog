import React from 'react';
import styles from './ArrowButton.module.scss';
import classNames from 'classnames';
import { ArrowType } from '../../utils/types';

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
  const buttonClass = classNames(
    styles.arrowButton,
    styles[`arrowButton--${type}`],
    {
      [styles['arrowButton--wide']]: size === 'wide',
      [styles['arrowButton--disabled']]: disabled,
    },
  );

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    ></button>
  );
};
