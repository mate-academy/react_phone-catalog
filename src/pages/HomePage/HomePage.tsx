import type { FC } from 'react';

import { WelcomeSection } from '../../components/Sections/WelcomeSection';
import { BrandNewModelsSection } from '../../components/Sections/BrandNewModelsSection';
import { ShopByCategorySection } from '../../components/Sections/ShopByCategorySection';
import { HotPricesSection } from '../../components/Sections/HotPricesSection';

import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  return (
    <div className={styles.home}>
      <WelcomeSection />

      <div className={styles.homeContent}>
        <BrandNewModelsSection />
        <ShopByCategorySection />
        <HotPricesSection />
      </div>
    </div>
  );
};
