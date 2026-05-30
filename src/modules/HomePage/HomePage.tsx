import React, { useEffect, useRef } from 'react';
import { SectionWelcome } from './components/SectionWelcome';
import { SectionHotPrice } from './components/SectionHotPrice';

import styles from './styles.module.scss';
import { SectionCategories } from './components/SectionCategories';
import { SectionNewBrand } from './components/SectionNewBrand';

export const HomePage: React.FC = () => {

  return (
    <main className={styles.main}>
      <SectionWelcome />
      <SectionHotPrice />
      <SectionCategories />
      <SectionNewBrand />
    </main>
  );
};
