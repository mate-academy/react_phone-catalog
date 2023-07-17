import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import './Dropdown.scss';

type Props = {
  dropdownList: string[];
  defaultValue: string;
  label: string;
  searchParamsKey: string;
};

export const Dropdown: React.FC<Props> = ({
  dropdownList,
  defaultValue,
  label,
  searchParamsKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(defaultValue);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getSearchParams = (params: string) => {
    if (searchParamsKey === 'perPage') {
      return getSearchWith(searchParams, {
        page: '1',
        [searchParamsKey]: params,
      });
    }

    return getSearchWith(searchParams, {
      [searchParamsKey]: params,
    });
  };

  document.addEventListener('click', (e) => {
    if (e.target !== buttonRef.current) {
      setIsOpen(false);
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Tab' || e.key === 'Escape') {
      setIsOpen(false);
    }
  });

  return (
    <div className="dropdown">
      <p className="dropdown__label">{label}</p>
      <button
        ref={buttonRef}
        type="button"
        className={classNames('dropdown__select', {
          'dropdown__select--active': isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
        <img
          src="./img/ArrowDown.svg"
          alt="ArrowDown"
          className={classNames('dropdown__arrow', {
            'dropdown__arrow--open': isOpen,
          })}
        />
      </button>

      {isOpen && (
        <ul className="dropdown__options">
          {dropdownList.map(dropdownItem => (
            <li
              aria-hidden="true"
              key={dropdownItem}
              className="dropdown__option"
              onClick={() => {
                setValue(dropdownItem);
                setIsOpen(false);
              }}
            >
              <Link
                to={{
                  search: getSearchParams(dropdownItem),
                }}
              >
                {dropdownItem}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
