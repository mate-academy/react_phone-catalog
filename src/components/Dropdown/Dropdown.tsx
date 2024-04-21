import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
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

  return (
    <div className="dropdown">
      {title && (
        <span className="dropdown__name">{title}</span>
      )}

      <button
        className="dropdown__trigger"
        type="button"
        onClick={onTriggerClick}
        onBlur={() => setTimeout(() => setIsDropdownActive(false), 150)}
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
