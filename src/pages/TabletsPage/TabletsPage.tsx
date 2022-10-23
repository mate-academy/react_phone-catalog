import classNames from 'classnames';
import React, { useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { ProductsContext } from '../../helpers/ProductsContext';

export const TabletsPage: React.FC = () => {
  const { products } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="category-page">
      <div
        className={classNames('category-page__status status', {
          'status--is-hidden': query,
        })}
      >
        <Link
          to="/"
          className="status__home-logo"
        >
          <img
            src="img/icons/home.svg"
            alt=""
          />
        </Link>

        <img
          src="img/icons/next-arrow-disabled.svg"
          alt=""
          className="status__arrow"
        />

        <p className="status__title">Tablets</p>
      </div>

      <section className="products-list">
        <div
          className={classNames('section__title', {
            'section__title--is-hidden': query,
          })}
        >
          Tablets
        </div>

        <ProductsList
          products={products}
          productType="tablet"
        />
      </section>
    </div>
  );
};
