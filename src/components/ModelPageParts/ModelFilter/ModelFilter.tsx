import cl from 'classnames';
import s from './ModelFilter.module.scss';
import ArrowIcon from '../../../img/icons/icon-arrow.svg?react';

import { useState } from 'react';
import { PER_PAGE, SortBy } from '../../../constants';
import { useSearchParams } from 'react-router-dom';

type Props = {
  sortField: 'sortBy' | 'perPage';
};

export const ModelFilter: React.FC<Props> = ({ sortField }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const sortBy =
    sortField === 'sortBy'
      ? searchParams.get('sortBy') || SortBy.newest
      : searchParams.get('perPage') || 16;

  const title = sortField === 'sortBy' ? 'Sort By' : 'Items';
  const itemsToShow = sortField === 'sortBy' ? SortBy : PER_PAGE;

  const handleChangeSort = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);
    params.set('page', '1');
    setSearchParams(params);
    setIsOpen(false);
  };

  return (
    <div
      className={cl(s.ModelFilter, {
        [s.ModelFilter__blockFirst]: sortField === 'sortBy',
        [s.ModelFilter__blockSecond]: sortField === 'perPage',
      })}
    >
      <p className={s.ModelFilter__sortBy}>{title}</p>
      <button
        className={s.ModelFilter__buttonMenu}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {itemsToShow[sortBy as keyof typeof itemsToShow]}
        <ArrowIcon
          className={cl(`icon icon--down ${s.ModelFilter__icon}`, {
            [s.ModelFilter__iconOpen]: isOpen,
          })}
        />
      </button>
      <ul
        className={cl(s.ModelFilter__list, {
          [s.ModelFilter__listOpen]: isOpen,
        })}
      >
        {Object.entries(itemsToShow).map(([key, value]) => (
          <li
            onClick={() => handleChangeSort(sortField, key)}
            className={cl(s.ModelFilter__itemMenu, {
              [s.ModelFilter__itemMenuDisabled]: sortBy === key,
            })}
            key={key}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
