import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { IconType } from '../../types/Icon';
import { getSearchWith } from '../../utils/searchHelper';
import { getNumbers } from '../../utils/getNumbers';
import { useWindowSize } from '../../app/hooks';
import { SIZE_DESKTOP_WIDE, SIZE_MOBILE } from '../../app/consts';
import './Pagination.scss';

type Props = {
  total: number,
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '';

  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const [currentPageRange, setCurrentPageRange] = useState(1);
  const [pageRange] = useState(4);

  const maxPages = perPage
    ? Math.ceil(total / +perPage)
    : 0;

  const currentPage = page
    ? +page
    : null;

  const pages = maxPages > 1
    ? getNumbers(1, maxPages)
    : [1];

  const disabledNextButton = currentPage === pages.length;
  const disabledPrevButton = currentPage === 1;

  const handleChangePage = (pageNumber: number) => {
    if (page === `${pageNumber}`) {
      return;
    }

    const newParams = getSearchWith(
      searchParams, {
        page: `${pageNumber}`,
      },
    );

    navigate({ search: newParams });
  };

  const handlePrevButton = () => {
    const isRangeShouldChange = currentPage === (
      (currentPageRange - 1) * pageRange) + 1;

    if (currentPage && !disabledPrevButton) {
      if (isRangeShouldChange) {
        setCurrentPageRange(prevRange => prevRange - 1);
      }

      handleChangePage(currentPage - 1);
    }
  };

  const handleNextButton = () => {
    const isRangeShouldChange = currentPage === (pageRange * currentPageRange);

    if (currentPage && !disabledNextButton) {
      if (isRangeShouldChange) {
        setCurrentPageRange(prevRange => prevRange + 1);
      }

      handleChangePage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (width < SIZE_MOBILE) {
      const startIndex = (currentPageRange - 1) * pageRange;
      const endIndex = Math.min(startIndex + pageRange, maxPages);
      const pagesToShow = pages.slice(startIndex, endIndex);

      setVisiblePages(pagesToShow);
    }
  }, [currentPageRange, maxPages, pageRange, width]);

  useEffect(() => {
    setCurrentPageRange(1);
  }, [perPage]);

  useEffect(() => {
    if (width > SIZE_DESKTOP_WIDE) {
      setVisiblePages(pages);
    }
  }, [width, visiblePages]);

  return (
    <ul className="pagination">
      <button
        className="pagination__button"
        data-cy="paginationLeft"
        type="button"
        aria-label="PREV"
        onClick={handlePrevButton}
        disabled={disabledPrevButton}
      >
        <Icon type={disabledPrevButton
          ? IconType.ARROW_LEFT_DISABLED
          : IconType.ARROW_LEFT}
        />
      </button>

      <div className="pagination__list">
        {visiblePages.map((numberPage) => (
          <button
            key={numberPage}
            type="button"
            aria-label="NUMBERS"
            className={classNames(
              'pagination__pages',
              { 'pagination__pages--active': numberPage === currentPage },
            )}
            onClick={() => handleChangePage(numberPage)}
          >
            {numberPage}
          </button>
        ))}
      </div>

      <button
        className="pagination__button"
        data-cy="paginationRight"
        type="button"
        aria-label="NEXT"
        onClick={handleNextButton}
        disabled={disabledNextButton}
      >
        <Icon type={disabledNextButton
          ? IconType.ARROW_RIGHT_DISABLED
          : IconType.ARROW_RIGHT}
        />
      </button>
    </ul>
  );
};
