import React from 'react';
import style from './Pagination.module.scss';
import classNames from 'classnames';
import { useIsMobile } from '../../utils/hooks/useIsMobile';
import { scrollToTop } from '../../utils/helpers/helpers';
import { useTheme } from '../../store/ThemeContext';
import { ICONS } from '../../assets/icons';

type Props = {
  totalItems: number;
  perPage: string;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  if (perPage === 'All') {
    return null;
  }

  const itemsPerPageCount = +perPage;
  const totalPages = Math.ceil(totalItems / itemsPerPageCount);

  if (totalPages <= 1) {
    return null;
  }

  const visibleButtons = isMobile ? 4 : 6;

  let startPage = Math.max(1, currentPage - Math.floor(visibleButtons / 2));
  let endPage = startPage + visibleButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visibleButtons + 1);
  }

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={style.buttons}>
      <button
        className={style.buttons__button}
        onClick={() => {
          onPageChange(currentPage - 1);
          scrollToTop();
        }}
        disabled={currentPage === 1}
      >
        <img
          src={
            theme === 'dark'
              ? currentPage === 1
                ? ICONS.prev
                : ICONS.darkPrevActive
              : currentPage === 1
                ? ICONS.prev
                : ICONS.prevActive
          }
          alt="prev"
        />
      </button>
      <div className={style.buttons__pages}>
        {pages.map(page => (
          <button
            key={page}
            className={classNames(style.buttons__button, {
              [style.buttons__button__active]: page === currentPage,
            })}
            style={theme === 'dark' ? { color: 'white' } : undefined}
            onClick={() => {
              scrollToTop();
              onPageChange(page);
            }}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className={style.buttons__button}
        onClick={() => {
          onPageChange(currentPage + 1);
          scrollToTop();
        }}
        disabled={currentPage === totalPages}
      >
        <img
          src={
            theme === 'dark'
              ? currentPage === totalPages
                ? ICONS.next
                : ICONS.darkNextActive
              : currentPage === totalPages
                ? ICONS.next
                : ICONS.nextActive
          }
          alt="prev"
        />
      </button>
    </div>
  );
};
