import { FC, useEffect, useState } from 'react';
import { Products } from 'src/types/products';
import style from './productList.module.scss';

import { Dropdown } from '../Dropdown/Dropdown';
import { Card } from '../Card/Cards';

import { PaginationPage } from '../Pagination/Pagination';
import { getNumbers } from './getNum';
import { fetchProducts } from '@Fetch';

type Props = {
  data: Products[];
  title: string;
};

export const ProductList: FC<Props> = ({ title, data }) => {
  const [selected, setSelected] = useState('Chose One');

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(16);

  const sortBy = ['Newest', 'Alphabetically', 'Cheapest'];

  const sortPage = [16, 8, 4];

  const [phones, setPhones] = useState<Products[]>([]);

  const handlePageChange = (numPage: number) => {
    if (numPage === currentPage) {
      return;
    }

    setCurrentPage(numPage);
  };

  const handlePerPage = (per: number) => {
    if (perPage !== per) {
      setCurrentPage(1);
      setPerPage(per);
    }
  };

  const total = data.length;
  const perPages = perPage;
  const start = (currentPage - 1) * perPages + 1;
  const end = Math.min(start + perPages - 1, total);

  const items = getNumbers(start, end);

  useEffect(() => {
    fetchProducts().then((api: Products[]) => {
      const result = api.filter((el: Products) => el.category === 'phones');

      setPhones(result.sort((a, b) => b.year - a.year));
    });
  }, [perPage, currentPage, selected]);

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
          <Dropdown<number>
            sort={sortPage}
            selected={perPage}
            onSelect={handlePerPage}
          />
        </div>
      </div>
      <div className={style.wrapper}>
        <ul>
          {items.map((el, index) => {
            return (
              <li key={index} data-cy="item">
                <Card item={phones[start - 1 + index]} title="0" />
              </li>
            );
          })}
        </ul>

        <div className={style.pagination}>
          <PaginationPage
            total={total}
            perPage={perPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};
