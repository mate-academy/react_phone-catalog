import React, {
  useContext,
  useCallback,
  useState,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { Context } from '../context';
import { Select } from '../Blocs/select';
import { Card } from '../Card';
import { getSearchWith } from '../../utils/searchHelper';
import { Location } from '../Location';

export const ProductPage: React.FC = () => {
  const location = useLocation();
  const { products } = useContext(Context);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');
  const page = searchParams.get('page');

  const [sortBy, setSortBy,
  ] = useState((sort && (sort[0].toUpperCase() + sort.slice(1))) || 'Name');
  const [visibleProduct, setvisibleProduct] = useState(perPage || 'All');
  const [openSort, setopenSort] = useState(false);
  const [openVisibleProduct, setopenVisibleProduct] = useState(false);

  const [renderProducts, setrenderProducts] = useState(products);

  const getTypeProductPage = useCallback(
    () => location.pathname.slice(1, -1),
    [location.pathname],
  );

  const getItems = useCallback(
    () => products
      .filter(productItem => productItem.type === getTypeProductPage()),
    [products, location.pathname],
  );

  useMemo(
    () => setrenderProducts(getItems()
      .sort((product1, product2) => {
        const product1Price = product1.price
        - ((product1.price / 100) * product1.discount);
        const product2Price = product2.price
        - ((product2.price / 100) * product2.discount);

        switch (sort) {
          case 'age':
            return product1.age - product2.age;

          case 'price':
            return product1Price - product2Price;

          default:
            return product1.id.localeCompare(product2.id);
        }
      }).slice(
        (page ? +page - 1 : 0) * +visibleProduct || 0,
        ((perPage && +perPage) || products.length) * (page ? +page : 1),
      )),
    [sort, perPage, products, page, location.pathname],
  );

  const getPaginationNavButton = useCallback(() => {
    const a = [];

    for (
      let i = 1;
      i <= Math.ceil(
        products.filter(product => product.type === getTypeProductPage()).length
        / +visibleProduct,
      );
      i += 1
    ) {
      a.push(i);
    }

    return a;
  }, [visibleProduct, products]);

  const title = location.pathname.slice(1);

  return products.length !== 0 ? (
    <main className="products">
      <Location />
      <h1 className="products__title">
        {title.slice(0, 1).toLocaleUpperCase() + title.slice(1)}
      </h1>

      <h2 className="products__subtitle">
        {getItems().length}
        {' '}
        models
      </h2>
      <div className="products__selects">
        <Select
          name="Sord by"
          setopenSort={setopenSort}
          openSort={openSort}
          text={sortBy}
          setSortBy={setSortBy}
          options={[{
            to: null,
            textOption: 'Name',
          }, {
            to: 'age',
            textOption: 'Age',
          }, {
            to: 'price',
            textOption: 'Price',
          }]}
          sortParams="sort"
        />

        <Select
          name="Items on page"
          setopenSort={setopenVisibleProduct}
          openSort={openVisibleProduct}
          text={visibleProduct}
          setSortBy={setvisibleProduct}
          options={[...getItems().map((_item, index) => {
            if ((index + 1) % 4) {
              return null;
            }

            return {
              to: `${index + 1}`,
              textOption: `${index + 1}`,
            };
          }), {
            to: null,
            textOption: 'All',
          }]}
          sortParams="perPage"
        />
      </div>
      <div className="products__list">
        {renderProducts.map(item => {
          return (
            <div className="products__list__item" key={item.id}>
              <Card product={item} />
            </div>
          );
        })}
      </div>
      {getPaginationNavButton().length > 1 && (
        <div className="products__pagination_nav">
          <Link
            to={{
              search: getSearchWith(
                searchParams,
                page === null
                  ? { page: null }
                  : { page: +page - 1 === 1 ? null : `${+page - 1}` },
              ),
            }}
            type="button"
            className={classNames(
              'button',
              { 'slick-disabled': !page },
            )}
            aria-label="Prev"
            style={{ transform: 'rotate(270deg)' }}
          />

          {getPaginationNavButton().map(item => {
            return (
              <Link
                to={{
                  search: getSearchWith(
                    searchParams,
                    item === 1
                      ? { page: null }
                      : { page: `${item}` },
                  ),
                }}
                key={item}
                type="button"
                className={classNames(
                  'button',
                  'products__pagination_nav__button',
                  {
                    'products__pagination_nav__button--active':
                    page === null ? item === 1 : item === +page,
                  },
                )}
              >
                {item}
              </Link>
            );
          })}

          <Link
            to={{
              search: getSearchWith(
                searchParams,
                page === null
                  ? { page: '2' }
                  : { page: +page === getPaginationNavButton().length ? `${page}` : `${+page + 1}` },
              ),
            }}
            type="button"
            className={classNames(
              'button',
              {
                'slick-disabled':
                (page && +page) === getPaginationNavButton().length,
              },
            )}
            aria-label="Next"
            style={{ transform: 'rotate(90deg)' }}
          />

        </div>
      )}
    </main>
  ) : (
    <main>
      <h1>Loading...</h1>
    </main>
  );
};
