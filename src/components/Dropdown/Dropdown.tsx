import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.scss';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '../../helpers/constants';

type Props = {
  title: string;
  options: { [key: string]: string },
  searchParam: 'sort' | 'perPage',
  defaultValue: string | null,
};

export const Dropdown: React.FC<Props> = ({
  title,
  options,
  searchParam,
  defaultValue,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOption = searchParams.get(searchParam) || defaultValue;

  const dropdownListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const dropdownList = dropdownListRef.current;

    if (dropdownList) {
      if (isDropdownOpen) {
        dropdownList.classList.add('dropdown__list--visible');
      } else {
        dropdownList.classList.remove('dropdown__list--visible');
      }
    }
  }, [isDropdownOpen]);

  const toggle = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (
      event.relatedTarget
      && event.relatedTarget?.className.includes('dropdown__value')
    ) {
      return;
    }

    setIsDropdownOpen(false);
  };

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === ITEMS_PER_PAGE.All) {
      params.delete(searchParam);
      params.delete('page');
    } else {
      params.set(searchParam, value);
      if (params.get('perPage')) {
        params.set('page', '1');
      }
    }

    setSearchParams(params);
    setIsDropdownOpen(false);
  };

  return (
    <div className={cn('dropdown', {
      'dropdown--sort-by': searchParam === 'sort',
      'dropdown--per-page': searchParam === 'perPage',
    })}
    >
      <p className="dropdown__title">
        {title}
      </p>

      <button
        className="dropdown__trigger"
        type="button"
        onClick={toggle}
        onBlur={handleBlur}
      >
        <p className="dropdown__selected">
          {Object.keys(options)
            .find(key => options[key] === selectedOption) || 'Choose option'}
        </p>
        {isDropdownOpen
          ? (<i className="icon icon--arrow-disabled-up" />)
          : (<i className="icon icon--arrow-disabled-down" />)}
      </button>

      <ul className="dropdown__list" ref={dropdownListRef}>
        {Object.entries(options).map(([key, value]) => (
          <li key={key}>
            <button
              type="button"
              className="dropdown__value"
              onClick={() => {
                handleSelect(value);
              }}
            >
              {key}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
