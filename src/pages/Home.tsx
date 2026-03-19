import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../services/productsApi';
import { selectPreparedProducts } from '../selectors/productsSelectors';
import { ProductSlider } from '../components/Slider/Product';
import { BannerSlider } from '../components/Slider/Banner';
import { Categories } from '../components/Categories';
import { BANNERS, CATEGORIES } from '../constants';
import type { FC } from 'react';
import type { RootState } from '../store';
import { Sort } from '../types';
import { useTranslations } from 'use-intl';

export const HomePage: FC = () => {
  useGetProductsQuery();
  const t = useTranslations('home');

  const { visibleProducts: brandNewProducts } = useSelector(
    (state: RootState) =>
      selectPreparedProducts(state, null, Sort.Age, Infinity, 1, ''),
  );

  const { visibleProducts: hotPricesProducts } = useSelector(
    (state: RootState) =>
      selectPreparedProducts(state, null, Sort.Discount, Infinity, 1, ''),
  );

  return (
    <div className="">
      <h1 className="sr-only">{t('srTitle')}</h1>
      <span className="text-h1 text-primary dark:text-d-white mt-6 inline-block sm:mt-8 xl:mt-14">
        {t('welcome')}
      </span>

      <BannerSlider
        banners={BANNERS}
        className="-mx-(--container-px-xs) mt-6 sm:mx-0 sm:mt-8 xl:mt-14"
      />

      {brandNewProducts && brandNewProducts.length > 0 && (
        <ProductSlider
          title={t('brandNew')}
          products={brandNewProducts}
          className="mt-14 sm:mt-16 xl:mt-20"
        />
      )}

      <Categories categories={CATEGORIES} className="mt-14 sm:mt-16 xl:mt-20" />

      {hotPricesProducts && hotPricesProducts.length > 0 && (
        <ProductSlider
          title={t('hotPrices')}
          products={hotPricesProducts}
          className="mt-14 sm:mt-16 xl:mt-20"
        />
      )}
    </div>
  );
};
