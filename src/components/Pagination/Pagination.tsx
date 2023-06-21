import { useState, useEffect } from 'react';

import { ArrowButton } from '../Button/ArrowButton';
import { ProductsList } from '../ProductsList/ProductsList';
import { PaginationButton } from './PaginationButton';
import { ProductCard } from '../ProductCard/ProductCard';

import { useMyParams } from '../../hooks/useQueryParams';
import { getNumbers, getItemsToShowIndex } from '../../helpers/pagination';
import { Product } from '../../types/product';
import './Pagination.scss';

type PaginationProps = {
  total: number;
  perPage: string;
  products: Product[];
};

export const Pagination = ({ total, perPage, products }: PaginationProps) => {
  const [page, setPage] = useState(1);
  const { handleQueryParams } = useMyParams('page', `${page}`, value =>
    setPage(+value));

  const handlePageChange = (value: number) => {
    setPage(value);
    handleQueryParams(`${value}`);
  };

  useEffect(() => {
    handlePageChange(1);
  }, [perPage]);

  const numberOfPages = perPage === 'all' ? 1 : Math.ceil(total / +perPage);
  const pages = getNumbers(1, numberOfPages);

  const [from, to] = getItemsToShowIndex(perPage, page, total);
  const visibleProducts = products.slice(from, to);

  return (
    <>
      <ProductsList>
        {visibleProducts.map(product => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ProductsList>

      {numberOfPages > 1 && (
        <ul className="pagination" data-cy="pagination">
          <li>
            <ArrowButton
              onClick={() => handlePageChange(page - 1)}
              isDisabled={page === 1}
              size="small"
              arrow="left"
              data-cy="paginationLeft"
              alt="Pagination left button"
            />
          </li>

          <li>
            <ul className="pagination__pages-container">
              {pages.map(pageNumber => (
                <li key={pageNumber} className="pagination__page">
                  <PaginationButton
                    pageNumber={pageNumber}
                    currentPage={page}
                    onPageChange={handlePageChange}
                  />
                </li>
              ))}
            </ul>
          </li>

          <li>
            <ArrowButton
              data-cy="paginationRight"
              onClick={() => handlePageChange(page + 1)}
              isDisabled={page === numberOfPages}
              size="small"
              arrow="right"
              alt="Pagination right button"
            />
          </li>
        </ul>
      )}
    </>
  );
};
