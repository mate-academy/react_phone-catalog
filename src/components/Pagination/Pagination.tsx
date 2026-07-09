import React from 'react';
import { Icon } from '../ui/Icon/Icon';
import style from './Pagination.module.scss';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  countItems: number;
};

export const Pagination: React.FC<Props> = ({ countItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || `${countItems}`;
  const numberPages = Math.ceil(countItems / +perPage);

  const pages = Array.from({ length: numberPages }, (_, ind) => ind + 1);
  const start = +page < 4 ? 0 : +page - 3;
  const end = start + 4;
  const pagesSlice = pages.slice(start, end);

  const setPage = (newPage: string) => {
    if (+newPage < 1) {
      return;
    }

    const newSearchParams = getSearchWith(searchParams, {
      page: newPage === '1' ? null : newPage,
    });

    setSearchParams(newSearchParams);
  };

  return (
    <nav className={style.pagination}>
      <ul className={style.pagination__list}>
        <li className={style.pagination__item}>
          <button
            className={style.pagination__button}
            disabled={page === '1'}
            onClick={() => setPage(`${+page - 1}`)}
          >
            <Icon className={style.pagination__icon} nameIcon="left" />
          </button>
        </li>

        {pagesSlice.map((sheet, index) => (
          <li
            key={index}
            className={classNames(style.pagination__item, {
              [style['pagination__item--current']]: `${sheet}` === page,
            })}
            onClick={() => setPage(`${sheet}`)}
          >
            {sheet}
          </li>
        ))}

        <li className={style.pagination__item}>
          <button
            className={style.pagination__button}
            disabled={page === `${pages.at(-1)}`}
            onClick={() => setPage(`${+page + 1}`)}
          >
            <Icon className={style.pagination__icon} nameIcon="right" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
