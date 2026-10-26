import styles from './Pagination.module.scss';
import { SliderButton } from '../ui/SliderButton/SliderButton';
import ArrowLeft from '../../../public/icons/chevron-arrow-left.svg?react';
import ArrowRight from '../../../public/icons/chevron-arrow-right.svg?react';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  activePage: number;
  pageCount: number;
};

export const Pagination: React.FC<Props> = ({ activePage, pageCount }) => {
  const [currentPage, setCurrentPage] = useState(activePage);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setCurrentPage(activePage);
  }, [activePage]);

  const pages = useMemo(() => {
    const result = [];

    for (let page = 1; page <= pageCount; page++) {
      result.push(page);
    }

    return result;
  }, [pageCount]);

  const startIndex = Math.max(0, Math.min(currentPage - 3, pages.length - 5));

  const visiblePages = pages.slice(startIndex, startIndex + 5);

  const handleSelectPage = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);

      const params = new URLSearchParams(searchParams);

      params.set('page', String(page));

      setSearchParams(params);
    }
  };

  return (
    <div className={styles.pagination}>
      <SliderButton
        onClick={() => {
          handleSelectPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        <ArrowLeft />
      </SliderButton>

      <ul className={styles.list}>
        {visiblePages.map(page => (
          <li key={page}>
            <SliderButton
              onClick={() => handleSelectPage(page)}
              isActive={currentPage === page}
            >
              {page}
            </SliderButton>
          </li>
        ))}
      </ul>

      <SliderButton
        onClick={() => {
          handleSelectPage(currentPage + 1);
        }}
        disabled={currentPage === pageCount}
      >
        <ArrowRight />
      </SliderButton>
    </div>
  );
};
