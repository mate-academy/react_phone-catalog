import React from 'react';
import styles from './SectionTitle.module.scss';

interface Props {
  children: React.ReactNode;
}

export const SectionTitle: React.FC<Props> = ({ children }) => {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
};
