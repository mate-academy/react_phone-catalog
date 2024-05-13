import { useState } from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import './Dropdown.scss';
import { getSearchWith } from '../../helpers/getSearchWith';
import { Option } from '../../types/Option';

type Props = {
  currentOption: string;
  options: Option[];
  label: string;
  param: string;
};

export const Dropdown: React.FC<Props> = ({
  currentOption,
  options,
  label,
  param,
}) => {
  const [visibleOptions, setVisibleOptions] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOptionChange = (option: Option) => {
    const newSearchParams = getSearchWith(
      { [param]: option.value, page: '1' },
      searchParams,
    );

    setSearchParams(newSearchParams);
    setVisibleOptions(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__trigger">
        <label className="dropdown__label" htmlFor="sort-by">
          {label}
        </label>
        <button
          id="sort-by"
          type="button"
          className={cn('dropdown__button', {
            'dropdown__button--active': visibleOptions,
          })}
          onClick={() => setVisibleOptions(true)}
          onBlur={() => setVisibleOptions(false)}
        >
          {currentOption}
          <div
            className={cn('dropdown__icon', {
              'dropdown__icon--active': visibleOptions,
            })}
          />
        </button>
      </div>

      {visibleOptions && (
        <div className="dropdown__menu" id="dropdown-menu" role="menu">
          <div className="dropdown__content">
            {options.map(option => (
              <Link
                to="/"
                key={option.value}
                className="dropdown__item"
                onMouseDown={() => handleOptionChange(option)}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
