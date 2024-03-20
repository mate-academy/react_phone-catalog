import { useState } from 'react';
import './Selector.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';

type Props<T> = {
  defaultValue: string;
  searchParam: string;
  values: T;
};

export const Selector = <T extends Record<string, string>>({
  defaultValue,
  searchParam,
  values,
}: Props<T>) => {
  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [defValue, setDefValue] = useState(values[defaultValue]);

  const handleChangeParams = (param: string) => {
    const newSearchParam = getSearchWith(searchParams, {
      [searchParam]: param || null,
      page: '1',
    });

    setSearchParams(newSearchParam);

    setIsActive(false);
  };

  return (
    <div
      className={classNames('select', {
        'select--per-page': searchParam === 'perPage',
      })}
    >
      <button
        className={classNames('select__button', {
          'select__button--target': isActive,
        })}
        aria-label="sort-by"
        type="button"
        onClick={() => setIsActive(!isActive)}
        onBlur={() => setIsActive(false)}
      >
        <p className="select__main-text">{defValue}</p>

        <div
          className={classNames('icon', 'icon-down', 'select__icon', {
            'select__incon--target': isActive,
          })}
        />
      </button>

      <div
        className={classNames('select__options', {
          'select__options--is-active': isActive,
        })}
      >
        {Object.values(values).map((sort, i) => {
          const keys = Object.keys(values);

          return (
            <button
              key={sort}
              className="select__option"
              type="button"
              onMouseDown={() => {
                handleChangeParams(keys[i]);
                setDefValue(sort);
              }}
            >
              {sort}
            </button>
          );
        })}
      </div>
    </div>
  );
};
