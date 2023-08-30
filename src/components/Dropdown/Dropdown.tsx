import {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../Button/Button';
import { getSearchWith } from '../../helpers/searchHelper';
import { SortOption } from '../../helpers/options';

import './Dropdown.scss';

type Props = {
  currentOption: string;
  searchName: string;
  options: SortOption[];
};

export const Dropdown: FC<Props> = ({ currentOption, searchName, options }) => {
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [searchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current
           && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownClicked(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownClicked) {
        setIsDropdownClicked(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isDropdownClicked]);

  return (
    <div ref={dropdownRef} className="dropdown">
      <Button
        className={classNames('dropdown', {
          'button--dropdown-focus': isDropdownClicked,
        })}
        content={currentOption}
        iconType="arrow-down"
        iconPosition="right"
        onClick={() => setIsDropdownClicked(!isDropdownClicked)}
      />
      <ul
        className={classNames('dropdown__list', {
          'dropdown__list--visible': isDropdownClicked,
        })}
      >
        {options.map(({ label, value }) => (
          <Link
            key={value}
            to={{
              search: getSearchWith(searchParams, { [searchName]: value }),
            }}
            className="dropdown__link"
            onClick={() => setIsDropdownClicked(false)}
          >
            {label}
          </Link>
        ))}
      </ul>
    </div>
  );
};
