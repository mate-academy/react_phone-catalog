import React from 'react';
import { CategoriesList } from '../../components/CategoriesList/CategoriesList';
import { Carousel } from '../../components/Carousel/Carousel';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Product } from '../../types/Product';
import { SortType } from '../../types/SortType';
import './homePage.scss';

export type Props = {
  products: Product[],
  productsCounter: {
    phones: number,
    tablets: number,
    accessories: number,
  },
};

export const HomePage: React.FC<Props> = ({ products, productsCounter }) => {
  return (
    <>
      <section className="section">
        <h1 className="section__title">Welcome to my store!</h1>
        <Carousel />
      </section>
      <section className="section">
        <ProductsSlider
          products={products}
          title="Hot prices"
          sortBy={SortType.MaxDiscount}
        />
      </section>
      <section className="section">
        <h1 className="section__title">Shop by category</h1>
        <CategoriesList productsCounter={productsCounter} />
      </section>
      <section className="section">
        <ProductsSlider
          products={products}
          title="Brand new models"
          sortBy={SortType.Newest}
        />
      </section>
    </>
  );
};
