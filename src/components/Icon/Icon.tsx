import React from 'react';
import styles from './Icon.module.scss';
import { Link } from 'react-router-dom';

type IconProps = React.ComponentProps<typeof Link> & {
  children: React.ReactNode;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({
  children,
  to = '#',
  className,
  ...props
}) => {
  return (
    <Link to={to} className={`${styles.icon} ${className ?? ''}`} {...props}>
      {children}
    </Link>
  );
};
