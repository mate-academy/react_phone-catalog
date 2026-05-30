import React, { useEffect, useState } from 'react';
import style from './Pagination.module.scss';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const pageNumber = Array.from({ length: totalPages }, (_, i) => i);

  const [maxVisible, setMaxVisible] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMaxVisible(4);
      } else {
        setMaxVisible(8);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  let start = Math.max(page - Math.floor(maxVisible / 2), 1);
  let end = start + maxVisible;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(totalPages - maxVisible, 1);
  }

  start = Math.max(start, 1);
  const visiblePageNumber = pageNumber.slice(start, end);

  const handlePageChange = (num: number) => {
    onPageChange(num);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={style.pagination}>
      <button
        className={style.pagination__arrow}
        onClick={() => handlePageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        <img
          className={style['pagination__arrow-image']}
          src="img/icons/Chevron (Arrow Left).svg"
          alt="arrow left"
        />
      </button>

      <div className={style.pagination__pages}>
        {visiblePageNumber.map(num => (
          <button
            key={num}
            className={`${style['pagination__pages__page-button']} ${page === num ? style.active : ''}`}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        className={style.pagination__arrow}
        onClick={() => handlePageChange(Math.min(page + 1, totalPages - 1))}
        disabled={page === totalPages - 1}
      >
        <img
          className={style['pagination__arrow-image']}
          src="img/icons/Chevron (Arrow Right).svg"
          alt="arrow right"
        />
      </button>
    </div>
  );
};
