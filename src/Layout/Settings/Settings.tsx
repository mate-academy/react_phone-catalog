import React from 'react';

import styles from './Settings.module.scss';
import { LanguageSelector } from '../../components/LanguageSelector';
import { ThemeSelector } from '../../components/ThemeSelector';

export const Settings: React.FC = () => {
  return (
    <div className={styles.navigation__settings}>
      <LanguageSelector />
      <ThemeSelector />
    </div>
  );
};
