import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';
import { ProductList } from '../components/ProductList';
import { Pagination } from '../components/Pagination';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TitleOfPage } from '../components/TitleOfPage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllPhones } from '../store/features/phones';

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
  const { phones, isError, isLoading } = useAppSelector(state => state.phones);
  const { storedSort, storedPerPage } = useAppSelector(state => state.filterBy);
  const dispatch = useAppDispatch();
  const isArrow = useRef(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { pathname } = useLocation();

  useEffect(() => {
    setSearchParams(`?sort=${storedSort}&page=1&perPage=${storedPerPage}`);
  }, []);

  useEffect(() => {
    dispatch(fetchAllPhones());
  }, []);

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

    if (!storedSort) {
      newPhones.sort((a, b) => b.year - a.year);
    }

    newPhones.sort((a, b) => {
      switch (storedSort) {
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
  }, [phones, storedSort, query]);

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

        {visiblePhones.length > 0 && storedPerPage !== 'all' && (
          <Pagination
            handleSelect={handleSelect}
            phones={visiblePhones}
          />
        )}
      </div>
    </div>
  );
};
