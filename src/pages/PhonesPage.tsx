import { useMemo, useState, useEffect } from 'react';
import {
  Link,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../helpers/helper/helper';
import { ProductsList } from '../components/ProductsList';
import { Loader } from '../components/Loader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NoSearchResults } from '../components/NoSearchResults';
import { Pagination } from '../components/Pagination';
import { DEFAULT_PER_PAGE, DEFAULT_SORT } from '../helpers/helper/constants';
import arrowUp from '../image/upppp.svg';
import arrowDown from '../image/downGray.svg';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { init as initPhones } from '../features/phones';
import { Error } from '../components/Error';

type Sort = {
  Newest: string,
  Alphabetically: string,
  Cheapest: string,
};
type Dropdown = 'Sort by' | 'Items on page' | false;
const SortBy: Sort = {
  Newest: 'age',
  Alphabetically: 'name',
  Cheapest: 'price',
};
const items = ['4', '8', '16', 'All'];

export const PhonesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { phones, loading, error } = useAppSelector(state => state.phones);
  const [isOpen, setIsOpen] = useState<Dropdown>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initPhones());
  }, []);// eslint-disable-line

  const currentPhones = useMemo(() => {
    if (phones.length === 0) {
      return [];
    }

    const newPhones = [...phones];
    const value = searchParams.get('sort');

    switch (value) {
      case 'age':
        newPhones.sort((first, second) => {
          return second.year - first.year;
        });
        break;
      case 'name':
        newPhones.sort((first, second) => {
          return first.name.localeCompare(second.name);
        });
        break;
      case 'price':
        newPhones.sort((first, second) => {
          return first.price - second.price;
        });
        break;
      default:
        newPhones.sort((first, second) => {
          return second.year - first.year;
        });
        break;
    }

    const query = searchParams.get('query');

    if (query) {
      setSearchParams(getSearchWith(searchParams, { page: '1' }));

      return newPhones.filter(phone => (
        phone.name.toLowerCase().includes(query.toLowerCase())
      ));
    }

    return newPhones;
  }, [searchParams.get('sort'), searchParams.get('query'), phones]); // eslint-disable-line
  const countPagination = useMemo(() => {
    const count = searchParams.get('perPage');
    const countPage = count && +count ? +count : +DEFAULT_PER_PAGE;

    return Math.ceil(currentPhones.length / countPage);
  }, [searchParams.get('perPage'), currentPhones]); // eslint-disable-line
  const selectedSort = useMemo(() => {
    const currentValue = searchParams.get('sort');

    return Object.keys(SortBy).find(sort => (
      SortBy[sort as keyof Sort] === currentValue
    )) || DEFAULT_SORT;
  }, [searchParams.get('sort')]); // eslint-disable-line
  const handleClickOnDropdown = (value: Dropdown) => {
    setIsOpen(currentValue => {
      return currentValue === value ? false : value;
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (
      event.relatedTarget
      && event.relatedTarget.classList.contains('dropdown__link')
    ) {
      return;
    }

    setIsOpen(false);
  };

  if (error) {
    return (<Error />);
  }

  if (phones.length !== 0 && currentPhones.length === 0) {
    return (<NoSearchResults />);
  }

  return (
    <main className="main">
      <div className="main__header">
        <Breadcrumbs currentPage="Phones" />
        <h1 className="main__title main__title--page">Mobile phones</h1>
        {!loading && phones.length !== 0 && (
          <div className="main__description">
            {searchParams.get('query')
              ? `${currentPhones.length} result${currentPhones.length === 1 ? '' : 's'}`
              : `${phones.length} models`}
          </div>
        )}
      </div>

      {loading && (<Loader />)}
      {!loading && currentPhones.length !== 0 && (
        <section className="main__section">
          <div className="main__dropdown dropdown">
            <div className="dropdown__menu">
              <div className="dropdown__trigger">
                <div className="dropdown__description">Sort by</div>
                <button
                  type="button"
                  className="dropdown__button"
                  onClick={() => handleClickOnDropdown('Sort by')}
                  onBlur={handleBlur}
                >
                  <span className="dropdown__text">
                    {selectedSort}
                  </span>
                  <span className="dropdown__icon">
                    {isOpen === 'Sort by' ? (
                      <img src={arrowUp} alt="arrow-up" />
                    ) : (
                      <img src={arrowDown} alt="arrow-down" />
                    )}
                  </span>
                </button>
              </div>
              <div
                className={classNames(
                  'dropdown__content',
                  { 'dropdown__content--open': isOpen === 'Sort by' },
                )}
              >
                {Object.keys(SortBy).map(option => (
                  <div key={option} className="dropdown__item">
                    <Link
                      to={{
                        search: getSearchWith(
                          searchParams,
                          { sort: SortBy[option as keyof Sort] },
                        ).toString(),
                      }}
                      className={classNames(
                        'dropdown__link',
                        { 'dropdown__link--active': isOpen === 'Sort by' },
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {option}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="dropdown__menu">
              <div className="dropdown__trigger">
                <div className="dropdown__description">Items on page</div>
                <button
                  type="button"
                  className="dropdown__button dropdown__button--count"
                  onClick={() => handleClickOnDropdown('Items on page')}
                  onBlur={handleBlur}
                >
                  <span className="dropdown__text">
                    {searchParams.get('perPage') || DEFAULT_PER_PAGE}
                  </span>
                  <span className="dropdown__icon">
                    {isOpen === 'Items on page' ? (
                      <img src={arrowUp} alt="arrow-up" />
                    ) : (
                      <img src={arrowDown} alt="arrow-down" />
                    )}
                  </span>
                </button>
              </div>
              <div
                className={classNames(
                  'dropdown__content dropdown__content--count',
                  { 'dropdown__content--open': isOpen === 'Items on page' },
                )}
              >
                {items.map(item => (
                  <div key={item} className="dropdown__item">
                    <Link
                      to={{
                        search: getSearchWith(
                          searchParams, { page: '1', perPage: item },
                        ).toString(),
                      }}
                      className={classNames(
                        'dropdown__link',
                        {
                          'dropdown__link--active':
                            isOpen === 'Items on page',
                        },
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ProductsList
            products={currentPhones}
          />
          {searchParams.get('perPage') !== 'All'
            && countPagination > 1 && (
            <Pagination countPagination={countPagination} />
          )}
        </section>
      )}
    </main>
  );
};
