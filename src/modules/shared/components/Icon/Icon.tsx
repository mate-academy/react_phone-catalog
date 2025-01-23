import React from 'react';
import classNames from 'classnames';

import styles from './Icon.module.scss';

import { IconType } from '@sTypes/IconType';

type Props = {
  type: IconType;
  wide?: boolean;
};

export const Icon: React.FC<Props> = ({ type, wide = false }) => (
  <div
    className={classNames(styles.icon, styles[type], {
      [styles['icon--wide']]: wide,
    })}
  ></div>
);
