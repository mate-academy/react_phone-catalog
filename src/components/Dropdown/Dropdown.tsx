import classNames from 'classnames';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import './Dropdown.scss';
import { Icon } from '../Icon';
import { IconType } from '../../types/IconTypes';
import { Option } from '../../types/Option';
import { getSearchWith } from '../../utils/getSearchWith';

interface Props {
  title?: string;
  searchName: string;
  options: Option[];
  defaultValue: string | number;
}

// options and make it possible to choose by tab

export const Dropdown: React.FC<Props> = ({
  title = '',
  options,
  searchName,
  defaultValue,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [searchParams] = useSearchParams();
  const selectedValue = searchParams.get(searchName);
  const selectedOption = useMemo(() => {
    return options.find(option => option.value.toString() === selectedValue);
  }, [selectedValue, options]);

  const onTriggerClick = useCallback(
    () => {
      setIsDropdownActive(isActive => !isActive);
    },
    [],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current
           && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownActive(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownActive) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isDropdownActive]);

  return (
    <div ref={dropdownRef} className="dropdown">
      {title && (
        <span className="dropdown__name">{title}</span>
      )}

      <button
        className="dropdown__trigger"
        type="button"
        onClick={onTriggerClick}
      >
        {selectedOption?.name || defaultValue}

        {isDropdownActive ? (
          <Icon iconType={IconType.arrowUp} />
        ) : (
          <Icon iconType={IconType.arrowDown} />
        )}
      </button>

      <ul
        className={classNames('dropdown__content', {
          'dropdown__content--active': isDropdownActive,
        })}
      >
        {options.map(({ name, value }) => (
          <li
            key={value}
            className="dropdown__option"
          >
            <NavLink
              to={{
                search: getSearchWith({ [searchName]: value }, searchParams),
              }}
              onClick={() => setIsDropdownActive(false)}
              className="dropdown__link"
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
