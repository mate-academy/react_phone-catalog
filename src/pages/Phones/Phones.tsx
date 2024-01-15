import { useContext } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import '../Pages.scss';

import { PageContext } from '../../utils/GlobalContext';
import { ProductsPage } from '../../components/ProductsPage';

export const Phones = () => {
  const {
    products,
  } = useContext(PageContext);
  const phones = products
    .filter(product => product.category === 'phones');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const location = useLocation().pathname;

  const filteredPhones = phones
    .filter(phone => {
      if (location === '/phones') {
        return phone.name.toLowerCase()
          .includes(query.trim().toLowerCase());
      }

      return phone;
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
                to="/phones"
                className="products-page__text-link"
              >
                Phones
              </Link>
            </div>

            <h1 className="products-page__title">Mobile phones</h1>

            <p className="products-page__count">{`${phones.length} models`}</p>
          </>
        ) : (
          <p className="products-page__count products-page__count--results">{`${filteredPhones.length} results`}</p>
        )}

      <ProductsPage products={filteredPhones} />
    </div>
  );
};
