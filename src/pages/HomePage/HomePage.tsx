import React from 'react';
import { CategoriesList } from '../../components/CategoriesList/CategoriesList';
import { Carousel } from '../../components/Carousel/Carousel';
import { Product } from '../../types/Product';
import { SortType } from '../../types/SortType';
import './homePage.scss';
import { SlickSlider } from '../../components/SlickSlider/SlickSlider';

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
    <div className="page__home">
      <section className="section">
        <h1 className="section__title">Welcome to my store!</h1>
        <Carousel />
      </section>
      <section className="section">
        <h1 className="section__title">Hot prices</h1>
        <SlickSlider
          products={products}
          sortBy={SortType.MaxDiscount}
        />
      </section>
      <section className="section">
        <h1 className="section__title">Shop by category</h1>
        <CategoriesList productsCounter={productsCounter} />
      </section>
      <section className="section">
        <h1 className="section__title">Brand new models</h1>
        <SlickSlider
          products={products}
          sortBy={SortType.Newest}
        />
      </section>
    </div>
  );
};
