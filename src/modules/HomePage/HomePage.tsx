import { FC, useMemo } from 'react';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';
import { useGlobalState } from '../../context/store';
import { ProductsSlider } from '../shared/ProductsSlider/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { HomePageSkeleton } from './HomePageSkeleton';
import { useTranslation } from 'react-i18next';
import { InView } from 'react-intersection-observer';
import classNames from 'classnames';

export const HomePage: FC = () => {
  const { products, isLoading } = useGlobalState();
  const { t } = useTranslation();

  const newestPhones = useMemo(
    () =>
      products
        .filter(p => p.category === 'phones')
        .sort((a, b) => b.year - a.year),
    [products],
  );

  const discountPhones = useMemo(
    () =>
      products
        .filter(p => p.category === 'phones')
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price)),
    [products],
  );

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  const sections = [
    { key: 'slider', element: <PicturesSlider /> },
    {
      key: 'newest',
      element: (
        <ProductsSlider
          title={t('newModels')}
          products={newestPhones}
          priceType="regular"
        />
      ),
    },
    { key: 'categories', element: <ShopByCategory /> },
    {
      key: 'discounts',
      element: (
        <ProductsSlider
          title={t('hotPrices')}
          products={discountPhones}
          priceType="discount"
        />
      ),
    },
  ];

  return (
    <div className={styles.homeContent}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <h2 className={styles.homeTitle}>{t('homeTitle')}</h2>
      <div className={styles.homeBody}>
        {sections.map(({ key, element }) => (
          <InView key={key} rootMargin="75px 0px">
            {({ inView, ref }) => (
              <div
                ref={ref}
                className={classNames(styles.fadeSection, {
                  [styles.fadeSectionActive]: inView,
                })}
              >
                {element}
              </div>
            )}
          </InView>
        ))}
      </div>
    </div>
  );
};
