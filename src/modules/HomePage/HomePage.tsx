import React from 'react';

import styles from './HomePage.module.scss';
import { MainLayout } from '../../layout/MainLayout';
import { SectionWelcome } from './components/SectionWelcome';
import { SectionNewModels } from './components/SectionNewModels';
import { SectionCategory } from './components/SectionCategory';
import { SectionHotPrices } from './components/SectionHotPrices';

export const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className={styles.mainContent}>
        <SectionWelcome />
        <SectionNewModels />
        <SectionCategory />
        <SectionHotPrices />
      </div>
    </MainLayout>
  );
};
