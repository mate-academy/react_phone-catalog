import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../services/productsApi';
import { selectSortedProducts } from '../selectors/productsSelectors';
import { ProductsSlider } from '../components/ProductsSlider';
import { PicturesSlider } from '../components/PicturesSlider';
import { Categories } from '../components/Categories';
import { FC } from 'react';
import { Sort } from '../types';

export const HomePage: FC = () => {
  useGetProductsQuery();
  const brandNewProducts = useSelector(selectSortedProducts(Sort.Age));
  const hotPricesProducts = useSelector(selectSortedProducts(Sort.Price));

  return (
    <>
      <h1 className="mt-[24px] text-h1 sm:mt-[32px] xl:mt-[56px]">
        Welcome to Nice Gadgets store!
      </h1>

      <PicturesSlider
        pictures={[
          '/images/banners/phones.webp',
          '/images/banners/tablets.webp',
          '/images/banners/accessories.webp',
        ]}
        className="mt-[24px] sm:mt-[32px] xl:mt-[56px]"
      />

      <ProductsSlider
        title="Brand new models"
        products={brandNewProducts}
        className="mt-[56px] sm:mt-[64px] xl:mt-[80px]"
      />

      <section className="mt-[56px] sm:mt-[64px] xl:mt-[80px]">
        <h2 className="text-h2 text-primary">Shop by category</h2>

        <Categories />
      </section>

      <ProductsSlider
        title="Hot prices"
        products={hotPricesProducts}
        className="mt-[56px] sm:mt-[64px] xl:mt-[80px]"
      />
    </>
  );
};
