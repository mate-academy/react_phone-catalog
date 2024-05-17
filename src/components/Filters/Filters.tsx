import { useState } from 'react';
import './Filters.scss';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SortOptions } from '../../types/SortOptions';

const OnPageOption = ['4', '8', '16', 'All'];

export const Filters = () => {
  const [sortByDropdownActive, setSortByDropdownActive] = useState(false);
  const [onPageDropdownActive, setOnPageDropdownActive] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const onPageParam = searchParams.get('onPage') || OnPageOption[0];
  const sortByParam = searchParams.get('sort') || null;
  const queryParam = searchParams.get('query') || '';

  const hasParams = !searchParams.keys().next().done;

  const handleDeleteSearchParams = () => {
    const params = new URLSearchParams();

    setSearchParams(params);
  };

  const handleSortByChange = (value: SortOptions) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    params.set('page', '1');

    setSearchParams(params);
  };

  const handleOnPageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('onPage', value);
    params.set('page', '1');

    setSearchParams(params);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value.trim() === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  const handleInputOnBlur = () => {
    const params = new URLSearchParams(searchParams);

    if (queryParam.trim() === '') {
      params.delete('query');
    } else {
      params.set('query', queryParam.trim());
    }

    setSearchParams(params);
  };

  return (
    <div className="filter-form">
      <div className="filter-form__sort-by select-form">
        <div className="select-form__label">Sort By</div>

        <button
          className="select-form__select"
          onClick={() => setSortByDropdownActive(prev => !prev)}
          onBlur={() => setTimeout(() => setSortByDropdownActive(false), 400)}
        >
          <div className="select__text">{sortByParam ?? 'All'}</div>
          <div
            className={classNames('select__icon', {
              'select__icon--active': sortByDropdownActive,
            })}
          />
        </button>

        <div
          className={classNames('select-form__dropdown', {
            'select-form__dropdown--active': sortByDropdownActive,
          })}
        >
          <div className="dropdown">
            {Object.entries(SortOptions).map(([key, value]) => (
              <div
                key={key}
                className="dropdown__item"
                onClick={() => handleSortByChange(value)}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-form__on-page select-form">
        {hasParams && (
          <button className="skip-filters" onClick={handleDeleteSearchParams} />
        )}

        <div className="select-form__label">On page</div>

        <button
          className="select-form__select"
          onClick={() => setOnPageDropdownActive(prev => !prev)}
          onBlur={() => setTimeout(() => setOnPageDropdownActive(false), 400)}
        >
          <div className="select__text">{onPageParam}</div>
          <div
            className={classNames('select__icon', {
              'select__icon--active': onPageDropdownActive,
            })}
          />
        </button>

        <div
          className={classNames('select-form__dropdown', {
            'select-form__dropdown--active': onPageDropdownActive,
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
        value={queryParam}
        onChange={handleQueryChange}
        onBlur={handleInputOnBlur}
      />
    </div>
  );
};
