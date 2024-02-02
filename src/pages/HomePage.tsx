import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

import '../styles/HomePage.scss';
import { ProductsSlider } from '../components/ProductsSlider';

export const HomePage: React.FC = () => {
  const { products } = useContext(GlobalContext);

  const hotPricesProducts = products.sort((product1, product2) => (
    product1.price - product2.price
  ));

  return (
    <main className="HomePage">
      <h1 style={{ display: 'none' }}>Home</h1>

      <section className="HomePage-section">
        <div className="HomePage-section__top">
          <h2 className="HomePage-section__title">
            Slider
          </h2>

          {/* <div className="HomePage-section__slider">
          </div> */}
        </div>

        <div className="HomePage-section__cards">
          {/* <div className="Card"></div> */}
        </div>
      </section>

      <ProductsSlider products={hotPricesProducts} />

      <section className="HomePage-section">
        <div className="HomePage-section__top">
          <h2 className="HomePage-section__title">
            Shop by category
          </h2>

          {/* <div className="HomePage-section__slider">
          </div> */}
        </div>

        <div className="HomePage-section__cards">
          {/* <div className="Card"></div> */}
        </div>
      </section>

      <section className="HomePage-section">
        <div className="HomePage-section__top">
          <h2 className="HomePage-section__title">
            Brand new models
          </h2>

          {/* <div className="HomePage-section__slider">
          </div> */}
        </div>

        <div className="HomePage-section__cards">
          {/* <div className="Card"></div> */}
        </div>
      </section>

    </main>
  );
};
