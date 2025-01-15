import React from 'react';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  return (
    <div className={styles.themeToggle}>
      <input type="checkbox" id="theme-toggle" className={styles.toggleInput} />
      <label htmlFor="theme-toggle" className={styles.toggleLabel}>
        <span className={styles.toggleCircle}></span> {/* Кружечок */}
      </label>
    </div>
  );
};
