import React from 'react';
import cn from 'classnames';
import styles from './Icon.module.scss';

interface IconProps {
  name:
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'close'
  | 'search'
  | 'like'
  | 'menu'
  | 'minus'
  | 'plus'
  | 'cart';
  size?: number;
  color?: string;
  badge?: number | string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  color = 'currentColor',
  badge,
  className,
}) => {
  const classes = cn(styles.icon, styles[`icon__${name}`], className);

  const style: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    color,
  };

  return (
    <span className={classes} style={style}>
      {badge !== undefined && (
        <span className={styles.icon__badge}>{badge}</span>
      )}
    </span>
  );
};
