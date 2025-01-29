import React from 'react';
import classNames from 'classnames';

import styles from './Arrow.module.scss';

import { ArrowType } from '@sTypes/ArrowType';

type Props = {
  type: ArrowType;

  tall?: boolean;
  disabled?: boolean;
};

export const Arrow: React.FC<Props> = ({ type, tall, disabled }) => (
  <div
    className={classNames(styles.arrow, {
      [styles['arrow--tall']]: tall,
      [styles['arrow--disabled']]: disabled,
    })}
  >
    <div className={classNames(styles.arrow__content, styles[type])}></div>
  </div>
);
