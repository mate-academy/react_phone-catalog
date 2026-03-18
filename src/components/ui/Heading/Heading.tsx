import React from 'react';
import styles from './Heading.module.scss';
import cn from 'classnames';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<Props> = ({ children, className }) => {
  return <h2 className={cn(styles.heading, className)}>{children}</h2>;
};
