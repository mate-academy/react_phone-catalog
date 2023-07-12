import React from 'react';
import {
  Link, Outlet, useParams, useSearchParams,
} from 'react-router-dom';
import useDebounce from '../helpers/useDebonce';

type Props = {
  category: string;
};

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const { selectedProductId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const appliedQury = useDebounce(query, 500);

  return (
    <section className="App__products-page products-page">
      <div className="products-page__container _container">
        {appliedQury === '' && (
          <div className="page-navigation" data-cy="breadCrumbs">
            <Link to="/" className="page-navigation__home-link" />
            <Link
              to={`/${category}`}
              className="page-navigation__current-page-link"
              style={{
                pointerEvents: `${selectedProductId === '' ? 'none' : 'initial'}`,
              }}
            >
              {category[0].toLocaleUpperCase() + category.slice(1)}
            </Link>

            {selectedProductId !== '' && (
              <Link
                to={`/${category}`}
                className="page-navigation__current-page-link"
                style={{
                  pointerEvents: 'none',
                }}
              >
                {selectedProductId.split('-').join(' ')}
              </Link>
            )}
          </div>
        )}

        <Outlet />
      </div>
    </section>
  );
};
