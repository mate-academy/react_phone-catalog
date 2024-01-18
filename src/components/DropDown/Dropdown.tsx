import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import './Dropdown.scss';

import { Option } from '../../types/Options';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  options: Option[],
  param: 'sort' | 'perPage',
  selectedOption: Option,
};

export const Dropdown: React.FC<Props> = ({
  options,
  param,
  selectedOption,
}) => {
  const [isShownList, setIsShownList] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleShowDropdown = () => {
    if (!isShownList) {
      setIsShownList(true);
    } else {
      setIsShownList(false);
    }
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
          page: (1).toString(),
        }),
      );
    } else {
      setSearchParams(
        getSearchWith(searchParams, {
          perPage: option.value,
          page: (1).toString(),
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
      <div className="propdown__select-container">
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
          className={classNames(
            'dropdown__select-arrow',
            {
              'dropdown__select-arrow--down': !isShownList,
              'dropdown__select-arrow--up': isShownList,
            },
          )}
          onClick={handleShowDropdown}
        />
      </div>

      {isShownList && (
        <div className="dropdown__menu" role="menu">
          {options.map(option => (
            <Link
              key={option.label}
              to="/"
              className="dropdown__option"
              onClick={(event) => handleSelectedOption(event, option)}
            >
              {option.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
