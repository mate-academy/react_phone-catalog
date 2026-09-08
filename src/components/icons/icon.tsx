import React from 'react';
import styles from './icon.module.scss';

type Props = {
  icon: {
    title: string;
    path: string;
  };
};

export const Icon: React.FC<Props> = ({ icon }) => (
  <img src={icon.path} alt={icon.title} className={styles.icon} />
);
