import React from 'react';
import classNames from 'classnames';

import styles from './Icon.module.scss';

import { IconType } from '@sTypes/IconType';

import { Theme } from '@sTypes/Theme';
import { useAppSelector } from '@store/hooks';

type Props = {
  className?: string;
  onClick?: () => void;

  type: IconType;
  wide?: boolean;
  withBorder?: boolean;
  hideShadows?: boolean;

  colorRed?: boolean;
};

export const Icon: React.FC<Props> = ({
  className,
  onClick,

  type,
  wide,
  withBorder,
  hideShadows,

  colorRed,
}) => {
  const theme = useAppSelector(state => state.theme);

  return (
    <div
      onClick={onClick}
      className={classNames(className, styles.icon, {
        [styles['icon--wide']]: wide,
        [styles['icon--with-border']]: withBorder,
        [styles['icon--hide-shadows']]: hideShadows,
        [styles['icon--dark']]: theme === Theme.dark,
      })}
    >
      <div
        className={classNames(styles.icon__content, styles[type], {
          [styles['icon__content--color--red']]: colorRed,
        })}
      ></div>
    </div>
  );
};
