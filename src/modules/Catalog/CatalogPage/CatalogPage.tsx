/* eslint-disable max-len */
import { CatalogInteraction } from '../CatalogInteraction';
import { PositionOnPage } from '../../shared/PositionOnPage/PositionOnPage';
import { Tabs } from '../Tabs/Tabs';
import { useDevices } from '../../../api';
import { ProductCardSkeleton } from '../../shared/ProductCardSkeleton/ProductCardSkeleton';

import styles from './CatalogPage.module.scss';
import listStyles from '../ProductsList/ProductsList.module.scss';
import { useParams } from 'react-router-dom';
import { ProductType } from '../../types';
import { getDevicesFromCategory } from '../../hooks/utilHooks';
import { useLanguage } from '../../../contexts/LanguageContext';
import { NotFoundPage } from '../../shared/NotFoundPage';

const SKELETON_COUNT = 8;
const validTypes = ['phones', 'tablets', 'accessories'];

export const CatalogPage = () => {
  const { devices, loading } = useDevices();
  const { type } = useParams<{ type: ProductType }>();
  const numberOfDevices = type ? getDevicesFromCategory(devices, type) : [];
  const { t } = useLanguage();

  if (type) {
    if (!validTypes.includes(type)) {
      return <NotFoundPage />;
    }
  }

  if (loading) {
    return (
      <div className={styles.catalogPage__Container}>
        <PositionOnPage />
        <div className={styles.catalogPage__Info}>
          <h1 className={styles.catalogPage__Title}>{type?.toUpperCase()}</h1>
          <h5 className={styles.catalogPage__ModelsInfo}>…</h5>
        </div>
        <CatalogInteraction />
        <div className={listStyles.productsList__Container}>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.catalogPage__Container}>
      <PositionOnPage />
      <div className={styles.catalogPage__Info}>
        <h1 className={styles.catalogPage__Title}>{type?.toUpperCase()}</h1>
        <h5 className={styles.catalogPage__ModelsInfo}>
          {numberOfDevices} {t('catalog.models')}
        </h5>
      </div>
      <CatalogInteraction />
      <Tabs allDevices={devices} />
    </div>
  );
};
