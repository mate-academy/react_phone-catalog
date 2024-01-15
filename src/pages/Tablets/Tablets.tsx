import { useContext } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import '../Pages.scss';

import { PageContext } from '../../utils/GlobalContext';
import { ProductsPage } from '../../components/ProductsPage';

export const Tablets = () => {
  const {
    products,
  } = useContext(PageContext);
  const tablets = products
    .filter(product => product.category === 'tablets');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const location = useLocation().pathname;

  const filteredTablets = tablets
    .filter(tablet => {
      if (location === '/tablets') {
        return tablet.name.toLowerCase()
          .includes(query.trim().toLowerCase());
      }

      return tablet;
    });

  return (
    <div className="products-page">
      {!query
        ? (
          <>
            <div className="products-page__link-way">
              <Link to="/home" className="products-page__home-link" />
              <div className="products-page__way-arrow" />
              <Link
                to="/tablets"
                className="products-page__text-link"
              >
                Tablets
              </Link>
            </div>

            <h1 className="products-page__title">Tablets</h1>

            <p className="products-page__count">{`${tablets.length} models`}</p>
          </>
        ) : (
          <p className="products-page__count products-page__count--results">{`${filteredTablets.length} results`}</p>
        )}

      <ProductsPage products={filteredTablets} />

    </div>
  );
};
