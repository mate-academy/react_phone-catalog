import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';

const sortByParams = [
  {
    key: 'Nevest',
    value: 'age',
  },
  {
    key: 'Alphabetically',
    value: 'name',
  },
  {
    key: 'Cheapest',
    value: 'price',
  },
];

const sortByItems = ['all', '4', '8', '16'];

export const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isActive, setIsActive] = useState<string | null>(null);
  const [sortParam, setSortParam] = useState<string>('Nevest');

  const perPage = searchParams.get('perPage') || 'all';

  const dropdownRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && 'contains' in dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setIsActive(null);
  //     }
  //   };

  //   document.addEventListener('click', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  function setSearchWith(params: SearchParams) {
    const search: string = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleChangeSort(event: string) {
    setSearchWith({ sort: event || '' });
    searchParams.set('sort', event);
  }

  function handlePerPage(event: string) {
    searchParams.set('page', '1');

    setSearchWith({ perPage: event || '' });
    searchParams.set('perPage', event);
  }

  return (
    <section className="filter">
      <div className="container">
        <div className="filter__content">
          <div className="filter__wrap">
            <p className="filter__title">
              Sort by
            </p>

            <div className="filter__dropdown" ref={dropdownRef}>
              <button
                type="button"
                className="filter__dropdown__select"
                onClick={() => {
                  setIsActive((prev) => (prev !== 'sort' ? 'sort' : null));
                }}
              >
                <div className="filter__dropdown__selected">{sortParam}</div>
                <img
                  src="./icon/Up.svg"
                  alt="down"
                  className={`filter__dropdown__img ${isActive === 'sort' && 'active'}`}
                />
              </button>

              {isActive === 'sort' && (
                <div className="filter__dropdown__menu">
                  {sortByParams.map(item => (
                    <button
                      key={item.key}
                      className="filter__dropdown__item"
                      type="button"
                      onClick={() => {
                        handleChangeSort(item.value);
                        setSortParam(item.key);
                        setIsActive(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === 'Space') {
                          handlePerPage(item.key);
                          setIsActive(null);
                        }
                      }}
                    >
                      {item.key}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="filter__wrap">
            <p className="filter__title">
              Items on page
            </p>

            <div className="filter__dropdown">
              <button
                type="button"
                className="filter__dropdown__select"
                onClick={() => {
                  setIsActive((prev) => (prev !== 'per' ? 'per' : null));
                }}
              >
                <div className="filter__dropdown__selected">{perPage}</div>
                <img
                  src="./icon/Up.svg"
                  alt="down"
                  className={`filter__dropdown__img ${isActive === 'per' && 'active'}`}
                />
              </button>

              {isActive === 'per' && (
                <div className="filter__dropdown__menu">
                  {sortByItems.map(item => (
                    <button
                      className="filter__dropdown__item"
                      key={item}
                      type="button"
                      onClick={() => {
                        handlePerPage(item);
                        setIsActive(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === 'Space') {
                          handlePerPage(item);
                          setIsActive(null);
                        }
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
