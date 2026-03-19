import React, { ElementType } from 'react';
import styles from './Heading.module.scss';
import cn from 'classnames';

interface Props {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export const Heading: React.FC<Props> = ({
  children,
  as = 'h2',
  className,
}) => {
  const Tag = as as ElementType;
  return (
    <Tag className={cn(styles.heading, styles[as], className)}>{children}</Tag>
  );
};
