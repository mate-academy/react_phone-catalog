import { FunctionComponent, useEffect } from 'react';

// Types
import { Product } from '../../types/Product';

// Components
import { Banner } from '../../components/Banner';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from '../../components/Categories';

export const HomePage: FunctionComponent = () => {
  const products = JSON.parse(localStorage.getItem('products') || '[]');

  const hotPriceProducts = products
    .filter((product: Product) => product.discount)
    .sort((firstProduct: Product, secondProduct: Product) => {
      return secondProduct.discountSum - firstProduct.discountSum;
    });

  const brandNewProducts = products
    .filter((product: Product) => !product.discount)
    .sort((firstProduct: Product, secondProduct: Product) => {
      return secondProduct.price - firstProduct.price;
    });

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <Banner />

      <ProductsSlider
        title="Hot prices"
        products={hotPriceProducts}
      />

      <Categories />

      <ProductsSlider
        title="Brand new models"
        products={brandNewProducts}
      />
    </>
  );
};
