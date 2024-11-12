import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { ProductCard } from '@shared/components/ProductCard';

import { MainSlider } from './components/MainSlider';
import styles from './HomePage.module.scss';
import { MAIN_SLIDER_DATA } from './utils/constants';

export const HomePage = () => (
  <Box className={cn('container', styles.homePage)}>
    <Box className={styles.heroSection} variant="section">
      <Text variant="h1">Welcome to Nice Gadgets store!</Text>
      <MainSlider images={MAIN_SLIDER_DATA} />
    </Box>
    <Box>
      <Box style={{ width: 272 }}>
        <ProductCard />
      </Box>
    </Box>
  </Box>
);
