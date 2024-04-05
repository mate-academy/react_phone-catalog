import React from 'react';
import { ProductSlider } from '../ProductSlider/ProductSlider';

import allProducts from '../../api/products.json';
import { Link } from 'react-router-dom';
import { HomePageHeader } from '../HomePageHeader';

export const HomePage: React.FC = () => {
  const newModels = [...allProducts]
    .filter(product => product.year >= 2022)
    .sort((product1, product2) => product2.price - product1.price);

  const hotPriceModels = [...allProducts].filter(
    product => product.fullPrice / product.price - 1 > 0.1,
  );

  const allPhonesCounts = [...allProducts].filter(
    product => product.category === 'phones',
  ).length;

  const allTabletsCounts = [...allProducts].filter(
    product => product.category === 'tablets',
  ).length;

  const allAccessoriesCounts = [...allProducts].filter(
    product => product.category === 'accessories',
  ).length;

  return (
    <>
      <h1 className="page__main-title">Product Catalog</h1>
      <HomePageHeader />

      <main className="page__main">
        <div className="page__container">
          <ProductSlider title="Brand new models" models={newModels} />

          <section className="page__section category">
            <h2 className="page__title category__title">Shop by category</h2>

            <ul className="category__list">
              <li className="category__item">
                <Link to="/phones">
                  <img
                    className="category__image"
                    src="img/categories/phones.jpg"
                    alt="category"
                  />
                </Link>

                <Link to="/phones" className="category__name">
                  Mobile phones
                </Link>
                <p className="category__count-items">{`${allPhonesCounts} models`}</p>
              </li>
              <li className="category__item">
                <Link to="/tablets">
                  <img
                    className="category__image"
                    src="img/categories/tablets.jpg"
                    alt="category"
                  />
                </Link>
                <Link to="/tablets" className="category__name">
                  Tablets
                </Link>
                <p className="category__count-items">{`${allTabletsCounts} models`}</p>
              </li>
              <li className="category__item">
                <Link to="/accessories">
                  <img
                    className="category__image"
                    src="img/categories/accessories.jpg"
                    alt="category"
                  />
                </Link>
                <Link to="/accessories" className="category__name">
                  Accessories
                </Link>
                <p className="category__count-items">{`${allAccessoriesCounts} models`}</p>
              </li>
            </ul>
          </section>

          <ProductSlider title="Hot prices" models={hotPriceModels} />
        </div>
      </main>
    </>
  );
};
