import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { IconButton } from '../../UI/IconButton/IconButton';
import { ProductsList } from '../../ProductsList/ProductsList';
import { PaginationButton } from './PaginationButton';
import leftArrow from '../../../assets/svg/l_arrow.svg';
import rightArrow from '../../../assets/svg/r_arrow.svg';
import { getNumbers, getItemsToShowIndex } from '../../../helpers/pagination';
import { scrollToTop } from '../../../helpers/dom';
import { Product } from '../../../types/product';
import './Pagination.scss';

type PaginationProps = {
  products: Product[];
  perPage: string;
};

export const Pagination = ({ products, perPage }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const total = products.length;
  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (value: number) => {
    if (perPage !== 'all') {
      searchParams.set('page', `${value}`);
      setSearchParams(searchParams);
      scrollToTop();
    }
  };

  const numberOfPages
    = perPage === 'all' ? 1 : Math.ceil(total / Number(perPage));
  const pages = getNumbers(1, numberOfPages);

  const [from, to] = getItemsToShowIndex(perPage as string, page, total);
  const visibleProducts = products.slice(from, to);

  useEffect(() => {
    handlePageChange(1);
  }, [perPage]);

  return (
    <>
      <ProductsList products={visibleProducts} />

      {numberOfPages > 1 && (
        <ul className="pagination" data-cy="pagination">
          <li>
            <IconButton
              onClick={() => handlePageChange(page - 1)}
              isDisabled={page === 1}
              svg={leftArrow}
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
            <IconButton
              onClick={() => handlePageChange(page + 1)}
              isDisabled={page === numberOfPages}
              svg={rightArrow}
              data-cy="paginationRight"
              alt="Pagination right button"
            />
          </li>
        </ul>
      )}
    </>
  );
};
