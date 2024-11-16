import { Box } from '@shared/base/Box';

import { BrandNewSection } from './components/BrandNewSection';
import { HeroSection } from './components/HeroSection';
import styles from './HomePage.module.scss';

export const HomePage = () => (
  <Box className={styles.homePage}>
    <HeroSection />

    <BrandNewSection />
  </Box>
);
