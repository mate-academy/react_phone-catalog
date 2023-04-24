import classNames from 'classnames';
import {
  FC, useRef, useState, useEffect,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { updateSearchParams } from '../../helpers/searchHelper';
import arrowDown from '../../assets/svg/arrowDown.svg';

import './dropdowns.scss';

type Props = {
  options: string[];
  startValue: string;
  label: string;
  searchPramsKey: string;
};

export const Dropdowns: FC<Props> = ({
  options,
  startValue,
  label,
  searchPramsKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(startValue);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen]);

  const getSearchPatams = (params: string) => {
    if (searchPramsKey === 'perPage') {
      return updateSearchParams(searchParams, {
        page: '1',
        [searchPramsKey]: params,
      });
    }

    return updateSearchParams(searchParams, {
      [searchPramsKey]: params,
    });
  };

  const selectClassNames = classNames('dropdowns__select', {
    'dropdowns__select--active': isOpen,
  });

  const arrowClassNames = classNames('dropdowns__arrow', {
    'dropdowns__arrow--open': isOpen,
  });

  return (
    <div className="dropdowns">
      <p className="dropdowns__label">{label}</p>
      <button
        ref={btnRef}
        type="button"
        className={selectClassNames}
        onClick={toggle}
      >
        {value}
        <img
          src={arrowDown}
          alt="arrow"
          className={arrowClassNames}
        />
      </button>

      {isOpen && (
        <ul className="dropdowns__list-option">
          {options.map((option) => (
            <li
              aria-hidden="true"
              key={option}
              className="dropdowns__option"
              onClick={() => {
                setValue(option);
                setIsOpen(false);
              }}
            >
              <Link
                to={{
                  search: getSearchPatams(option),
                }}
              >
                {option}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
