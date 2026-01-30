import React from 'react';
import { PicturesSlider } from '../PicturesSlider/PicturesSlider';
import { BaseSlider } from '../BaseSlider';
import { Categories } from '../Categories';
// eslint-disable-next-line max-len
import { useProducts } from '../../../shared/components/Context/ProductsContext';
import { sortItems } from '../../../ItemsPage/components/ItemsPage/ItemsPage';

// TODO Static data into another foldre (mock data)
//#region data

// #endregion

export const HomePage: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className="home">
      <main className="home__main main container">
        <div className="main__welcome">
          <h1 className="main__title" id="pageTop">
            Welcome to Nice Gadgets Store!
          </h1>
          <PicturesSlider />
        </div>
        <BaseSlider
          products={sortItems(products.phones, 'newest')}
          title="Brand new phones"
        />
        <Categories />
        <BaseSlider
          products={sortItems(products.phones, 'discount')}
          title="Hot Prices"
        />
      </main>
    </div>
  );
};
