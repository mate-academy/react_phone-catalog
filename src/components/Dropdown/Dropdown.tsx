import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Option } from '../../types/Option';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../helpers/searchHelper';

import './Dropdown.scss';

interface Props {
  options: Option[];
  param: 'sort' | 'perPage';
  selectedOption: Option;
}

export const Dropdown: React.FC<Props> = ({
  options,
  param,
  selectedOption,
}) => {
  const [isShownList, setIsShownList] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleShowDropdown = () => {
    setIsShownList((prev) => !prev);
  };

  const handleSelectedOption = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    option: Option,
  ) => {
    event.preventDefault();

    if (param === 'sort') {
      setSearchParams(
        getSearchWith(searchParams, {
          sort: option.value,
          page: '1',
        }),
      );
    } else {
      setSearchParams(
        getSearchWith(searchParams, {
          perPage: option.value,
          page: '1',
        }),
      );
    }

    setIsShownList(false);
  };

  const handleOnBlur = () => {
    setTimeout(() => setIsShownList(false), 150);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__select-container">
        <input
          type="dropdown"
          className="dropdown__select"
          value={selectedOption.label}
          onClick={handleShowDropdown}
          onBlur={handleOnBlur}
          readOnly
        />
        <button
          aria-label="dropdown-arrow"
          type="button"
          className={cn('dropdown__select-arrow', {
            'dropdown__select-arrow--down': !isShownList,
            'dropdown__select-arrow--up': isShownList,
          })}
          onClick={handleShowDropdown}
        />
      </div>

      {isShownList && (
        <div className="dropdown__menu" role="menu">
          {options.map((option) => (
            <SearchLink
              key={option.label}
              params={{ [param]: option.value, page: '1' }}
              className="dropdown__option"
              onClick={(event) => handleSelectedOption(event, option)}
            >
              {option.label}
            </SearchLink>
          ))}
        </div>
      )}
    </div>
  );
};
