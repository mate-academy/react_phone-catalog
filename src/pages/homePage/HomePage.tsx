/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../helpers/DataContext';
import { SortProducts } from '../../helpers/sortFunctions';
import { ProductSlider } from '../../components/ProductSlider';
import { Banner } from '../../components/Banner/Banner';

import './HomePage.scss';

export const HomePage: React.FC = () => {
  const { products } = useData();

  if (!products) {
    return <span>kek</span>;
  }

  const newModels = SortProducts(products, 'age').slice(0, 8);
  const priceModels = SortProducts(products, 'price').slice(0, 8);

  return (
    <div className="home">
      <div className="home__section home__banner">
        <Banner />
      </div>
      <div className="home__section hotPrice">
        <ProductSlider
          filteredSuggestedProducts={newModels}
          title="Hot prices"
        />
      </div>
      <div className="home__section categories">
        <h2 className="text text--h1">Shop by category</h2>
        <div className="categories__main">
          <div className="categories__block">
            <Link
              to="/phones"
              className="categories__image-container"
            >
              <div className="categories__image categories__image-1" />
            </Link>
            <h3 className="text--h3">Mobile phones</h3>
            <span className="text text--small text--gray">{`${products.length} models`}</span>
          </div>

          <div className="categories__block">
            <Link
              to="/tablets"
              className="categories__image-container"
            >
              <div className="categories__image categories__image-2" />
            </Link>
            <h3 className="text--h3">Tablets</h3>
            <span className="text text--small text--gray">0 models</span>
          </div>

          <div className="categories__block">
            <Link
              to="/accessories"
              className="categories__image-container"
            >
              <div className="categories__image categories__image-3" />
            </Link>
            <h3 className="text--h3">Accessories</h3>
            <span className="text text--small text--gray">0 models</span>
          </div>

        </div>
      </div>
      <div className="home__section new">
        <ProductSlider
          filteredSuggestedProducts={priceModels}
          title="Brand new models"
        />
      </div>
    </div>
  );
};
