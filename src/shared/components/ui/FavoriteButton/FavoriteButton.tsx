/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { Icon } from '../Icon/Icon';
import { IconNames } from '../Icon/IconNames';

import styles from './FavoriteButton.module.scss';

type Props = {
  size?: 40 | 48;
};

export const FavoriteButton: React.FC<Props> = ({ size = 40 }) => {
  const sizeClass = size === 40 ? styles.size40 : styles.size48;

  return (
    <button className={`${styles.favoriteButton} ${sizeClass}`}>
      <Icon name={IconNames.Heart} />
    </button>
  );
};
