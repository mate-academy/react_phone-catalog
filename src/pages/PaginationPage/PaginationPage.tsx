import React from 'react';
import './PaginationPage.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const PaginationPage: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagesToShow = 5;

  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const halfPagesToShow = Math.floor(pagesToShow / 2);

    let startPage = Math.max(currentPage - halfPagesToShow, 1);
    let endPage = Math.min(currentPage + halfPagesToShow, totalPages);

    if (currentPage <= halfPagesToShow) {
      endPage = pagesToShow;
    }

    if (currentPage + halfPagesToShow >= totalPages) {
      startPage = totalPages - pagesToShow + 1;
    }

    if (startPage < 1) startPage = 1;
    if (endPage > totalPages) endPage = totalPages;

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination__page ${i === currentPage ? 'pagination__page--active' : ''}`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
        className="pagination__button pagination__left"
      >
        <img
          src="./img/icons/SliderButtonDefault(right).svg"
          alt="sliderLeft"
        />
      </button>
      <div className="pagination__pages">{renderPageNumbers()}</div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handleClick(currentPage + 1)}
        className="pagination__right pagination__button"
      >
        <img
          src="./img/icons/SliderButtonDefault(right).svg"
          alt="sliderRight"
        />
      </button>
    </div>
  );
};
