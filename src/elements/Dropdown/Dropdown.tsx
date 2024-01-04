import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/getFunctions/getSearch';
import { Sort } from '../../helpers/getFunctions/getSortedProducts';
import './Dropdown.scss';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

type Props = {
  title: string;
  queryName: string;
  sortData: object;
  onClick: (key?: Sort) => void;
  defaultVal: string;
};

export const Dropdown: React.FC<Props> = ({
  title,
  queryName,
  sortData,
  onClick,
  defaultVal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const search = searchParams.get(queryName) as keyof typeof sortData;
  const params = Object.entries(sortData);
  const category = search ? sortData[search] : defaultVal;

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
      className={classNames('dropdown')}
      onClick={(e => e.stopPropagation())}
    >
      <p className="dropdown__category">{title}</p>

      <button
        type="button"
        className="dropdown__button dropdown__button--sort"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        aria-label="button"
        defaultValue={defaultVal}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown__option">{category}</span>
        <ButtonIcon
          type="event"
          dynamicClasses={['no-border']}
          shape={isOpen ? 'up' : 'down'}
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
                  [queryName]: key, page: null,
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
