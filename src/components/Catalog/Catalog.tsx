import React, { useContext, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import classNames from 'classnames';
import { MenuOpen } from '../../utils/MenuContext';
import { Product } from '../../types/Propduct';

import './Catalog.scss';

type Props = {
  products: Product[];
};

export enum ElementsPerPage {
  three = 3,
  five = 5,
  ten = 10,
  twenty = 20,
}

export const Catalog: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const [elemsPerPage, setElemsPerPage] = useState(
    searchParams.get('perPage') || ElementsPerPage.five,
  );
  const lastPage: number = +products.length;
  const paginationCount: number[] = [];
  let itemsAndPage = [];

  const { isMenuOpen } = useContext(MenuOpen);

  const title = () => {
    switch (products[0].category) {
      case 'phones':
        return 'Mobile phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return '';
    }
  };

  for (let i = 1; i <= Math.ceil(products.length / +elemsPerPage); i++) {
    paginationCount.push(i);
  }

  function getElentsPerPageInUrl(value: string) {
    setSearchParams({ page: page.toString(), perPage: value });
  }

  if (page === 1) {
    itemsAndPage = products.slice(0, +elemsPerPage);
  } else {
    itemsAndPage = products.slice(
      (+page - 1) * +elemsPerPage,
      Math.min(+elemsPerPage * +page, lastPage),
    );
  }

  return (
    <div className="Catalog">
      <Header />
      {isMenuOpen && <Menu />}
      <main className="catalog-main">
        <div className="navigation">
          <Link to="/" className="navigation__home" />
          <img src="\img\arrow-next-disabled.svg" alt="next page" />
          <p className="navigation__current-page">{products[0].category}</p>
        </div>
        <h1 className="catalog-main__title">{title()}</h1>
        <p className="catalog-main__models-quantity">
          {products.length} models
        </p>
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          onChange={event => {
            setPage(1);
            setElemsPerPage(+event.target.value);
            getElentsPerPageInUrl(event.target.value);
          }}
        >
          <option value="3" selected={+elemsPerPage === 3}>
            {ElementsPerPage.three}
          </option>
          <option value="5" selected={+elemsPerPage === 5}>
            {ElementsPerPage.five}
          </option>
          <option value="10" selected={+elemsPerPage === 10}>
            {ElementsPerPage.ten}
          </option>
          <option value="20" selected={+elemsPerPage === 20}>
            {ElementsPerPage.twenty}
          </option>
        </select>
        {itemsAndPage.map(item => (
          <div key={item.id}>{item.id}</div>
        ))}
        <ul className="pagination">
          <li className={classNames('page-item')}>
            <Link
              data-cy="prevLink"
              className={classNames('page-link', {
                'disabled-link': page === 1,
              })}
              to={`?page=${+page - 1}&perPage=${elemsPerPage}`}
              onClick={() => setPage(+page - 1)}
            >
              «
            </Link>
          </li>

          {paginationCount.map(count => (
            <li
              key={count.toString()}
              className={classNames('page-item', {
                active: page === count,
              })}
              onClick={() => setPage(count)}
            >
              <Link
                data-cy="pageLink"
                className="page-link"
                to={`?page=${count}&perPage=${elemsPerPage}`}
              >
                {count}
              </Link>
            </li>
          ))}
          <li
            className={classNames('page-item', {
              disabled: page === paginationCount.length,
            })}
          >
            <Link
              data-cy="nextLink"
              className={classNames('page-link', {
                'disabled-link': page === paginationCount.length,
              })}
              to={`?page=${+page + 1}&perPage=${elemsPerPage}`}
              onClick={() => setPage(+page + 1)}
            >
              »
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
};
