import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { IconType } from '../../types/Icon';
import { getSearchWith } from '../../utils/searchHelper';
import { getNumbers } from '../../utils/getNumbers';
import { scrollToTop } from '../../utils/scrollToTop';
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
  const page = Number(searchParams.get('page') || '1');
  const perPage = searchParams.get('perPage') || '';

  const [currentPage, setCurrentPage] = useState(page);

  const pageRange = (width < SIZE_MOBILE) ? 4 : 9;

  const rangeToShow = Math.ceil(currentPage / pageRange);
  const [currentPageRange, setCurrentPageRange] = useState(rangeToShow);

  const maxPages = perPage
    ? Math.ceil(total / +perPage)
    : 0;

  const pages = maxPages > 1
    ? getNumbers(1, maxPages)
    : [1];

  const disabledNextButton = currentPage === pages.length;
  const disabledPrevButton = currentPage === 1;

  const visiblePages = useMemo(() => {
    const startIndex = (currentPageRange - 1) * pageRange;
    const endIndex = Math.min(startIndex + pageRange, maxPages);
    let pagesToShow: Array<number | string> = (pages.length === 1)
      ? pages
      : pages.slice(startIndex, endIndex);

    if (width > SIZE_DESKTOP_WIDE) {
      if (endIndex < maxPages) {
        pagesToShow = [
          ...pagesToShow, '...', pages[pages.length - 1],
        ];
      }
    }

    return pagesToShow;
  }, [currentPage, currentPageRange, pageRange, maxPages, width]);

  const handleChangePage = (pageNumber: number | string) => {
    if (page === pageNumber) {
      return;
    }

    if (pageNumber === '...') {
      const nextRangeStart = currentPageRange * pageRange + 1;

      if (nextRangeStart <= maxPages) {
        setCurrentPageRange(prevRange => prevRange + 1);
        handleChangePage(nextRangeStart);

        const newParams = getSearchWith(
          searchParams,
          {
            page: `${nextRangeStart}`,
          },
        );

        navigate({ search: newParams });
      } else {
        setCurrentPageRange(Math.ceil(maxPages / pageRange));
        handleChangePage(maxPages);
      }
    } else {
      const newParams = getSearchWith(
        searchParams, {
          page: `${pageNumber}`,
        },
      );

      setCurrentPageRange(rangeToShow + 1);
      navigate({ search: newParams });
    }

    scrollToTop();
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

    scrollToTop();
  };

  const handleNextButton = () => {
    const isRangeShouldChange = currentPage === (pageRange * currentPageRange);

    if (currentPage && !disabledNextButton) {
      if (isRangeShouldChange) {
        setCurrentPageRange(prevRange => prevRange + 1);
      }

      handleChangePage(currentPage + 1);
    }

    scrollToTop();
  };

  useEffect(() => {
    if (currentPage !== page) {
      setCurrentPage(page);
    }
  }, [page]);

  useEffect(() => {
    setCurrentPageRange(1);
  }, [perPage]);

  useEffect(() => {
    if (currentPageRange !== rangeToShow) {
      setCurrentPageRange(rangeToShow);
    }
  }, [currentPageRange]);

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
            onClick={() => handleChangePage(numberPage as number)}
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
