import styles from './HomeHeroSection.module.scss';
import React from 'react';

import { SwiperBaner } from '@/components/UI/SwiperBaner';
import { useTranslation } from 'react-i18next';

export const HomeHeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className={styles.header__title}>{t(`home.welcome`)}</h1>
      <SwiperBaner />
    </>
  );
};
