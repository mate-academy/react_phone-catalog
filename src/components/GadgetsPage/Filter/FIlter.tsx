import React, { useEffect, useRef, useState } from 'react';
import './FilterStyle.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

interface Props {
  title: string;
  items: string[];
  type: 'sort' | 'itemsPerPage';
  defaultItem: number;
  selectedValue: string;
  onFilterChange: (value: string) => void;
}

const Filter: React.FC<Props> = ({
  title,
  items,
  type,
  selectedValue,
  onFilterChange,
}) => {
  const [active, setActive] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (elem: string) => {
    onFilterChange(elem);
    setActive(false);

    const newParams = new URLSearchParams(searchParams);

    if (type === 'itemsPerPage' && elem === 'all') {
      // Remove 'itemsOnPage' parameter if 'all' is selected
      newParams.delete('itemsPerPage');
    } else {
      // Set the parameter for both sort and itemsOnPage
      newParams.set(type, elem);
    }
    setSearchParams(newParams);
  };

  const handleOpen = () => {
    setActive(!active);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    const sortType = searchParams.get(type);

    if (typeof sortType === 'string') {
      onFilterChange(sortType);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown__title">{title}</div>
      <div className="dropdown__menu--wrapper">
        <button className="dropdown__menu--main" onClick={() => handleOpen()}>
          <div className="dropdown__menu--title">{selectedValue}</div>
          <img
            className={classNames('dropdown__menu--arrow', {
              'arrow--rotate': active,
            })}
            src="icons/arrow-up-black.png"
          />
        </button>
        <ul
          className={classNames('dropdown__select', {
            'dropdown__menu--active': active,
          })}
        >
          {items.map(elem => (
            <li
              value={elem}
              className="dropdown__menu--item"
              onClick={() => handleClick(elem)}
              key={elem}
            >
              {elem}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
