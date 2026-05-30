/* eslint-disable max-len */
import { useDevices } from '../../api';
import { getHotPrices, getNewDevices } from '../hooks/utilHooks';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './PicturesSlider';
import { ProductSlider } from './ProductSlider/ProductSlider';
import { ShopByCategory } from './ShopByCategory/ShopByCategory';
import { ProductCardSkeleton } from '../shared/ProductCardSkeleton/ProductCardSkeleton';
import { useLanguage } from '../../contexts/LanguageContext';
import listStyles from '../Catalog/ProductsList/ProductsList.module.scss';

const HOME_SKELETON_COUNT = 4;

export const HomePage = () => {
  const { devices: allDevices, loading } = useDevices();
  const { t } = useLanguage();
  const newDevies = getNewDevices(allDevices);
  const hotPrices = getHotPrices(allDevices);

  if (loading) {
    return (
      <div className={styles.homePage__Container}>
        <div className={styles.homePage__SkeletonTitle} />
        <PicturesSlider />
        <div>
          <div className={styles.homePage__SkeletonSectionTitle} />
          <div
            className={listStyles.productsList__Container}
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
          >
            {Array.from({ length: HOME_SKELETON_COUNT }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.homePage__Container}>
      <h1 className={styles.homePage__Title}>{t('home.title')}</h1>
      <PicturesSlider />
      <ProductSlider
        devicesForDisplay={newDevies}
        title={t('home.brandNew')}
        type="full"
      />
      <ShopByCategory devicesFromAPI={allDevices} />
      <ProductSlider
        devicesForDisplay={hotPrices}
        title={t('home.hotPrices')}
        type="full"
      />
    </div>
  );
};
