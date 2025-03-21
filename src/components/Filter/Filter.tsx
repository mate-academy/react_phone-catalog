import cl from 'classnames';
import s from './Filter.module.scss';
import { useState } from 'react';
import { PER_PAGE, SORT_BY } from '../../constants';
import { useSearchParams } from 'react-router-dom';

type Props = {
  sortField: 'sortBy' | 'perPage';
};

export const Filter: React.FC<Props> = ({ sortField }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const sortBy =
    sortField === 'sortBy'
      ? searchParams.get('sortBy') || SORT_BY.newest
      : searchParams.get('perPage') || 16;

  const title = sortField === 'sortBy' ? 'Sort By' : 'Items';

  const itemsToShow = sortField === 'sortBy' ? SORT_BY : PER_PAGE;

  const handleChangeSort = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);
    setSearchParams(params);
    setIsOpen(false);
  };

  return (
    <div
      className={cl(s.Filter__sortBlock, {
        [s.Filter__sortBlockFirst]: sortField === 'sortBy',
        [s.Filter__sortBlockSecond]: sortField === 'perPage',
      })}
    >
      <p className={s.Filter__sortBy}>{title}</p>
      <button
        className={s.Filter__buttonMenu}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {itemsToShow[sortBy as keyof typeof itemsToShow]}
        <img
          className="icon"
          src={`/img/icons/icon-arrow${isOpen ? 'UpGray' : 'DownGray'}.svg`}
          alt="arrowDown"
        />
      </button>
      {isOpen && (
        <ul className={s.Filter__list}>
          {Object.entries(itemsToShow).map(([key, value]) => (
            <li
              onClick={() => handleChangeSort(sortField, key)}
              className={cl(s.Filter__itemMenu, {
                [s.Filter__disabled]: sortBy === key,
              })}
              key={key}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
