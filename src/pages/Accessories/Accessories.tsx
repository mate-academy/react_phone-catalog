import { useContext } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import '../Pages.scss';

import { PageContext } from '../../utils/GlobalContext';
import { ProductsPage } from '../../components/ProductsPage';

export const Accessories = () => {
  const {
    products,
  } = useContext(PageContext);
  const accessories = products
    .filter(product => product.category === 'accessories');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const location = useLocation().pathname;

  const filteredAccessories = accessories
    .filter(accessory => {
      if (location === '/accessories') {
        return accessory.name.toLowerCase()
          .includes(query.trim().toLowerCase());
      }

      return accessory;
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
                to="/accessories"
                className="products-page__text-link"
              >
                Accessories
              </Link>
            </div>

            <h1 className="products-page__title">Accessories</h1>

            <p className="products-page__count">{`${accessories.length} models`}</p>
          </>
        ) : (
          <p className="products-page__count products-page__count--results">{`${filteredAccessories.length} results`}</p>
        )}

      <ProductsPage products={filteredAccessories} />

    </div>
  );
};
