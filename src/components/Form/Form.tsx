import './form.scss';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PerPage, Sort } from '../../type/types';

export const Form = () => {
  const [isActive, setIsActive] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const setIsActiveForm = useMemo(() => (argument: string | null) => {
    if (isActive || !argument) {
      setIsActive(null);

      return;
    }

    setIsActive(argument);
  }, [isActive]);

  const setFilter = (argument: 'perPage' | 'sort', value: string) => {
    if (argument === 'perPage') {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }

    searchParams.set(argument, value);
    setSearchParams(searchParams);
    setIsActiveForm(argument);
  };

  return (
    <div className="form">
      <div className="form__item">
        <div className="form__label">
          Sort by
        </div>

        <div
          className={classNames('form__select',
            { 'form__select form__select--active': isActive === 'sort' })}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsActiveForm(null);
            }
          }}
        >
          <button
            type="button"
            data-form="sort"
            className="form__selected-option"
            onClick={(event) => (
              setIsActiveForm(event.currentTarget.dataset.form || null)
            )}
          >
            {searchParams.get('sort') || Sort.Newest}
          </button>

          <div
            className={classNames('form__options-wrapper',
              { 'form__options-wrapper--active': isActive === 'sort' })}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsActiveForm(null);
              }
            }}
          >
            <button
              className="form__option"
              type="button"
              onClick={(event) => (
                setFilter('sort', event.currentTarget.innerText)
              )}
            >
              {Sort.Newest}
            </button>

            <button
              className="form__option"
              type="button"
              onClick={(event) => (
                setFilter('sort', event.currentTarget.innerText)
              )}
            >
              {Sort.Alphabetically}
            </button>

            <button
              className="form__option"
              type="button"
              onClick={(event) => (
                setFilter('sort', event.currentTarget.innerText)
              )}
            >
              {Sort.Cheapest}
            </button>
          </div>
        </div>
      </div>

      <div className="form__item form__item--numbers">
        <div className="form__label">
          Items on page
        </div>

        <div
          className={classNames('form__select form__select--numbers',
            { 'form__select--active': isActive === 'perPage' })}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsActiveForm(null);
            }
          }}
        >
          <button
            type="button"
            data-form="perPage"
            className="form__selected-option"
            onClick={(event) => (
              setIsActiveForm(event.currentTarget.dataset.form || null)
            )}
          >
            {searchParams.get('perPage') || PerPage.Sixteen}
          </button>

          <div className={classNames('form__options-wrapper',
            { 'form__options-wrapper--active': isActive === 'perPage' })}
          >
            <button
              className="form__option"
              type="button"
              onClick={(event) => (
                setFilter('perPage', event.currentTarget.innerText)
              )}
            >
              {PerPage.Four}
            </button>

            <button
              className="form__option"
              type="button"
              onClick={(event) => (
                setFilter('perPage', event.currentTarget.innerText)
              )}
            >
              {PerPage.Eight}
            </button>

            <button
              className="form__option"
              type="button"
              onClick={(event) => (
                setFilter('perPage', event.currentTarget.innerText)
              )}
            >
              {PerPage.Sixteen}
            </button>

            <button
              className="form__option"
              type="button"
              onClick={(event) => (
                setFilter('perPage', event.currentTarget.innerText)
              )}
            >
              {PerPage.All}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
