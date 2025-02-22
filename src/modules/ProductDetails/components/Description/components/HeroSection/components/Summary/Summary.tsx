/* eslint-disable max-len */
import React from 'react';
import styles from './Summary.module.scss';
import { FirstPart } from './components/FirstPart';
import { SecondPart } from './components/SecondPart';
import { ThirdPart } from './components/ThirdPart';

export const Summary: React.FC = () => {
  return (
    <div className={styles.summary}>
      <FirstPart />
      <SecondPart />
      <ThirdPart />
    </div>
  );
};
