import { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { getVisiblePages } from '../../utils/getVisiblePages';
import { SearchParams } from '../../utils/searchHelper';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (params: SearchParams) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / perPage);
  const visiblePages = getVisiblePages(totalPages, currentPage);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange({ page: page.toString() === '1' ? null : page.toString() });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className={styles.pagination__mobile}>
        <button
          className={classNames(styles.pagination__navBtn, {
            [styles['pagination__navBtn--disabled']]: currentPage === 1,
            [styles['pagination__navBtn--prev']]: true,
          })}
          onClick={() => handlePageChange(currentPage - 1)}
        />

        <span className={styles.pagination__mobileText}>
          {currentPage} / {totalPages}
        </span>

        <button
          className={classNames(styles.pagination__navBtn, {
            [styles['pagination__navBtn--disabled']]:
              currentPage === totalPages,
            [styles['pagination__navBtn--next']]: true,
          })}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </div>
    );
  }

  return (
    <div className={styles.paginationWrapper}>
      <ul className={styles.pagination}>
        <li
          className={classNames(
            styles.pagination__item,
            styles['pagination__item--prev'],
            {
              [styles['pagination__item--disabled']]: currentPage === 1,
            },
          )}
        >
          <a
            className={styles.pagination__link}
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={e => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
          />
        </li>

        {visiblePages.map((page, index) =>
          page === '...' ? (
            <li key={`ellipsis-${index}`} className={styles.pagination__item}>
              <span className={styles.pagination__link}>…</span>
            </li>
          ) : (
            <li
              key={page}
              className={classNames(styles.pagination__item, {
                [styles['pagination__item--active']]: page === currentPage,
              })}
            >
              <a
                className={styles.pagination__link}
                href={`#${page}`}
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(Number(page));
                }}
              >
                {page}
              </a>
            </li>
          ),
        )}

        <li
          className={classNames(
            styles.pagination__item,
            styles['pagination__item--next'],
            {
              [styles['pagination__item--disabled']]:
                currentPage === totalPages,
            },
          )}
        >
          <a
            className={styles.pagination__link}
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={e => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
          />
        </li>
      </ul>
    </div>
  );
};
