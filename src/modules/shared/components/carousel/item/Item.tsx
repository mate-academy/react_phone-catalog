import React from 'react';
import styles from './Item.module.scss';

type Props = {
  children: React.ReactNode;
};

export const Item: React.FC<Props> = ({ children }) => {
  return <div className={styles.item}>{children}</div>;
};
