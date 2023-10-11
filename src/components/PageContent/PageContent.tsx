import './PageContent.scss';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';
import { BreadCrumbs } from '../BreadCrumbs';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { getCategoryName } from '../../helpers/funcs';

enum SortBy {
  Age = 'age',
  Name = 'name',
  Price = 'price',
}

enum SearchParams {
  perPage = 'perPage',
  activePage = 'activePage',
  sortBy = 'sortBy',
}

const perPageValues = ['4', '8', '16', 'all'];

type Props = {
  title: string,
  getProducts: () => Promise<Product[]>,
};

export const PageContent: React.FC<Props> = ({
  title,
  getProducts,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get(SearchParams.perPage) || perPageValues[2];
  const normalizedPerPage = perPage !== 'all'
    ? Number(perPage)
    : products.length;
  const activePage = Number(searchParams.get(SearchParams.activePage)) || 1;
  const sortBy = searchParams.get(SearchParams.sortBy) || SortBy.Age;

  const startIndex = normalizedPerPage * (activePage - 1);
  const endIndex = startIndex + normalizedPerPage;
  const visibleProducts = products
    .sort((a: Product, b: Product) => {
      switch (sortBy) {
        case SortBy.Age:
          return b.age - a.age;
        case SortBy.Name:
          return a.name.localeCompare(b.name);
        case SortBy.Price:
          return b.price - a.price;
        default:
          return 0;
      }
    })
    .slice(startIndex, endIndex);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const setParam = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (name === SearchParams.perPage) {
      params.set(SearchParams.activePage, '1');
    }

    params.set(name, value);
    setSearchParams(params);
  };

  const setActivePage = (pageNumber: number) => {
    setParam(SearchParams.activePage, String(pageNumber));
  };

  const setPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setParam(SearchParams.perPage, event.target.value);
  };

  const setSortBy = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setParam(SearchParams.sortBy, event.target.value);
  };

  return (
    <div className="PageContent">
      <div className="PageContent__breadcrumbs-wrapper">
        <BreadCrumbs />
      </div>

      {isLoading && <Loader />}

      {!isLoading && !products.length && (
        <div>
          {`${getCategoryName(title)} not found`}
        </div>
      )}

      {!isLoading && !!products.length && (
        <>
          <h1 className="PageContent__title">
            {getCategoryName(title)}
          </h1>

          <div className="PageContent__info">
            {`${products.length} models`}
          </div>

          <div className="PageContent__params">
            <div className="PageContent__sort-param">
              <label
                htmlFor="sortParams"
                className="PageContent__label"
              >
                Sort by
              </label>

              <select
                id="sortParams"
                className="PageContent__select"
                value={sortBy}
                onChange={setSortBy}
              >
                <option value={SortBy.Age}>Newest</option>
                <option value={SortBy.Name}>Alphabetically</option>
                <option value={SortBy.Price}>Cheapest</option>
              </select>
            </div>

            <div className="PageContent__items-number">
              <label
                htmlFor="itemsNumber"
                className="PageContent__label"
              >
                Items on page
              </label>

              <select
                id="itemsNumber"
                className="PageContent__select"
                onChange={setPerPage}
                value={perPage}
              >
                {perPageValues.map(value => (
                  <option
                    key={value}
                    value={value}
                  >
                    {value[0].toUpperCase() + value.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div data-cy="productList" className="PageContent__phones">
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="PageContent__pagination-wrapper">
            {normalizedPerPage < products.length && (
              <Pagination
                productsCount={products.length}
                perPage={normalizedPerPage}
                activePage={activePage}
                setActivePage={setActivePage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
