import React from 'react';
import { Product } from '../../types/Product';
import HP from './HomePage.module.scss';
import { PictureSlider } from './components/PictureSlider';
import { ProductCards } from '../Shared/Product cards';
import { Categories } from './components/Categories';
import { Loader } from '../../components/Loader';

type Props = {
  products: Product[];
  loading: boolean;
};

export const HomePage: React.FC<Props> = ({ products, loading }) => {
  const newestProducts = products.sort(
    (product1, product2) => product2.year - product1.year,
  );

  return (
    <div className={HP.home}>
      <div className="container">
        <div className={HP.home__content}>
          <h1 className={HP['home__sr-only']}>Product Catalog</h1>
          <h2 className={HP.home__title}>Welcome to Nice Gadgets store!+++</h2>
          <div className={HP.home__mainContent}>
            <PictureSlider />

            {loading ? (
              <Loader />
            ) : (
              <ProductCards
                title="Brand new models"
                products={newestProducts}
                filterMode="only2022"
              />
            )}

            <Categories products={newestProducts} />

            {loading ? (
              <Loader />
            ) : (
              <ProductCards
                title="Hot prices"
                products={newestProducts}
                filterMode="exclude2022"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
