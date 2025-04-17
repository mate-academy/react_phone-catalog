import styles from './HomeHeroSection.module.scss';
import React from 'react';

import { SwiperBaner } from '@/components/UI/SwiperBaner';

export const HomeHeroSection: React.FC = () => {
  return (
    <>
      <h1 className={styles.header__title}>Welcome to Nice Gadgets store!</h1>
      <SwiperBaner />
    </>
  );
};
