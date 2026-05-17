import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.scss';
import { Banner } from '@components/ui/Banner/Banner';
import { ProductsSlider } from './components/ProductsSlider';
import { CategorySection } from './components/CategorySection';
import { Loader } from '@components/ui/Loader/Loader';
import {
  getAccessories,
  getPhones,
  getProducts,
  getTablets,
} from '@api/products';
import { Product } from '@/types/Product';
import { sortByBestPrice, sortByNewest } from '@utils/productFilters';
import { RevealWrapper } from '@utils/RevealWrapper.tsx';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPhones(), getTablets(), getAccessories(), getProducts()])
      .then(([phonesData, tabletsData, accessoriesData, productsData]) => {
        setPhones(phonesData);
        setTablets(tabletsData);
        setAccessories(accessoriesData);
        setProducts(productsData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <main className={styles.home}>
        <div className={styles['loader-wrapper']}>
          <Loader />
        </div>
      </main>
    );
  }

  const newestProducts = sortByNewest(products).slice(0, 12);
  const hotPriceProducts = sortByBestPrice([
    ...phones,
    ...tablets,
    ...accessories,
  ]).slice(0, 12);

  return (
    <main className={styles.home}>
      <div className={styles.container}>
        <RevealWrapper threshold={0.1}>
          <section className={styles.hero}>
            <h1 className={styles['hero__title']}>{t('home.title')}</h1>
            <Banner />
          </section>
        </RevealWrapper>

        <RevealWrapper>
          <ProductsSlider
            title={t('home.new_models')}
            products={newestProducts}
          />
        </RevealWrapper>

        <RevealWrapper>
          <CategorySection
            phonesCount={phones.length}
            tabletsCount={tablets.length}
            accessoriesCount={accessories.length}
          />
        </RevealWrapper>

        <RevealWrapper>
          <ProductsSlider
            title={t('home.hot_prices')}
            products={hotPriceProducts}
          />
        </RevealWrapper>
      </div>
    </main>
  );
};
