import { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Option } from '../../types/Option';
import { SearchLink } from '../SearchLink';
// import { getSearchWith } from '../../helpers/searchHelper';

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
  // const [searchParams, setSearchParams] = useSearchParams();

  const handleShowDropdown = () => {
    setIsShownList((prev) => !prev);
  };

  /* const handleSelectedOption = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    option: Option,
  ) => {
    event.preventDefault();

    const updatedParams = {
      [param]: option.value,
      page: '1',
    };

    setSearchParams(getSearchWith(searchParams, updatedParams));
    setIsShownList(false);
  }; */

  /* const handleOnBlur = () => {
    setTimeout(() => setIsShownList(false), 150);
  }; */

  const handleOnBlur = (event: React.FocusEvent) => {
    const target = event.relatedTarget as HTMLElement;

    if (!target || !target.closest('.dropdown__menu')) {
      setIsShownList(false); // Закрити дропдаун при втраті фокусу
    }
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
              onClick={() => setIsShownList(false)}
            >
              {option.label}
            </SearchLink>
          ))}
        </div>
      )}
    </div>
  );
};
