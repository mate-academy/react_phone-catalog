import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../services/productsApi';
import { selectPreparedProducts } from '../selectors/productsSelectors';
import { ProductsSlider } from '../components/ProductsSlider';
import { PicturesSlider } from '../components/PicturesSlider';
import { Categories } from '../components/Categories';
import type { FC } from 'react';
import { Sort } from '../types';
import type { RootState } from '../store';

export const HomePage: FC = () => {
  useGetProductsQuery();

  const brandNewProducts = useSelector((state: RootState) =>
    selectPreparedProducts(state, null, Sort.Age),
  );

  const hotPricesProducts = useSelector((state: RootState) =>
    selectPreparedProducts(state, null, Sort.Price),
  );

  return (
    <>
      <h1 className="mt-6 text-h1 sm:mt-8 xl:mt-14">
        Welcome to Nice Gadgets store!
      </h1>

      <PicturesSlider
        pictures={[
          '/images/banners/phones.webp',
          '/images/banners/tablets.webp',
          '/images/banners/accessories.webp',
        ]}
        className="mt-6 sm:mt-8 xl:mt-14"
      />

      <ProductsSlider
        title="Brand new models"
        products={brandNewProducts}
        className="mt-14 sm:mt-16 xl:mt-20"
      />

      <section className="mt-14 sm:mt-16 xl:mt-20">
        <h2 className="text-h2 text-primary">Shop by category</h2>

        <Categories />
      </section>

      <ProductsSlider
        title="Hot prices"
        products={hotPricesProducts}
        className="mt-14 sm:mt-16 xl:mt-20"
      />
    </>
  );
};
