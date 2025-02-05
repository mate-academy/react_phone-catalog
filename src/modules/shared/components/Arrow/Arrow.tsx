import React from 'react';
import classNames from 'classnames';

import styles from './Arrow.module.scss';

import { ArrowType } from '@sTypes/ArrowType';

type Props = {
  type: ArrowType;

  tall?: boolean;
  small?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  hideBorders?: boolean;
};

export const Arrow: React.FC<Props> = ({
  type,
  tall,
  small,
  disabled,
  secondary,
  hideBorders,
}) => (
  <div
    className={classNames(styles.arrow, {
      [styles['arrow--tall']]: tall,
      [styles['arrow--small']]: small,
      [styles['arrow--disabled']]: disabled,
      [styles['arrow--secondary']]: secondary,
      [styles['arrow--hide-borders']]: hideBorders,
    })}
  >
    <div className={classNames(styles.arrow__content, styles[type])}></div>
  </div>
);
