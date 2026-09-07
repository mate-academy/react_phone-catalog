import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/search';

interface Props {
  options: string[];
  title: string;
  searchValue: string;
  isLong?: boolean;
}

export const Dropdown: React.FC<Props> = ({
  options,
  title,
  searchValue,
  isLong,
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const search = searchParams.get(searchValue) || options[0];
  const arrowDirection = isDropdownVisible ? 'arrow--up' : 'arrow--down';

  const handleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  let time: NodeJS.Timeout;
  const handleCloseDropdown = () => {
    if (isDropdownVisible) {
      time = setTimeout(() => {
        setIsDropdownVisible(false);
      }, 300);
    }
  };

  const handleStopClosingDropdown = () => {
    clearTimeout(time);
  };

  useEffect(() => {
    setIsDropdownVisible(false);
  }, [location.search]);

  return (
    <div
      className="dropdown__dropdown"
      onMouseEnter={() => handleStopClosingDropdown()}
      onMouseLeave={() => handleCloseDropdown()}
    >
      <p className="dropdown__dropdown-name">{title}</p>

      <button
        className={cn('dropdown__select ', {
          'dropdown-on-focus': isDropdownVisible,
          'dropdown__select--long': isLong,
        })}
        onClick={handleDropdown}
      >
        {search}

        <div className={`dropdown__arrow dropdown__${arrowDirection}`} />
      </button>

      <ul
        className={cn('dropdown__options', {
          'dropdown-visible': isDropdownVisible,
          'dropdown__options--long': isLong,
        })}
      >
        {options.map(option => (
          <Link
            to={{
              search: getSearchWith(searchParams, {
                [searchValue]: option,
                page: '1',
              }),
            }}
            className={cn('dropdown__option', {
              // eslint-disable-next-line
              'selected': search === option,
            })}
            key={option}
          >
            {option}
          </Link>
        ))}
      </ul>
    </div>
  );
};
