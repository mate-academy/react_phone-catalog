import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { IconButton } from '../../UI/IconButton/IconButton';
import { PaginationButton } from './PaginationButton';
import leftArrow from '../../../assets/svg/l_arrow.svg';
import rightArrow from '../../../assets/svg/r_arrow.svg';
import { getNumbers } from '../../../helpers/pagination';
import { scrollToTop } from '../../../helpers/dom';
import './Pagination.scss';

type PaginationProps = {
  total: number;
  perPage: number | string;
  page: number;
};

export const Pagination = ({ total, perPage, page }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  useEffect(() => {
    handlePageChange(1);
  }, [perPage]);

  return (
    <>
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
