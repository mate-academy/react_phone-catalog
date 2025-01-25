import React from 'react';
import classNames from 'classnames';

import styles from './Arrow.module.scss';

import { ArrowType } from '@sTypes/ArrowType';

type Props = {
  type: ArrowType;
  disabled?: boolean;
};

export const Arrow: React.FC<Props> = ({ type, disabled }) => (
  <div
    className={classNames(styles.arrow, {
      [styles['arrow--disabled']]: disabled,
    })}
  >
    <div className={classNames(styles.arrow__content, styles[type])}></div>
  </div>
);
