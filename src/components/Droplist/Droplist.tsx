import classNames from 'classnames';
import {
  FC, useRef, useEffect, useState,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';
import arrowDown from '../../assets/svg/arrowDown.svg';

import './droplist.scss';

type Props = {
  options: string[];
  startValue: string;
  label: string;
  searchParamsKey: string;
};

export const Droplist: FC<Props> = ({
  options,
  startValue,
  label,
  searchParamsKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(startValue);
  const bntRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target !== bntRef.current) {
        setIsOpen(false);
      }
    });

    return () => {
      document.addEventListener('keyup', (e) => {
        if (e.key === 'Tab' || e.key === 'Escape') {
          setIsOpen(false);
        }
      });
    };
  }, []);

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

  return (
    <div className="droplist">
      <p className="droplist__label">{label}</p>
      <button
        ref={bntRef}
        type="button"
        className={classNames('droplist__select', {
          'droplist__select--active': isOpen,
        })}
        onClick={toggle}
      >
        {value}
        <img
          src={arrowDown}
          alt="arrow"
          className={classNames('droplist__arrow', {
            'droplist__arrow--open': isOpen,
          })}
        />
      </button>

      {isOpen && (
        <ul className="droplist__list-option">
          {options.map((option) => (
            <li
              aria-hidden="true"
              key={option}
              className="droplist__option"
              onClick={() => {
                setValue(option);
                setIsOpen(false);
              }}
            >
              <Link
                to={{
                  search: getSearchParams(option),
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
