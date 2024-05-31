/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useSearchParams } from 'react-router-dom';
import { filterByQuery, filterProducts } from '../../helper/Filters';
import { Product } from '../../helper/Product';
import { ProductList } from '../ProductList/ProductList';
import {
  getAmountPage,
  getList,
  getNewPages,
  getNumbers,
} from '../../helper/utils';
import './Pigination.scss';
import classNames from 'classnames';
import { getSearchWith } from '../../helper/searchHelper';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ProductContext } from '../../helper/ProductContext';

interface Props {
  products: Product[];
  sort: string;
  perPage: string;
  onClickPage: (value: string) => void;
  currentPage: string;
  onArrowClick: (value: number) => void;
  onChangeProducts: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  products,
  sort,
  perPage,
  onClickPage,
  currentPage,
  onArrowClick,
  onChangeProducts,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { appliedQuery } = useContext(ProductContext);
  const [prevQuery, setPrevQuery] = useState('');
  const [neededPages, setNeededPages] = useState<number[]>([1, 2, 3, 4]);

  const pageHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClickPage(event.currentTarget.innerText);
  };

  const filteredByQuery = useMemo(() => {
    if (!appliedQuery || appliedQuery === prevQuery) {
      return products;
    }

    const search = getSearchWith(searchParams, {
      query: appliedQuery,
      page: '1',
    });

    setSearchParams(search);
    setPrevQuery(appliedQuery);

    return filterByQuery(products, appliedQuery);
  }, [appliedQuery, products]);

  const total = filteredByQuery.length;
  const amountPages = getAmountPage(perPage, total);

  const pages = getNumbers(1, amountPages);
  const cardAmount = getList(+currentPage, total, perPage);
  const [start, end] = cardAmount;

  const isNext = +currentPage <= pages.length - 1;
  const isPrev = +currentPage > pages[0];

  const filteredProducts = filterProducts(filteredByQuery, sort);
  const productsPerPage = filteredProducts.slice(start, end);

  const getNext = () => {
    if (+currentPage < amountPages) {
      onArrowClick(+currentPage + 1);

      const newPages = getNewPages(+currentPage, pages);

      setNeededPages(newPages);
    }
  };

  const getPrev = () => {
    if (+currentPage > pages[0]) {
      onArrowClick(+currentPage - 1);
    }

    const newPages = getNewPages(+currentPage, pages);

    setNeededPages(newPages);
  };

  useEffect(() => {
    const newPages = getNewPages(+currentPage, pages);

    if (JSON.stringify(neededPages) !== JSON.stringify(newPages)) {
      setNeededPages(newPages);
    }

    onChangeProducts(filteredProducts.length);
  }, [filteredProducts, onChangeProducts]);

  return (
    <>
      <div className="productList" data-cy="productList">
        <ProductList products={productsPerPage} />
      </div>

      {perPage !== 'all' && total > +perPage && (
        <ul data-cy="pagination" className="pagination">
          <button
            className="pagination__item pagination__item--button"
            disabled={+currentPage === pages[0]}
          >
            <Link
              data-cy="paginationLeft"
              to={{
                search: getSearchWith(
                  searchParams,
                  isPrev ? { page: (+currentPage - 1).toString() } : {},
                ),
              }}
              className="pagination__arrey pagination__arrey--prev"
              onClick={getPrev}
              aria-disabled={+currentPage === pages[0]}
            />
          </button>

          <div className="pagination__pages">
            {neededPages.map(page => (
              <li
                className={classNames('pagination__item', {
                  'is-active': page === +currentPage,
                })}
                key={page}
              >
                <Link
                  to={{
                    search: getSearchWith(searchParams, {
                      page: page.toString(),
                    }),
                  }}
                  key={page}
                  onClick={pageHandler}
                  className={classNames('pagination__link', {
                    'is-active': page === +currentPage,
                  })}
                >
                  {page}
                </Link>
              </li>
            ))}
          </div>

          <button
            className="pagination__item pagination__item--button"
            disabled={+currentPage > pages.length - 1}
          >
            <Link
              data-cy="paginationRight"
              to={{
                search: getSearchWith(
                  searchParams,
                  isNext ? { page: (+currentPage + 1).toString() } : {},
                ),
              }}
              className="pagination__arrey pagination__arrey--next"
              onClick={getNext}
              aria-disabled={+currentPage === pages.length - 1}
            />
          </button>
        </ul>
      )}
    </>
  );
};
