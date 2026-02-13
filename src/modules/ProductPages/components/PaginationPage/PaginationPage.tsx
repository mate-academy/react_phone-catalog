import cn from 'classnames';
import style from './paginationPage.module.scss';
import { IconButton } from '../../../shared/components/IconButton';
import { useContext, useEffect, useMemo } from 'react';
import { SearchEnum } from '../../../../types/SearchType';
import { useSearchParams } from 'react-router-dom';
import { PageContext } from '../../../../context/PageContext';
import { IconEnum } from '../../../../types/iconsType';

const maxVisiblePages = 4;

export const PaginationPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useContext(PageContext);
  const currentPage = Number(searchParams.get(SearchEnum.PAGE)) || 1;
  const params = new URLSearchParams(searchParams);
  const totalPages = Math.ceil(
    products.length / (Number(params.get(SearchEnum.ITEMS)) || products.length),
  );

  const visiblePages = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start: number;
    let end: number;

    if (currentPage < half) {
      start = 1;
      end = maxVisiblePages;
    } else if (currentPage >= totalPages - half) {
      end = totalPages;
      start = totalPages - maxVisiblePages + 1;
    } else {
      start = currentPage + 1 - half;
      end = start + maxVisiblePages - 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const handlePageClick = (pageNumber: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set(SearchEnum.PAGE, String(pageNumber));
    setSearchParams(newParams);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  useEffect(() => {
    if (currentPage > 1) {
      params.set(SearchEnum.PAGE, currentPage.toString());
    } else {
      params.delete(SearchEnum.PAGE);
    }

    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (!totalPages || totalPages === 1) {
    return;
  }

  return (
    <div className={cn(style.pagination)}>
      <div
        onClick={handlePrev}
        className={cn(style.pagination__nav, style['pagination__nav--prev'])}
      >
        <IconButton iconName={IconEnum.arrow} isDisabled={currentPage === 1} />
      </div>

      <div className={cn(style.pagination__pages)}>
        {visiblePages.map(pageNumber => (
          <div
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={cn(style.pagination__page)}
          >
            <IconButton
              filling={pageNumber}
              isActive={currentPage === pageNumber}
            />
          </div>
        ))}
      </div>
      <div
        onClick={handleNext}
        className={cn(style.pagination__nav, style['pagination__nav--next'])}
      >
        <IconButton
          iconName={IconEnum.arrow}
          isDisabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};
