import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../ProductsContext';

import './shopByCategory.scss';

export const ShopByCategory = () => {
  const products = useContext(ProductsContext);
  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablets');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  return (
    <section className="shop-by-category">
      <h1 className="title rainbow-text shop-by-category__title">
        Shop by category
      </h1>

      <div
        className="shop-by-category__content"
        data-cy="categoryLinksContainer"
      >
        <div className="shop-by-category__phones">
          <Link to="phones">
            <img
              src="new/img/category/phones.jpg"
              alt="category-phones"
              className="shop-by-category__phones-img"
            />
            <div className="shop-by-category__phones-title">Mobile phones</div>
            <div className="shop-by-category__phones-description">
              {phones.length}
              {' '}
              models
            </div>
          </Link>
        </div>

        <div className="shop-by-category__tablets">
          <Link to="/tablets">
            <img
              className="shop-by-category__tablets-img"
              src="new/img/category/tablets.jpg"
              alt="category-tablets"
            />
            <div className="shop-by-category__tablets-title">Tablets</div>
            <div className="shop-by-category__tablets-description">
              {tablets.length}
              {' '}
              models
            </div>
          </Link>

        </div>
        <div className="shop-by-category__accessories">
          <Link to="accessories">
            <img
              className="shop-by-category__accessories-img"
              src="new/img/category/accessories.jpg"
              alt="category-accessories"
            />
            <div className="shop-by-category__accessories-title">
              Accessories
            </div>
            <div className="shop-by-category__accessories-description">
              {accessories.length}
              {' '}
              models
            </div>

          </Link>
        </div>
      </div>
    </section>
  );
};
