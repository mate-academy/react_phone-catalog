import React, { useState } from 'react';
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

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropDownActive(!isDropDownActive);
    }
  };

  return (
    <div
      className={cn('dropdown', { 'is-active': isDropDownActive })}
      onBlur={handleBlur}
    >
      <div className="dropdown__label">{title}</div>
      <button
        type="button"
        className="dropdown__button"
        onClick={() => setIsDropDownActive(!isDropDownActive)}
      >
        <span className="dropdown__title">{dropDownData[0].title}</span>
        <span>
          <i
            className={cn('ico', {
              'ico-down': !isDropDownActive,
              'ico-up': isDropDownActive,
            })}
          />
        </span>
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
