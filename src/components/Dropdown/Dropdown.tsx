import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchParams';
import './Dropdown.scss';

type Props = {
  label: string,
  options: string[],
  defaultOption: string | number,
  queryParam: string,
};

export const Dropdown: React.FC<Props> = ({
  label,
  options,
  defaultOption,
  queryParam,
}) => {
  const [searchParams] = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const [value, setValue] = useState(defaultOption);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue((searchParams.get(queryParam.toString()) || defaultOption));
  }, [searchParams]);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current
        && !dropdownRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const setSearchWith = (params: string) => {
    if (queryParam === 'sortBy') {
      return getSearchWith({
        [queryParam]: params,
      }, searchParams);
    }

    return getSearchWith({
      page: '1',
      [queryParam]: params,
    }, searchParams);
  };

  return (
    <div
      className="dropdown"
      ref={dropdownRef}
    >
      <span className="dropdown__label">
        {label}
      </span>

      <button
        className="dropdown__btn"
        type="button"
        onClick={() => setShowMenu(!showMenu)}
      >
        {value}
        <span className={classNames('dropdown__icon', {
          'dropdown__icon--arrow-up': showMenu,
        })}
        />
      </button>

      <ul
        className={classNames('dropdown__menu', {
          'dropdown__menu--is-open': showMenu,
        })}
      >
        {options.map((option) => (
          <li
            aria-hidden="true"
            key={option}
            onClick={() => {
              setValue(option);
              setShowMenu(prevValue => !prevValue);
            }}
          >
            <Link
              to={{
                search: setSearchWith(option),
              }}
              className="dropdown__menu-item"
            >
              {option}
            </Link>
          </li>
        ))}

      </ul>
    </div>
  );
};
