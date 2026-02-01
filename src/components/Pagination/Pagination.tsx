import React from 'react';
import style from './Pagination.module.scss';

interface PropsPaginatior {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PropsPaginatior> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pages = Math.max(1, Math.ceil(total / Math.max(1, perPage)));
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= pages;

  const visibleCount = 4;

  const goTo = (page: number) => {
    const camp = Math.max(1, Math.min(page, pages));

    if (camp !== currentPage) {
      onPageChange(camp);
    }
  };

  if (pages <= 1) {
    return null;
  }

  const half = Math.floor(visibleCount / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(pages, start + visibleCount - 1);

  if (end - start + 1 < visibleCount) {
    start = Math.max(1, end - visibleCount + 1);
  }

  const visiblePages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i,
  );

  return (
    <ul className={style.pagination} aria-label="Pagination">
      <div className={style.block}>
        <li className={`${style.ul} ${prevDisabled ? style.disabled : ''}`}>
          <a
            aria-disabled={prevDisabled}
            onClick={prevDisabled ? undefined : () => goTo(currentPage - 1)}
          >
            <img src="img/arrows/arrow_left.svg" alt="arrow left" />
          </a>
        </li>
      </div>

      {visiblePages.map(page => (
        <li
          key={page}
          className={`${style.li} ${page === currentPage ? style.active : ''}`}
        >
          <a className={style.link} onClick={() => goTo(page)}>
            {page}
          </a>
        </li>
      ))}

      <div className={style.blockL}>
        <li className={`${style.ul} ${nextDisabled ? style.disabled : ''}`}>
          <a
            className={style.butRight}
            aria-disabled={nextDisabled}
            onClick={nextDisabled ? undefined : () => goTo(currentPage + 1)}
          >
            <img src="img/arrows/arrow_right.svg" alt="arrow right" />
          </a>
        </li>
      </div>
    </ul>
  );
};
