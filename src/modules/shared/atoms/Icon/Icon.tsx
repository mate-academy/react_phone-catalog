import classNames from 'classnames';
import React from 'react';
import styles from './Icon.module.scss';

type Direction = 'left' | 'right' | 'down' | 'up';

type Color = 'primary' | 'secondary' | 'inherit';

type IconProps = {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  color?: Color;
};

export const Icon: React.FC<IconProps> = ({
  className,
  direction = 'left',
  color = 'primary',
  children,
}) => (
  <div
    className={classNames(
      styles.icon,
      styles[`icon--arrow-${direction}`],
      color && styles[`icon--color--${color}`],
      className,
    )}
  >
    {children}
  </div>
);
