/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../types/phone';
import { getPhones } from '../../api/products';

import { Loader } from '../../components/Loader';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { Dropdown } from '../../components/Dropdown';
import { ProductsList } from '../../components/ProductsList';

import './phonespage.scss';
import { Pagination } from '../../components/Pagination';
import { SearchTypes } from '../../types/searchType';
import { DropDownOption } from '../../types/dropDownOption';

const sortOptions: DropDownOption[] = [
  { name: 'Newest', value: 'age' },
  { name: 'Alphabetically', value: 'name' },
  { name: 'Cheapest', value: 'price' },
];

const paginationOptions: DropDownOption[] = [
  { name: '4', value: '4' },
  { name: '8', value: '8' },
  { name: '16', value: '16' },
  { name: 'All', value: 'all' },
];

const getVisibleItems = (
  products: Phone[],
  sortBy: string,
  perPage: string,
  page: number,
): Phone[] => {
  const sorted = [...products].sort((prod1, prod2) => {
    switch (sortBy) {
      case 'age':
        return prod2.year - prod1.year;
      case 'name':
        return prod1.name.localeCompare(prod2.name);
      case 'price':
        return prod1.price - prod2.price;
      default:
        throw new Error('Sorting went wrong...');
    }
  });

  if (perPage === 'all') {
    return sorted;
  }

  const firstItem = (page - 1) * +perPage + 1;
  const lastItem
    = firstItem + +perPage - 1 < sorted.length
      ? firstItem + +perPage - 1
      : sorted.length;

  return sorted.slice(firstItem - 1, lastItem);
};

type Params = {
  [key: string]: string | null;
};

function getSearchParams(
  params: Params, initialParams?: string | URLSearchParams,
) {
  const searchParams = new URLSearchParams(initialParams);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
  }

  return searchParams.toString();
}

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get(SearchTypes.Sort)
    || sortOptions[0].value;
  const perPageQuery = searchParams.get(SearchTypes.PerPage)
    || paginationOptions[0].value;
  const pageQuery = searchParams.get(SearchTypes.Page) || '1';

  const setSearch = (params: Params) => {
    const search = getSearchParams(params, searchParams);

    setSearchParams(search);
  };

  const visibleItems = getVisibleItems(
    phones, sortByQuery, perPageQuery, +pageQuery,
  );
  const isTooFewItems = phones.length <= +paginationOptions[0];

  const onSortChange = (newSort: string) => {
    setSearch({ [SearchTypes.Sort]: newSort, [SearchTypes.Page]: '1' });
  };

  const onPerPageChange = (newPerPage: string) => {
    setSearch({ [SearchTypes.PerPage]: newPerPage, [SearchTypes.Page]: '1' });
  };

  const onPageChange = (newPage: number) => {
    setSearch({ [SearchTypes.Page]: newPage.toString() });

    document.body.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    getPhones()
      .then(setPhones)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="phones-page">
      <section className="phones-page__section">
        <BreadCrumbs />
      </section>

      <section className="phones-page__section">
        <h1 className="phones-page__title">Mobile Phones</h1>

        <p className="phones-page__models">{`${phones.length} models`}</p>
      </section>

      <section className="phones-page__section phones-page__section--small">
        <div className="phones-page__sort">
          <div className="phones-page__dropdown">
            <span className="phones-page__dropdown-title">Sort by</span>
            <Dropdown
              options={sortOptions}
              currentValue={sortByQuery}
              onChange={onSortChange}
            />
          </div>

          <div className="phones-page__dropdown">
            <span className="phones-page__dropdown-title">Items on page</span>
            <Dropdown
              options={paginationOptions}
              currentValue={perPageQuery}
              onChange={onPerPageChange}
              isSmall
            />
          </div>
        </div>
      </section>

      <section className="phones-page__section" data-cy="productList">
        <ProductsList products={visibleItems} />
      </section>

      {(perPageQuery !== 'all' && !isTooFewItems) && (
        <section className="phones-page__section" data-cy="pagination">
          <Pagination
            total={phones.length}
            perPage={perPageQuery}
            currentPage={+pageQuery}
            onPageChange={onPageChange}
          />
        </section>
      )}
    </div>
  );
};
