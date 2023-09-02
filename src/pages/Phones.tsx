import { useLocation, useSearchParams } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import { ProductList } from '../components/ProductList';
import { Pagination } from '../components/Pagination';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TitleOfPage } from '../components/TitleOfPage';
import { useFetch } from '../hooks/useFetch';
import { Fetch } from '../enum/Fetch';

const SORT_BY = {
  age: 'Newest',
  name: 'Alphabetically',
  price: 'Cheapest',
};

const ITEMS_ON_PAGE = {
  4: '4',
  8: '8',
  16: '16',
  all: 'all',
};

export const Phones = () => {
  const [phones, isError, isLoading] = useFetch(Fetch.allProducts);
  const isArrow = useRef(false);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';
  const perPage = searchParams.get('perPage') || '16';
  const { pathname } = useLocation();

  const handleSelect = (key: string, value: string) => {
    const param = new URLSearchParams(searchParams);

    if (key === 'perPage') {
      param.set('page', '1');
    }

    param.set(key, value);

    return param;
  };

  const visiblePhones = useMemo(() => {
    let newPhones = [...phones];

    if (pathname === '/phones') {
      newPhones = newPhones.filter(phone => phone.name
        .toLowerCase().includes(query.trim().toLocaleLowerCase()));
    }

    if (!sort) {
      newPhones.sort((a, b) => b.year - a.year);
    }

    newPhones.sort((a, b) => {
      switch (sort) {
        case 'age':
          return b.year - a.year;

        case 'name':
          return b.name.localeCompare(a.name);

        case 'price':
          return a.price - b.price;

        default:
          return 0;
      }
    });

    return newPhones;
  }, [phones, sort, query]);

  return (
    <div className="page__container">
      <Breadcrumbs />

      <div className="page__section">
        <TitleOfPage
          title="Mobile phones"
          phonesLen={phones.length}
          visiblePhonesLen={visiblePhones.length}
          isLoading={isLoading}
          isError={isError}
          backArrow={isArrow.current}
        />

        <ProductList
          isError={isError}
          isLoading={isLoading}
          visiblePhones={visiblePhones}
          sortOptions={SORT_BY}
          perPageOptions={ITEMS_ON_PAGE}
          handleSelect={handleSelect}
        />

        {visiblePhones.length > 0 && perPage !== 'all' && (
          <Pagination
            handleSelect={handleSelect}
            phones={visiblePhones}
          />
        )}
      </div>
    </div>
  );
};
