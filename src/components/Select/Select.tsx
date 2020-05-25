import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import cn from 'classnames';

import './Select.scss';

type Props = {
  options: SortType[];
};

export const Select: React.FC<Props> = ({ options }) => {
  const defaultSortType = options.find(item => item.isDefault) || options[0];
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentSortType = useMemo(
    () => searchParams.get('sortBy') || defaultSortType,
    [searchParams, defaultSortType],
  );
  const currentPage = useMemo(() => searchParams.get('page'), [searchParams]);
  const currentPerPage = useMemo(() => searchParams.get('perPage'), [searchParams]);

  const currentOption = options.find(option => option.type === currentSortType) || defaultSortType;
  const [isOpen, setIsOpen] = useState(false);

  const chooseSelectValue = (option: SortType) => {
    searchParams.set('sortBy', option.type);

    currentPage && searchParams.set('page', currentPage);
    currentPerPage && searchParams.set('perPage', currentPerPage);

    history.push({
      search: searchParams.toString(),
    });

    setIsOpen(false);
  };

  const clickSubscribe = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.removeEventListener('click', clickSubscribe);
    } else {
      document.documentElement.addEventListener('click', clickSubscribe);
    }
  }, [isOpen]);

  return (
    <div
      className={cn({
        Select: true,
        Select__Closest: !isOpen,
      })}
    >
      <label
        className={cn({
          'Select__Active--after': isOpen,
        })}
      />

      <button
        type="button"
        className={cn({
          Select__Active: true,
          'Select__Active--opened': isOpen,
        })}
        onClick={() => setIsOpen(true)}
      >
        {currentOption.name}
        <span>
          <div className={cn({
            Select__Arrow: true,
            'Select__Arrow--opened': isOpen,
          })}
          />
        </span>
      </button>
      <ul className={cn({
        Select__List: true,
        'Select__List--opened': isOpen,
      })}
      >
        {options.map(option => (
          option.type !== currentOption.type && (
            <li
              key={option.name}
              className="Select__Item"
              data-value={option.type}
              onClick={() => chooseSelectValue(option)}
            >
              {option.name}
            </li>
          )
        ))}
      </ul>
    </div>
  );
};
