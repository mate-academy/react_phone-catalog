import React from 'react';
import cn from 'classnames';
import styles from './Icon.module.scss';

export type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'close'
  | 'search'
  | 'like'
  | 'menu'
  | 'minus'
  | 'plus'
  | 'home'
  | 'cart';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  color = 'currentColor',
  className,
}) => {
  const classes = cn(styles.icon, styles[`icon__${name}`], className);

  const style: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    color,
  };

  return <span className={classes} style={style} />;
};
