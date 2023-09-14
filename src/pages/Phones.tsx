import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';
import { ProductList } from '../components/ProductList';
import { Pagination } from '../components/Pagination';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TitleOfPage } from '../components/TitleOfPage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllPhones } from '../store/features/phones';
import { addPhonesToFavorite } from '../store/features/favorites';
import { addPhonesToCart } from '../store/features/cart';

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
  // const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';
  // const perPage = searchParams.get('perPage') || '16';
  const { pathname } = useLocation();

  useEffect(() => {
    if (!storedSort && !storedPerPage) {
      return;
    }

    setSearchParams(`?sort=${storedSort}&page=1&perPage=${storedPerPage}`);
  }, []);

  useEffect(() => {
    dispatch(fetchAllPhones());
    dispatch(addPhonesToFavorite(phones));
    dispatch(addPhonesToCart(phones));
  }, [phones.length]);

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
