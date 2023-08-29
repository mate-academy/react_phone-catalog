import { useEffect, useMemo, useState } from 'react';
import {
  Link,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { Phone } from '../types/Phone';
import { getPhones } from '../helpers/htmlClient';
import { getSearchWith } from '../helpers/helper';
import { ProductsList } from '../components/ProductsList';
import { Loader } from '../components/Loader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NoSearchResults } from '../components/NoSearchResults';
import { Pagination } from '../components/Pagination';
import { DEFAULT_PER_PAGE, DEFAULT_SORT } from '../helpers/constants';
import arrowUp from '../image/arrow-up.svg';
import arrowDown from '../image/arrow-down.svg';

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
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<Dropdown>(false);

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
  }, [searchParams.get('sort'), searchParams.get('query'), phones]);

  const countPagination = useMemo(() => {
    const count = searchParams.get('perPage');
    const countPage = count && +count ? +count : +DEFAULT_PER_PAGE;

    return Math.ceil(currentPhones.length / countPage);
  }, [searchParams.get('perPage'), currentPhones]);

  useEffect(() => {
    setIsLoading(true);

    getPhones()
      .then((res: Phone[]) => {
        setPhones(res);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const selectedSort = useMemo(() => {
    const currentValue = searchParams.get('sort');

    return Object.keys(SortBy).find(sort => (
      SortBy[sort as keyof Sort] === currentValue
    )) || DEFAULT_SORT;
  }, [searchParams.get('sort')]);

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

  if (phones.length !== 0 && currentPhones.length === 0) {
    return (<NoSearchResults />);
  }

  return (
    <main className="main">
      {searchParams.get('query') ? (
        <div className="main__header main__header--results">
          <div className="main__description">
            {`${currentPhones.length} result${currentPhones.length === 1 ? '' : 's'}`}
          </div>
        </div>
      ) : (
        <div className="main__header">
          <Breadcrumbs currentPage="Phones" />

          <h1 className="main__title main__title--page">Mobile phones</h1>

          {!isLoading && phones.length !== 0 && (
            <div className="main__description">
              {`${phones.length} models`}
            </div>
          )}
        </div>
      )}

      {isLoading && (<Loader />)}

      {!isLoading && currentPhones.length !== 0 && (
        <section className="main__section">
          {!searchParams.get('query') && (
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
          )}

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
