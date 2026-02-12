import React from 'react';

import styles from './HomePage.module.scss';
import { MainLayout } from '../../layout/MainLayout';
import { SectionWelcome } from './components/SectionWelcome';
import { SectionNewModels } from './components/SectionNewModels';
import { SectionCategory } from './components/SectionCategory';
import { SectionHotPrices } from './components/SectionHotPrices';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../shared/components/loader';

export const HomePage: React.FC = () => {
  const { products, loading } = useAppSelector(s => s.products);

  return (
    <MainLayout>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.mainContent}>
          <SectionWelcome />
          <SectionNewModels products={products} />
          <SectionCategory products={products} />
          <SectionHotPrices products={products} />
        </div>
      )}
    </MainLayout>
  );
};
