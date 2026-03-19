import { useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';
import { useGetProductsQuery } from '../ProductsPage/services/productsApi';
import { selectPreparedProducts } from '../ProductsPage/selectors/productsSelectors';
import { ProductsSlider } from '../shared/components/Slider/ProductsSlider';
import { BannersSlider } from './components/BannersSlider';
import { Categories } from './components/Categories';
import { BANNERS } from './constants/banners';
import { CATEGORIES } from './constants/categories';
import type { FC } from 'react';
import type { RootState } from '../../store';
import { Sort } from '../../types';

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

      <BannersSlider
        banners={BANNERS}
        className="-mx-(--container-px-xs) mt-6 sm:mx-0 sm:mt-8 xl:mt-14"
      />

      {brandNewProducts && brandNewProducts.length > 0 && (
        <ProductsSlider
          title={t('brandNew')}
          products={brandNewProducts}
          className="mt-14 sm:mt-16 xl:mt-20"
        />
      )}

      <Categories categories={CATEGORIES} className="mt-14 sm:mt-16 xl:mt-20" />

      {hotPricesProducts && hotPricesProducts.length > 0 && (
        <ProductsSlider
          title={t('hotPrices')}
          products={hotPricesProducts}
          className="mt-14 sm:mt-16 xl:mt-20"
        />
      )}
    </div>
  );
};
