import { useEffect, useState } from 'react';
import './Pagination.scss';
type PageItem = number | '...';
const getMaxPageItems = () => {
  if (typeof window === 'undefined') {
    return 9;
  }
  if (window.innerWidth < 420) {
    return 4;
  }
  if (window.innerWidth < 640) {
    return 6;
  }
  if (window.innerWidth < 1024) {
    return 7;
  }
  return 9;
};
interface IPagination {
  currentPage: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
  handlePage: (page: number) => void;
}
export const Pagination: React.FC<IPagination> = ({
  handlePrev,
  handleNext,
  handlePage,
  currentPage,
  totalPages,
}: IPagination) => {
  const [maxPageItems, setMaxPageItems] = useState(getMaxPageItems);
  useEffect(() => {
    const handleResize = () => {
      setMaxPageItems(getMaxPageItems());
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const getPageNumbers = () => {
    const pages: PageItem[] = [];
    const maxItems = Math.min(maxPageItems, totalPages);
    if (totalPages <= maxItems) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
      }
      return pages;
    }
    if (maxItems < 6) {
      const startPage = Math.max(
        1,
        Math.min(
          currentPage - Math.floor(maxItems / 2),
          totalPages - maxItems + 1,
        ),
      );
      for (let page = startPage; page < startPage + maxItems; page++) {
        pages.push(page);
      }
      return pages;
    }
    const middlePagesCount = maxItems - 4;
    const startPageLimit = maxItems - 2;
    const endPageLimit = totalPages - (maxItems - 3);
    if (currentPage <= startPageLimit) {
      for (let page = 1; page <= startPageLimit; page++) {
        pages.push(page);
      }
      pages.push('...', totalPages);
      return pages;
    }
    if (currentPage >= endPageLimit) {
      pages.push(1, '...');
      for (let page = endPageLimit; page <= totalPages; page++) {
        pages.push(page);
      }
      return pages;
    }
    const middleStartPage = currentPage - Math.floor(middlePagesCount / 2);
    pages.push(1, '...');
    for (
      let page = middleStartPage;
      page < middleStartPage + middlePagesCount;
      page++
    ) {
      pages.push(page);
    }
    pages.push('...', totalPages);
    return pages;
  };
  return (
    <div className="pagination">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="pagination__button pagination__button--nav"
      >
        <img src="./icons/arrow-left-small-white.svg" alt="prev" />
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          // ToDo: Add classNames here
          className={`pagination__button ${currentPage === page ? 'active' : ''}`}
          onClick={() => typeof page === 'number' && handlePage(page)}
          disabled={typeof page !== 'number'}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination__button pagination__button--nav"
      >
        <img src="./icons/arrow-right-small-white.svg" alt="next" />
      </button>
    </div>
  );
};
