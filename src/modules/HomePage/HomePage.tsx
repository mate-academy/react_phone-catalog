import React from 'react';
import { SectionWelcome } from './components/SectionWelcome';
import { SectionHotPrice } from './components/SectionHotPrice';

import styles from './styles.module.scss';
import { SectionCategories } from './components/SectionCategories';

export const HomePage: React.FC = () => {
  return (
    <main className={styles.main}>
      <SectionWelcome />
      <SectionHotPrice />
      <SectionCategories />
    </main>
  );
};
