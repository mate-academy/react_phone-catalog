import { useState } from 'react';
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

            <div className="filter__dropdown">
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
                    /* eslint-disable-next-line */
                    <div
                      key={item.key}
                      className="filter__dropdown__item"
                      onClick={() => {
                        handleChangeSort(item.value);
                        setSortParam(item.key);
                        setIsActive(null);
                      }}
                    >
                      {item.key}
                    </div>
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
                    /* eslint-disable-next-line */
                    <div
                      className="filter__dropdown__item"
                      key={item}
                      onClick={() => {
                        handlePerPage(item);
                        setIsActive(null);
                      }}
                    >
                      {item}
                    </div>
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
