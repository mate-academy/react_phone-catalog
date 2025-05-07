import React from 'react';
import styles from './Title.module.scss';

type Props = {
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
};
export const Title: React.FC<Props> = ({ level, children }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag className={styles[`h${level}`]}>{children}</Tag>;
};
