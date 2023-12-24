import classNames from 'classnames';
import React, {
  useRef, useEffect, useState,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/serchWith';

import './Droplist.scss';

type Props = {
  options: string[];
  startValue: string;
  label: string;
  searchParamsKey: string;
};

export const Droplist: React.FC<Props> = ({
  options,
  startValue,
  label,
  searchParamsKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const bntRef = useRef<HTMLButtonElement>(null);
  const sortBy = searchParams.get(searchParamsKey) || startValue;

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target !== bntRef.current) {
        setIsOpen(false);
      }
    });
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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

  const sortText = options.find(item => item === sortBy);

  return (
    <div className="droplist">
      <p className="droplist__label">{label}</p>
      <button
        ref={bntRef}
        type="button"
        className={classNames('droplist__select', {
          'droplist__select--active': isOpen,
        })}
        onClick={handleClick}
      >
        {sortText}
        <span
          className="droplist__arrow"
          style={{
            transform: isOpen
              ? 'rotate(180deg)'
              : 'rotate(0deg)',
          }}
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
                setIsOpen(false);
              }}
            >
              <Link
                to={{
                  search: getSearchParams(option),
                }}
                className="droplist__link"
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
