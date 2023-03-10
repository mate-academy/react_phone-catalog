import classNames from 'classnames';
import { FC, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../helpers/searchHelper';

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
  const bntRef = useRef<HTMLButtonElement>(null);

  document.addEventListener('click', (e) => {
    if (e.target !== bntRef.current) {
      setIsOpen(false);
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Tab' || e.key === 'Escape') {
      setIsOpen(false);
    }
  });

  const getSearchPatams = (params: string) => {
    if (searchPramsKey === 'perPage') {
      return getSearchWith(searchParams, {
        page: '1',
        [searchPramsKey]: params,
      });
    }

    return getSearchWith(searchParams, {
      [searchPramsKey]: params,
    });
  };

  return (
    <div className="dropdowns">
      <p className="dropdowns__label">{label}</p>
      <button
        ref={bntRef}
        type="button"
        className={classNames('dropdowns__select', {
          'dropdowns__select--active': isOpen,
        })}
        onClick={toggle}
      >
        {value}
        <img
          src="../../img/icons/ChevronArrowDown.svg"
          alt="arrow"
          className={classNames('dropdowns__arrow', {
            'dropdowns__arrow--open': isOpen,
          })}
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
