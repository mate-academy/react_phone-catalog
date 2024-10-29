import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import './DropDown.scss';
import { SearchLink } from '../SearchLink/SearchLink';

type DropDownParams = {
  sort?: string;
  perPage?: string | null;
};

type DropDownElement = {
  title: string;
  params: DropDownParams;
};

interface Props {
  title: string;
  dropDownData: DropDownElement[];
}

export const DropDown: React.FC<Props> = ({ title, dropDownData }) => {
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsDropDownActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButton = () => {
    setIsDropDownActive(!isDropDownActive);
  };

  return (
    <div
      ref={dropDownRef}
      className={cn('dropdown', { 'is-active': isDropDownActive })}
    >
      <div className="dropdown__label">{title}</div>
      <button type="button" className="dropdown__button" onClick={handleButton}>
        <span className="dropdown__title">{dropDownData[0].title}</span>
      </button>
      <div className="dropdown__menu">
        {dropDownData.map(el => (
          <SearchLink
            key={el.title}
            newParams={el.params}
            className="dropdown__item"
            onClick={() => setIsDropDownActive(false)}
          >
            {el.title}
          </SearchLink>
        ))}
      </div>
    </div>
  );
};
