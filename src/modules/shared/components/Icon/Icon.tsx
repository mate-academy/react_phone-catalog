import React from 'react';
import classNames from 'classnames';

import styles from './Icon.module.scss';

import { IconType } from '@sTypes/IconType';

type Props = {
  type: IconType;
};

export const Icon: React.FC<Props> = ({ type }) => (
  <div className={classNames(styles.icon, styles[type])}></div>
);
