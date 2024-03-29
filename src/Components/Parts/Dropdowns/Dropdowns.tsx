import { FC, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';

import './DropDowns.scss';

type Props = {
  options: string[];
  startValue: string;
  label: string;
  searchParamsKey: string;
};

export const Dropdowns: FC<Props> = ({
  options,
  startValue,
  label,
  searchParamsKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(startValue);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.addEventListener('click', e => {
      if (!btnRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    });

    document.addEventListener('keyup', e => {
      if (e.key === 'Tab' || e.key === 'Escape') {
        setIsOpen(false);
      }
    });

    return () => {
      document.removeEventListener('click', e => {
        if (e.target !== btnRef.current) {
          setIsOpen(false);
        }
      });

      document.removeEventListener('keyup', e => {
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
    <div className="dropdowns">
      <p className="dropdowns__label">{label}</p>
      <button
        type="button"
        className={classNames('dropdowns__select', {
          'dropdowns__select--active': isOpen,
        })}
        onClick={toggle}
        ref={btnRef}
      >
        {value}
        <img
          src="./img/svg/Arrow__down.svg"
          alt="Arrow Down"
          className={classNames('dropdowns__arrow', {
            'dropdowns__arrow--open': isOpen,
          })}
        />
      </button>

      {isOpen && (
        <ul className="dropdowns__list-option">
          {options.map(option => {
            const handlerOption = (op: string) => {
              setValue(op);
              setIsOpen(false);
            };

            return (
              <li
                aria-hidden="true"
                className="dropdowns__option"
                key={option}
                onClick={() => handlerOption(option)}
              >
                <Link
                  to={{
                    search: getSearchParams(option),
                  }}
                >
                  {option}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
