import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import classNames from 'classnames';

import { IconButton } from '../UI/IconButton/IconButton';
import { ProductsList } from '../ProductsList/ProductsList';
import leftArrow from '../../assets/svg/l_arrow.svg';
import rightArrow from '../../assets/svg/r_arrow.svg';
import { getItemsToShowIndex } from '../../helpers/pagination';
import { scrollToTop } from '../../helpers/dom';
import { Product } from '../../types/product';
import './Pagination.scss';

type PaginationProps = {
  total: number;
  sortedProducts: Product[];
};

export const Pagination = ({ total, sortedProducts }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = Number(searchParams.get('perPage')) || 'all';
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
  // const pages = getNumbers(1, numberOfPages);

  const visibleProducts = sortedProducts.slice(
    ...getItemsToShowIndex(perPage, page, total),
  );

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
              {Array.from({ length: 5 }, (v, i) => i + page - 2).map(
                pageNumber =>
                  (pageNumber <= 0 || pageNumber > numberOfPages ? null : (
                    <li key={pageNumber} className="pagination__page">
                      <button
                        type="button"
                        className={classNames('pagination__button', {
                          'pagination__button--active': pageNumber === page,
                        })}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  )),
              )}
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
