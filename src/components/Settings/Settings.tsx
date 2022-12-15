import React, { FC } from 'react';
import { Paginator } from './Paginator';
import './Settings.scss';
import { Select } from '../UI/Select';

type Props = {
  sort: string;
  perPage: string;
  page: string;
  setSort: (value: string) => void;
  setPage: (value: string) => void;
  children: React.ReactNode;
  totalItems: number;
};
export const Settings: FC<Props> = (
  {
    sort,
    perPage,
    setSort,
    setPage,
    children,
    totalItems,
    page,
  },
) => {
  const pagesCount = Math.ceil(totalItems / +perPage);

  const showPagination = totalItems >= 5;

  const sortOptions = [
    { title: 'Newest', value: 'age' },
    { title: 'Alphabetically', value: 'name' },
    { title: 'Cheapest', value: 'price' },
  ];
  const perPageOptions = [
    { title: '4', value: '4' },
    { title: '8', value: '8' },
    { title: '16', value: '16' },
  ];

  return (
    <section className="settings">
      <div className="settings__selects">
        <Select
          title="Sort by"
          options={sortOptions}
          action={setSort}
          defaultValue={sort}
        />
        { showPagination && (
          <Select
            title="Items on page"
            options={perPageOptions}
            action={setPage}
            defaultValue={perPage}
          />
        )}
      </div>
      { children }
      {showPagination && (
        <div className="settings__paginator">
          <Paginator
            pagesCount={pagesCount}
            currentPage={page}
          />
        </div>
      )}
    </section>
  );
};
