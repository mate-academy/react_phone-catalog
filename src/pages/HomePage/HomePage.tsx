import './HomePage.scss';
import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { Carousel } from '../../components/Carousel/Carousel';
import { ProductSlider } from '../../components/ProductsSlider/ProductsSlider';

import { Product } from '../../types/Product';
import { calculateDiscount } from '../../helpers/calculateDiscount';

export const HomePage = () => {
  const products = useOutletContext<Product[]>();

  const hotPriceProducts = useMemo(() => {
    return products.filter(product => product.discount !== 0)
      .sort((a, b) => calculateDiscount(a) - calculateDiscount(b));
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return products.filter(product => !product.discount)
      .sort((a, b) => b.price - a.price);
  }, [products]);

  return (
    <div className="HomePage container">
      <section className="HomePage__carousel-container">
        <Carousel />
      </section>

      <section className="section">
        <h1 className="section__title">
          Hot prices
        </h1>

        <ProductSlider
          products={hotPriceProducts}
        />
      </section>

      <section className="HomePage__shop-by-category section">
        <h1 className="section__title">
          Shop by category
        </h1>

        <ul
          className="HomePage__shop-by-category-container"
          data-cy="categoryLinksContainer"
        >
          <li>
            <Link
              to="/phones"
              className="HomePage__shop-by-category-link"
            >
              <h3>
                Mobile phones
              </h3>
            </Link>

            <p>
              95 models
            </p>
          </li>
          <li>
            <Link
              to="/tablets"
              className="HomePage__shop-by-category-link"
            >
              <h3>
                Tablets
              </h3>
            </Link>

            <p>
              24 models
            </p>
          </li>
          <li>
            <Link
              to="/accessories"
              className="HomePage__shop-by-category-link"
            >
              <h3>
                Accessories
              </h3>
            </Link>

            <p>
              100 models
            </p>
          </li>
        </ul>
      </section>

      <section className="HomePage__brand-new section">
        <h1 className="section__title">
          Brand new models
        </h1>

        <ProductSlider
          products={brandNewProducts}
        />
      </section>
    </div>
  );
};
