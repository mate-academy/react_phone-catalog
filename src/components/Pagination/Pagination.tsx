import React from 'react';
import './Pagination.scss';

function useIsSmallScreen() {
  const [isSm, setIsSm] = React.useState(window.innerWidth <= 640);

  React.useEffect(() => {
    const onResize = () => setIsSm(window.innerWidth <= 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return isSm;
}

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const isSm = useIsSmallScreen();

  if (totalPages <= 1) return null;

  let pageNumbers: number[] = [];
  if (isSm && totalPages > 4) {
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + 3);
    if (end - start < 3) {
      start = Math.max(1, end - 3);
    }
    pageNumbers = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  } else {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  return (
    <div className="pagination">
      <button
        className="pagination__arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.4712 3.52851C10.2109 3.26816 9.78878 3.26816 9.52843 3.52851L5.52843 7.52851C5.26808 7.78886 5.26808 8.21097 5.52843 8.47132L9.52843 12.4713C9.78878 12.7317 10.2109 12.7317 10.4712 12.4713C10.7316 12.211 10.7316 11.7889 10.4712 11.5285L6.94265 7.99992L10.4712 4.47132C10.7316 4.21097 10.7316 3.78886 10.4712 3.52851Z"
            fill="#F1F2F9"
          />
        </svg>
      </button>

      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? 'pagination__page-active' : 'pagination__page'}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination__arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.52876 3.52851C5.78911 3.26816 6.21122 3.26816 6.47157 3.52851L10.4716 7.52851C10.7319 7.78886 10.7319 8.21097 10.4716 8.47132L6.47157 12.4713C6.21122 12.7317 5.78911 12.7317 5.52876 12.4713C5.26841 12.211 5.26841 11.7889 5.52876 11.5285L9.05735 7.99992L5.52876 4.47132C5.26841 4.21097 5.26841 3.78886 5.52876 3.52851Z"
            fill="#F1F2F9"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
