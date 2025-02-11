import React from 'react';
import classNames from 'classnames';

import styles from './Icon.module.scss';

import { IconType } from '@sTypes/IconType';

type Props = {
  className?: string;
  onClick?: () => void;

  type: IconType;
  wide?: boolean;
  withBorder?: boolean;
};

export const Icon: React.FC<Props> = ({
  className,
  onClick,

  type,
  wide,
  withBorder,
}) => (
  <div
    onClick={onClick}
    className={classNames(className, styles.icon, styles[type], {
      [styles['icon--wide']]: wide,
      [styles['icon--with-border']]: withBorder,
    })}
  ></div>
);
