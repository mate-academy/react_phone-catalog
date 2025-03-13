/* eslint-disable import/no-extraneous-dependencies */
import { useTranslation } from 'react-i18next';
import { useProducts } from '../../shared/context/ProductsContext';
import { Categories } from './Categories';
import { Footer } from './Footer';
import { Header } from './Header';
import { PicturesSlider } from './PicturesSlider';
import { ProductsSlider } from './ProductsSlider';

export const HomePage = () => {
  const { products } = useProducts();
  const { t } = useTranslation();
  const newestProducts = products.sort((a, b) => b.year - a.year).slice(0, 10);
  const discountProducts = products
    .sort((a, b) => b.fullPrice - a.fullPrice)
    .slice(0, 10);

  return (
    <>
      <Header />
      <PicturesSlider />
      <ProductsSlider
        title={t('newBrandMessage')}
        productsToShow={newestProducts}
        discount={false}
      />
      <Categories />
      <ProductsSlider
        title={t('hotPricesMessage')}
        productsToShow={discountProducts}
        discount={true}
      />
      <Footer />
    </>
  );
};
