import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/utils/getSearch';
import { Sort } from '../../helpers/utils/getSortedProducts';
import './Dropdown.scss';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

type Props = {
  title: string;
  queryName: string;
  sortData: object;
  onClick: (key?: Sort) => void;
};

export const Dropdown: React.FC<Props> = ({
  title,
  queryName,
  sortData,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const search = searchParams.get(queryName) as keyof typeof sortData;
  const params = Object.entries(sortData);
  const defaultParam = params[0][1];
  const category = search ? sortData[search] : defaultParam;

  const handleClick = (key?: Sort) => {
    setIsOpen(!isOpen);
    onClick?.(key as Sort);
  };

  useEffect(() => {
    const f = () => setIsOpen(false);

    document.addEventListener('click', f);

    return () => document.removeEventListener('click', f);
  }, []);

  return (
    <div
      role="presentation"
      className="dropdown"
      onClick={(e => e.stopPropagation())}
    >
      <p className="dropdown__category">{title}</p>

      <button
        type="button"
        className="dropdown__button dropdown__button--sort"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        aria-label="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown__option">{category}</span>
        <ButtonIcon
          type="event"
          dynamicClasses={['no-border']}
          shape={isOpen ? 'up-light' : 'down'}
        />
      </button>

      <ul
        id="dropdown-menu"
        role="menu"
        className={classNames('dropdown__list', {
          'dropdown__list--hidden': !isOpen,
        })}
      >
        {params.map(([key, val]) => (
          <li
            key={key}
            className="dropdown__item"
          >
            <Link
              className="dropdown__link"
              onClick={() => handleClick(key as Sort)}
              to={{
                search: getSearchWith({
                  [queryName]: key,
                }, searchParams),
              }}
            >
              {val}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
