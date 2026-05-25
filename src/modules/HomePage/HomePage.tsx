import './HomePage.scss';
import React from 'react';
import { BannerSlider } from './components/BannerSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { ShopCategory } from './components/ShopCategory';
import { Product } from '../../types/Product';
import { Loader } from '../../components/shared/Loader';

type Props = {
  products: Product[];
  loading: boolean;
  error: string;
};

export const HomePage: React.FC<Props> = ({ products, loading, error }) => {
  function countCategoriesCount() {
    const categoriesCounts = {
      phones: products.filter(p => p.category === 'phones').length,
      tablets: products.filter(p => p.category === 'tablets').length,
      accessories: products.filter(p => p.category === 'accessories').length,
    };

    return categoriesCounts;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <section className="page">
          <div className="page__content">
            <h1 id="h1" className="page__header">
              Welcome to Nice Gadgets store!
            </h1>
            <BannerSlider />
            <ProductsSlider
              header={'Brand new models'}
              oldPrice={false}
              products={products
                .sort((elem1, elem2) => elem1.year - elem2.year)
                .slice(0, 10)}
            />
            <ShopCategory counts={countCategoriesCount()} />
            <ProductsSlider
              header={'Hot prices'}
              oldPrice={true}
              products={products
                .sort((elem1, elem2) => elem1.price - elem2.price)
                .slice(0, 10)}
            />
          </div>
        </section>
      )}
    </>
  );
};
