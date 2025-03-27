// src/components/Button/Button.tsx
import React from 'react';
import styles from './SecondaryTitle.module.scss';
import '../../styles/App.scss';

interface SecondaryTitleProps {
  children: React.ReactNode;
}

const SecondaryTitle: React.FC<SecondaryTitleProps> = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default SecondaryTitle;
