import { Link, useSearchParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

import './MySelect.scss';
import { SearchTypes, SelectItems, SelectOption } from '../../../types/select';
import { getSearchParamsWith } from '../../../helpers/searchParams';

type Props = {
  defaultValue: string;
  title: string;
  options: SelectOption[];
  searchName: SearchTypes;
};

export const MySelect: React.FC<Props> = ({
  options,
  defaultValue,
  title,
  searchName,
}) => {
  const entries = Object.values(options);
  const [selected, setSelected] = useState(defaultValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page');

  const button = useRef<HTMLButtonElement>(null);

  function handleSelect(option: SelectItems) {
    setSelected(option);
    setShowDropdown(false);
  }

  function handleShowDropdown() {
    setShowDropdown(!showDropdown);

    if (showDropdown) {
      button.current?.blur();
    } else {
      button.current?.focus();
    }
  }

  function handleBodyClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.id === 'my-select') {
      return;
    }

    setShowDropdown(false);
  }

  useEffect(() => {
    document.addEventListener('click', handleBodyClick);

    return () => {
      document.removeEventListener('click', handleBodyClick);
    };
  }, []);

  return (
    <div className="my-select">
      <p className="my-select__title">{title}</p>

      <button
        ref={button}
        type="button"
        id="my-select"
        className="my-select__selected"
        onClick={() => handleShowDropdown()}
      >
        {selected}
      </button>

      <div
        className="my-select__wrapper"
        style={{
          pointerEvents: showDropdown ? 'all' : 'none',
          height: showDropdown ? '150px' : '0px',
        }}
      >
        <div
          className="my-select__dropdown"
          style={{
            transform: `translateY(${showDropdown ? 0 : '-100%'})`,
          }}
        >
          {entries.map(el => {
            const option = Object.values(el)[0];
            const value = Object.keys(el)[0];

            return (
              <Link
                key={option}
                to={{
                  search: getSearchParamsWith({
                    [searchName]: value.toLowerCase(),
                    page: page && '1',
                  }, searchParams),
                }}
                className="my-select__option"
                onClick={() => handleSelect(option)}
              >
                {option}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
