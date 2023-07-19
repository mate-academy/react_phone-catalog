import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './DropdownSelect.scss';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  paramName: string;
  label: string;
};

type Option = {
  props: {
    value: string,
    children: string,
  }
};

export const DropdownSelect: React.FC<Props> = ({
  children,
  paramName,
  label,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectValue = searchParams.get(paramName) || '';

  const options = React.Children.toArray(children) as Option[];

  const handleSetValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ sort: event.target.value });
  };

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsActive(prev => !prev);
  };

  const handleLinkClick = () => {
    setIsActive(false);
  };

  return (
    <div className={classNames(
      'DropdownSelect',
      { 'is-active': isActive },
    )}
    >
      <label
        htmlFor={paramName}
        className="DropdownSelect__label"
      >
        {label}
        <select
          name={paramName}
          id={paramName}
          className="DropdownSelect__select"
          value={selectValue}
          onChange={handleSetValue}
          onMouseDown={handleToggleDropdown}
        >
          {children}
        </select>

        <ul>
          {options.map(({ props }) => (
            <li key={props.value}>
              <SearchLink
                params={{ [paramName]: props.value, page: '1' }}
                onClick={handleLinkClick}
              >
                {props.children}
              </SearchLink>
            </li>
          ))}
        </ul>
      </label>
    </div>
  );
};
