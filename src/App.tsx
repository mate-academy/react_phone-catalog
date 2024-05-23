import React from 'react';
import styles from './App.module.scss';
import { Header } from './components/Header';

export const App = () => (
  <div className={styles.app}>
    <Header />
  </div>
);
