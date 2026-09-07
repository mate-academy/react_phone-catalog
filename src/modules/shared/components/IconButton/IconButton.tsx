import React from 'react';
import classNames from 'classnames';

import styles from './IconButton.module.scss';

import { IconButtonType } from '@sTypes/IconButtonType';
import { useAppSelector } from '@store/hooks';
import { Theme } from '@sTypes/Theme';

type Props = {
  ariaLabel?: string;
  ariaHidden?: boolean;

  className?: string;
  onClick?: () => void;

  icon?: boolean;
  type: IconButtonType;

  tall?: boolean;
  small?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  hideBorders?: boolean;
  hideBackground?: boolean;
};

export const IconButton: React.FC<Props> = ({
  ariaLabel,
  ariaHidden,

  className,
  onClick = () => {},

  icon,
  type,

  tall,
  small,
  disabled,
  secondary,
  hideBorders,
  hideBackground,
}) => {
  const Element = icon ? 'div' : 'button';
  const theme = useAppSelector(state => state.theme);

  return (
    <Element
      className={classNames(className, styles['icon-button'], {
        [styles['icon-button--tall']]: tall,
        [styles['icon-button--small']]: small,
        [styles['icon-button--disabled']]: disabled,
        [styles['icon-button--secondary']]: secondary,
        [styles['icon-button--hide-borders']]: hideBorders,
        [styles['icon-button--dark']]: theme === Theme.dark,
        [styles['icon-button--hide-background']]: hideBackground,
      })}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    >
      <div
        className={classNames(styles['icon-button__content'], styles[type], {
          [styles['icon-button__content--tall']]: tall,
          [styles['icon-button__content--disabled']]: disabled,
          [styles['icon-button__content--secondary']]: secondary,
        })}
      ></div>
    </Element>
  );
};
