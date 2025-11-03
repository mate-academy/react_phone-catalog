import { FC, useMemo, useState } from 'react';
import { Products } from 'src/types/products';
import style from './productList.module.scss';

import { Dropdown } from '../Dropdown/Dropdown';
import { Card } from '../Card/Cards';

import { PaginationPage } from '../Pagination/Pagination';

import { sortItems } from './sortProducts';

type Props = {
  data: Products[];
  title: string;
  loading: boolean;
};

export enum SortBy {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
}

export const ProductList: FC<Props> = ({ title, data }) => {
  const [selected, setSelected] = useState('Chose One');
  const [currentPage, setCurrentPage] = useState(1);

  const [perPage, setPerPage] = useState<number | string>(16);
  const sortPage = [16, 8, 4, 'All'];

  const sortBy: SortBy[] = [
    SortBy.Newest,
    SortBy.Alphabetically,
    SortBy.Cheapest,
  ];

  const handlePageChange = (numPage: number) => {
    if (numPage === currentPage) {
      return;
    }

    setCurrentPage(numPage);
  };

  const filteredAndSortedData = useMemo(() => {
    const dataCop = [...data];

    setCurrentPage(1);

    return sortItems(dataCop, selected);
  }, [data, selected]);

  const currentItems = useMemo(() => {
    const total = filteredAndSortedData.length;
    const perPages = perPage;
    let start = 0;
    let end = total;

    if (typeof perPages !== 'string') {
      start = (currentPage - 1) * perPages;
      end = Math.min(start + perPages, total);
    }

    return filteredAndSortedData.slice(start, end);
  }, [filteredAndSortedData, currentPage, perPage]);

  const handlePerPage = (per: number | string) => {
    if (perPage !== per) {
      setCurrentPage(1);
      setPerPage(per);
    }

    if (per === 'All') {
      setPerPage(per);
    }
  };

  return (
    <>
      <h2 className="title">{title}</h2>
      <span className={style.quantity}>{data.length}</span>
      <div className={style.drowdowns}>
        <div>
          <span>Sort by</span>
          <Dropdown<string>
            sort={sortBy}
            selected={selected}
            onSelect={setSelected}
          />
        </div>
        <div>
          <span>Items on page</span>
          <Dropdown<number | string>
            sort={sortPage}
            selected={perPage}
            onSelect={handlePerPage}
          />
        </div>
      </div>

      <div className={style.wrapper}>
        <ul className={style.items}>
          {currentItems.map((item, i) => (
            <li key={item.id || i}>
              <Card item={item} title="0" />
            </li>
          ))}
        </ul>

        {perPage !== 'All' && (
          <div className={style.pagination}>
            <PaginationPage
              total={filteredAndSortedData.length}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};
