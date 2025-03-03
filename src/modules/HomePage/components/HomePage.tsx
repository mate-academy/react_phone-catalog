import { useProducts } from '../../shared/context/ProductsContext';
import { Categories } from './Categories';
import { Footer } from './Footer';
import { Header } from './Header';
import { PicturesSlider } from './PicturesSlider';
import { ProductsSlider } from './ProductsSlider';

export const HomePage = () => {
  const { products } = useProducts();
  const newestProducts = products.sort((a, b) => b.year - a.year).slice(0, 10);
  const discountProducts = products
    .sort((a, b) => b.fullPrice - a.fullPrice)
    .slice(0, 10);

  return (
    <>
      <Header />
      <PicturesSlider />
      <ProductsSlider
        title="Brand new models"
        productsToShow={newestProducts}
        discount={false}
      />
      <Categories />
      <ProductsSlider
        title="Hot prices"
        productsToShow={discountProducts}
        discount={true}
      />
      <Footer />
    </>
  );
};
