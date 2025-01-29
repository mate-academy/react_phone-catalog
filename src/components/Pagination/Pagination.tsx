import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import arrowLight from '../../images/icon-right-light-theme.svg';
import arrowDark from '../../images/icon-right-dark-theme.svg';
import { useAppSelector } from '../../hooks/hooks';
import styles from './Pagination.module.scss';

type Props = {
  totalItems: number;
};

export const Pagination: React.FC<Props> = ({ totalItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationOffset, setPaginationOffset] = useState(
    Number(searchParams.get('offset')) || 0,
  );
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const totalPages = Math.ceil(totalItems / Number(itemsPerPage));
  const searchQuery = searchParams.get('query');

  const { theme } = useAppSelector(state => state.theme);

  const generatePageNumbers = (total: number) => {
    return Array.from({ length: total }, (_, i) => i + 1);
  };

  const pageNumbers = generatePageNumbers(totalPages);

  const [pageGroupIndex, setPageGroupIndex] = useState(
    Number(searchParams.get('section')) || 0,
  );

  const groupSize = 4;
  const groupStart = pageGroupIndex * groupSize;
  const groupEnd = groupStart + groupSize;
  const currentPageGroup = pageNumbers.slice(groupStart, groupEnd);

  const firstPageInGroup = currentPageGroup[0];
  const lastPageInGroup = currentPageGroup[3];

  const handleNextGroup = () => {
    const params = new URLSearchParams(searchParams);

    if (currentPage < totalPages) {
      params.set('page', `${currentPage + 1}`);
    }

    if (currentPage === lastPageInGroup) {
      setPageGroupIndex(pageGroupIndex + 1);
      setPaginationOffset(paginationOffset + 160);
      params.set('section', `${pageGroupIndex + 1}`);
      params.set('offset', `${paginationOffset + 160}`);
    }

    setSearchParams(params);
  };

  const handlePreviousGroup = () => {
    const params = new URLSearchParams(searchParams);

    if (currentPage > 1) {
      params.set('page', `${currentPage - 1}`);
    }

    if (currentPage === firstPageInGroup) {
      setPageGroupIndex(pageGroupIndex - 1);
      setPaginationOffset(paginationOffset - 160);
      params.set('section', `${pageGroupIndex - 1}`);
      params.set('offset', `${paginationOffset - 160}`);
    }

    setSearchParams(params);
  };

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber.toString());
    setSearchParams(params);
  };

  useEffect(() => {
    if (searchQuery || searchQuery === '') {
      setPaginationOffset(0);
      setPageGroupIndex(0);
    }
  }, [searchQuery]);

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.button} ${styles.button__left} ${
          currentPage === 1 ? styles.button__left__disabled : ''
        }`}
        onClick={handlePreviousGroup}
        disabled={currentPage === 1}
      >
        <img
          src={theme === 'light' ? arrowLight : arrowDark}
          alt="Left Arrow"
          className={styles.iconLeft}
        />
      </button>

      <div className={styles.pagination__container}>
        <ul
          className={styles.pagination__pageList}
          style={{ transform: `translateX(-${paginationOffset}px)` }}
        >
          {pageNumbers.map(page => (
            <li
              key={page}
              className={`${styles.pagination__item} ${
                page === currentPage ? styles.pagination__item__active : ''
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`${styles.button} ${styles.buton__right} ${
          currentPage === totalPages ? styles.button__right__disabled : ''
        }`}
        onClick={handleNextGroup}
        disabled={currentPage === totalPages}
      >
        <img
          src={theme === 'light' ? arrowLight : arrowDark}
          alt="Right Arrow"
          className={styles.iconRight}
        />
      </button>
    </div>
  );
};

Pagination.displayName = 'Pagination';
