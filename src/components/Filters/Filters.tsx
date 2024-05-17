import { useState } from 'react';
import './Filters.scss';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SortOptions } from '../../types/SortOptions';
import { SearchParams, getSearchWith } from '../../helpers/searchHelper';

const OnPageOption = ['4', '8', '16', 'All'];

export const Filters = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [itemsPerPageOpen, setItemsPerPageOpens] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const onPage = searchParams.get('onPage') || 0;
  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';

  function setSearchWith(params: SearchParams) {
    setSearchParams(getSearchWith(searchParams, params));
  }

  const handleSortChange = (value: string) => {
    setSearchWith({ sort: value || null, page: '1' });
  };

  const handleOnPageChange = (value: string) => {
    setSearchWith({ onPage: value || null, page: '1' });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <div className="filter-form">
      <div className="filter-form__sort-by select-form">
        <div className="select-form__label">Sort By</div>

        <button
          className="select-form__select"
          onClick={() => setSortOpen(prev => !prev)}
          onBlur={() => setTimeout(() => setSortOpen(false), 300)}
        >
          <div className="select__text">{sort ? sort : 'Default'}</div>
          <div
            className={classNames('select__icon', {
              'select__icon--active': sortOpen,
            })}
          />
        </button>

        <div
          className={classNames('select-form__dropdown', {
            'select-form__dropdown--active': sortOpen,
          })}
        >
          <div className="dropdown">
            {Object.entries(SortOptions).map(([key, value]) => {
              return (
                <div
                  key={key}
                  className="dropdown__item"
                  onClick={() => handleSortChange(value)}
                >
                  {key}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="filter-form__on-page select-form">
        <div className="select-form__label">On page</div>

        <button
          className="select-form__select"
          onClick={() => setItemsPerPageOpens(prev => !prev)}
          onBlur={() => setTimeout(() => setItemsPerPageOpens(false), 300)}
        >
          <div className="select__text">{onPage ? onPage : 'Default'}</div>
          <div
            className={classNames('select__icon', {
              'select__icon--active': itemsPerPageOpen,
            })}
          />
        </button>

        <div
          className={classNames('select-form__dropdown', {
            'select-form__dropdown--active': itemsPerPageOpen,
          })}
        >
          <div className="dropdown">
            {OnPageOption.map(value => (
              <div
                key={value}
                className="dropdown__item"
                onClick={() => handleOnPageChange(value)}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>

      <input
        className="filter-form__search input-form"
        type="search"
        placeholder="search"
        value={query}
        onChange={handleQueryChange}
      />
    </div>
  );
};
