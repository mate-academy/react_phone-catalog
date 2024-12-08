import { Box } from '@shared/base/Box';

import { BrandNewSection } from './components/BrandNewSection';
import { CategoriesSection } from './components/CategoriesSection';
import { HeroSection } from './components/HeroSection';
import { HotPricesSection } from './components/HotPricesSection';
import styles from './HomePage.module.scss';

export const HomePage = () => (
  <Box className={styles.homePage}>
    <HeroSection />

    <BrandNewSection />

    <CategoriesSection />

    <HotPricesSection />
  </Box>
);
