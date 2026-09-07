import { FC, useMemo } from 'react';
import prev from '../../../../assets/images/icons/arrow-left.svg';
import next from '../../../../assets/images/icons/arrow-right.svg';
import s from './Pagination.module.scss';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const getDisplayedPages = () => {
    const pages: (number | '...')[] = [];
    const delta = 2; // how many pages to show around the current page
    const left = currentPage - delta;
    const right = currentPage + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages;
  };

  const pages = useMemo(getDisplayedPages, [currentPage, totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={s.pagination}>
      <button
        className={s.arrow}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img src={prev} alt="Previous Page" />
      </button>

      <ul className={s.list}>
        {pages.map((item, idx) =>
          item === '...' ? (
            <li key={`dots-${idx}`} className={s.dots}>
              …
            </li>
          ) : (
            <li key={item}>
              <button
                className={item === currentPage ? s.active : s.page}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        className={s.arrow}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src={next} alt="Next Page" />
      </button>
    </div>
  );
};
