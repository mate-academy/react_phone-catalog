import React from 'react';
import { Banner } from '../../Components/Banner/Banner';
import { Category } from '../../Components/Category/Category';
import { Footer } from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header';
import { ProductsSlider } from '../../Components/ProductsSlider/ProductsSlider';
import { Product } from '../../types/Product';

type Props = {
  products: Product[],
};

export const Home:React.FC<Props> = ({ products }) => {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <ProductsSlider
          products={
            [...products].filter(product => product.discount !== 0)
              .sort((a, b) => b.sumDiscount - a.sumDiscount)
          }
          title="Hot prices"
        />
        <Category products={products} />
        <ProductsSlider
          products={
            [...products].filter(product => product.discount === 0)
              .sort((a, b) => b.price - a.price)
          }
          title="Brand new models"
        />
      </main>
      <Footer />
    </>
  );
};
