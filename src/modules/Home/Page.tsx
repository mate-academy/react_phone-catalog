import React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './HomePage.module.scss';

import { CategoryLinks } from './components/CategoryLinks';
import { HotPrices } from './components/HotPrices';
import { HeroBanner } from './components/HeroBanner';
import { Spinner } from '../../components/Spinner';
import { NewModels } from './components/NewModels';

export const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('title.productCatalog')}</h1>

      <HeroBanner />
      <NewModels />
      <CategoryLinks />
      <HotPrices />
    </div>
  );
};
