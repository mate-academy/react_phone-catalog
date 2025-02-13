import React from 'react';
import classNames from 'classnames';

import styles from './Arrow.module.scss';

import { ArrowType } from '@sTypes/ArrowType';

type Props = {
  ariaLabel?: string;
  ariaHidden?: boolean;

  className?: string;
  onClick?: () => void;

  icon?: boolean;
  type: ArrowType;

  tall?: boolean;
  small?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  hideBorders?: boolean;
};

export const Arrow: React.FC<Props> = ({
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
}) => {
  const Element = icon ? 'div' : 'button';

  return (
    <Element
      className={classNames(className, styles.arrow, {
        [styles['arrow--tall']]: tall,
        [styles['arrow--small']]: small,
        [styles['arrow--disabled']]: disabled,
        [styles['arrow--secondary']]: secondary,
        [styles['arrow--hide-borders']]: hideBorders,
      })}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    >
      <div className={classNames(styles.arrow__content, styles[type])}></div>
    </Element>
  );
};
