import React from 'react';
import rightIcon from '../../shared/icons/chevron-arrow-right.svg';
import leftIcon from '../../shared/icons/chevron-arrow-left.svg';
import style from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 1);
    let endPage = startPage + 3;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - 3);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className={style.pagination}>
      <button
        className={style.tile}
        onClick={() => {
          handlePageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        <img src={leftIcon} alt="arrow left icon" className={style.icon} />
      </button>

      {renderPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`${style.pageItem} ${currentPage === page ? style.activePage : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={style.tile}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={rightIcon} alt="arrow right icon" className={style.icon} />
      </button>
    </div>
  );
};
