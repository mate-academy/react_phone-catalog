import clsx from 'clsx';
import { ArrowLeftButton } from '../../images/icons/ArrowLeftButton';
import { ArrowRightButton } from '../../images/icons/ArrowRightButton';
interface PaginationProps<T> {
  items: T[];
  itemsPerPage: number;
  renderItem: (item: T) => React.ReactNode;
  currentPage: number;
  onPageChange: (page: number) => void;
  refreshParams: (updates: Record<string, string | number | null>) => void;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  isLoading: boolean;
}

export function Pagination<T>({
  isLoading,
  items,
  itemsPerPage,
  renderItem,
  currentPage,
  onPageChange,
  refreshParams,
  pageRangeDisplayed = 3,
  marginPagesDisplayed = 1,
}: PaginationProps<T>) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const updatePageAndScroll = (page: number) => {
    const paginationEl = document.querySelector('.pagination-container');
    const currentScrollPos = window.pageYOffset;
    const paginationOffset = paginationEl
      ? paginationEl.getBoundingClientRect().top + currentScrollPos
      : 0;

    refreshParams({ page: page === 1 ? null : page });

    setTimeout(() => {
      const newPaginationOffset = paginationEl
        ? paginationEl.getBoundingClientRect().top + window.pageYOffset
        : 0;
      const scrollDifference = newPaginationOffset - paginationOffset;

      if (Math.abs(scrollDifference) > 10) {
        window.scrollTo({
          top: currentScrollPos + scrollDifference,
          behavior: 'instant',
        });
      }
    }, 50);
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
      updatePageAndScroll(page);
    }
  };

  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      onPageChange(newPage);
      updatePageAndScroll(newPage);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      onPageChange(newPage);
      updatePageAndScroll(newPage);
    }
  };

  const isDisabledPrev = currentPage === 1;
  const isDisabledNext = currentPage === totalPages;

  const getPagesToDisplay = () => {
    const pages: (number | 'dots')[] = [];

    const leftSide = Math.max(
      currentPage - Math.floor(pageRangeDisplayed / 2),
      marginPagesDisplayed + 1,
    );
    const rightSide = Math.min(
      currentPage + Math.floor(pageRangeDisplayed / 2),
      totalPages - marginPagesDisplayed,
    );

    if (totalPages <= pageRangeDisplayed + marginPagesDisplayed * 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    for (let i = 1; i <= marginPagesDisplayed; i++) {
      pages.push(i);
    }

    if (leftSide > marginPagesDisplayed + 1) {
      pages.push('dots');
    }

    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i);
    }

    if (rightSide < totalPages - marginPagesDisplayed) {
      pages.push('dots');
    }

    for (let i = totalPages - marginPagesDisplayed + 1; i <= totalPages; i++) {
      if (i > marginPagesDisplayed && i > rightSide) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pagesToDisplay = getPagesToDisplay();
  const getItemKey = (item: T, index: number) => {
    if (typeof item === 'object' && item !== null && 'id' in item) {
      return (item as { id: string | number }).id;
    }

    return `item-${index}`;
  };
  const getButtonStyles = (page: number, currentPage: number) => {
    const baseStyles = 'w-8 h-8 cursor-pointer transition-colors duration-200';
    const activeStyles = 'border-1 border-secondary   ';
    const inactiveStyles =
      'bg-pagination-background text-primary dark:text-dark-primary';
    const hoverStyles =
      'hover:bg-primary hover:border-secondary hover:text-hover   dark:hover:bg-dark-purple-hover dark:hover:border-dark-purple-hover dark:hover:text-white';

    return clsx(
      baseStyles,
      page === currentPage ? activeStyles : inactiveStyles,
      hoverStyles,
    );
  };
  return (
    <>
      <div className="grid gap-4 mobile:grid-cols-[repeat(auto-fill,_minmax(230px,288px))] mobile:justify-center tablet:grid-cols-[repeat(auto-fill,_minmax(230px,1fr))] mt-6 mb-6 tablet:mb-10">
        {(isLoading ? Array.from({ length: itemsPerPage }) : currentItems).map(
          (item, index) => (
            <div key={getItemKey(item as T, index)}>
              {renderItem(item as T)}
            </div>
          ),
        )}
      </div>

      <div
        className="pagination-container flex justify-center items-center m-10 gap-2 "
        role="navigation"
        aria-label="Pagination"
      >
        <button
          aria-label="Previous page"
          aria-disabled={isDisabledPrev}
          onClick={handlePrevPageClick}
          className={clsx('cursor-not-allowed group ', {
            'cursor-pointer': !isDisabledPrev,
          })}
        >
          <ArrowLeftButton isDisabled={isDisabledPrev} />
        </button>

        {pagesToDisplay.map((page, index) =>
          page === 'dots' ? (
            <span
              key={`dots-${index}`}
              className="px-2 text-black"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={getButtonStyles(page, currentPage)}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={handleNextPageClick}
          className={clsx('cursor-not-allowed group   ', {
            'cursor-pointer': !isDisabledNext,
          })}
          aria-label="Next page"
          aria-disabled={isDisabledNext}
        >
          <ArrowRightButton isDisabled={isDisabledNext} />
        </button>
      </div>
    </>
  );
}
