import React from 'react';
import './PaginationControls.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';


interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      // Preserve other search params, just update `page`
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        page: page.toString(),
      });
    }
  };

  useEffect(() => {
    const pageParam = searchParams.get('page');

    if (!pageParam) {
      // Set default page to 1
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        page: '1',
      });
    }

  }, [searchParams, setSearchParams ]);


  return (
    <div className="pagination__controls">
      <button
        className="pagination-button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </button>

      {Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;
        return (
          <button
            key={pageNumber}
            className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        className="pagination-button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default PaginationControls;
