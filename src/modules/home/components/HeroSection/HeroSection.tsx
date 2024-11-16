import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';

import { MAIN_SLIDER_DATA } from '../../utils/constants';
import { HeroSlider } from '../HeroSlider';
import styles from './HeroSection.module.scss';

export const HeroSection = () => (
  <Box className={cn('container', styles.hero)} variant="section">
    <Text variant="h1" className={styles.title}>
      Welcome to Nice Gadgets store!
    </Text>

    <HeroSlider className={styles.slider} images={MAIN_SLIDER_DATA} />
  </Box>
);
