import classNames from 'classnames';
import React from 'react';
import styles from './ColorButton.module.scss';
import { ButtonProps } from '../../../../shared/atoms/Button';
import { IconButton } from '../../../../shared/atoms/IconButton';

type ColorButtonProps = Omit<ButtonProps, 'children'> & {
  color: string;
  isActive: boolean;
  isNotAvailable: boolean;
};

export const ColorButton = ({
  color,
  isActive,
  isNotAvailable,
  className,
  ...props
}: ColorButtonProps) => (
  <IconButton
    {...props}
    className={classNames(
      styles['color-button'],
      {
        [styles[`color-button--active`]]: isActive,
        [styles[`color-button--unavailable`]]: isNotAvailable,
      },
      className,
    )}
  >
    <div
      className={classNames(
        styles['color-button__color'],
        styles[`color-button__color--${color}`],
      )}
    />
  </IconButton>
);
