import './Dropdown.scss';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';
import { getSearchWith } from '../../helpers/searchHelper';

interface Props {
  title: string,
  defaultValue: string | null,
  options: { [key: string]: string },
  searchParam: SearchParams,
  columns: number
}

export const Dropdown: React.FC<Props> = ({
  title,
  defaultValue,
  options,
  searchParam,
  columns,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOption = searchParams.get(searchParam) || defaultValue;

  const toggle = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (
      event.relatedTarget
      && event.relatedTarget?.className.includes('dropdown__value')
    ) {
      return;
    }

    setIsOpen(false);
  };

  const handleSelect = (newParam: { [key: string]: string }) => {
    if (searchParams.toString().includes(SearchParams.Page)) {
      setSearchParams(getSearchWith({
        ...newParam,
        [SearchParams.Page]: '1',
      }, searchParams));
    } else {
      setSearchParams(getSearchWith(newParam, searchParams));
    }

    setIsOpen(false);
  };

  return (
    <div className={`dropdown dropdown--col-${columns}`}>
      <label className="dropdown__title">{title}</label>

      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        className="dropdown__button"
        type="button"
        onClick={toggle}
        onBlur={handleBlur}
      >
        <p className="dropdown__selected">
          {Object.keys(options)
            .find(key => options[key] === selectedOption) || 'Choose option'}
        </p>
        {isOpen
          ? (<i className="icon icon--arrow-top-grey" />)
          : (<i className="icon icon--arrow-down-grey" />)}
      </button>

      {isOpen && (
        <ul className="dropdown__list">
          {Object.entries(options).map(([key, value]) => (
            <li key={key} className="dropdown__item">
              {/* eslint-disable-next-line react/button-has-type */}
              <button
                className="dropdown__value"
                onClick={() => {
                  handleSelect({ [searchParam]: value });
                }}
              >
                {key}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
