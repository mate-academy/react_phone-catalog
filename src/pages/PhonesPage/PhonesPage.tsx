import './PhonesPage.scss';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Loader } from '../../components/Loader';
import { getPhones } from '../../helpers/api';

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

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get(SearchParams.perPage) || perPageValues[2];
  const normalizedPerPage = perPage !== 'all' ? Number(perPage) : phones.length;
  const activePage = Number(searchParams.get(SearchParams.activePage)) || 1;
  const sortBy = searchParams.get(SearchParams.sortBy) || SortBy.Age;

  const startIndex = normalizedPerPage * (activePage - 1);
  const endIndex = startIndex + normalizedPerPage;
  const visiblePhones = phones
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
    getPhones()
      .then(setPhones)
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
    <div className="PhonesPage">
      <div className="PhonesPage__breadcrumbs-wrapper">
        <BreadCrumbs />
      </div>

      <h1 className="PhonesPage__title">Mobile phones</h1>

      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className="PhonesPage__info">
            {`${phones.length || 'No'} models`}
          </div>

          <div className="PhonesPage__params">
            <div className="PhonesPage__sort-param">
              <label
                htmlFor="sortParams"
                className="PhonesPage__label"
              >
                Sort by
              </label>

              <select
                id="sortParams"
                className="PhonesPage__select"
                value={sortBy}
                onChange={setSortBy}
              >
                <option value={SortBy.Age}>Newest</option>
                <option value={SortBy.Name}>Alphabetically</option>
                <option value={SortBy.Price}>Cheapest</option>
              </select>
            </div>

            <div className="PhonesPage__items-number">
              <label
                htmlFor="itemsNumber"
                className="PhonesPage__label"
              >
                Items on page
              </label>

              <select
                id="itemsNumber"
                className="PhonesPage__select"
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

          <div data-cy="productList" className="PhonesPage__phones">
            {visiblePhones.map(phone => (
              <ProductCard key={phone.id} product={phone} />
            ))}
          </div>

          <div className="PhonesPage__pagination-wrapper">
            {normalizedPerPage < phones.length && (
              <Pagination
                productsCount={phones.length}
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
